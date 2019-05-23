import React, { PureComponent } from 'react';
import ModalForm from '@/components/ModalForm';
import {submit} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */

class DepartmentEdit extends PureComponent {
  submit = values => {
    const { action='', modal, reload } = this.props;
    submit(action, values).then(
      () => {
        modal.destroy();
        if(reload){
          reload();
        }
      },
      () => {
        modal.destroy();
        if(reload){
          reload();
        }
      }
    );
  };

  cancel = () => {
    const { modal } = this.props;
    modal.destroy();
  };

  render() {
    const { config = {}, data = {} } = this.props;
    return (
      <ModalForm
        config={config}
        data={data}
        submit={values => {
          this.submit(values);
        }}
        cancel={() => {
          this.cancel();
        }}
      />
    );
  }
}

export default DepartmentEdit;
