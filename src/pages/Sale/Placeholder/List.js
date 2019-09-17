import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Button, Pagination } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ModHeaderBtnFilter from '@/components/ModHeaderBtnFilter';
import ModPageHoc from '@/components/ModPageHoc';

import GroupTour from '@/components/OrderList/GroupTour';
import Booking from '@/components/OrderList/Booking';
import Visa from '@/components/OrderList/Visa';
import Traffic from '@/components/OrderList/Traffic';

import { trigger, get } from '@/utils/utils';
import { getRowBtnArray } from '@/utils/Btn';
import getEnum from '@/utils/enum';

import styles from './index.less';

/* eslint react/no-multi-comp:0 */
@connect(({ menu: menuModel, meta: { mods, actions } }) => ({
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  mods,
  actions,
}))
@ModPageHoc
class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      // eslint-disable-next-line react/no-unused-state
      search: {},
      pageSize: 10,
      currentPage: 1,
      total: 200
    };

    const { reload } = this.props;
    this.reload = reload;
    this.pageChange = this.pageChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.clickMore = this.clickMore.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  changeSearch = val => {
    const { reload } = this.props;
    if (!val) {
      this.setState({ search: val }, () => reload());
    }
    this.setState({ search: val, currentPage: 1 }, () => reload());
  };

  clickMore = (order) =>{
    return get('/sale/Order/read_detail',{id:order.id});
  }

  btnChildren = data => {
    const { location, breadcrumbNameMap, mods } = this.props;
    const modConfig = mods[breadcrumbNameMap[location.pathname].key];

    const rst = getRowBtnArray(data, modConfig.action, true);

    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action] };
      cfg.key = action;
      return cfg;
    });

    return btnCfg.map(item => (
      <Button
        style={{ margin: '0 4px' }}
        type="primary"
        ghost
        size="small"
        key={item.key}
        onClick={() => trigger(item.key, data, this.reload)}
      >
        {item.text || ''}
      </Button>
    ));
  };

  moreChildren = (detail) => {
    return (
      <Col className={styles.children}>
        <Col className={[styles.childrenMod, 'clear'].join(' ')}>
          <Col className={styles.ModTitle}>基础信息</Col>
          <Col className={styles.ModContent}>
            <Col className={[styles.ModCell, 'clear'].join(' ')}>
              <Col span={4}>订单类型:{getEnum('OrderKind')[detail.order_kind]}</Col>
              <Col span={4}>订单编号: D0{detail.id}</Col>
              <Col span={7}>提交时间: {detail.create_at}</Col>
              <Col span={9}>报名人: {detail.creator}</Col>
            </Col>
            <Col className={[styles.ModCell, 'clear'].join(' ')}>
              <Col span={4}>订单人数: {detail.num_of_people}人</Col>
              <Col span={4}>订单状态: {getEnum('OrderState')[detail.state]}</Col>
              <Col span={7}>实报通过: {detail.confirm_at}</Col>
              <Col span={9}>确认人: {detail.salr_info}</Col>
            </Col>
            <Col className={[styles.ModCell, 'clear'].join(' ')}>
              <Col span={4}>
                游客名单: <Button size="small">查看</Button>
              </Col>
              <Col span={4}>变更状态: 无变更</Col>
              <Col span={7}>变更通过: 9102-08-23 16:30:43</Col>
              <Col span={9}>接单人: {detail.assitant}</Col>
            </Col>
          </Col>
        </Col>

        <Col className={[styles.childrenMod, 'clear'].join(' ')}>
          <Col className={styles.ModTitle}>应转明细</Col>
          <Col className={styles.ModContent}>
            <Col className={[styles.ModCell, 'clear'].join(' ')}>
              <Col span={6}>转入对象: {detail.assitant}</Col>
              <Col span={6}>应转金额: {detail.settle_amount}</Col>
              <Col span={6}>已转金额: {detail.settled_amount}</Col>
              <Col span={6}>未转金额: {detail.settle_amount - detail.settled_amount }</Col>
            </Col>
          </Col>
        </Col>

        <Col className={[styles.childrenMod, 'clear'].join(' ')}>
          <Col className={styles.ModTitle}>订单备注</Col>
          <Col className={styles.ModContent}>
            {
              detail['订单备注'] && detail['订单备注'].map((val,index)=>(
                // eslint-disable-next-line react/no-array-index-key
                <Col key={`${detail.id}备注${index}`} className={[styles.ModCell, 'clear'].join(' ')}>
                  <Col span={4}>备注人:{val.creator} </Col>
                  <Col span={6}>备注时间:{val.create_at}</Col>
                  <Col span={14} className="text-overflow">
                    备注内容: {val.comment}
                  </Col>
                </Col>
              ))
            }
          </Col>
        </Col>

        <Col className={[styles.childrenMod, 'clear'].join(' ')}>
          <Col className={styles.ModTitle}>审批日志</Col>
          <Col className={styles.ModContent}>
            {detail['订单审批日志'] && detail['订单审批日志'].map(item => (
              <Col className={[styles.ModCell, 'clear'].join(' ')} key={item.id}>
                <Col span={4}>操作人: {item.op}</Col>
                <Col span={4}>动作: {getEnum('Opinion')[item.opinion]}</Col>
                <Col span={7}>操作时间: {item.create_at}</Col>
                <Col span={9}>审批备注:{item.ccomment}</Col>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
    );
  };

  pageSizeChange(current, size) {
    this.setState(
      {
        currentPage: current,
        pageSize: size,
      },
      () => this.reload()
    );
  }

  pageChange(page, size) {
    this.setState(
      {
        currentPage: page,
        pageSize: size,
      },
      () => this.reload()
    );
  }



  renderOrder(order) {
    if (order.type === '1') {
      return (
        <GroupTour data={order} key={order.id} btnChildren={this.btnChildren(order)} openChildren={this.clickMore} more={this.moreChildren} />
      );
    }
    if (order.type === '2') {
      return (
        <Traffic data={order} key={order.id} btnChildren={this.btnChildren(order)} openChildren={this.clickMore}>
          {this.moreChildren(order)}
        </Traffic>
      );
    }
    if (order.type === '3') {
      return (
        <Booking data={order} key={order.id} btnChildren={this.btnChildren(order)} openChildren={this.clickMore}>
          {this.moreChildren(order)}
        </Booking>
      );
    }
    return (
      <Visa data={order} key={order.id} btnChildren={this.btnChildren(order)} openChildren={this.clickMore}>
        {this.moreChildren(order)}
      </Visa>
    );
  }

  render() {
    const { location, breadcrumbNameMap, mods, actions } = this.props;
    const { data, pageSize, currentPage, total } = this.state;
    const modConfig = mods[breadcrumbNameMap[location.pathname].key];
    // headerPage
    const headerPage = (
      <Pagination
        size="small"
        onChange={this.pageChange}
        pageSize={pageSize}
        pageSizeOptions={['10', '20', '30', '50', '100']}
        showSizeChanger
        onShowSizeChange={this.pageSizeChange}
        current={currentPage}
        total={total}
      />
    );
    return (
      <PageHeaderWrapper headerPage={headerPage}>
        <ModHeaderBtnFilter
          modConfig={modConfig}
          actionConfig={actions}
          reload={this.reload}
          changeSearch={this.changeSearch}
        />
        <Col className={styles.List}>
          <Col className={styles.itemBox}>{data.map(item => this.renderOrder(item))}</Col>
        </Col>
      </PageHeaderWrapper>
    );
  }
}

export default List;
