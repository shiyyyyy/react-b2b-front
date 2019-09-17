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
class Modify extends React.Component {
  constructor(props) {
    super(props);
    this.actionMap = {...props.actionMap};

    const {location,actions,blocks} = props;
    const {action} = location.state;
    const cfg = actions[action];
    this.state = blocksPageStateInit(cfg.block || [],blocks);
    this.onCellChange = this.onCellChange.bind(this);
    this.init = this.init.bind(this);
    this.actionMap['指定专人'] = this.specialist.bind(this);
  }



  onCellChange(value,tableKey,rowIndex,dataIndex){
    const {data} = this.state;
    data[tableKey][rowIndex][dataIndex] = value;
    this.setState({data});
  }
  
  specialist(config, storeId, row){

    const afterDone = rst => {
      const {data} = this.state;
      const index = data[storeId].findIndex(value => value.hashKey === rst.hashKey);
      const newRow = {...row};
      newRow.specify = rst.specify;
      data[storeId].splice(index, 1, newRow);
      this.setState({data});
    };

    const ModalConfig = {
      list:{
        'specify':{'text':'专人','type':'EmpAccount','multi':1}
      }
    }

    // eslint-disable-next-line no-param-reassign
    const newData = {...row};
    if(!row.specify){
      newData.specify = [];
    }

    ModalRender('指定专人',{ view: RowModal, text: '指定专人',...ModalConfig },newData,afterDone);
    
  }

  init(){
    const {data} = this.state;
    const {dispatch} = this.props;
    if(data['审批角色'] && data['可选接口']){
        dispatch({
            type:'enum/addEditPath',
            payload:{'审批角色':data['审批角色'],'可选接口':data['可选接口']}
         })
    }
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
    )
  }
}

export default Modify;
