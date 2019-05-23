import React from 'react';

export class BodyRow extends React.Component {
  render() {
    const { ...restProps } = this.props;

    return <tr {...restProps} />;
  }
}

//   可拖拽列 ========= Row ==============

// let dragingRowIndex = -1;

// export class BodyRow extends React.Component {
//   render() {
//     const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
//     const style = { ...restProps.style, cursor: 'move' };
//     console.log(this);

//     let { className } = restProps;
//     if (isOver) {
//       if (restProps.index > dragingRowIndex) {
//         className += ' drop-over-downward';
//       }
//       if (restProps.index < dragingRowIndex) {
//         className += ' drop-over-upward';
//       }
//     }
//     return connectDragSource(
//       connectDropTarget(<tr {...restProps} className={className} style={style} />)
//     );
//   }
// }

// export const rowSource = {
//   beginDrag(props) {
//     console.log(props);
//     dragingRowIndex = props.index;
//     return {
//       index: props.index,
//     };
//   },
// };

// export const rowTarget = {
//   drop(props, monitor) {
//     console.log(props);

//     const dragIndex = monitor.getItem().index;
//     const hoverIndex = props.index;

//     // Don't replace items with themselves
//     if (dragIndex === hoverIndex) {
//       return;
//     }

//     // Time to actually perform the action
//     props.moveRow(dragIndex, hoverIndex);

//     // Note: we're mutating the monitor item here!
//     // Generally it's better to avoid mutations,
//     // but it's good here for the sake of performance
//     // to avoid expensive index searches.
//     monitor.getItem().index = hoverIndex;
//   },
// };
