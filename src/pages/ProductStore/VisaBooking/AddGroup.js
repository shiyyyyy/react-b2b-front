import React from 'react';
import { connect } from 'dva';


import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableGroup from '@/components/Table/ActionPageTableGroup';
import ActionPageHoc from '@/components/ActionPageHoc';

import {blocksPageStateInit,renderButton} from '@/utils/utils';

import ModalRender from '@/components/ModalRender';
import RowModal from '@/components/Table/RowModal';

/* eslint react/no-multi-comp:0 */
@connect(({ meta: { actions,blocks } }) => ({
  actions,
  blocks
}))
@ActionPageHoc
class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    const {location,actions,blocks} = props;
    const {action} = location.state;
    const cfg = actions[action];

    this.state = blocksPageStateInit(cfg.block || [],blocks);
    this.state.groupModalOpen = false;

    this.actionMap = {...props.actionMap};
    this.actionMap['批量填充团期'] = this.batchFillGroup.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
  }

  onCellChange(value,tableKey,rowIndex,dataIndex){
    const {data} = this.state;
    data[tableKey][rowIndex][dataIndex] = value;
    this.setState({data});
  }

  batchFillGroup = (config, storeId) => {
      const {selectedRowKeys,data} = this.state;
      if(selectedRowKeys[storeId].length === 0){
          return;
      }
      const afterFill = row  => {
          let index = -1;
          selectedRowKeys[storeId].forEach((hashKey)=>{
            index = data[storeId].findIndex((value)=>value.hashKey===hashKey);
            data[storeId][index] = {...data[storeId][index],...row};
          })
          this.setState({data});
      };
      ModalRender({}, { view: RowModal, text: '批量添加', ...config }, {}, afterFill);
  };
      
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
          ro={config.ro}
          dataSource={data}
          actionMap={this.actionMap}
          rowSelection={rowSelection}
          onCellChange={this.onCellChange}
        />
      </PageHeaderWrapper>
    );
  }
}

export default AddGroup;
