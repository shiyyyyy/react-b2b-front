import React from 'react';
import { Row, Col, Button, Avatar, Icon, Tag, Divider } from 'antd';
import { connect } from 'dva';

import styles from './Retailer.less';

const backDatePng = require('@public/img/back_date.png');

@connect(({ loading }) => ({
  noticesLoading: loading.effects['adminNotices/fetch'],
  announcementLoading: loading.effects['adminAnnouncements/fetch'],
}))
class Retailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderActive: 0,
      msg: [
        { id: 0, title: '标题', text: '我是内容', date: '2018-08-08' },
        { id: 1, title: '标题', text: '我是内容', date: '2018-08-08' },
        { id: 2, title: '标题', text: '我是内容', date: '2018-08-08' },
      ],
      discount: [
        {
          path: 'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg',
          name: '东南亚4国连游',
          id: '1',
          Yesterday: '29999',
          terday: '28888',
        },
        {
          path: 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
          name: '东南亚4国连游',
          id: '2',
          Yesterday: '19999',
          terday: '18888',
        },
        {
          path:
            'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg',
          name: '东南亚4国连游',
          id: '3',
          Yesterday: '9999',
          terday: '8888',
        },
        {
          path: 'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg',
          name: '东南亚4国连游',
          id: '4',
          Yesterday: '13899',
          terday: '9999',
        },
        {
          path: 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
          name: '东南亚4国连游',
          id: '5',
          Yesterday: '24999',
          terday: '20999',
        },
      ],
      Sales: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      order: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  changeActive(index) {
    this.setState({ orderActive: index });
  }

  renderNotices() {
    console.log(this);
    const { msg } = this.state;

    return (
      <Col xl={14} lg={14} md={14} sm={24} xs={24}>
        <Row className={styles.block}>
          <Col className="mod-title">
            <Col className="mod-text">消息通知</Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={styles.content}>
            {msg.map((item, index) => (
              <Col className={[styles.item, index > 4 ? 'hide' : ''].join(' ')} key={item.id}>
                <Col span={5} className={styles['item-left']}>
                  {item.date}
                </Col>
                <Col span={16} className={[styles['item-center'], 'text-overflow'].join(' ')}>
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
          </Col>
        </Row>
      </Col>
    );
  }

  renderAnnouncements() {
    const { msg } = this.state;
    return (
      <Col xl={10} lg={10} md={10} sm={24} xs={24}>
        <Row className={styles.block}>
          <Col className="mod-title">
            <Col className="mod-text">平台公告</Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={styles.content}>
            {msg.map((item, index) => (
              <Col className={[styles.item, index > 4 ? 'hide' : ''].join(' ')} key={item.id}>
                <Col span={6} className={styles['item-left']}>
                  {item.date}
                </Col>
                <Col span={18} className={[styles['item-center'], 'text-overflow'].join(' ')}>
                  {item.title}
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
      </Col>
    );
  }

  renderProductHot() {
    const { discount: data } = this.state;
    const title = '猜你喜欢';
    const more = '更多';
    const maxNum = 4;
    return (
      <Row gutter={16}>
        <Col>
          <Col>
            <Col className="mod-title-one">
              <Col className="mod-text">{title}</Col>
              <Col className={more ? 'mod-more' : 'hide'}>
                {more}
                <Icon type="right" />
              </Col>
            </Col>
            <div
              className={[styles.ProductHot, 'clear'].join(' ')}
              style={{ marginLeft: '-8px', marginRight: '-8px' }}
            >
              {data.map((item, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  className={styles.itemPadding}
                  key={item.id}
                >
                  <div className={[styles.item, index >= maxNum ? 'hide' : ''].join(' ')}>
                    <div className={styles['item-photo']}>
                      <img
                        src={
                          item.url
                            ? item.url
                            : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'
                        }
                        alt="产品热度图片"
                        className={styles.img}
                      />
                    </div>
                    <div className={styles['item-pro-info']}>
                      <div className={[styles['info'], 'text-overflow-2'].join(' ')}>
                        南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游
                      </div>
                      <div className={styles['prici-discount']}>
                        <div className={styles['origin-price']}>
                          昨日访问: <span style={{ color: '#F43266' }}>{288}</span>
                        </div>
                        <div className={styles['price']}>
                          今日访问: <span style={{ color: '#F43266' }}>{888}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </div>
          </Col>
        </Col>
      </Row>
    );
  }

  examine = (e, item) => {
    console.log(e, item);
    console.log(this);
    console.log('审核');
  };

  check = (e, item) => {
    console.log(e, item);
    console.log('查看');
  };

  renderRecentOrder() {
    const { order: data, orderActive } = this.state;

    return (
      <Row>
        <Col className={styles.RecentOrder}>
          <Col className="mod-title-one" style={{ marginLeft: '8px', marginRight: '8px' }}>
            <Col className="mod-text">
              最近订单
              <div className={styles.headerTags}>
                <span
                  className={[styles.itemTag, orderActive === 0 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(0)}
                >
                  全部
                </span>
                <span
                  className={[styles.itemTag, orderActive === 1 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(1)}
                >
                  占位待确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 2 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(2)}
                >
                  占位已确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 3 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(3)}
                >
                  实报待确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 4 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(4)}
                >
                  实报已确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 5 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(5)}
                >
                  变更待确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 6 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(6)}
                >
                  变更已确认
                </span>
              </div>
            </Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>

          <Col style={{ margin: '0 8px' }}>
            {data.map((item, index) => (
              <Col key={index} className={[styles.item, 'clear'].join(' ')}>
                <Col className={styles.itemHeader}>
                  <div className={styles.hLeft}>订单号: D023456789</div>
                  <div className={styles.hRight}>占位待确认</div>
                </Col>
                <Col className={[styles.content, 'clear'].join(' ')}>
                  <Col xs={24} sm={6} md={3} lg={3} xl={3}>
                    <div className={styles.imgBox}>
                      <img src={require('@public/favicon.png')} alt="图片" />
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
                        <Tag color="blue">跟团游</Tag>
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
                          <Button size={'small'} className="m-r-8 m-t-4">
                            上架
                          </Button>
                          <Button size={'small'} className="m-r-8 m-t-4">
                            修改
                          </Button>
                          <Button size={'small'} className="m-r-8 m-t-4">
                            删除
                          </Button>
                          <Button size={'small'} className="m-r-8 m-t-4">
                            复制
                          </Button>
                        </Col>
                      </Col>
                    </Col>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Row>
        {/* 个人信息 */}
        <Col span={24}>
          <Row gutter={16}>
            <Col className={styles.ThreeEqualBlock}>
              <Col xl={8} lg={8} md={24} sm={24} xs={24} className={styles.blocks}>
                <Row className={styles.block}>
                  <Col className="mod-title">
                    <Col className="mod-text">个人信息</Col>
                    <Col className="mod-more">
                      个人设置
                      <Icon type="right" />
                    </Col>
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={styles.content}>
                    <Col className={styles.content1}>
                      <Col span={6} style={{ textAlign: 'center' }}>
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
              <Col xl={6} lg={6} md={10} sm={24} xs={24} className={styles.blocks}>
                <Row className={styles.block} gutter={0}>
                  <Col className="mod-title">
                    <Col className="mod-text">最近订单</Col>
                    {/* <Col className="mod-more">更多<Icon type="right" /></Col> */}
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={styles.content} style={{ padding: '0' }}>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item1, styles.center].join(' ')}>
                        <div>今日出团</div>
                        <span>24</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item2, styles.center].join(' ')}>
                        <div>今日回团</div>
                        <span>32</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item3, styles.center].join(' ')}>
                        <div>明日出团</div>
                        <span>24</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item4, styles.center].join(' ')}>
                        <div>明日回团</div>
                        <span>32</span>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col xl={10} lg={10} md={14} sm={24} xs={24} className={styles.blocks}>
                <Row className={styles.block}>
                  <Col className="mod-title">
                    <Col className="mod-text">任务审批</Col>
                    <Col className="mod-more">
                      更多
                      <Icon type="right" />
                    </Col>
                  </Col>
                  <Divider style={{ margin: 0 }} />
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
        {/* 最近订单 */}
        <Col span={24}>
          <Col>{this.renderRecentOrder()}</Col>
        </Col>
      </Row>
    );
  }
}

export default Retailer;
