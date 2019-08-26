import React from 'react';
import { Row, Col, Tag } from 'antd';


import AppCore from '@/utils/core';
import styles from './index.less';

function renderImg(item) {
  let url = item.pd_pic;
  if (url && url.indexOf('http') !== 0 && AppCore.HOST) {
    url = `${AppCore.HOST}/${url}`;
  }
  return (
    <img src={url || '/favicon.png'} alt="产品图片" className="img-size" />
  );
}

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  changeActive() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const { active } = this.state;
    const { btnChildren, children, data } = this.props;
    return (
      <Row>
        <Col className={styles.OrderList}>
          <Col className={[styles.item, 'clear', active && children ? styles.focus : ''].join(' ')}>
            <Col
              className={[styles.list, active && children ? styles.active : ''].join(' ')}
              onClick={() => this.changeActive()}
            >
              <Col
                className={[styles.itemHeader, active && children ? styles.active : ''].join(' ')}
              >
                <div className={styles.hLeft}>{`订单号: D0${data.id}`}</div>
                <div className={styles.hRight}>占位待确认</div>
              </Col>
              <Col className={[styles.content, 'clear'].join(' ')} style={children ? {} : {paddingBottom: '26px'}}>
                <Col xs={24} sm={6} md={3} lg={3} xl={3}>
                  <div className={styles.imgBox}>
                    {renderImg(data)}
                  </div>
                  <div className={styles.num}>{`产品编号: PD0${data.pd_id}`}</div>
                </Col>
                <Col xs={24} sm={18} md={21} lg={21} xl={21} style={{paddingLeft: '12px'}}>
                  <Col className={[styles.top, 'clear'].join(' ')}>
                    <Col
                      xs={20}
                      sm={18}
                      md={16}
                      lg={12}
                      xl={12}
                      className={[styles.title, 'text-overflow'].join(' ')}
                    >
                      {data.pd_name}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} className={styles.tag}>
                      <Tag color="cyan">大交通</Tag>
                    </Col>
                  </Col>
                  <Col className={[styles.btm, 'clear'].join(' ')}>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                      <Col>
                        <span className={styles.key}>报名人: </span>
                        <span className={styles.val}>{data.creator_company_name}</span>
                        <span className={styles.val}>{data.creator_department_name}</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          {data.creator_name}
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          {data.creator_mobile}
                        </span>
                      </Col>
                      <Col>
                        <span className={styles.key}>接单人: </span>
                        <span className={styles.val}>{data.assitant_company_name}</span>
                        <span className={styles.val}>{data.assitant_department_name}</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          {data.assitant_name}
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          {data.assitant_mobile}
                        </span>
                      </Col>
                      <Col>
                        <span className={styles.key}>受理人: </span>
                        <span className={styles.val}>{data.acceptman_company_name}</span>
                        <span className={styles.val}>{data.acceptman_department_name}</span>
                        <span className={styles.val} style={{ width: '48px' }}>
                          {data.acceptman_name}
                        </span>
                        <span className={styles.val} style={{ width: '72px' }}>
                          {data.acceptman_mobile}
                        </span>
                      </Col>
                    </Col>
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                      <Col className={styles.contentR}>
                        <div className={styles.obj}>
                          <span className={styles.key}>出团日期：</span>
                          <span className={styles.val}>{data.dep_date}</span>
                        </div>
                        <div className={styles.obj}>
                          <span className={styles.key}>回团日期：</span>
                          <span className={styles.val}>{data.back_date}</span>
                        </div>
                      </Col>
                      <Col className={styles.contentR}>
                        <div className={styles.obj}>
                          <span className={styles.key}>成团人数：</span>
                          <span className={styles.val}>{data.person_limit}人</span>
                        </div>
                        <div className={styles.obj}>
                          <span className={styles.key}>占位时限：</span>
                          <span className={styles.val}>48小时</span>
                        </div>
                      </Col>
                      <Col className={styles.contentR}>
                        <div className={styles.obj}>
                          <span className={styles.key}>价&ensp;&ensp;&ensp;格：</span>
                          <span className={styles.money}>9998.00</span>
                        </div>
                      </Col>
                      <Col className={styles.contentRBtn}>{btnChildren || null}</Col>
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
            {/* modal */}
            <Col className={styles.modal}>{active && children && children}</Col>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Traffic;
