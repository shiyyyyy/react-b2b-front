import React from 'react';
import { Icon } from 'antd';
import styles from './Drawer.less';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, className, width, children, view } = this.props;
    return (
      <div
        className={`${className} ${styles.Drawer}`}
        style={{
          width: width || 0,
        }}
      >
        <div style={{ width: '100%', height: '100%' }} className={`${visible ? '' : 'hide'}`}>{children}</div>
        <div>
          <Icon type="caret-right" onClick={e => view.openDrawer()} className={`${styles.open} ${visible ? '' : 'hide'}`} />
          <Icon type="caret-left" onClick={e => view.closeDrawer()} className={`${styles.close} ${visible ? '' : 'hide'}`} />
        </div>
      </div>
    );
  }
}

export default Drawer;
