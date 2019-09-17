import React from 'react';
import { Row, Col, Tag, Icon,Spin } from 'antd';

import styles from './index.less';

import AppCore from '@/utils/core';

function renderImg(item) {
  let url = item.pd_pic;
  if (url && url.indexOf('http') !== 0 && AppCore.HOST) {
    url = `${AppCore.HOST}/${url}`;
  }
  return (
    <img src={url || '/favicon.png'} alt="产品图片" className="img-size" />
  );
}

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      loading: false,
      detail:{}
    };
  }

  changeActive() {
    const { active } = this.state;
    const { openChildren, data } = this.props;
    if (!active) {
      this.setState({ loading: true });
      if(openChildren){
        openChildren(data).then(r => {
          this.setState({ active: true, loading: false,detail:r.data })
        });
      }else{
        this.setState({ active: true, loading: false })
      }
    } else {
      this.setState({ active: false });
    }
  }

  renderMore(){
    const {more} = this.props;
    const {detail} = this.state;
    if(typeof more === 'function'){
      return (
        more(detail)
      )
    }
    return null;
  }

  render() {
    const { active ,loading} = this.state;
    const { btnChildren,more ,data } = this.props;
    return (
      <Row>
        <Col className={styles.OrderList}>
          <Col className={[styles.item, 'clear', active && more ? styles.focus : ''].join(' ')}>
            <Col
              className={[styles.list, active && more ? styles.active : ''].join(' ')}
            >
              <Col
                className={[styles.itemHeader, active && more ? styles.active : ''].join(' ')}
              >
                <div className={styles.hLeft}>{`订单号: D0${data.id}`}</div>
                <div className={styles.hRight}>占位待确认</div>
              </Col>
              <Col className={[styles.content, 'clear'].join(' ')} style={more ? {} : {paddingBottom: '26px'}}>
                <Col xs={24} sm={6} md={3} lg={3} xl={3}>
                  <div className={styles.imgBox}>
                    {renderImg(data)}
                  </div>
                  <div className={[styles.num, 'text-overflow'].join(' ')}>{`产品编号: PD0${data.pd_id}`}</div>
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
                      <Tag color="red">单订房</Tag>
                    </Col>
                  </Col>
                  <Col className={[styles.btm, 'clear'].join(' ')}>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                      <Col>
                        <span className={styles.key}>报名人: </span>
                        <span>{data.creator}</span>
                      </Col>
                      <Col>
                        <span className={styles.key}>接单人: </span>
                        <span>{data.assitant}</span>
                      </Col>
                      <Col>
                        <span className={styles.key}>受理人: </span>
                        <span>{`${data.supplier_full_name}-${data.supplier_department_name}-${data.name}-${data.mobile}` }</span>
                      </Col>
                      <Col className="text-right">
                        <Col
                          className={loading ? 'dib' : 'hide'}
                          style={{ width: '60px', paddingRight: '12px', textAlign: 'center' }}
                        >
                          <Spin />
                        </Col>
                        {
                          more && 
                          <Col
                            className={[styles.openIconBox, 'dib', loading ? 'hide' : ''].join(' ')}
                            onClick={() => this.changeActive()}
                          >
                            展开详情
                            <Icon
                              type="double-left"
                              className={[active && more ? styles.close : styles.open]}
                            />
                          </Col>
                        }
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
            {
              active && this.renderMore()
            }
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Booking;
