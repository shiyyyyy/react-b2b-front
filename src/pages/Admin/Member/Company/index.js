import React from 'react';
import { Row, Col, Modal, Input, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';

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
          { text: '删除', id: 3, click: this.addCompany },
          { text: '查看', id: 4, click: this.editCompany },
        ],
        filter: [
          {
            active: '部门名称',
            children: ['部门名称', '部门编号', '部门简称'],
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
        visible: false,
        title: '',
        footer: '',
        width: 500,
        children: '',
      },
    };
  }

  handleSubmit = () => {
    console.log('submit');
  };

  // 新增按钮
  addCompany = () => {
    const ModalCfg = {
      visible: true,
      width: 500,
      title: '新增公司',
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

  editCompany = () => {
    const ModalCfg = {
      visible: true,
      width: 500,
      title: '修改公司',
      children: '我是修改公司',
    };
    this.setState({ ModalCfg });
  };

  // filter
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

  // Modal btn
  onCancel = () => {
    console.log('取消');
    this.setState({ ModalCfg: { visible: false } });
  };

  onOk = () => {
    console.log('OK');
    this.setState({ ModalCfg: { visible: false } });
  };

  render() {
    const { cfg, data, ModalCfg } = this.state;

    console.log(this);
    return (
      <Row>
        <Col>
          <HeaderSetting {...this.props} data={cfg}>
            <Row>
              <Col className={styles.Picture}>部门设置</Col>
              <Col>
                <Modal {...ModalCfg} onOk={this.onOk} onCancel={this.onCancel} />
              </Col>
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
