import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const colTarget = {
  drop(props, monitor) {
    console.log(props);

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Time to actually perform the action
    if(props.moveCol){
      props.moveCol(dragIndex, hoverIndex);
    }else{
      return false
    }

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};


@DropTarget('headerCell', colTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
class DragableHeaderCol extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const { connectDropTarget, width, index, moveCol, isOver, ...restProps } = this.props;
    return connectDropTarget(<th width={width} index={index} {...restProps} />);
  }
}
export default DragableHeaderCol;
