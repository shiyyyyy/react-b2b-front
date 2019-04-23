import React from 'react';
import { Row, Col, Button, Modal, Input, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';
import ModalRender from '@/components/Modal';

import styles from './index.less';

const { Option } = Select;

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      cfg: {
        btns: [
          { text: '新增', id: 1, click: this.addCompany },
          { text: '修改', id: 2, click: this.editCompany },
          { text: '删除', id: 3, click: this.btt },
          { text: '启停', id: 4, click: this.btt },
          { text: '设置领导', id: 5 },
        ],
        filter: [
          {
            active: '公司名称',
            children: ['公司名称', '公司编号', '公司简称'],
            change: this.changeFilter,
          },
        ],
        search: {
          active: '你好啊',
          children: ['我很好', '我还好', '你好啊'],
          change: this.changeSearch,
          click: this.clickSearch,
          refresh: this.refresh,
          reset: this.reset,
        },
      },
      ModalCfg: {
        title: '提示',
        footer: '',
        visible: false,
        width: 300,
      },
    };
  }

  // 新增员工
  addCompany = () => {
    const ModalCfg = {
      visible: true,
      title: <Col className="text-center">新增员工</Col>,
      // footer: <Col className="text-center" style={{padding: '12px 0'}}><Button type="primary" style={{padding: '0 24px'}}>确定保存</Button></Col>,
      width: 500,
      children: (
        <Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              公司名称
            </Col>
            <Col span={18}>
              <Select style={{ width: '100%' }}>
                <Option value="1">北青旅</Option>
                <Option value="2">兰州拉面</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              部门名称
            </Col>
            <Col span={18}>
              <Select defaultValue="2" style={{ width: '100%' }}>
                <Option value="1">北青旅</Option>
                <Option value="2">兰州拉面</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工姓名
            </Col>
            <Col span={18}>
              <Input placeholder="请填写员工姓名" />
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工性别
            </Col>
            <Col span={18}>
              <Select defaultValue="1" style={{ width: '100%' }}>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工生日
            </Col>
            <Col span={18}>
              <DatePicker style={{ width: '100%' }} onChange={this.onChange} />
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工姓名
            </Col>
            <Col span={18}>
              <Input placeholder="请填写员工姓名" type="number" />
            </Col>
          </Col>
        </Col>
      ),
    };
    this.setState({ ModalCfg });
  };

  // 修改员工
  editCompany = () => {
    const ModalCfg = {
      visible: true,
      title: <Col className="text-center">修改员工</Col>,
      // footer: <Col className="text-center" style={{padding: '12px 0'}}><Button type="primary" style={{padding: '0 24px'}}>确定保存</Button></Col>,
      width: 500,
      children: (
        <Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              公司名称
            </Col>
            <Col span={18}>
              <Select defaultValue="2" style={{ width: '100%' }}>
                <Option value="1">北青旅</Option>
                <Option value="2">兰州拉面</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              部门名称
            </Col>
            <Col span={18}>
              <Select defaultValue="2" style={{ width: '100%' }}>
                <Option value="1">北青旅</Option>
                <Option value="2">兰州拉面</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工姓名
            </Col>
            <Col span={18}>
              <Input placeholder="请填写员工姓名" />
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工性别
            </Col>
            <Col span={18}>
              <Select defaultValue="1" style={{ width: '100%' }}>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工生日
            </Col>
            <Col span={18}>
              <DatePicker style={{ width: '100%' }} onChange={this.onChange} />
            </Col>
          </Col>
          <Col className={[styles.FormItem, 'clear'].join(' ')}>
            <Col span={5} className={styles.lable}>
              员工姓名
            </Col>
            <Col span={18}>
              <Input placeholder="请填写员工姓名" type="number" />
            </Col>
          </Col>
        </Col>
      ),
    };
    this.setState({ ModalCfg });
  };

  changeFilter = val => {
    console.log(val);
  };

  clickSearch(e) {
    console.log(e);
  }

  changeSearch(val) {
    console.log(val);
  }

  // refresh 刷新按钮
  refresh = () => {
    console.log('刷新');
  };

  // reset 重置按钮
  reset = () => {
    console.log('重置');
  };

  // modal 表单
  change = (momentDate, date) => {
    console.log(date);
  };

  // modal 确认和关闭
  onCancel = () => {
    console.log('关闭');
    this.setState({ ModalCfg: { visible: false } });
  };

  onOk = () => {
    console.log('OK');
    this.setState({ ModalCfg: { visible: false } });
  };

  render() {
    const { cfg, data, ModalCfg } = this.state;

    return (
      <Row>
        <Col>
          <HeaderSetting {...this.props} data={cfg}>
            <Row>
              <Col className={styles.Picture}>公司设置</Col>
              <Col className={styles.Modal}>
                {/* <Modal
                  title={<Col className="text-center">新增员工</Col>}
                  footer={<Col className="text-center" style={{padding: '12px 0'}}><Button type="primary" style={{padding: '0 24px'}}>确定保存</Button></Col>}
                  visible={this.state.visible}
                  onOk={e => console.log('OK')}
                  onCancel={e => this.setState({ visible: false })}
                >
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      公司名称
                    </Col>
                    <Col span={18}>
                      <Select defaultValue="2" style={{ width: '100%' }}>
                        <Option value="1">北青旅</Option>
                        <Option value="2">兰州拉面</Option>
                      </Select>
                    </Col>
                  </Col>
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      部门名称
                    </Col>
                    <Col span={18}>
                      <Select defaultValue="2" style={{ width: '100%' }}>
                        <Option value="1">北青旅</Option>
                        <Option value="2">兰州拉面</Option>
                      </Select>
                    </Col>
                  </Col>
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      员工姓名
                    </Col>
                    <Col span={18}>
                      <Input placeholder="请填写员工姓名" />
                    </Col>
                  </Col>
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      员工性别
                    </Col>
                    <Col span={18}>
                      <Select defaultValue="1" style={{ width: '100%' }}>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>
                    </Col>
                  </Col>
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      员工生日
                    </Col>
                    <Col span={18}>
                      <DatePicker style={{ width: '100%' }} onChange={this.onChange} />
                    </Col>
                  </Col>
                  <Col className={[styles.FormItem, 'clear'].join(' ')}>
                    <Col span={5} className={styles.lable}>
                      员工姓名
                    </Col>
                    <Col span={18}>
                      <Input placeholder="请填写员工姓名" type="number" />
                    </Col>
                  </Col>
                </Modal> */}
              </Col>
              <ModalRender {...ModalCfg} onCancel={this.onCancel} onOk={this.onOk} />
            </Row>
          </HeaderSetting>
        </Col>
      </Row>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(Company);
