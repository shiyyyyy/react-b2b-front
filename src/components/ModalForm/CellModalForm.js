import React, { PureComponent } from 'react';
import { Form, Select, Input, DatePicker, TimePicker, Col,InputNumber } from 'antd';
import moment from 'moment';
import getEnum from '@/utils/enum';


import styles from './index.less';

const { Option } = Select;

class CellModalForm extends PureComponent {
  renderArraySelect = (cfg) => {
    const { form } = this.props;
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
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={Enum[key]}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  renderEnumSelect = (cfg) => {
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
    } = this.props;
    let { data = {} } = this.props;
    data = data ? data : {}
    const list = config.list || {};
    return (
      <Col className={styles.ModalForm}>
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
          {Object.keys(list).map(field => (
            <React.Fragment key={field}>
              {(!data[field].type || data[field].type === 'text') && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text || '',
                  })(
                    <Input />
                  )}
                </Form.Item>
              )}
              {data[field].type === 'number' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text,
                  })(
                    <InputNumber style={{width: '100%'}}/>
                  )}
                </Form.Item>
              )}
              {data[field].type === 'date' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text ? moment(data[field].text, 'YYYY-MM-DD') : moment(new Date(), 'YYYY-MM-DD'),
                  })(
                    <DatePicker style={{width: '100%'}} format="YYYY-MM-DD" />
                  )}
                </Form.Item>
              )}
              {data[field].type === 'time' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text ? moment(data[field].text, 'HH:mm:ss') : moment(new Date(), 'HH:mm'),
                  })(
                    <TimePicker style={{width: '100%'}} format="HH:mm" />
                  )}
                </Form.Item>
              )}
              {data[field].type === 'ArrayEdit' && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text || '',
                  })(this.renderArraySelect(list[field], field))}
                </Form.Item>
              )}
              {data[field].type 
              && data[field].type !== 'text' 
              && data[field].type !== 'number' 
              && data[field].type !== 'date' 
              && data[field].type !=='time' 
              && data[field].type !=='ArrayEdit' 
              && (
                <Form.Item label={list[field].text} style={{ margin: '12px 0' }}>
                  {getFieldDecorator(data[field].text, {
                    rules: [
                      {
                        required: list[field].rq ===1,
                        message: `请输入 ${list[field].text} !`,
                      },
                    ],
                    initialValue: data[field].text || '',
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

export default CellModalForm;
