import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import Breadcrumb from '@/components/Breadcrumb';
import BasicInfo from '@/components/ProModal/BasicInfo';

import styles from './index.less';

class ListHistory extends React.Component {
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
    };
  }


  render() {
    const { data } = this.state;
    return (
      <Row>
        <Col>
          123
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
}))(ListHistory);
