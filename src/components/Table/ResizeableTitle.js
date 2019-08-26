import React from 'react';
import { Resizable } from 'react-resizable';
import DragableHeaderCol from './HeaderCellDrop';


//   可伸缩列 =========
const ResizeableTitle = props => {
  const { onResize, width, index, ...restProps } = props;
  // 如果没有width 则不需要更改宽度
  if (!width) {
    return <DragableHeaderCol width={width} index={index} {...restProps} />;
  }
  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <DragableHeaderCol width={width} index={index} {...restProps} />
      {/* <th {...restProps} /> */}
    </Resizable>
  );
};

export default ResizeableTitle;