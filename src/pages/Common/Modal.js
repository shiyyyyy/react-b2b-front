import React, { PureComponent } from 'react';
import { Col,Form } from 'antd';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import { submit } from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
@Form.create()
class CommModal extends PureComponent {
  submit = () => {
    const { action = '', modal, afterOk,form,data} = this.props;
    const rst = {...data,...form.getFieldsValue()};
    submit(action, rst).then(
      () => {
        modal.destroy();
        if (afterOk) {
          afterOk();
        }
      }
    );
  };

  cancel = () => {
    const { modal ,afterCancel} = this.props;
    modal.destroy();
    if(afterCancel){
      afterCancel();
    }
  };

  render() {
    const { config = {}, data = {} } = this.props;
    const { form } = this.props;
    return (
      <Col>
        <Col>
          <ModalForm config={config} data={data} change={this.onFormChange} form={form} />
        </Col>
        <Col>
          <ModalFormBtn
            submit={values => {
              this.submit(values);
            }}
            cancel={() => {
              this.cancel();
            }}
          />
        </Col>
      </Col>
    );
  }
}

export default CommModal;
