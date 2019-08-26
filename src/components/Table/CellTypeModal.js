import React, { PureComponent } from 'react';
import { Col, Form } from 'antd';
import moment from 'moment';
import CellModalForm from '@/components/ModalForm/CellModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
/* eslint react/no-multi-comp:0 */

@Form.create()
class CellTypeModal extends PureComponent {
  submit = () => {
    const { modal, afterOk, form, config = {}, data = {} } = this.props;
    const formData = form.getFieldsValue();
    const { list } = config
    Object.keys(list).forEach( item => {
      if(list[item].type === 'date'){
        formData[item] = moment(formData[item]).format('YYYY-MM-DD')
      }
      if(list[item].type === 'time'){
        formData[item] = moment(formData[item]).format('HH:mm:ss')
      }
    })
    const params = {
      ...data,
      ...formData
    }
    form.validateFields((err, values) => {
      if(err) return false
      modal.destroy();
      if (afterOk) {
        afterOk(params);
      }
    });
  };

  cancel = () => {
    const { modal, afterCancel } = this.props;
    modal.destroy();
    if (afterCancel) {
      afterCancel();
    }
  };

  render() {
    const { config = {}, data = {}, form } = this.props;
    return (
      <Col>
        <Col>
          <CellModalForm config={config} data={data} form={form} />
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

export default CellTypeModal;
