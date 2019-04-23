import React from 'react';
import { Row, Col } from 'antd';

import styles from './Traffic.less';

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  render() {
    const { openModal } = this.state;
    const { children, btnChildren, state } = this.props;
    return (
      <Row>
        <Col className={styles.GroupTour}>
          <Col
            className={[styles.top, openModal && children ? styles.topActive : ''].join(' ')}
            onClick={_ => this.setState({ openModal: !openModal })}
          >
            <Col className={styles.imgBox}>
              <img
                src={'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'}
                className={styles.img}
                alt="产品图片"
              />
              <span className={styles.imgText}>产品编号: P0-4396</span>
            </Col>
            <Col style={{ paddingLeft: '20px', flex: '1' }}>
              <Col className={styles.RTop}>
                <span className={[styles.name, 'text-overflow'].join(' ')}>
                  超值无忧泰一地,体验泰国风情超值无忧泰一地,体验泰国风情
                </span>
                <span className={styles.tag}>大交通</span>
              </Col>
              <Col className={styles.RCenter}>
                <Col span={10} className={styles.RCenterL}>
                  <div>
                    供应商: <span>南亚风情--琳琳</span>
                  </div>
                  <div>
                    票程信息: <span>广西桂林甲天下之旅</span>
                  </div>
                  <div className="text-overflow">
                    最近班期:{' '}
                    <span>
                      2018-09-08、2018-12-12、2018-11-11、2018-12-21、2018-12-12、2018-11-11
                    </span>
                  </div>
                </Col>
                <Col span={14} className={styles.RCenterR}>
                  <Col style={{ display: 'flex' }}>
                    <Col span={8}>
                      同行价:
                      <span
                        className="imp-text pointer"
                        onClick={_ => console.log('跳转登录页')}
                      >
                        登录可查
                      </span>
                    </Col>
                    <Col span={8}>
                      在售团期: <span className="imp-text">76</span>个
                    </Col>
                    <Col span={8}>
                      产品评分: <span className="imp-text">9.6</span>分
                    </Col>
                  </Col>
                  <Col style={{ display: 'flex' }}>
                    <Col span={8}>
                      销售价: <span className="imp-text">￥29998</span>/人起
                    </Col>
                    <Col span={8}>
                      访问次数: <span className="imp-text">32685</span>次
                    </Col>
                    <Col span={8} className={state ? '' : 'hide'}>
                      审核状态:{' '}
                      <span className="imp-text" style={{ color: '#00A36A' }}>
                        待审核
                      </span>
                    </Col>
                  </Col>
                </Col>
              </Col>
              <Col className={styles.RBtm}>
                <Col span={14} className={styles.RBtmL}>
                  <div>北京出发</div>
                  <div>5晚6天</div>
                  <div>飞机来回</div>
                  <div>无自费</div>
                  <div>无购物</div>
                </Col>
                <Col span={10} className={btnChildren ? '' : 'hide'} style={{ textAlign: 'right' }}>
                  {btnChildren || null}
                </Col>
              </Col>
            </Col>
          </Col>

          <Col className={openModal ? '' : 'hide'}>{children}</Col>
        </Col>
      </Row>
    );
  }
}

export default Traffic;