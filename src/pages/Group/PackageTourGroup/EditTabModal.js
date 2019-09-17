import React from 'react';
import { Col, Tabs, Input, InputNumber, DatePicker, Select } from 'antd';

import ModalFormBtn from '@/components/ModalFormBtn';
import { submit, readAction } from '@/utils/utils';
import styles from './index.less';

const { TabPane } = Tabs;
const { Option } = Select;

class EditTabModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      tab: 1,
    };

    this.submit = this.submit.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    const { action, config = {}, data: ref } = this.props;
    if (config.read) {
      readAction(action, ref).then(res => {
        this.setState({ data: res || [], loading: false });
      });
    }
  }

  submit = () => {
    const { action, data: ref, modal, afterOk } = this.props;
    const { tab } = this.state;
    const { data } = this.state;
    const rst = {
      ...data,
      main_group_id: ref.main_group_id,
    };
    submit(action, rst).then(() => {
      modal.destroy();
      if (afterOk) {
        afterOk();
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

  changeTab = key => {
    const tab = key
    this.setState({ tab })
  };

  inputChange = (e, type) => {
    console.log(e)
    console.log(type)
  }

  inputNumberChange = (val, type) => {
    console.log(val)
    console.log(type)
  }

  datePickerChange = (date, dateString) => {
    console.log(date)
    console.log(dateString)
  }

  selectChange = (val, option) => {
    console.log(val)
    console.log(option)
  }



  tab1 = () => {
    return(
      <Col className='clear'>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>当前数据</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modTitle}>
                <Col className={styles.modTitleText}>基准价格</Col>
              </Col>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>价格名称</Col>
                  <Col className={styles.modValue}>
                    <Input disabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>同行价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber disabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>直客价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber disabled />
                  </Col>
                </Col>
              </Col>
            </Col>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modTitle}>
                <Col className={styles.modTitleText}>其他价格</Col>
              </Col>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>价格名称</Col>
                  <Col className={styles.modValue}>
                    <Input disabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>同行价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber disabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>直客价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber disabled />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>

        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingLeft: '8px'}}>
          <Col className={styles.ModTitle}>本次修改</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modTitle}>
                <Col className={styles.modTitleText}>基准价格</Col>
              </Col>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>价格名称</Col>
                  <Col className={styles.modValue}>
                    <Input onChange={e => this.inputChange(e, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>同行价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={e => this.inputChange(e, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>直客价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={e => this.inputChange(e, '')} />
                  </Col>
                </Col>
              </Col>
            </Col>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modTitle}>
                <Col className={styles.modTitleText}>其他价格</Col>
              </Col>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>价格名称</Col>
                  <Col className={styles.modValue}>
                    <Input onChange={e => this.inputChange(e, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>同行价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={val => this.inputNumberChange(val, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>直客价</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={val => this.inputNumberChange(val, '')} />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    )
  }

  tab2 = () => {
    return(
      <Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>当前数据</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>计划总位</Col>
                  <Col className={styles.modValue}>
                    <InputNumber didabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>库存剩余</Col>
                  <Col className={styles.modValue}>
                    <InputNumber didabled />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>成团人数</Col>
                  <Col className={styles.modValue}>
                    <InputNumber didabled />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>本次修改</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>计划总位</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={val => this.inputNumberChange(val, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>库存剩余</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={val => this.inputNumberChange(val, '')} />
                  </Col>
                </Col>
                <Col span={8} className={styles.cell}>
                  <Col className={styles.modLabel}>成团人数</Col>
                  <Col className={styles.modValue}>
                    <InputNumber onChange={val => this.inputNumberChange(val, '')} />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    )
  }
  
  tab3 = () => {
    return(
      <Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>当前数据</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={12} className={styles.cell}>
                  <Col className={styles.modLabel}>出团日期</Col>
                  <Col className={styles.modValue}>
                    <DatePicker disabled />
                  </Col>
                </Col>
                <Col span={12} className={styles.cell}>
                  <Col className={styles.modLabel}>回团日期</Col>
                  <Col className={styles.modValue}>
                    <DatePicker disabled />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>本次修改</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={12} className={styles.cell}>
                  <Col className={styles.modLabel}>出团日期</Col>
                  <Col className={styles.modValue}>
                    <DatePicker onChange={(date, dateString) => this.datePickerChange(date, dateString)} />
                  </Col>
                </Col>
                <Col span={12} className={styles.cell}>
                  <Col className={styles.modLabel}>回团日期</Col>
                  <Col className={styles.modValue}>
                    <DatePicker onChange={(date, dateString) => this.datePickerChange(date, dateString)} />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    )
  }

  tab4 = () => {
    return(
      <Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>当前数据</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={24} className={styles.cell}>
                  <Col className={styles.modLabel}>出团日期</Col>
                  <Col className={styles.modValue}>
                    <Input onChange={e => this.inputChange(e, '')} />
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
        <Col sm={12} md={12} lg={12} className={styles.Mod} style={{paddingRight: '8px'}}>
          <Col className={styles.ModTitle}>本次修改</Col>
          <Col className={[styles.ModContent, 'clear'].join(' ')}>
            <Col className={[styles.mod, 'clear'].join(' ')}>
              <Col className={styles.modContent}>
                <Col span={24} className={styles.cell}>
                  <Col className={styles.modLabel}>出团日期</Col>
                  <Col className={styles.modValue}>
                    <Select
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      defaultValue={['a10', 'c12']}
                      onChange={(val, option) => this.selectChange(val, option)}
                    >
                      {['a10', 'c12', 'b14', 'd18', 'e33'].map(item => 
                        <Option key={item}>{item}</Option>  
                      )}
                    </Select>
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Col>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <Col className={styles.EditTabModal}>
        {!loading && (
          <Tabs defaultActiveKey="1" onChange={this.changeTab}>
            <TabPane tab="修改价格" key="1">
              {this.tab1()}
            </TabPane>
            <TabPane tab="修改库存" key="2">
              {this.tab2()}
            </TabPane>
            <TabPane tab="修改团期" key="3">
              {this.tab3()}
            </TabPane>
            <TabPane tab="修改团态" key="4">
              {this.tab4()}
            </TabPane>
          </Tabs>
        )}
        <ModalFormBtn
          submit={values => {
            this.submit(values);
          }}
          cancel={() => {
            this.cancel();
          }}
        />
      </Col>
    );
  }
}

export default EditTabModal;
