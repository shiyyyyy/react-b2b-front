import React, { PureComponent } from 'react';
import { Col ,Form} from 'antd';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import {submit} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
@Form.create()
class CompanyEdit extends PureComponent {
  submit = () => {
    const { action='', modal, afterOk ,data } = this.props;
    const {form} = this.props;
    const rst = {...data,...form.getFieldsValue()};

    submit(action, rst).then(
      () => {
        modal.destroy();
        if(afterOk){
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
    const {form} = this.props;
    return (
      <Col>
        <Col>
          <ModalForm config={config} data={data} form={form} />
        </Col>
        <Col>
          <ModalFormBtn
            submit={() => {
              this.submit();
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

export default CompanyEdit;
