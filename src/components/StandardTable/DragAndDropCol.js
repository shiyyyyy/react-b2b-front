import React from 'react';

//   可拖拽行 ========= Col ==============
let dragingColIndex = -1;

export class HeaderCol extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveCol, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };
    // eslint-disable-next-line prefer-destructuring
    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingColIndex) {
        className += ' drop-over-rightward';
      }
      if (restProps.index < dragingColIndex) {
        className += ' drop-over-leftward';
      }
      console.log(restProps.index, dragingColIndex);
    }

    return connectDragSource(
      connectDropTarget(<th {...restProps} className={className} style={style} />)
    );
  }
}

export const colSource = {
  beginDrag(props) {
    dragingColIndex = props.index;
    return {
      index: props.index,
    };
  },
};

export const colTarget = {
  drop(props, monitor) {
    console.log(props);

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveCol(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};
