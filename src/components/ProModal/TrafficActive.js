import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from './TrafficActive.less';

class TrafficActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col className={styles.modal}>
          <Col className={styles.listBox}>
            <Col span={24} className={styles.groupTotle}>
              <Col span={4}>团号</Col>
              <Col span={3}>出团日期</Col>
              <Col span={3}>回团日期</Col>
              <Col span={3}>同行价</Col>
              <Col span={3}>销售价</Col>
              <Col span={3}>利润</Col>
              <Col span={3}>总位</Col>
              <Col span={2}>剩余</Col>
            </Col>
            {[{}, {}, {}].map((list, index) => (
              <Col className={styles.groupList} key={index}>
                <Col className={styles.listMain}>
                  <Col span={4}>RNG-60E-HZ-SM-S8</Col>
                  <Col span={3}>2018-08-12</Col>
                  <Col span={3}>2018-08-20</Col>
                  <Col span={3}>￥24000</Col>
                  <Col span={3}>￥28888</Col>
                  <Col span={3}>￥4888</Col>
                  <Col span={3}>100</Col>
                  <Col span={2}>20</Col>
                </Col>
                <Col className={styles.listBtn}>
                  <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                    查看
                  </Button>
                  <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                    下载
                  </Button>
                  <Button type="primary" size="small" ghost>
                    占位
                  </Button>
                </Col>
              </Col>
            ))}
          </Col>
        </Col>
      </Row>
    );
  }
}

export default TrafficActive;
