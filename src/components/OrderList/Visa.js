import React from 'react';
import { Row, Col, Tag } from 'antd';

import styles from './index.less';

class Visa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  changeActive() {
    const { active } = this.state;
    console.log(active);
    this.setState({ active: !active });
  }

  render() {
    const { active } = this.state;
    const { item, btnChildren, children } = this.props;
    return (
      <Row>
        <Col className={styles.OrderList}>
          <Col className={[styles.item, 'clear', active ? styles.focus : ''].join(' ')}>
            <Col
              className={[styles.list, active ? styles.active : ''].join(' ')}
              onClick={e => this.changeActive()}
            >
              <Col className={[styles.itemHeader, active ? styles.active : ''].join(' ')}>
                <div className={styles.hLeft}>订单号: D023456789</div>
                <div className={styles.hRight}>占位待确认</div>
              </Col>
              <Col className={[styles.content, 'clear'].join(' ')}>
                <Col xs={24} sm={6} md={3} lg={3} xl={3}>
                  <div className={styles.imgBox}>
                    <img src="/favicon.png" alt="图片" />
                    <div className={styles.num}>编号: 89757</div>
                  </div>
                </Col>
                <Col xs={24} sm={18} md={21} lg={21} xl={21}>
                  <Col className={[styles.top, 'clear'].join(' ')}>
                    <Col
                      xs={20}
                      sm={18}
                      md={16}
                      lg={12}
                      xl={12}
                      className={[styles.title, 'text-overflow'].join(' ')}
                    >
                      超值无忧天一地K-98K, 5晚6天, 全程五星级酒店住宿, 让你欢乐到家.
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} className={styles.tag}>
                      <Tag color="green">单签证</Tag>
                    </Col>
                  </Col>
                  <Col className={[styles.btm, 'clear'].join(' ')}>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                      <Col>
                        <span className={styles.key}>报名人: </span>
                        <span className={styles.val}>北青旅</span>
                        <span className={styles.val}>十里河门市</span>
                        <span className={styles.val}>门管中心</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          张三
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          13344445555
                        </span>
                      </Col>
                      <Col>
                        <span className={styles.key}>接单人: </span>
                        <span className={styles.val}>北青旅</span>
                        <span className={styles.val}>十里河门市</span>
                        <span className={styles.val}>门管中心</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          张三
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          13344445555
                        </span>
                      </Col>
                      <Col>
                        <span className={styles.key}>受理人: </span>
                        <span className={styles.val}>北青旅</span>
                        <span className={styles.val}>十里河门市</span>
                        <span className={styles.val}>门管中心</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          张三
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          13344445555
                        </span>
                      </Col>
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                      <Col className={styles.contentR}>
                        <div className={styles.obj}>
                          <span className={styles.key}>出团: </span>{' '}
                          <span className={styles.val}>2018-02-02</span>
                        </div>
                        <div className={styles.obj}>
                          <span className={styles.key}>回团: </span>{' '}
                          <span className={styles.val}>2018-08-09</span>
                        </div>
                      </Col>
                      <Col className={styles.contentR}>
                        <div className={styles.obj}>
                          <span className={styles.key}>人数: </span>{' '}
                          <span className={styles.val}>24人</span>
                        </div>
                        <div className={styles.obj}>
                          <span className={styles.key}>金额: </span>{' '}
                          <span className={styles.money}>9998.00</span>
                        </div>
                      </Col>
                      <Col className={styles.contentR}>
                        {btnChildren ? btnChildren(item) : null}
                      </Col>
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
            {/* modal */}
            <Col className={styles.modal}>{children}</Col>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Visa;
