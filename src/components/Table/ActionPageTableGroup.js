import React from 'react';
import ActionPageTable from '@/components/Table/ActionPageTable';

const Group = props => {
  const { blocks, config, dataSource, actionMap ,rowSelection={},onCellChange,ro=[]} = props;
  const {selectedRowKeys,onChange} = rowSelection;
  const rowSelectionArray = {};
  Object.keys(selectedRowKeys).forEach((block)=>{
    rowSelectionArray[block] = {
      selectedRowKeys:selectedRowKeys[block]||[],
      onChange
    };
  })
  return (
    <React.Fragment>
      {config.map((block,index) => (
        <ActionPageTable
          key={block}
          blockConfig={blocks[block]}
          block={block}
          ro={ro[index]}
          dataSource={dataSource[block] || []}
          actionMap={actionMap}
          rowSelection={rowSelectionArray[block]}
          onCellChange={onCellChange}
        />
      ))}
    </React.Fragment>
  );
};

export default Group;
