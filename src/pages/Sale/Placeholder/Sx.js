import React, { PureComponent } from 'react';
import { Col ,Form,Select,Input} from 'antd';
import moment from 'moment';
import ModalFormBtn from '@/components/ModalFormBtn';

import {submit,readAction} from '@/utils/utils';
import getEnum from '@/utils/enum';

import styles from './Sx.less';

const {Option} = Select;
/* eslint react/no-multi-comp:0 */
@Form.create()
class Sx extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        data:{},
        loading:true
      };
    }
  
  componentDidMount() {
    const { action,config={},data:ref } = this.props;
    if(config.read){
      readAction(action,ref).then(res=>{
        this.setState({data:res.data||{},loading:false})
      });
    }
  }

  ok = () => {
    const { action='', modal, afterOk } = this.props;
    const {form} = this.props;
    const {data} = this.state;
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

  onChangeHour = (val) =>{
     const {form} = this.props;
     const rst = {...form.getFieldsValue()};
     rst.timer_end_date = moment().add(val,'hours').format("YYYY-MM-DD HH:mm:ss");
     
     form.setFieldsValue({
        ...rst
      })
  }

  render() {
    const {
        form: { getFieldDecorator }
      } = this.props;
    const {data,loading} = this.state;
    return (
      <React.Fragment>
        {
          !loading && 
          <Col>
            <Col style={{ margin: '12px 0' }}>
              <Col>
                <Col span={8}>
                  提交时间
                </Col>
                <Col span={13}>
                  时限
                </Col>
                <Col span={3}>
                  到期时间
                </Col>
              </Col>
              {
                data['占位时限日志'].map((item,index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={`${item.id}index${index}`}>
                    <Col span={8}>
                      {item.create_at}
                    </Col>
                    <Col span={13}>
                      {item.hour}
                    </Col>
                    <Col span={3}>
                      {item.timer_end_date}
                    </Col>
                  </Col>
                ))
              }
            </Col>
            <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
              <Form.Item label='设定时限' style={{ margin: '12px 0' }}>
                {getFieldDecorator('hour', {
                    rules: [
                    {
                        required: true,
                        message: `请输入设定时限 !`,
                    },
                    ],
                    initialValue: data.hour || '',
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    onChange={(val)=>this.onChangeHour(val)}
                  >
                    {Object.keys(getEnum('Hour')).map(key => (
                      <Option key={key} value={key}>
                        {getEnum('Hour')[key]}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label='到期时间' style={{ margin: '12px 0' }}>
                {getFieldDecorator('timer_end_date', {
                    rules: [
                    {
                        required: true,
                        message: `请输入设定时限 !`,
                    },
                    ],
                    initialValue: data.timer_end_date || '',
                })(
                  <Input readOnly />
                )}
              </Form.Item>
            </Form>
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
        }
      </React.Fragment>
    );
  }
}

export default Sx;
