import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';

import styles from './index.less';

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      cfg: {
        btns: [
          { text: '新增', id: 1, click: this.btt },
          { text: '修改', id: 2, click: this.btt },
          { text: '删除', id: 3, click: this.btt },
          { text: '启停', id: 4, click: this.btt },
          { text: '查看', id: 5 },
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
    };
  }

  changeFilter = val => {
    console.log(val);
  };

  clickSearch(e) {
    console.log(e);
  }

  changeSearch(val) {
    console.log(val);
  }

  btt(value) {
    console.log(value);
  }

  // refresh 刷新按钮
  refresh = () => {
    console.log('刷新');
  }

  // reset 重置按钮
  reset = () => {
    console.log('重置');
  }

  render() {
    const { cfg, data } = this.state;

    console.log(this);
    return (
      <Row>
        <Col>
          <HeaderSetting {...this.props} data={cfg}>
            <Row>
              <Col className={styles.Picture}>
                部门设置
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
}))(Department);
