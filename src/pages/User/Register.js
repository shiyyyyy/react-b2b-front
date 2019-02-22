import React , { Component } from 'react';
import { connect } from 'dva';
import { Form ,Input ,Button ,Progress ,Select, Row, Col, Popover} from 'antd';
import styles from './Register.less';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
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

//注入 model
@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component{
    state = {
        count :0,
        visible:false,
        help:'',
        prefix: '86',
        confirmDirty: false,
    };

    componentDidMount() {
      const { register } = this.props;
      if(register.status){
        router.push({
          pathname:'/dashboard/analysis'
        })
      }
    }

    componentDidUpdate(){
        const { form ,  register} = this.props ;
        const fullName = form.getFieldValue('full_name');
        if(register.status === 'ok'){
            router.push({
                pathname:'/user/register-result',
                state: {
                  fullName,
                },
            })
        }
    }

    componentWillUnmount(){
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

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields({ force: true }, (err, values) => {
          if (!err) {
            const { prefix } = this.state;
            dispatch({
              type: 'register/submit',
              payload: {
                ...values,
                prefix,
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

    render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('full_name', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.full-name.required' }),
                }
              ],
            })(
              <Input size="large" placeholder={formatMessage({ id: 'form.full-name.placeholder' })} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('short_name', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.short-name.required' }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'form.short-name.placeholder' })}
              />
            )}
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
      </div>
    );
  }
}
export default Register;