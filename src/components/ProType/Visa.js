import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from './Visa.less';

class Visa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { listBtn, action, state, item } = this.props;
    return (
      <Row>
        <Col className={styles.GroupTour}>
          <Col className={styles.top}>
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
                <span className={styles.tag}>单签证</span>
              </Col>
              <Col className={styles.RCenter}>
                <Col span={10} className={styles.RCenterL}>
                  <div>
                    供应商: <span>亚美运通---周华走红走</span>
                  </div>
                  <div>
                    办理周期: <span>大约20天左右,等等就好了问题不大</span>
                  </div>
                  <div className="text-overflow">
                    送签国家: <span>日本</span>
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
                <Col span={10} className={listBtn ? '' : 'hide'} style={{ textAlign: 'right' }}>
                  <Button style={{ marginRight: '12px' }} type="primary" size="small" ghost onClick={_ => console.log('下载')}>
                    下载
                  </Button>
                  <Button style={{ marginRight: '12px' }} type="primary" size="small" ghost onClick={_ => console.log('实报')}>
                    实报
                  </Button>
                  <Button style={{ marginRight: '12px' }} type="primary" size="small" ghost onClick={_ => console.log('占位')}>
                    占位
                  </Button>
                </Col>
                <Col span={10} className={action ? '' : 'hide'} style={{ textAlign: 'right' }}>
                  <Button className={styles.btns} type="primary" ghost size="small" onClick={e => action.delete ? action.delete(e, item) : false}>删除</Button>
                  <Button className={styles.btns} type="primary" ghost size="small" onClick={e => action.copy ? action.copy(e) : false}>复制</Button>
                  <Button className={styles.btns} type="primary" ghost size="small" onClick={e => action.open ? action.open(e) : false}>开团</Button>
                  <Button className={styles.btns} type="primary" ghost size="small" onClick={e => action.edit ? action.edit(e) : false}>修改</Button>
                  <Button className={styles.btns} type="primary" ghost size="small" onClick={e => action.onOff ? action.onOff(e) : false}>启停</Button>
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Visa;
