import React from 'react';
import { Row, Col, Button, Pagination } from 'antd';
import { connect } from 'dva';
import Breadcrumb from '@/components/Breadcrumb';
import BasicInfo from '@/components/ProModal/BasicInfo';

import styles from './Children.less';

class CostHistory extends React.Component {
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

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>&lt;Prev</a>;
    }
    if (type === 'next') {
      return <a>Next&gt;</a>;
    }
    return originalElement;
  };

  
  render() {
    const { data } = this.state;
    const { breadcrumbNameMap, location } = this.props; 
    return (
      <Row>
        <Col className={styles.Children}>
          <Col className={[styles.header, 'clear'].join(' ')}>
            <Col xs={24} sm={12} md={12} lg={12} className={styles.bread}>
              <Breadcrumb breadcrumbNameMap={breadcrumbNameMap} location={location} />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} className={[styles.page]}>
              <Pagination
                size="small"
                itemRender={this.itemRender}
                total={500}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
              />
            </Col>
          </Col>
          <Col className={styles.content}>
            <BasicInfo />
          </Col>
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
}))(CostHistory);
