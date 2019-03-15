import React, { Component } from 'react';
import { Icon } from 'antd';
import Drawer from './Drawer';
import DrawerItem from './DrawerItem';

import styles from './index.less';

class DrawerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curState: 0, // 0 隐藏, 1 一半, 2 全屏
      curWidth: '0',
      visible: false,
    };
  }

  openDrawer() {
    let { curState, visible, curWidth } = this.state;
    if (curState === 0) {
      curState = 1;
      curWidth = '50%';
      visible = true;
    } else if (curState === 1) {
      curState = 2;
      curWidth = '100%';
      visible = true;
    }
    this.setState({ visible, curState, curWidth });
  }

  closeDrawer() {
    let { curState, visible, curWidth } = this.state;
    if (curState === 2) {
      curState = 1;
      curWidth = '50%';
      visible = true;
    } else if (curState === 1) {
      curState = 0;
      curWidth = '0';
      visible = false;
    }
    this.setState({ visible, curState, curWidth });
  }

  render() {
    const { visible, curWidth } = this.state;
    const { children, className, zIndex, rightArrowClass } = this.props;

    return (
      <div className={styles.box} style={{ zIndex: zIndex || 1000 }}>
        <Icon type="caret-right" onClick={e => this.openDrawer()} className={`${styles.open} ${rightArrowClass || ''}`} />
        <Drawer
          view={this}
          visible={visible}
          width={curWidth}
          className={className || ''}
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
        >
          {children || ''}
        </Drawer>
      </div>
    );
  }
}

const Drawers = {}

Drawers.Drawer = DrawerBox;
Drawers.DrawerItem = DrawerItem;

export default Drawers;
