import React from 'react';
import { Row, Col, Button, Avatar, Icon, Tag, Divider, Spin } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { connect } from 'dva';

import styles from './Supplier.less';

import {readMod} from '@/utils/utils';


@connect(({ loading }) => ({
  noticesLoading: loading.effects['adminNotices/fetch'],
  announcementLoading: loading.effects['adminAnnouncements/fetch'],
}))
class Supplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      orderActive:0,
      loading: true,
    };
  }

  componentDidMount() {
    const mod = '供应商首页'
    readMod(mod,{}).then(r=>{
      this.setState({...r,loading:false});
    }).catch(e=> this.setState({loading:false}))
  }

  bizchartsRender = () => {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
      {
        item: '事例三',
        count: 17,
      },
      {
        item: '事例四',
        count: 13,
      },
      {
        item: '事例五',
        count: 9,
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    return (
      <Col>
        {[1, 2].map(item => (
          <Col span={12}>
            <Chart height={140} data={dv} scale={cols} padding={[0, 80, 0, 0]} forceFit>
              <Coord type={'theta'} radius={0.9} />
              <Axis name="percent" />
              <Legend position="right" offsetY={0} offsetX={0} />
              <Tooltip
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              {/* <Guide>
              <Html
                position={["50%", "50%"]}
                html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                alignX="middle"
                alignY="middle"
              />
            </Guide> */}
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  'item*percent',
                  (item, percent) => {
                    percent = percent * 100 + '%';
                    return {
                      name: item,
                      value: percent,
                    };
                  },
                ]}
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
              >
                <Label
                  content="percent"
                  offset={-10}
                  formatter={(val, item) => {
                    return val;
                  }}
                />
                {/* formatter={(val, item) => {
                  return item.point.item + ": " + val;
                }} */}
              </Geom>
            </Chart>
          </Col>
        ))}
      </Col>
    );
  };

  changeActive =(index) =>{
    this.setState({orderActive:index});
  }

  renderMsg() {
    const {data} = this.state;

    const { msg=[] } = data;

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
                  {item.create_at}
                </Col>
                <Col span={16} className={[styles['item-center'], 'text-overflow'].join(' ')}>
                  {item.title}
                </Col>
                <Col span={3} className={styles['item-right']}>
                  {item.state % 2 === 1 ? (
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
    const {data} = this.state;

    const { announce=[] } = data;

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
            {announce.map((item, index) => (
              <Col className={[styles.item, index > 4 ? 'hide' : ''].join(' ')} key={item.id}>
                <Col span={6} className={styles['item-left']}>
                  {item.create_at}
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


  renderRecentOrder() {
    const { data={},orderActive } = this.state;
    // eslint-disable-next-line camelcase
    const {recently_order=[]} = data;
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
                  实报待确认
                </span>
                <span
                  className={[styles.itemTag, orderActive === 3 ? styles.headerActive : ''].join(
                    ' '
                  )}
                  onClick={e => this.changeActive(3)}
                >
                  变更待确认
                </span>
              </div>
            </Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>

          <Col style={{ margin: '0 8px' }}>
            {recently_order.map((item) => (
              <Col key={item.id} className={[styles.item, 'clear'].join(' ')}>
                <Col className={styles.itemHeader}>
                  <div className={styles.hLeft}>订单号: D023456789</div>
                  <div className={styles.hRight}>占位待确认</div>
                </Col>
                <Col className={[styles.content, 'clear'].join(' ')}>
                  <Col xs={24} sm={6} md={3} lg={3} xl={3}>
                    <div className={styles.imgBox}>
                      <img alt="图片" />
                      <div className={styles.num}>编号: 89757</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={18} md={21} lg={21} xl={21} style={{ paddingLeft: '12px' }}>
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
                      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Col span={6}>
                          <div>
                            <span className={styles.lable}>客户简称：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>北京青旅</span>
                          </div>
                          <div>
                            <span className={styles.lable}>订单编号：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>D09293</span>
                          </div>
                          <div>
                            <span className={styles.lable}>订单人数：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>4人</span>
                          </div>
                        </Col>
                        <Col span={6}>
                          <div>
                            <span className={styles.lable}>出团日期：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>2019-09-29</span>
                          </div>
                          <div>
                            <span className={styles.lable}>回团日期：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>2019-10-04</span>
                          </div>
                          <div>
                            <span className={styles.lable}>出发城市：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>北京</span>
                          </div>
                        </Col>
                        <Col span={6}>
                          <div>
                            <span className={styles.lable}>应转：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>9500.00</span>
                          </div>
                          <div>
                            <span className={styles.lable}>已转：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>0.00</span>
                          </div>
                          <div>
                            <span className={styles.lable}>未转：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>9500.00</span>
                          </div>
                        </Col>
                        <Col span={6}>
                          <div>
                            <span className={styles.lable}>报名人：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>张三</span>
                          </div>
                          <div>
                            <span className={styles.lable}>确认人：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>李四</span>
                          </div>
                          <div>
                            <span className={styles.lable}>接单人：</span>
                            <span className={[styles.text, 'text-overflow'].join(' ')}>王五</span>
                          </div>
                        </Col>
                      </Col>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Col span={12} className={styles.contentR}>
                          <div className={styles.obj}>
                            <span className={styles.key}>留位时限: </span>{' '}
                            <span className={styles.val}>2018-02-02</span>
                          </div>
                        </Col>
                        <Col span={12} className={styles.contentR}>
                          <div className={styles.obj}>
                            <span className={styles.key}>订单状态: </span>{' '}
                            <span className={styles.money}>占位待确认</span>
                          </div>
                        </Col>
                      </Col>
                      <Col className={styles.contentR} span={24}>
                        {/* <Button size={'small'} className="m-r-8 m-t-4">
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
                        </Button> */}
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
    const {data={}, loading} = this.state;
    // eslint-disable-next-line camelcase
    const {account={},recently_data={}} = data;
    return (
      <Row style={{ margin: '-24px', paddingTop: '24px' }}>
        <div className={[loading ? '' : 'hide', 'Spin-box'].join(' ')}>
          <Spin tip="Loading..." />
        </div>
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
                        <Col className={styles['left-text']}>{account.name}</Col>
                      </Col>
                      <Col span={18} className={styles['content-right']}>
                        <Col className={styles.company}>{account.superior_company_name}</Col>
                        {/* <Col className={styles.brand}>--{account.superior_department_name}</Col> */}
                        <Col className={styles.brand}>{account.name}--{account.mobile}</Col>
                        <Col className={styles.brand} style={{display: 'flex', justifyContent: 'space-around', padding: 0, marginTop: '12px'}}>
                          <Button size="small" style={{fontSize: '12px', padding: '0 4px'}}>修改头像</Button>
                          <Button size="small" style={{fontSize: '12px', padding: '0 4px'}}>修改密码</Button>
                          <Button size="small" style={{fontSize: '12px', padding: '0 4px'}}>退出登录</Button>
                        </Col>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col xl={6} lg={6} md={10} sm={24} xs={24} className={styles.blocks}>
                <Row className={styles.block}>
                  <Col className="mod-title">
                    <Col className="mod-text">最近订单</Col>
                    {/* <Col className="mod-more">更多<Icon type="right" /></Col> */}
                  </Col>
                  <Divider style={{ margin: 0 }} />
                  <Col className={styles.content} style={{ padding: '0' }}>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item1, styles.center].join(' ')}>
                        <div>今日出团</div>
                        <span>{recently_data.order_dep_nums}</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item2, styles.center].join(' ')}>
                        <div>今日回团</div>
                        <span>{recently_data.order_back_nums}</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item3, styles.center].join(' ')}>
                        <div>明日出团</div>
                        <span>{recently_data.tor_order_dep_nums}</span>
                      </Col>
                    </Col>
                    <Col span={12} className={styles.c2item}>
                      <Col className={[styles.c2item4, styles.center].join(' ')}>
                        <div>明日回团</div>
                        <span>{recently_data.tor_order_back_nums}</span>
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              {/* 对账结算 */}
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
                  <Col className={styles.content}>{this.bizchartsRender()}</Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        {/* 消息提醒 */}
        <Col span={24}>
          <Row gutter={16}>
            <Col className={styles.NoticeAndActivity}>
              {this.renderMsg()}
              {this.renderAnnouncements()}
            </Col>
          </Row>
        </Col>
        {/* 销售机会(产品分类标签) */}
        <Col span={24}>
          {/* <Col>{this.renderRecentOrder()}</Col> */}
          <Col>{this.renderRecentOrder()}</Col>
        </Col>
      </Row>
    );
  }
}

export default Supplier;
