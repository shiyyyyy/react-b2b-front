import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';
import OrderList from '@/components/OrderList';
import BasicInfo from '@/components/ProModal/BasicInfo';

import styles from './index.less';

const { GroupTour, Traffic, Visa } = OrderList;

class Reconcile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
      headerCfg: {
        btns: [
          { text: '部门管理', id: 1, click: this.departmentManage },
          { text: '新增员工', id: 2, click: this.addEmp },
        ],
        filter: [
          {
            active: '所属部门',
            children: ['所属部门', '所属中心'],
            change: this.changeFilter,
          },
        ],
        search: {
          active: '员工姓名',
          children: ['员工姓名', '员工ID', '员工性别'],
          change: this.changeSearch,
          click: this.clickSearch,
          refresh: this.refresh,
          reset: this.reset,
        },
      },
    };
  }

  // list裂变按钮
  btnChildren = item => {
    if (item) {
      return (
        <Col>
          <Button size="small" className="m-r-8 m-t-4" onClick={_ => console.log(item)}>
            留位
          </Button>
          <Button size="small" className="m-r-8 m-t-4" onClick={_ => console.log(this)}>
            时限
          </Button>
        </Col>
      );
    }
  };

  // 部门管理按钮
  departmentManage = e => {
    console.log(this);
  };

  // 新增员工按钮
  addEmp = e => {
    console.log(this);
  };

  // filter更改
  changeFilter = val => {
    console.log(val);
  };

  // 点击搜索按钮
  clickSearch = e => {
    console.log(e);
  };

  // 更改searchSelect
  changeSearch = val => {
    console.log(val);
  };

  // refresh 刷新按钮
  refresh = () => {
    console.log('刷新');
  };

  // reset 重置按钮
  reset = () => {
    console.log('重置');
  };

  render() {
    const { headerCfg, data } = this.state;
    console.log(BasicInfo);
    return (
      <Row>
        <Col>
          <HeaderSetting {...this.props} data={headerCfg}>
            <Row>
              <Col className={styles.Picture}>
                {data.map((item, index) => {
                  return index % 3 == 1 ? (
                    <GroupTour key={item.id} item={item} btnChildren={this.btnChildren}>
                      <Col onClick={e => e.stopPropagation()}>
                        <BasicInfo item={item} />
                        <BasicInfo item={item} historyBtn={1} />
                        <BasicInfo item={item} />
                      </Col>
                    </GroupTour>
                  ) : index % 3 == 2 ? (
                    <Traffic key={item.id} item={item} btnChildren={this.btnChildren} />
                  ) : (
                        <Visa key={item.id} item={item} btnChildren={this.btnChildren} />
                      );
                })}
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
}))(Reconcile);
