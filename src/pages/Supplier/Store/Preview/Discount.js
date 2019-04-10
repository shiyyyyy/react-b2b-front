// 尾货甩卖
import React from 'react';
import {
  Icon,
  Row,
  Col,
  Pagination,
} from 'antd';

import styles from './Discount.less';

class Discount extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      total: 998,
      data: {
        discount: [
          {
            path: 'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg',
            name: '东南亚4国连游',
            id: '1',
            origin: '29999',
            present: '28888',
          },
          {
            path: 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
            name: '东南亚4国连游',
            id: '2',
            origin: '19999',
            present: '18888',
          },
          {
            path:
              'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg',
            name: '东南亚4国连游',
            id: '3',
            origin: '9999',
            present: '8888',
          },
          {
            path: 'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg',
            name: '东南亚4国连游',
            id: '4',
            origin: '13899',
            present: '9999',
          },
          {
            path: 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
            name: '东南亚4国连游',
            id: '5',
            origin: '24999',
            present: '20999',
          },
        ],
      },
    };
  }

  componentDidMount() {}

  // 切换不同 pages
  pageChange(page) {
    console.log(page);
    const NewPage = page;
    this.setState({ page: NewPage });
  }

  render() {
    const { data: { discount }, page, total } = this.state;
    return (
      <div className={styles.Discount}>
        {/*  */}
        <Row>
          {/* 团-类型 */}
          <div className="mod-title">
            <span className="mod-text">产品列表</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={[styles.hot, 'clear'].join(' ')}>
            {discount.concat(discount, discount, discount).map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index} className={styles.hotItem}>
                <Col className={styles.autoBox}>
                  <Col className={styles.hotImgBox}>
                    <img src={item.path} alt="hot" />
                  </Col>
                </Col>

                <Col className={styles.hotMain}>
                  <Col className={styles.name}>曼谷芭提雅5晚6天豪华游曼谷芭…</Col>
                  <Col className="clear">
                    <Col span={14}>团期：2017-09-09</Col>
                    <Col xspan={10} className={styles.info}>
                      库存：<span>2</span>
                    </Col>
                  </Col>
                  <Col className={[styles.price, 'clear'].join(' ')}>
                    <Col className={styles.left}>￥1280</Col>
                    <Col className={styles.right}>￥2980</Col>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>

        {/* 分页 */}
        <Row>
          <Col className={styles.historyPages}>
            <Pagination
              defaultCurrent={page}
              total={total}
              onChange={pages => this.pageChange(pages)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Discount;
