import React from 'react';
import { connect } from 'dva';


import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableGroup from '@/components/Table/ActionPageTableGroup';
import ActionPageHoc from '@/components/ActionPageHoc';
import BlocksModal from '@/components/BlocksModal';

import CalendarUtil from '../CalendarUtil';

import ModalRender from '@/components/ModalRender';
import {blocksPageStateInit,renderButton} from '@/utils/utils';

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
    this.actionMap['批量新增团期'] = this.batchAddGroup.bind(this);
    this.actionMap['批量填充团期'] = this.batchFillGroup.bind(this);
    this.actionMap['更多团期价格'] = this.editPrice.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.addGroupDone = this.addGroupDone.bind(this);
    this.fillDone = this.fillDone.bind(this);
    this.editPriceDone = this.editPriceDone.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
  }

  closeModal(){
    this.setState({groupModalOpen:false});
  }

  batchAddGroup(){
    this.setState({groupModalOpen:true});
  }

  addGroupDone(dateArr){
    const {data} = this.state;
    dateArr.forEach((date)=>{
      data['大交通开团团期详情'].push({dep_date:date});
    })
    this.setState({data});
    this.closeModal();
  }

  batchFillGroup(){
    const {selectedRowKeys} = this.state;
    if(selectedRowKeys['大交通开团团期详情'].length === 0){
      return;
    }

    const {blocks} = this.props;
    const config = {};
    const data = {};
    ['团期库存信息','团期基准价格','团期其他价格'].forEach((key)=>{
      config[key] = blocks[key];
      data[key] = data[key] || [{}];
    })
    ModalRender('批量填充团期',{ view: BlocksModal, text: '批量填充', blocks:config },data,this.fillDone);
  }

  fillDone(rst){
    const {selectedRowKeys,data} = this.state;
    let index = -1;
    selectedRowKeys['大交通开团团期详情'].forEach((hashKey)=>{
      index = data['大交通开团团期详情'].findIndex((value)=>value.hashKey===hashKey);

      data['大交通开团团期详情'][index].gp_total = rst['团期库存信息'][0].gp_total || 0;
      data['大交通开团团期详情'][index].stock = rst['团期库存信息'][0].stock || 0;
      data['大交通开团团期详情'][index].person_limit = rst['团期库存信息'][0].person_limit || 0;

      data['大交通开团团期详情'][index].peer_price = rst['团期基准价格'][0].peer_price || 0;
      data['大交通开团团期详情'][index].retail_price = rst['团期基准价格'][0].retail_price || 0;
      data['大交通开团团期详情'][index].price_comment = rst['团期基准价格'][0].price_comment || 0;

      data['大交通开团团期详情'][index]['团期其他价格'] = [...rst['团期其他价格']];
    })
    this.setState({data});
  }

  editPrice(){
    const {selectedRowKeys} = this.state;
    if(selectedRowKeys['大交通开团团期详情'].length === 0){
      return;
    }

    const {blocks} = this.props;
    const config = {};
    const data = {};
    ['团期其他价格'].forEach((key)=>{
      config[key] = blocks[key];
      data[key] = data[key] || [{}];
    })
    ModalRender('其他价格',{ view: BlocksModal, text: '其他价格', blocks:config },data,this.editPriceDone);
  }

  editPriceDone(rst){
    const {selectedRowKeys,data} = this.state;
    let index = -1;
    selectedRowKeys['大交通开团团期详情'].forEach((hashKey)=>{
      index = data['大交通开团团期详情'].findIndex((value)=>value.hashKey===hashKey);
      data['大交通开团团期详情'][index]['团期其他价格'] = [...rst['团期其他价格']];
    })
    this.setState({data});
  }

  onCellChange(value,tableKey,rowIndex,dataIndex){
    const {data} = this.state;
    data[tableKey][rowIndex][dataIndex] = value;
    this.setState({data});
  }

  render() {
    // 列表按钮
    const {data,groupModalOpen,selectedRowKeys} = this.state;
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
        <CalendarUtil title="新增团期" width={800} visible={groupModalOpen} onOk={this.addGroupDone} onCancel={this.closeModal} />
      </PageHeaderWrapper>
    );
  }
}

export default AddGroup;
