import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress, Tabs } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const clsStyle = {
  border: 'none'
}

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    type: '供应商注册',
    typeArr: {
      供应商注册: ['supplierPassword', 'supplierConfirm', 'supplierMobile', 'supplierCaptcha'],
      分销商注册: [
        'distributorPassword',
        'distributorConfirm',
        'distributorMobile',
        'distributorCaptcha',
      ],
    },
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    if (register.status === 'ok') {
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const password = this.curPassword();
    const value = form.getFieldValue(password);
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { type, typeArr } = this.state;
    const curArr = typeArr[type];
    console.log(this);
    form.validateFields(curArr, { force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
            type,
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    const password = this.curPassword();
    if (value && value !== form.getFieldValue(password)) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    // debugger
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  changeTabs = key => {
    this.setState({ type: key });
  };

  curPassword() {
    const { type } = this.state;
    let password;
    switch (type) {
      case '供应商注册':
        password = 'supplierPassword';
        break;
      case '分销商注册':
        password = 'distributorPassword';
        break;
      default:
        password = 'supplierPassword';
        break;
    }
    return password;
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const password = this.curPassword();
    const value = form.getFieldValue(password);
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  visiblePopover = () => {
    this.setState({visible: false})
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible, type } = this.state;
    return (
      <div className={styles.main}>
        {/* <h3>
          <FormattedMessage id="app.register.register" />
        </h3> */}
        <Tabs
          defaultActiveKey={type}
          animated={false}
          onChange={this.changeTabs}
          tabBarStyle={clsStyle}
        >
          <TabPane tab="供应商注册" key="供应商注册">
            <Form onSubmit={this.handleSubmit}>
              <FormItem help={help}>
                <Popover
                  getPopupContainer={node => node.parentNode}
                  content={
                    <div style={{ padding: '4px 0' }}>
                      {passwordStatusMap[this.getPasswordStatus()]}
                      {this.renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        <FormattedMessage id="validation.password.strength.msg" />
                      </div>
                    </div>
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={visible}
                >
                  {getFieldDecorator('supplierPassword', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder={formatMessage({ id: 'form.password.placeholder' })}
                      onBlur={this.visiblePopover}
                    />
                  )}
                </Popover>
              </FormItem>
              <FormItem>
                {getFieldDecorator('supplierConfirm', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.confirm-password.required' }),
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                  />
                )}
              </FormItem>
              <FormItem>
                <InputGroup compact>
                  <Select
                    size="large"
                    value={prefix}
                    onChange={this.changePrefix}
                    style={{ width: '20%' }}
                  >
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                  </Select>
                  {getFieldDecorator('supplierMobile', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'validation.phone-number.required' }),
                      },
                      {
                        pattern: /^\d{11}$/,
                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      style={{ width: '80%' }}
                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                    />
                  )}
                </InputGroup>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('supplierCaptcha', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage({
                            id: 'validation.verification-code.required',
                          }),
                        },
                      ],
                    })(
                      <Input
                        size="large"
                        placeholder={formatMessage({
                          id: 'form.verification-code.placeholder',
                        })}
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      size="large"
                      disabled={count}
                      className={styles.getCaptcha}
                      onClick={this.onGetCaptcha}
                    >
                      {count
                        ? `${count} s`
                        : formatMessage({ id: 'app.register.get-verification-code' })}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  <FormattedMessage id="app.register.register" />
                </Button>
                <Link className={styles.login} to="/User/Login">
                  <FormattedMessage id="app.register.sign-in" />
                </Link>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="分销商注册" key="分销商注册">
            <Form onSubmit={this.handleSubmit}>
              {/* <FormItem>
                {getFieldDecorator('distributorMail', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.email.required' }),
                    },
                    {
                      type: 'email',
                      message: formatMessage({ id: 'validation.email.wrong-format' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'form.email.placeholder' })}
                  />
                )}
              </FormItem> */}
              <FormItem help={help}>
                <Popover
                  getPopupContainer={node => node.parentNode}
                  content={
                    <div style={{ padding: '4px 0' }}>
                      {passwordStatusMap[this.getPasswordStatus()]}
                      {this.renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        <FormattedMessage id="validation.password.strength.msg" />
                      </div>
                    </div>
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={visible}
                >
                  {getFieldDecorator('distributorPassword', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder={formatMessage({ id: 'form.password.placeholder' })}
                      onBlur={this.visiblePopover}
                    />
                  )}
                </Popover>
              </FormItem>
              <FormItem>
                {getFieldDecorator('distributorConfirm', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.confirm-password.required' }),
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                  />
                )}
              </FormItem>
              <FormItem>
                <InputGroup compact>
                  <Select
                    size="large"
                    value={prefix}
                    onChange={this.changePrefix}
                    style={{ width: '20%' }}
                  >
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                  </Select>
                  {getFieldDecorator('distributorMobile', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'validation.phone-number.required' }),
                      },
                      {
                        pattern: /^\d{11}$/,
                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      style={{ width: '80%' }}
                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                    />
                  )}
                </InputGroup>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('distributorCaptcha', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage({
                            id: 'validation.verification-code.required',
                          }),
                        },
                      ],
                    })(
                      <Input
                        size="large"
                        placeholder={formatMessage({
                          id: 'form.verification-code.placeholder',
                        })}
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      size="large"
                      disabled={count}
                      className={styles.getCaptcha}
                      onClick={this.onGetCaptcha}
                    >
                      {count
                        ? `${count} s`
                        : formatMessage({ id: 'app.register.get-verification-code' })}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  <FormattedMessage id="app.register.register" />
                </Button>
                <Link className={styles.login} to="/User/Login">
                  <FormattedMessage id="app.register.sign-in" />
                </Link>
              </FormItem>
            </Form>
          </TabPane>
          {/* <TabPane tab="Tab 3" key="3">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('mail', {
                  rules: [
                    {
                      type: 'email',
                      message: formatMessage({ id: 'validation.email.wrong-format' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'form.email.placeholder' })}
                  />
                )}
              </FormItem>
              <FormItem help={help}>
                <Popover
                  getPopupContainer={node => node.parentNode}
                  content={
                    <div style={{ padding: '4px 0' }}>
                      {passwordStatusMap[this.getPasswordStatus()]}
                      {this.renderPasswordProgress()}
                      <div style={{ marginTop: 10 }}>
                        <FormattedMessage id="validation.password.strength.msg" />
                      </div>
                    </div>
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={visible}
                >
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder={formatMessage({ id: 'form.password.placeholder' })}
                      onBlur={this.visiblePopover}
                    />
                  )}
                </Popover>
              </FormItem>
              <FormItem>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                  />
                )}
              </FormItem>
              <FormItem>
                <InputGroup compact>
                  <Select
                    size="large"
                    value={prefix}
                    onChange={this.changePrefix}
                    style={{ width: '20%' }}
                  >
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                  </Select>
                  {getFieldDecorator('mobile', {
                    rules: [
                      {
                        pattern: /^\d{11}$/,
                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      style={{ width: '80%' }}
                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                    />
                  )}
                </InputGroup>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [],
                    })(
                      <Input
                        size="large"
                        placeholder={formatMessage({
                          id: 'form.verification-code.placeholder',
                        })}
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      size="large"
                      disabled={count}
                      className={styles.getCaptcha}
                      onClick={this.onGetCaptcha}
                    >
                      {count
                        ? `${count} s`
                        : formatMessage({ id: 'app.register.get-verification-code' })}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  <FormattedMessage id="app.register.register" />
                </Button>
                <Link className={styles.login} to="/User/Login">
                  <FormattedMessage id="app.register.sign-in" />
                </Link>
              </FormItem>
            </Form>
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default Register;
