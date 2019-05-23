import React from 'react';
import { Row, Col, Button, Avatar, Icon } from 'antd';
import { ProductHot, ProductTypeTag, RecentOrder } from '@/components/Common';
import { connect } from 'dva';

import styles from './index.less';


const backDatePng = require('@public/img/back_date.png');

@connect(({ notices, announcements,loading }) => ({
  notices,
  announcements,
  noticesLoading: loading.effects['notices/fetch'],
  announcementLoading:loading.effects['announcements/fetch']
}))
class SupplierIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: [
        { path: 'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', name: '东南亚4国连游', id: '1', Yesterday: '29999', terday: '28888' },
        { path: 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg', name: '东南亚4国连游', id: '2', Yesterday: '19999', terday: '18888' },
        { path: 'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', name: '东南亚4国连游', id: '3', Yesterday: '9999', terday: '8888' },
        { path: 'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg', name: '东南亚4国连游', id: '4', Yesterday: '13899', terday: '9999' },
        { path: 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg', name: '东南亚4国连游', id: '5', Yesterday: '24999', terday: '20999' },
      ],
      Sales: [
        {id:1},{id:2},{id:3},{id:4}
      ],
      order: [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
      ]
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'notices/fetch'
    });
    dispatch({
      type: 'announcements/fetch'
    })
  }

  renderNotices(){
    const {
      notices:{list},
      noticesLoading
    } =  this.props;

    return (
      <Col xl={16} lg={16} md={16} sm={24} xs={24}>
        <Row>
          <Col className="mod-title">
            <Col className="mod-text">消息通知</Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>
          <Col className={styles.content}>
            { !noticesLoading && list.map((item, index) => (
              <Col
                className={[styles.item, index > 4 ? 'hide' : ''].join(' ')}
                key={item.id}
              >
                <Col span={5} className={styles['item-left']}>
                  {item.date}
                </Col>
                <Col
                  span={16}
                  className={[styles['item-center'], 'text-overflow'].join(' ')}
                >
                  {item.title}
                </Col>
                <Col span={3} className={styles['item-right']}>
                  {index % 2 === 1 ? (
                    <span>已读</span>
                  ) : (
                    <span style={{ color: '#03bb7b' }}>未读</span>
                  )}
                </Col>
              </Col>
            ))}
            {
              noticesLoading && <span></span>
            }
          </Col>
        </Row>
      </Col>
      );
  }

  renderAnnouncements(){
    const {
      announcements:{list},
      announcementsLoading
    } = this.props;
    return (
      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
        <Row>
          <Col className="mod-title">
            <Col className="mod-text">平台公告</Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>
          <Col className={styles.content}>
            {!announcementsLoading && list.map((item, index) => (
              <Col
                className={[styles.item, index > 4 ? 'hide' : ''].join(' ')}
                key={item.id}
              >
                <Col span={6} className={styles['item-left']}>
                  {item.date}
                </Col>
                <Col
                  span={18}
                  className={[styles['item-center'], 'text-overflow'].join(' ')}
                >
                  {item.title}
                </Col>
              </Col>
            ))}
            {
              announcementsLoading && <span></span>
            }
          </Col>
        </Row>
      </Col>
    );

  }


  renderProductHot(){
    const { discount: data } = this.state;
    const cfg = {
      title: '产品热度',
      more: '更多',
      data,
      maxNum: 4, // 最大数量(多过隐藏) 
    };
    return (<ProductHot {...cfg} />)
  }

  renderProductTypeTag() {
    const { Sales: data } = this.state;
    const cfg = {
      title: (
        <span>
          销售机会
          <span style={{ fontSize: '12px', fontWeight: '400', color: '#B1BCD1', marginLeft: '32px'}}>
            (这些搜索记录都不是你想要的?
            <span style={{ color: '#5B83FB', cursor: 'pointer'}}>点击这里</span>
            更改您关注的产品分类标签)
          </span>
        </span>
      ),
      more: '更多',
      data,
      maxNum: 4, // 最大数量(多过隐藏)
    };
    return <ProductTypeTag {...cfg} />;
  }

  renderRecentOrder() {
    const { order: data } = this.state;

    return <RecentOrder data={data} />
  }
  

  render() {
    return (
      <Row style={{ margin: '24px' }}>
        {/* 个人信息 */}
        <Col span={24}>
          <Row gutter={16}>
            <Col className={styles.ThreeEqualBlock}>
              <Col xl={10} lg={10} md={24} sm={24} xs={24} className={styles.block}>
                <Row>
                  <Col className="mod-title">
                    <Col className="mod-text">个人信息</Col>
                    <Col className="mod-more">
                      个人设置
                      <Icon type="right" />
                    </Col>
                  </Col>
                  <Col className={styles.content}>
                    <Col className={styles.content1}>
                      <Col span={6}>
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          size={64}
                        />
                        <Col className={styles['left-text']}>个人中心</Col>
                      </Col>
                      <Col span={18} className={styles['content-right']}>
                        <Col className={styles.company}>北京凤凰假期国际旅行社有限责任公司</Col>
                        <Col className={styles.brand}>--环宇风情</Col>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col xl={6} lg={6} md={10} sm={24} xs={24} className={styles.block}>
                <Row>
                  <Col className="mod-title">
                    <Col className="mod-text">最近订单</Col>
                    {/* <Col className="mod-more">更多<Icon type="right" /></Col> */}
                  </Col>
                  <Col className={styles.content}>
                    <Col span={12} className={styles.c2item}>
                      <img
                        src={backDatePng}
                        className={styles.icon}
                        alt="日历图标"
                      />
                      <Col className={styles.icon}>今日出团</Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <img
                        src={backDatePng}
                        className={styles.icon}
                        alt="日历图标"
                      />
                      <Col className={styles.icon}>今日出团</Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <img
                        src={backDatePng}
                        className={styles.icon}
                        alt="日历图标"
                      />
                      <Col className={styles.icon}>今日出团</Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <img
                        src={backDatePng}
                        className={styles.icon}
                        alt="日历图标"
                      />
                      <Col className={styles.icon}>今日出团</Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col xl={8} lg={8} md={14} sm={24} xs={24} className={styles.block}>
                <Row>
                  <Col className="mod-title">
                    <Col className="mod-text">对账结算</Col>
                    <Col className="mod-more">
                      更多
                      <Icon type="right" />
                    </Col>
                  </Col>
                  <Col className={styles.content}>
                    <Col className={styles.c3item}>
                      <Col className={styles.left}>
                        我的余额：<span>2387986.55</span>
                      </Col>
                      <Col className={styles.right}>
                        <Button size="small" ghost type="primary">
                          明细
                        </Button>
                      </Col>
                    </Col>
                    <Col className={styles.c3item}>
                      <Col className={styles.left}>
                        用券抵扣：<span>4536.34</span>
                      </Col>
                      <Col className={styles.right}>
                        <Button size="small" ghost type="primary">
                          明细
                        </Button>
                      </Col>
                    </Col>
                    <Col className={styles.c3item}>
                      <Col className={styles.left}>
                        优&nbsp;&nbsp;惠&nbsp;&nbsp;券：<span>16</span>
                      </Col>
                      <Col className={styles.right}>
                        <Button size="small" ghost type="primary">
                          领券
                        </Button>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        {/* 消息提醒 */}
        <Col span={24}>
          <Row gutter={16}>
            <Col className={styles.NoticeAndActivity}>
              {this.renderNotices()}
              {this.renderAnnouncements()}
            </Col>
          </Row>
        </Col>
        {/* 产品热度 */}
        <Col span={24}>
          <Col>{this.renderProductHot()}</Col>
        </Col>
        {/* 销售机会(产品分类标签) */}
        <Col span={24}>
          <Col>{this.renderProductTypeTag()}</Col>
        </Col>
        {/* 销售机会(产品分类标签) */}
        <Col span={24}>
          <Col>{this.renderRecentOrder()}</Col>
        </Col>
      </Row>
    );
  }
}

export default SupplierIndex;
