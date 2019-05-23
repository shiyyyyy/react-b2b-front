import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { AppConst } from '@/utils/const';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    autoLogin: true,
    userType:`${AppConst.USER_SUP}`
  };

  handleSubmit = (err, values) => {
    const {userType} = this.state;
    const field = {};
    if(userType === `${AppConst.USER_SUP}`){
      field.account = values.supplierAccount;
      field.password = values.supplierPassword;
    }else if(userType === `${AppConst.USER_RET}`){
      field.account = values.distributorAccount;
      field.password = values.distributorPassword;
    }else{
      field.account = values.account;
      field.password = values.password;
    }

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...field,
          userType
        },
      });
    }
  };

  onTabChange = (type) =>{
    this.setState({
      userType:type
    })
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { userType, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={userType}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key={`${AppConst.USER_SUP}`} tab="供应商登录">
            {login.status === 'error' &&
              login.type === AppConst.USER_SUP &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-credentials' })
              )}
            <UserName
              name="supplierAccount"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="supplierPassword"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() =>
                this.loginForm.validateFields(
                  ['supplierAccount', 'supplierPassword'],
                  this.handleSubmit
                )
              }
            />
          </Tab>
          <Tab key={`${AppConst.USER_RET}`} tab="分销商登录">
            {login.status === 'error' &&
              login.type === AppConst.USER_RET &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-credentials' })
              )}
            <UserName
              name="distributorAccount"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="distributorPassword"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() =>
                this.loginForm.validateFields(
                  ['distributorAccount', 'distributorPassword'],
                  this.handleSubmit
                )
              }
            />
          </Tab>
          <Tab key={`${AppConst.USER_EMP}`} tab="管理员登陆">
            {login.status === 'error' &&
              login.type === AppConst.USER_EMP &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            <UserName
              name="account"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(['account','password'], this.handleSubmit)}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <Link
              className={styles.login}
              style={{ float: 'right' }}
              to={{ pathname: '/User/Register', state: { userType } }}
            >
              <FormattedMessage id="app.login.reset-password" />
            </Link>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
