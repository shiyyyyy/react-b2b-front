import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';
import ProType from '@/components/ProType';
import ProModal from '@/components/ProModal';

const { GroupTour, Traffic, Visa } = ProType;
const { GroupTourActive, TrafficActive, VisaActive } = ProModal;

class Hot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cfg: {
        btns: [{ text: '添加', id: 1, icon: 'plus', click: this.addPro }],
        filter: [
          {
            active: '产品类型',
            children: ['产品类型', '产品团期'],
            change: this.changeFilter,
          },
        ],
        search: {
          active: '产品团期',
          children: ['产品团期', '出发日期', '产品类型'],
          change: this.changeSearch,
          click: this.clickSearch,
          refresh: this.refresh,
          reset: this.reset,
        },
      },
      arr: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }],
    };
  }

  // 新增员工按钮
  addPro = e => {
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
    console.log(this)
  };

  render() {
    const { props } = this;
    const { cfg, arr } = this.state;
    return (
      <Row>
        <Col>
          <HeaderSetting {...props} data={cfg}>
            {arr.map((item, index) => {
              return index % 3 === 0 ? (
                <GroupTour key={item.id}>
                  <GroupTourActive />
                </GroupTour>
              ) : index % 3 === 1 ? (
                <Traffic key={item.id}>
                  <TrafficActive />
                </Traffic>
              ) : (
                <Visa key={item.id}>
                  <VisaActive/>
                </Visa>
              );
            })}
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
}))(Hot);
