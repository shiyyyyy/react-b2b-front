/* eslint-disable camelcase */
import React from 'react';
import { Row, Col, Button, Avatar, Icon, Divider, Spin } from 'antd';
import { connect } from 'dva';

import {readMod} from '@/utils/utils';
import {AppConst} from '@/utils/const';

import styles from './Admin.less';

@connect(({ loading,user:{currentUser} }) => ({
  noticesLoading: loading.effects['adminNotices/fetch'],
  announcementLoading: loading.effects['adminAnnouncements/fetch'],
  currentUser
}))
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      data: {
        account: {}
      },
    };
  }

  componentDidMount() {
    const mod = '管理员首页'
    readMod(mod,{}).then(r=>{
      this.setState({...r,loading:false});
    }).catch(e=> this.setState({loading:false}))
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
              // eslint-disable-next-line react/no-array-index-key
              <Col className={[styles.item, index > 4 ? 'hide' : ''].join(' ')} key={`${item.id}index${index}`}>
                <Col span={8} className={styles['item-left']}>
                  {item.create_at}
                </Col>
                <Col span={13} className={[styles['item-center'], 'text-overflow'].join(' ')}>
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
      <Col xl={14} lg={14} md={14} sm={24} xs={24}>
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
              // eslint-disable-next-line react/no-array-index-key
              <Col className={[styles.item, index > 4 ? 'hide' : ''].join(' ')} key={`${item.id}index${index}`}>
                <Col span={8} className={styles['item-left']}>
                  {item.create_at}
                </Col>
                <Col span={16} className={[styles['item-center'], 'text-overflow'].join(' ')}>
                  {item.title}
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
      </Col>
    );
  }

  renderRecentlyData(){
    const {data} = this.state;

    const { recently_data={} } = data;

    return (
      <Col xl={10} lg={10} md={10} sm={24} xs={24}>
        <Row className={styles.block}>
          <Col className="mod-title">
            <Col className="mod-text">最近数据</Col>
          </Col>
          <Divider style={{ margin: 0 }} />
          <Col className={styles.content} style={{ padding: '0' }}>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item1, styles.center].join(' ')}>
                <div>平台全部产品</div>
                <span>{recently_data.pd_nums}</span>
              </Col>
            </Col>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item2, styles.center].join(' ')}>
                <div>本月新增产品</div>
                <span>{recently_data.pd_month_nums}</span>
              </Col>
            </Col>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item3, styles.center].join(' ')}>
                <div>本周新增产品</div>
                <span>{recently_data.pd_week_nums}</span>
              </Col>
            </Col>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item4, styles.center].join(' ')}>
                <div>平台全部商家</div>
                <span>{recently_data.supp_nums}</span>
              </Col>
            </Col>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item4, styles.center].join(' ')}>
                <div>本月新增商家</div>
                <span>{recently_data.supp_month_nums}</span>
              </Col>
            </Col>
            <Col span={8} className={styles.c2item}>
              <Col className={[styles.c2item4, styles.center].join(' ')}>
                <div>本周新增商家</div>
                <span>{recently_data.supp_week_nums}</span>
              </Col>
            </Col>
          </Col>
        </Row>
      </Col>
    );
  }

  renderApproveFlow(){
    const {data} = this.state;
    // eslint-disable-next-line camelcase
    const {msg_flow=[]} = data;
    
    return (
      <Col xl={14} lg={14} md={14} sm={24} xs={24} className={styles.blocks}>
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
            {msg_flow.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col className={[styles.item, index > 4 ? 'hide' : '', 'clear'].join(' ')} key={`${item.id}index${index}`}>
                <Col span={8} className={styles['item-left']}>
                  {item.create_at}
                </Col>
                <Col span={16} className={[styles['item-center'], 'text-overflow'].join(' ')}>
                  {item.title}
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    const {data, loading} = this.state;
    const {account} = data;
    return (
      <Row>
        <div className={[loading ? '' : 'hide', 'Spin-box'].join(' ')}>
          <Spin tip="Loading..." />
        </div>
        {/* 个人信息 */}
        <Col span={24}>
          <Row gutter={16}>
            <Col className={styles.ThreeEqualBlock}>
              <Col xl={10} lg={10} md={24} sm={24} xs={24} className={styles.blocks}>
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
                      <Col span={8} style={{ textAlign: 'center' }}>
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          size={64}
                        />
                        <Col className={styles['left-text']}>{account.name}</Col>
                      </Col>
                      <Col span={16} className={styles['content-right']}>
                        <Col className={styles.title}>中国旅游B2B数据交互服务中心</Col>
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
              {this.renderApproveFlow()}

            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={16} className={styles.blocks}>
            <Col className={styles.NoticeAndActivity}>
              {this.renderAnnouncements()}
              {this.renderRecentlyData()}
            </Col>
          </Row>
        </Col>
        
        <Col span={24}>
          <Row gutter={16} className={styles.blocks}>
            <Col className={styles.NoticeAndActivity}>
              {this.renderMsg()}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Admin;
