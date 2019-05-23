import React, { PureComponent } from 'react';
import { Form, Select, Input, DatePicker, Button, Row, Col } from 'antd';
import getEnum from '@/utils/enum';

import styles from './index.less';

const { Option } = Select;

@Form.create()
class ModalForm extends PureComponent {
  constructor(props) {
    super(props);

    this.onFormChange = this.onFormChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  onFormChange = (value, field) => {
    const { change } = this.props;
    if (change) {
      change(value, field);
    }
  };

  submit = e => {
    e.preventDefault();
    const { form, submit, data } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        if (submit) {
          const params = { ...data, ...values };
          submit(params);
        }
      }
    });
  };

  cancel = e => {
    e.preventDefault();
    const { cancel } = this.props;
    if (cancel) {
      cancel();
    }
  };

  renderEnumSelect = (cfg, field) => {
    const { form } = this.props;
    const data = form.getFieldsValue();
    const Enum = getEnum(cfg, data);
    return (
      <Select
        onChange={value => {
          this.onFormChange(value, field);
        }}
        showSearch
        optionFilterProp="children"
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
      data = {},
    } = this.props;

    const list = config.list || {};

    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
        <Row>
          <Col className={styles.constent}>
            {Object.keys(list).map(field => (
              <React.Fragment key={field}>
                {!list[field].type && (
                  <Form.Item label={list[field].text}>
                    {getFieldDecorator(field, {
                      rules: [
                        { required: !!list[field].rq, message: `请输入 ${list[field].text} !` },
                      ],
                      initialValue: data[field] || '',
                    })(
                      <Input
                        onChange={e => {
                          this.onFormChange(e.target.value, field);
                        }}
                      />
                    )}
                  </Form.Item>
                )}
                {list[field].type === 'Date' && (
                  <Form.Item label={list[field].text}>
                    {getFieldDecorator(field, {
                      rules: [
                        { required: !!list[field].rq, message: `请输入 ${list[field].text} !` },
                      ],
                      initialValue: data[field] || '',
                    })(
                      <DatePicker
                        onChange={value => {
                          this.onFormChange(value, field);
                        }}
                      />
                    )}
                  </Form.Item>
                )}
                {list[field].type && list[field].type !== 'Date' && (
                  <Form.Item label={list[field].text}>
                    {getFieldDecorator(field, {
                      rules: [
                        { required: !!list[field].rq, message: `请输入 ${list[field].text} !` },
                      ],
                      initialValue: data[field] || '',
                    })(this.renderEnumSelect(list[field], field))}
                  </Form.Item>
                )}
              </React.Fragment>
            ))}
          </Col>
        </Row>
        <Row>
          <Col className={styles.footerBtnBox}>
            <Form.Item key="cancel" className={styles.footerBtn}>
              <Button
                type="primary"
                onClick={e => {
                  this.cancel(e);
                }}
              >
                取消
              </Button>
            </Form.Item>
            <Form.Item key="submit" className={styles.footerBtn}>
              <Button
                type="primary"
                onClick={e => {
                  this.submit(e);
                }}
              >
                确定
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ModalForm;
