import React, { PureComponent } from 'react';
import { Form ,Col} from 'antd';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import {submit} from '@/utils/utils';
// import { Field } from '@/components/Charts';
/* eslint react/no-multi-comp:0 */

@Form.create()
class DepartmentLeaders extends PureComponent {
  submit = () => {
    const { action='', modal, afterOk ,afterCancel ,form,data} = this.props;
    let formData = {...data};
    if(data.leader_ids ){
      const leaders = JSON.parse(data.leader_ids);
      formData = {...formData,leader_ids:leaders}
    }
    const rst = {...formData,...form.getFieldsValue()};

    submit(action, rst).then(
      () => {
        modal.destroy();
        if(afterOk){
          afterOk();
        }
      },
      () => {
        modal.destroy();
        if(afterCancel){
          afterCancel();
        }
      }
    );
  };

  cancel = () => {
    const { modal,afterCancel } = this.props;
    modal.destroy();
    if(afterCancel){
      afterCancel();
    }
  };

  render() {
    const { config = {}, data = {},form } = this.props;
    let formData = {...data};
    if(data.leader_ids ){
      const leaders = JSON.parse(data.leader_ids);
      formData = {...formData,leader_ids:leaders}
    }
    return (
      <Col>
        <Col>
          <ModalForm config={config} data={formData} form={form} />
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

export default DepartmentLeaders;
