import React from 'react';
import { Icon } from 'antd';

import styles from './ActionModal.less';

class ActionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ActionModalRef = React.createRef();
    this.allPageClickClose = this.allPageClickClose.bind(this);
	}
	
	allPageClickClose = (e) => {
    const { closeActionModal } = this.props;
    if(this.ActionModalRef.current && !this.ActionModalRef.current.contains(e.target)){
      document.removeEventListener('click', this.allPageClickClose, true);
      closeActionModal()
    }
  }

  render() {
    const { openActionModal, renderRowBtns, actionModal, data, width } = this.props;
		if (actionModal === data.hashKey) {
			document.addEventListener('click', this.allPageClickClose, true);
    }
    return (
      <div className={styles.actionBox}>
        <Icon
          className={styles.actionIcon}
          type="menu"
          onClick={() => openActionModal(data)}
        />
        <span
          ref={this.ActionModalRef}
          className={[
            actionModal === data.hashKey ? 'animated fadeInRight' : 'animated fadeOutRight hide',
            styles.actionModal,
            // 这个calss是用来判断展示与否的,不要删除(因为会有两个弹窗,table本身的和right固定的,table的是需要隐藏的)
            'modalBtns'
          ].join(' ')}
          style={{ left: -width }}
        >
          {renderRowBtns()}
          <div className={styles.triangle} />
        </span>
      </div>
    );
  }
}

export default ActionModal;