import React from 'react';
import {  Col } from 'antd';

import getEnum from '@/utils/enum';
import AppCore from '@/utils/core'; 
import {AppConst} from '@/utils/const';
import styles from './Schedule.less';

function renderImg(data) {
  let url = data.list_pic;
  if (url && url.indexOf('http') !== 0 && AppCore.HOST) {
    url = `${AppCore.HOST}/${url}`;
  }
  return (
    <div className={styles.imgWrapper}>
      <img
        src={url || '/img/login-bg.png'}
        className={styles.img}
        alt="产品图片"
      />
      <span className={[styles.imgText, 'text-overflow'].join(' ')}>{`产品编号P0${data.pd_id}`}</span>
    </div>
  );
}
class ScheduleGroupTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  render() {
    const { openModal } = this.state;
    const { children, btnChildren,data } = this.props;
    return (
      <Col className={styles.Schedule}>
        <Col
          className={[styles.top, openModal && children ? styles.topActive : ''].join(' ')}
          onClick={() => this.setState({ openModal: !openModal })}
        >
          <Col className={styles.imgBox} xs={3} sm={3} md={3} lg={3}>
            {
              renderImg(data)
            }
          </Col>
          <Col style={{ paddingLeft: '20px', flex: '1' }} xs={21} sm={21} md={21} lg={21}>
            <Col className={styles.RTop}>
              <span className={[styles.name, 'text-overflow'].join(' ')}>
                {data.pd_name}
              </span>
              <span className={styles.tag}>跟团游</span>
            </Col>
            <Col className={styles.RCenter}>
              <Col span={18} className={styles.RCenterL}>
                <Col span={6}>
                  <div className={styles.cell}>
                    <span className={styles.lable}>出团日期：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.dep_date}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>回团日期：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.back_date}</span>{' '}
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>出发城市：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{getEnum('City')[data.dep_city_id] || '' }</span>{' '}
                  </div>
                </Col>
                <Col span={6}>
                  <div className={styles.cell}>
                    <span className={styles.lable}>同行价：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.peer_price}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>直客价：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.retail_price}</span>{' '}
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable} style={{display:'inline-block',minWidth:'48px'}}>供应商：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.supplier_full_name}</span>{' '}
                  </div>
                </Col>     
                <Col span={6}>
                  <div className={styles.cell}>
                    <span className={styles.lable}>团号：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.gp_num}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>计划位：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.gp_total}</span>{' '}
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>库存：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.stock}</span>{' '}
                  </div>
                </Col>     
                <Col span={6}>
                  <div className={styles.cell}>
                    <span className={styles.lable}>实报：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.confirmation_num}</span>
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>占位：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.reservation_num}</span>{' '}
                  </div>
                  <div className={styles.cell}>
                    <span className={styles.lable}>剩余：</span>{' '}
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.remain}</span>{' '}
                  </div>
                </Col>                
              </Col>
              <Col span={6} className={styles.RCenterR}>
                <Col span={24} className={styles.infoRow}>
                  <Col className={styles.infoCell} style={{margin: 0}}>
                    <span className={styles.lable}>控团人： </span>
                    <span className={[styles.text, 'text-overflow'].join(' ')}>{data.manager_name}</span>
                  </Col>
                  <Col className={styles.infoCell} style={{margin: 0}}>
                    <span className={styles.lable}>团态： </span>
                    {
                      // eslint-disable-next-line eqeqeq
                      data.shelf_state == AppConst.SHELF_ON 
                      && 
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{getEnum('GroupState')[data.state] || ''}</span>}
                    {
                      // eslint-disable-next-line eqeqeq
                      data.shelf_state != AppConst.SHELF_ON 
                      && 
                      <span className={[styles.text, 'text-overflow'].join(' ')}>{getEnum('ShelfState')[data.shelf_state] || ''}</span>}
                  </Col>
                </Col>
                <Col
                  span={22}
                  className={btnChildren ? '' : 'hide'}
                  style={{ textAlign: 'right' }}
                >
                  {btnChildren || null}
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>

        <Col className={openModal ? '' : 'hide'}>{children}</Col>
      </Col>
    );
  }
}

export default ScheduleGroupTour;
