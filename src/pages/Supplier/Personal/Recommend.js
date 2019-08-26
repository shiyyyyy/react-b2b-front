// 推介产品
import React, { Fragment } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Tooltip, Badge, Dropdown } from 'antd';

import styles from './Recommend.less';

class Recommend extends React.Component {
  constructor() {
    super();
    this.state = {
      cur_pro_id: '', // 当前展开列表id
      data: {
        recommend: [
          { id: '1', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '2', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '3', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '4', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
        ],
        discount: [
          {
            url:
              'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg',
            id: '1',
            path: 'lalalla',
          },
          {
            url: 'http://attachments.gfan.com/forum/201504/15/202327b405oo5c0bgz01oo.jpg',
            id: '2',
            path: 'lalalla',
          },
          { url: 'http://t1.niutuku.com/960/45/45-439758.jpg', id: '3', path: 'lalalla' },
          {
            url: 'http://pic25.photophoto.cn/20121211/0005018603291216_b.jpg',
            id: '4',
            path: 'lalalla',
          },
          {
            url: 'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg',
            id: '5',
            path: 'lalalla',
          },
          {
            url: 'http://img2.imgtn.bdimg.com/it/u=1033197597,3656846721&fm=26&gp=0.jpg',
            id: '6',
            path: 'lalalla',
          },
        ],
      },
    };
  }

  // 点击查看详情 展开团期列表
  checkDetail(id) {
    console.log(id);
    if (id === this.state.cur_pro_id) {
      this.setState({ cur_pro_id: '' });
    } else {
      this.setState({ cur_pro_id: id });
    }
  }

  render() {
		const { data: {discount, recommend} } = this.state;
    return (
      <div className={styles.Recommend}>
        {/* 产品推介 */}
        <Row className={styles.pro}>
          <div className="mod-title">
            <span className="mod-text">主推产品</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.proInfo}>
            {recommend.map((item, index) => (
              <Col className={styles.infoItem} key={item.id}>
								<Col className={[styles.itemTop, (this.state.cur_pro_id === item.id ? styles.itemTopActive : '')].join(' ')}>
                  <Col span={3} className={styles.imgBox}>
                    <img
                      src="http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg"
                      className={styles.img}
                      alt="产品图片"
                    />
                    <span className={styles.imgText}>产品编号: P0-4396</span>
                  </Col>
                  <Col span={21} style={{ paddingLeft: '20px' }}>
                    <Col className={styles.rTop}>
                      <span className={styles.name}>
                        超值无忧泰一地,体验泰国风情超值无忧泰一地,体验泰国风情
                      </span>
                      <span className={styles.tag1}>跟团游</span>
                      <span className={styles.tag2}>蜜月游</span>
                    </Col>
                    <Col className={styles.rCenter}>
                      <Col span={10} className={styles.centerL}>
                        <div>
                          分类标签: <span>东南亚-泰一地</span>
                        </div>
                        <div>
                          供应商: <span>广西桂林甲天下之旅</span>
                        </div>
                        <div className="text-overflow">
                          最近班期:{' '}
                          <span>
                            2018-09-08、2018-12-12、2018-11-11、2018-12-21、2018-12-12、2018-11-11
                          </span>
                        </div>
                      </Col>
                      <Col span={14} className={styleMedia.centerR}>
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
                        </Col>
                      </Col>
                    </Col>
                    <Col className={styles.rBtn}>
                      <Col span={20} className={styles.rBtnLeft}>
                        <div>北京出发</div>
                        <div>5晚6天</div>
                        <div>飞机来回</div>
                        <div>无自费</div>
                        <div>无购物</div>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          icon={this.state.cur_pro_id === item.id ? 'caret-up' : 'caret-down'}
                          size="small"
                          ghost
                          onClick={_ => this.checkDetail(item.id)}
                        >
                          查看详情
                        </Button>
                      </Col>
                    </Col>
                  </Col>
                </Col>

                <Col
                  className={[styles.btm, (this.state.cur_pro_id === item.id ? '' : 'hide')].join(' ')}
                >
                  <Col className={styles.listBox}>
                    <Col span={24} className={styles.groupTitle}>
                      <Col span={4}>团号</Col>
                      <Col span={3}>出团日期</Col>
                      <Col span={3}>回团日期</Col>
                      <Col span={3}>同行价</Col>
                      <Col span={3}>销售价</Col>
                      <Col span={3}>利润</Col>
                      <Col span={3}>总位</Col>
                      <Col span={2}>剩余</Col>
                    </Col>
                    {item.group.map(list => (
                      <Col className={styles.list} key={list.id}>
                        <Col className={styles.listMain}>
                          <Col span={4}>RNG-60E-HZ-SM-S8</Col>
                          <Col span={3}>2018-08-12</Col>
                          <Col span={3}>2018-08-20</Col>
                          <Col span={3}>￥24000</Col>
                          <Col span={3}>￥28888</Col>
                          <Col span={3}>￥4888</Col>
                          <Col span={3}>100</Col>
                          <Col span={2}>20</Col>
                        </Col>
                        <Col className={styles.listBtn}>
                          <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                            查看
                          </Button>
                          <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                            下载
                          </Button>
                          <Button type="primary" size="small" ghost>
                            占位
                          </Button>
                        </Col>
                      </Col>
                    ))}
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
        {/* 尾货甩卖 */}
        <Row className={styles.discount}>
          <div className="mod-title">
            <span className="mod-text">尾货甩卖</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.content}>
            {discount.map((item, index) => (
              <Col
                className={[styles.item,(index > 4 ? 'hide' : '')].join(' ')}
                key={item.id}
              >
                <Col className={styles.itemPhoto} key={item.id}>
                  <img
                    src={
                      item.url
                        ? item.url
                        : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'
										}
										className="img-size"
										alt="产品图片"										
                  />
                </Col>
                <Col className={styles.itemInfo}>
                  <Col span={16} className={styles.info}>
                    <div className={styles.name}>南非欧洲双周双洲尽情游</div>
                    <div className={styles.dep_date}>2018-08-08 &nbsp; 库存: 20</div>
                  </Col>
                  <Col span={7} push={1} className={styles.priceBox}>
                    <div className={styles.originPrice}>￥28888</div>
                    <div className={styles.discountPrice}>￥19999</div>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Recommend);
