import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableGroup from '@/components/Table/ActionPageTableGroup';

import ActionPageHoc from '@/components/ActionPageHoc';

import {blocksPageStateInit,renderButton} from '@/utils/utils';

/* eslint react/no-multi-comp:0 */
@connect(({ meta: { actions,blocks } }) => ({
  actions,
  blocks
}))
@ActionPageHoc
class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.actionMap = {...props.actionMap};

    const {location,actions,blocks} = props;
    const {action} = location.state;
    const cfg = actions[action];
    this.state = blocksPageStateInit(cfg.block || [],blocks);
    this.onCellChange = this.onCellChange.bind(this);
  }

  onCellChange(value,tableKey,rowIndex,dataIndex){
    const {data} = this.state;
    data[tableKey][rowIndex][dataIndex] = value;
    this.setState({data});
  }

  render() {
    // 列表按钮
    const {data,selectedRowKeys} = this.state;
    const {actions,blocks,location,rowSelChange} = this.props;
    const { action } = location.state;
    const config = actions[action];
    const rowSelection = {
      selectedRowKeys,
      onChange:rowSelChange
    }
    return (
      <PageHeaderWrapper headerPage={renderButton(config, this.actionMap)}>

        <TableGroup
          blocks={blocks}
          config={config.block}
          dataSource={data}
          actionMap={this.actionMap}
          ro={config.ro}
          onCellChange={this.onCellChange}
          rowSelection={rowSelection}
        />

      </PageHeaderWrapper>
    );
  }
}

export default Blocks;
