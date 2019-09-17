import React, { PureComponent } from 'react';
import { Form, Select, Input, DatePicker, TimePicker, Col,InputNumber } from 'antd';
import moment from 'moment';
import getEnum from '@/utils/enum';
import {searchChange} from '@/utils/utils';

import styles from './index.less';

const { Option } = Select;

class ModalForm extends PureComponent {

  renderArraySelect = (cfg,field) => {
    const { form ,onChange = ()=>{} } = this.props;
    const data = form.getFieldsValue();
    const Enum = getEnum(cfg, data) || [];
    let mode = null;
    if (cfg.multi) {
      mode = 'multiple';
    }
    return (
      <Select
        showSearch
        optionFilterProp="children"
        mode={mode}
        onChange={(val)=>onChange(field,val)}
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={Enum[key]}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  onSelectChange = (field,val) =>{
    const { form,config,onChange=()=>{} } = this.props;
    const data = form.getFieldsValue();
    const rst = searchChange(config.list,field,data);
    form.setFieldsValue({
      ...rst
    })
    onChange(field,val);
  }

  renderEnumSelect = (cfg,field) => {
    const { form } = this.props;
    const data = form.getFieldsValue();
    const Enum = getEnum(cfg, data) || {};
    let mode = null;
    if (cfg.multi) {
      mode = 'multiple';
    }
    return (
      <Select
        showSearch
        optionFilterProp="children"
        mode={mode}
        onChange={(val)=>this.onSelectChange(field,val)}
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={key}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      config = {},
      onChange =()=>{}
    } = this.props;
    let { data = {} } = this.props;
    data = data ? data : {}
    const list = config.list || {};
    return (
      <Col className={styles.ModalForm}>
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
          {Object.keys(list).map(field => (
            <React.Fragment key={field}>
              {list[field].ro === 1 && !list[field].type && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    initialValue: data[field] || '',
                  })(
                    <Input readOnly />
                  )}
                </Form.Item>
              )}
              {list[field].ro !== 1 && !list[field].type && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field] || '',
                  })(
                    <Input onChange={(val)=>onChange(field,val)} />
                  )}
                </Form.Item>
              )}
              {list[field].ro !== 1 && list[field].type === 'number' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field],
                  })(
                    <InputNumber style={{width: '100%'}} onChange={(val)=>onChange(field,val)} />
                  )}
                </Form.Item>
              )}
              {list[field].ro !== 1 && list[field].type === 'date' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field] ? moment(data[field], 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                  })(
                    <DatePicker style={{width: '100%'}} format="YYYY-MM-DD" onChange={(val)=>onChange(field,val)} />
                  )}
                </Form.Item>
              )}
              {list[field].ro !== 1 && list[field].type === 'time' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field] ? moment(data[field], 'HH:mm:ss') : moment(new Date(), 'HH:mm'),
                  })(
                    <TimePicker style={{width: '100%'}} format="HH:mm" onChange={(val)=>onChange(field,val)} />
                  )}
                </Form.Item>
              )}
              {list[field].ro !== 1 && list[field].type === 'ArrayEdit' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field] || '',
                  })(this.renderArraySelect(list[field], field))}
                </Form.Item>
              )}
              {
              list[field].ro !== 1  
              && list[field].type 
              && list[field].type !== 'text' 
              && list[field].type !== 'number' 
              && list[field].type !== 'date' 
              && list[field].type !=='time'
              && list[field].type !=='ArrayEdit' 
              && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(field, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field] || '',
                  })(this.renderEnumSelect(list[field], field))}
                </Form.Item>
              )}
            </React.Fragment>
          ))}
        </Form>
      </Col>
    );
  }
}

export default ModalForm;
