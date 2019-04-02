import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';


class Hot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {

      }
    }
  }

  render() {
    const { props } = this;
    const { data } = this.state;
    return (
      <Row>
        <Col>
          <HeaderSetting {...props} data={data}>
            热卖推介
          </HeaderSetting>
        </Col>
      </Row>
    )
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(Hot);