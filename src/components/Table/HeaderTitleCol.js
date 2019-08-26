import React from 'react';
import { DragSource } from 'react-dnd';

let dragingColIndex = -1;

const SourceSpec = {
  beginDrag(props) {
    dragingColIndex = props.index;
    return {
      index: props.index,
    };
  },
};

@DragSource('headerCell', SourceSpec, connect => ({
  connectDragSource: connect.dragSource(),
}))
class DragableHeaderTitleCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    const { connectDragSource, title, index } = this.props;
    const styles = { cursor: 'move' };
    return connectDragSource(<span index={index} style={styles}>{title || ''}</span>);
  }
}

export default DragableHeaderTitleCol;
