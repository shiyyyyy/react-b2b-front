import React from 'react';
import { Col } from 'antd';

import getEnum from '@/utils/enum';
import AppCore from '@/utils/core'; 
import styles from './Booking.less';


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
      <span className={styles.imgText}>{`产品编号P0${data.id}`}</span>
    </div>
  );
}

class Booking extends React.Component {
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
      <Col className={styles.Booking}>
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
              <span className={styles.tag}>单订房</span>
            </Col>
            <Col className={styles.RCenter}>
              <Col span={10} className={styles.RCenterL}>
                <div>
                  <span className={styles.lable}>{`产品编号P0${data.id}`}</span>{' '}
                  <span className={styles.text}>{data.account_name}</span>
                </div>
                <div>
                  <span className={styles.lable}>发 布 人： </span>{' '}
                  <span className={styles.text}>{data.supplier_full_name}</span>{' '}
                  <span className={styles.text}>{data.account_name}</span>
                </div>
              </Col>
              <Col span={14} className={styles.RCenterR}>
                <Col span={24} className={styles.infoRow}>
                  <Col className={styles.infoCell}>
                    <span className={styles.lable}>已 过 期： </span>
                    <span className={styles.text}>140</span>
                  </Col>
                  <Col className={styles.infoCell}>
                    <span className={styles.lable}>在 售 中： </span>
                    <span className={styles.text}>76</span>
                  </Col>
                </Col>
                <Col span={24} className={styles.infoRow}>
                  <Col className={styles.infoCell}>
                    <span className={styles.lable}>累计访问： </span>
                    <span className={styles.text}>32685</span>
                  </Col>
                  <Col className={styles.infoCell}>
                    <span className={styles.lable}>审核状态： </span>
                    <span className={styles.text} style={{ color: '#00A36A' }}>
                      待审核
                    </span>
                  </Col>
                </Col>
              </Col>
            </Col>
            <Col className={styles.RBtm} span={24}>
              <Col span={14} className={styles.RBtmL}>
                {/* 主题 */}
                {
                  data.tag_arr.map((tag,index) => (
                    index <3 &&
                    <div key={`${tag}\${index}`}>
                      {getEnum('PdTheme')[tag]}
                    </div>
                  ))
                }
              </Col>
              <Col
                span={9}
                className={btnChildren ? '' : 'hide'}
                style={{ textAlign: 'right' }}
              >
                {btnChildren || null}
              </Col>
            </Col>
          </Col>
        </Col>

        <Col className={openModal ? '' : 'hide'}>{children}</Col>
      </Col>
    );
  }
}

export default Booking;
