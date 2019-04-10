import React from 'react';
import { Col, Avatar } from 'antd';

import styles from './index.less';

class AccessRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <Col className={styles.AccessRecord}>
        <Avatar
          shape="square"
          size={64}
          src={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
        />
        <div className={styles.name} title={item.name}>
          {item.name}
        </div>
        <div className={styles.time} title={item.time}>
          {item.time}
        </div>
      </Col>
    );
  }
}

export default AccessRecord;
