import React from 'react';
import { Row, Col, Avatar, Icon } from 'antd';

import styles from './index.less';

class LeavingMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <Row>
        <Col className={styles.message}>
          <Col className={styles.avatar} xs={8} sm={4} md={2} lg={2}>
            <Avatar
              src={
                item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              size={64}
            />
          </Col>
          <Col className={styles.messageBox} xs={16} sm={20} md={22} lg={22}>
            <Col className={styles.BoxTop}>
              <p className={styles.BoxTopLeft}>
                {item.company}-{item.department}-{item.employee}
              </p>
              <p className={styles.BoxTopRight}>{item.time}</p>
            </Col>
            <Col className={styles.BoxContent}>{item.content}</Col>
            <Col className={styles.BoxFooter}>
              <span className={styles.BoxFooterZan}>
                <Icon type="like" theme="outlined" /> {item.zan}
              </span>
              <span className={styles.BoxFooterQA}>
                <Icon type="form" theme="outlined" /> {item.qa}
              </span>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}


export default LeavingMsg;