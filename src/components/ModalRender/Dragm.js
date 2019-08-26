import  React from 'react';
import DragM from 'dragm';

import styles from './index.less';

class DragmModal extends React.Component {
  componentDidMount() {
    this.modalDom = document.getElementsByClassName(
      'ant-modal-wrap' //modal的class是ant-modal-wrap
    )[0];
  }

  updateTransform = transformStr => {
    this.modalDom.style.transform = transformStr;
  };

  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div>{title}</div>
      </DragM>
    );
  }
}

export default DragmModal;