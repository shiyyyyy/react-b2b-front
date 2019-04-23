import React from 'react';
import { Row, Col, Icon } from 'antd';

import styles from './index.less';

export class Hot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, more, maxNum, data } = this.props;
    return (
      <Row>
        <Col className="mod-title">
          <Col className="mod-text">{title}</Col>
          <Col className={more ? 'mod-more' : 'hide'}>
            {more}
            <Icon type="right" />
          </Col>
        </Col>
        <Col className={styles.ProductHot}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={6} lg={6} xl={6} className={styles.itemPadding} key={index}>
              <Col className={[styles.item, index >= maxNum ? 'hide' : ''].join(' ')} key={item.id}>
                <Col className={styles['item-photo']} key={item.id}>
                  <img
                    className="img-size"
                    alt="产品图片"
                    src={
                      item.url ||
                      'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'
                    }
                  />
                </Col>
                <Col className={styles['item-pro-info']}>
                  <Col className={[styles['info'], 'text-overflow-2'].join(' ')}>
                    南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游
                  </Col>
                  <Col className={styles['prici-discount']}>
                    <Col span={12} className={styles['origin-price']}>
                      昨日访问: <span style={{ color: '#F43266' }}>{288}</span>
                    </Col>
                    <Col span={12} className={styles['price']}>
                      今日访问: <span style={{ color: '#F43266' }}>{888}</span>
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
          ))}
        </Col>
      </Row>
    );
  }
}

export default Hot;
