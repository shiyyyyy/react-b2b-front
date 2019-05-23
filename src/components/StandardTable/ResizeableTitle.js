import React from 'react';
import { Resizable } from 'react-resizable';
import { DragableHeaderCol } from './DragAndDrop';

//   可伸缩列 =========
const ResizeableTitle = props => {
  const { onResize, width, index, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  // 如果没有width 则不需要更改宽度
  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <DragableHeaderCol {...props} index={index} />
      {/* <th {...restProps} /> */}
    </Resizable>
  );
};

export default ResizeableTitle;