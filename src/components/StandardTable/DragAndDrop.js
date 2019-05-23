import { Form } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
// row
// import { rowSource, rowTarget } from './DragAndDropRow';
import { EditableRow } from './EditableCell';

// col
import { colSource, colTarget, HeaderCol } from './DragAndDropCol';

// 拖拽 Row
// export const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver(),
// }))(
//   DragSource('row', rowSource, connect => ({
//     connectDragSource: connect.dragSource(),
//   }))(
//     Form.create({
//       onFieldsChange(props, fields) {
//         console.log(props);
//         console.log(fields);
//       },
//     })(EditableRow)
//   )
// );

// 非拖拽Row
export const EditBodyRow = Form.create({
  onFieldsChange(props, fields) {
    console.log(props);
    console.log(fields);
  },
})(EditableRow);


export const DragableHeaderCol = DropTarget('col', colTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('col', colSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(HeaderCol)
);
