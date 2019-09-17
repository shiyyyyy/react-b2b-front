import React from 'react';
import { connect } from 'dva';
import { Col } from 'antd';

import CellTypeModal from '@/components/Table/CellTypeModal';
import ProType from '@/components/ProType';

const { GroupTour } = ProType;
/* eslint react/no-multi-comp:0 */
@connect(({ meta: { actions, blocks } }) => ({
  actions,
  blocks,
}))
// @ActionPageHoc
class RealSign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    // 列表按钮
    const { actions, location } = this.props;
    const { action } = location.state;
    return (
      <Col>
        <GroupTour />
        <Col>123</Col>
        <CellTypeModal />
      </Col>
    );
  }
}

export default RealSign;
