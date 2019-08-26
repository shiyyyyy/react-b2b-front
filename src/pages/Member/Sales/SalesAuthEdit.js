import React, { PureComponent } from 'react';
import {Form,Col} from 'antd';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import {submit,readAction} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
@Form.create()
class SalesAuthEdit extends PureComponent {
  constructor(props) {
    super(props);
    const {data:ref} = this.props;
    this.state = {
      data:{...ref},
      loading:true
    };
  }

  componentDidMount() {
    const { action,config={},ref={} } = this.props;
    if(config.read){
      readAction(action,ref).then(res=>{
        this.setState({data:res.data||[],loading:false})
      });
    }
  }

  submit = () => {
    const { action, modal, afterOk  } = this.props;
    const { form } = this.props;
    const {data} = this.state;

    const rst = {...data,...form.getFieldsValue()};

    submit(action,rst).then(
      () => {
        modal.destroy();
        if(afterOk){
          afterOk()
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
    const { config = {},form} = this.props;
    const {loading,data} = this.state;
    return (
      <React.Fragment>
        {
          !loading && 
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
        }
      </React.Fragment>
    );
  }
}

export default SalesAuthEdit;
