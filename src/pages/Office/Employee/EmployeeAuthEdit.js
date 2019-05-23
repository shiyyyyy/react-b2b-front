import React, { PureComponent } from 'react';
import ModalForm from '@/components/ModalForm';
import {submit,readAction} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
class EmployeeAuthEdit extends PureComponent {
  constructor(props) {
    super(props);
    const {data:ref} = this.props;
    this.state = {
      data:{...ref},
      loading:true
    };
  }

  componentDidMount() {
    const { config={},ref={} } = this.props;
    if(config.read){
      readAction(config.key,ref).then(res=>{
        this.setState({data:res.data||[],loading:false})
      });
    }
  }

  submit = values => {
    const { config = {}, modal, reload } = this.props;
    submit(config.key, values).then(
      () => {
        modal.destroy();
        reload()
      },
      () => {
        modal.destroy();
        reload();
      }
    );
  };

  cancel = () => {
    const { modal } = this.props;
    modal.destroy();
  };

  render() {
    const { config = {}} = this.props;
    const {loading,data} = this.state;
    return (
      <React.Fragment>
        {
          !loading && 
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
        }
      </React.Fragment>
    );
  }
}

export default EmployeeAuthEdit;
