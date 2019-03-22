import React from 'react';
import { Icon, Divider } from 'antd';
import Link from 'umi/link';

import styles from './index.less';

class HistoryTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBtn: false,
      upBtnDisabled: true,
      downBtnDisabled: false,
    };
    this.itemBox = React.createRef();
  }

  componentDidMount() {
    // 48是固定高度,HistoryTags栏固定高度就是48PX
    if (this.itemBox && this.itemBox.current.offsetHeight > 48) {
      // 大于48就显示右边按钮,否则不显示
      this.setState({ showBtn: true });
    }
  }

  upClick = () => {
    const curY =
      [...this.itemBox.current.style.transform].filter(item => /\d/.test(item)).join('') || 0;
    if (curY > 0) {
      this.itemBox.current.style.transform = `translateY(${-curY + 48}px)`;
      if (-curY + 48 === 0) {
        this.setState({ upBtnDisabled: true });
        return;
      }
      this.setState({ downBtnDisabled: false });
    }
  };

  downClick = () => {
    const curY =
      [...this.itemBox.current.style.transform].filter(item => /\d/.test(item)).join('') || 0;
    const H = this.itemBox.current.offsetHeight - 48;
    if (curY < H) {
      this.itemBox.current.style.transform = `translateY(${-curY - 48}px)`;
      if (-curY - 48 === -H) {
        this.setState({ downBtnDisabled: true });
        return;
      }
      this.setState({ upBtnDisabled: false });
    }
  };

  removeTag(curTag) {
    const { removeHistoryTags } = this.props;
    const tag = {
      path: curTag.path,
      target: curTag.target,
      icon: curTag.icon,
      name: curTag.name,
    };
    removeHistoryTags(tag);
  }

  render() {
    const { data, children, location: {pathname} } = this.props;
    const { showBtn, upBtnDisabled, downBtnDisabled } = this.state;
    return (
      <div className={styles.page}>
        <Divider style={{ margin: '0' }} />
        <div className={styles.historyBox}>
          <div className={styles.itemBox} ref={this.itemBox}>
            <span key="首页" className={styles.item}>
              <Link to="/" className={styles.link}>
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </span>
            {data.map(item => (
              <span
                key={item.name}
                className={[styles.item, item.path === pathname ? styles.activeItem : ''].join(' ')}
              >
                <Link to={item.path} target={item.target} className={styles.link}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
                <Icon
                  type="close"
                  className={styles.close}
                  onClick={e => this.removeTag(item)}
                />
              </span>
            ))}
          </div>
          <div className={showBtn ? styles.btn : 'hide'}>
            <Icon
              type="up"
              className={[styles.up, upBtnDisabled ? styles.upDisabled : ''].join(' ')}
              onClick={this.upClick}
            />
            <Icon
              type="down"
              className={[styles.down, downBtnDisabled ? styles.downDisabled : ''].join(' ')}
              onClick={this.downClick}
            />
          </div>
        </div>
        <div className={styles.content}>{children || null}</div>
      </div>
    );
  }
}

export default HistoryTags;
