import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Radio,Checkbox} from 'antd';
import ModalFormBtn from '@/components/ModalFormBtn';
import getEnum from '@/utils/enum';

const { Group } = Radio;

function getField(regular,i){
    let rst ='';
    Object.keys(regular).forEach((field,index)=>{
        if(index === i && rst ===''){
            rst = field
        }
    })
    return rst;
}

function getIndex(regular,fd){
    let rst =-1;
    Object.keys(regular).forEach((field,index)=>{
        if(fd === field && rst ===-1){
            rst = index
        }
    })
    return rst;
}

class FilterModalContent extends Component {

    static propTypes = {
        cfg: PropTypes.object.isRequired,
    
    };

    constructor(props) {
        super(props);
        this.state ={specOk:true,pem:'',specValue:[]};
        const {cfg,auth} = props;
        const filters = auth.filters?auth.filters:{};
        const f = filters[cfg.mod] && filters[cfg.mod][cfg.field];
        if(!f){
            this.state.pem = 'unlmt';
        }else if(f[0]==-1){
            this.state.pem = 'self';
        }else{
            this.state.pem = 'spec';
            this.state.specValue = [...f];
        }
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);

        if(cfg.type !== 'Company'){
            if(cfg.regular[cfg.field] && cfg.regular[cfg.field].cascade){
                const preField = cfg.regular[cfg.field].cascade;
                const preFilter = filters[cfg.mod] && filters[cfg.mod][preField];
                let prePem = ''
                if(!preFilter){
                    prePem = 'unlmt';
                }else{
                    prePem = preFilter[0]===-1 ? 'self' : 'spec';
                }
                const specOk = (prePem === 'spec');
                if(specOk){
                    cfg.cascade = preField;
                    cfg.enumRow = filters[cfg.mod];
                }
                this.state.specOk = specOk;
            }            
        }
        this.state.cfg = cfg;
    }

    onRadioChange(e){
        this.setState({
            pem: e.target.value,
        });
    }
    
    onCheckboxChange(key){
        const {specValue} = this.state;
        if(specValue.indexOf(key)!==-1){
            specValue.splice(specValue.indexOf(key),1);
        }else{
            specValue.push(key)
        }
        this.setState(specValue);
    }

    submit(){
        const {pem,specValue,cfg} = this.state;
        const {onSubmit,auth} = this.props;
        const filters = auth.filters?auth.filters:{};
        const {mod,field,type,regular} = cfg;
        let filter = filters[mod];
        let i = -1;
        let fd = field;
        if(onSubmit){
            switch(pem){
                case 'unlmt':
                    if(!filter){
                        break;
                    }
                    delete filter[field];
                    switch(type){
                        case 'Company':
                            i = getIndex(regular,field);
                            delete filter[getField(regular,i+1)];
                            delete filter[getField(regular,i+2)];
                            break;
                        case 'Department':
                            i = getIndex(regular,field);
                            delete filter[getField(regular,i+1)];
                            break;
                        case 'Employee':
                            break; 
                        default:
                            break;
                    }
                    break;
                case 'spec':
                    if(specValue.length ===0){
                        // CommSrvc.error(I18nSrvc.get('SEL_ITEM'));
                        return;
                    }
                    filter = filter || {};
                    filter[field] = specValue;
                    switch(type){
                        case 'Company':
                            i = getIndex(regular,field);
                            delete filter[getField(regular,i+1)];
                            delete filter[getField(regular,i+2)];
                            break;
                        case 'Department':
                            i = getIndex(regular,field);
                            delete filter[getField(regular,i+1)];
                            break;
                        case 'Employee':
                            break; 
                        default:
                            break;
                    }
                    break;
                case 'self':
                    filter = filter || {};
                    filter[field] = [-1];
                    switch(type){
                        case 'Company':
                            i = getIndex(regular,field);
                            delete filter[getField(regular,i+1)];
                            delete filter[getField(regular,i+2)];
                            break;
                        case 'Department':
                            i = getIndex(regular,field);
                            filter[getField(regular,i-1)] = [-1];
                            delete filter[getField(regular,i+1)];
                            break;
                        case 'Employee':
                            i = getIndex(regular,field);
                            while(regular[fd].cascade){
                                fd = regular[fd].cascade;
                                filter[fd] = [-1];
                            }
                            break; 
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }

            onSubmit(cfg.mod,filter);
        }
    }

    cancel(){
        const {onCancel} = this.props;
        if(onCancel){
            onCancel();
        }
    }

    render() {
        const {specOk,pem,specValue,cfg}  =this.state;
        let options = {};
        if(cfg.type==='Company'){
            options = getEnum({type:cfg.type});
        }else{
            options = getEnum({type:cfg.type,cascade:cfg.cascade},cfg.enumRow,cfg.cascade);
        }
        return (
          <div>
            <Group onChange={this.onRadioChange} value={pem}>
              <Radio value='unlmt'>无限制</Radio>
              {
                specOk&& 
                <Radio value='spec'>限指定</Radio>
              }
              <Radio value='self'>限本人</Radio>
            </Group>
            {
                pem ==='spec'&& cfg.type ==='Department' && 
                <div>
                  {
                      Object.keys(options).map((key)=>
                        <Checkbox 
                          key={`${cfg.type}/${key}`}
                          onChange={()=>this.onCheckboxChange(key)}
                          checked={specValue.indexOf(key)!==-1}
                        >
                          {options[key]}
                        </Checkbox>
                      )
                  }
                </div>
            }
            {
                pem ==='spec'&& cfg.type !=='Department' && 
                <div>
                  {
                      Object.keys(options).map((key)=>
                        <Checkbox 
                          key={`${cfg.type}/${key}`}
                          onChange={()=>this.onCheckboxChange(key)}
                          checked={specValue.indexOf(key)!==-1}
                        >
                          {options[key]}
                        </Checkbox>
                      )
                  }
                </div>
            }
            <ModalFormBtn
              submit={() => {
                this.submit();
               }}
              cancel={() => {
                this.cancel();
               }}
            />
          </div>
        );
  }
}

export default FilterModalContent;
