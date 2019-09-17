import React, { PureComponent } from 'react';
import { Col ,Form} from 'antd';
import moment from 'moment';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import {submit} from '@/utils/utils';

/* eslint react/no-multi-comp:0 */
@Form.create()
class Zw extends PureComponent {
  ok = () => {
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

  onFieldChange = (field,val) =>{
     const {form} = this.props;
     const rst = {...form.getFieldsValue()};
     rst.timer_end_date = moment().add(val,'hours').format("YYYY-MM-DD HH:mm:ss");
     form.setFieldsValue({
        ...rst
      })
  }



  render() {
    const { config = {}, data = {} } = this.props;
    const {form} = this.props;
    return (
      <Col>
        <Col>
          <ModalForm config={config} data={data} form={form} onChange={this.onFieldChange} />
        </Col>
        <Col>
          <ModalFormBtn
            submit={() => {
              this.ok();
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

export default Zw;
