import React from 'react';
import { Card ,Input,Select,DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CommonTable from './CommonTable';
import styles from './index.less';
import {getEnum} from '@/utils/utils';


const InputGroup = Input.Group;
const {Search} = Input;
const SelectOption = Select.Option;


function renderEnumSelect(cfg){
  const Enum = getEnum(cfg.type);
  return (
    <Select defaultValue={cfg.text}>
      {
        Object.keys(Enum).map( key =>
          <SelectOption key={key} value={Enum[key]}>{Enum[key]}</SelectOption>
        )
      }
    </Select>
  );
}

class CommonList extends React.Component{
  constructor(props) {
    super(props);

    const {textSerach={}} = this.props;
    const keys = Object.keys(textSerach);
    this.state = {
        textSerachKey:keys[0] || '',
        showMore : false
    };
  }

  changeSelectKey(key){
    this.setState({textSerachKey:key});
  }

  changeShowMore(){
    this.setState((state)=>{
      return {...state,showMore:!state.showMore}
    });
  }

  reload(){
    const { reload:reloadData } = this.props;
    if(typeof reloadData === 'function'){
       reloadData();
    }
  }

  renderTextSerach() {
    const {textSerach={}} = this.props;
    const {textSerachKey = ''} = this.state;
    const selectDefaultValue = textSerach[textSerachKey]? textSerach[textSerachKey].text:''; 
    return (
      <InputGroup compact className={styles.inputBox}>
        <Select defaultValue={selectDefaultValue}>
          {
            Object.keys(textSerach).map( key => 
              <SelectOption key={key} value={textSerach[key].text} onClick={()=>this.changeSelectKey(key)}>{textSerach[key].text}</SelectOption>
            )
          }
          <SelectOption value="divider" className={styles.divider} />
          <SelectOption value="more" onClick={()=>this.changeShowMore()}>
            more
          </SelectOption>
        </Select>
        <Search
          placeholder={selectDefaultValue}
          onSearch={()=>this.reload()}
        />
      </InputGroup>
    );
  }



  renderMoreSerach(){
    const {moreSearch={}} = this.props;
    return (
      <div className={styles.moreSearch}>
        {
          Object.keys(moreSearch).map( key => (
            <div key={key} className={styles.moreSearchContent}>
              {moreSearch[key].type && moreSearch[key].type==='Date' && <DatePicker />}
              {moreSearch[key].type && moreSearch[key].type!=='Date' 
                && renderEnumSelect(moreSearch[key])
              }
            </div>
          ))
        }
      </div>
    );
  }

   render(){
      const { title ,bordered = false,...tableProps } =this.props;
      const { showMore } = this.state;
      return (
        <PageHeaderWrapper title={title} textSerach={this.renderTextSerach()}>
          { showMore && this.renderMoreSerach()}
          <Card bordered={bordered}>
            <CommonTable 
              {...tableProps}
            />
          </Card>
          <div />
        </PageHeaderWrapper>
      );
   }
}

export default CommonList;





