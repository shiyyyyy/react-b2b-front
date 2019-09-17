import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActionPageHoc from '@/components/ActionPageHoc';

import { renderButton } from '@/utils/utils';

import Detail from './detail';

@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class PackageTour extends React.Component {
  constructor(props) {
    super(props);
    this.pdfCt = '';
    this.canvas = '';
    this.actionMap = {...props.actionMap};
  }

  render() {
    const { location, actions } = this.props;
    const { data } = this.state;

    const { action } = location.state;
    const config = actions[action];
    return (
      <PageHeaderWrapper headerPage={renderButton(config, this.actionMap)}>
        <Detail data={data} />
      </PageHeaderWrapper>
    );
  }
}

export default PackageTour;
