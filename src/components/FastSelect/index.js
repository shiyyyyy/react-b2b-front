import React, { Component } from 'react';
import {Select} from 'antd';

const { Option } = Select;

function getSmallOptions(options,search,len){
    const newOptions = {};
    if(Object.keys(options).length > 100){
        let i = 0;
        if(search===''){
            // eslint-disable-next-line array-callback-return
            Object.keys(options).map((key)=>{
                if(i<=len-1){
                    newOptions[key] = options[key];
                    i+=1;
                }
            })
        }else{
            // eslint-disable-next-line array-callback-return
            Object.keys(options).map((key)=>{
                if(i<=len-1){
                    if(options[key].indexOf(search)!==-1){
                        newOptions[key] = options[key];
                        i+=1;
                    }
                }
            })
        }
        return newOptions;
    }
    return {...options};
}
// eslint-disable-next-line react/prefer-stateless-function
class FastSelect extends Component {
    
    constructor(props){
        super(props);
        const {options={}} = props;
        this.state = {
          smallOptions:getSmallOptions(options,'',100),
          search:'',
          curLength:100
        }
    }

    onSearch(search){
        const {options} = this.props;
        setTimeout(()=>{
            const smallOptions = getSmallOptions(options, search, 100);
            this.setState({smallOptions,search});
          },300)
    }

    onPopupScroll(e){
        e.persist();
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            const { curLength,search } = this.state;
            const {options} = this.props;
            const nextLength = curLength + 100;
            const smallOptions = getSmallOptions(options, search,nextLength);
            this.setState({smallOptions,curLength:nextLength});
        }
    }

    render() {
        const {onSearch,...restProps} = this.props;
        const {smallOptions} = this.state;
        return (
          <Select 
            onSearch={(s) =>this.onSearch(s)}
            onPopupScroll={(e)=>this.onPopupScroll(e)}
            filterOption={false}
            {
                ...restProps 
            }
          >
            {Object.keys(smallOptions).map(item => (
              <Option value={item} key={item}>
                {smallOptions[item]}
              </Option>
            ))}
          </Select>
        )
    }
}

export default FastSelect;
