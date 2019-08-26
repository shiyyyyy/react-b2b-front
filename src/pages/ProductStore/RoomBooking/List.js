import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Col, Button, Pagination } from 'antd';
import ProType from '@/components/ProType';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ModHeaderBtnFilter from '@/components/ModHeaderBtnFilter';
import ModPageHoc from '@/components/ModPageHoc';

import { trigger } from '@/utils/utils';
import {getRowBtnArray} from '@/utils/Btn';

import styles from './index.less';

const { Booking } = ProType;

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
      pageSize: 10,
      currentPage: 1,
      loading: true,
      total: 200,
    };

    const {reload} = this.props;
    this.reload = reload;
    this.pageChange = this.pageChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  btnChildren = data => {
    const { location, breadcrumbNameMap, mods } = this.props;
    const modConfig = mods[breadcrumbNameMap[location.pathname].key];

    const rst =  getRowBtnArray(data,modConfig.action,true);

    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action] };
      cfg.key = action;
      return cfg;
    });

    return btnCfg.map((item) => (
      <Button
        style={{ margin: '0 4px' }}
        type="primary"
        ghost
        size="small"
        key={item.key}
        onClick={() => trigger(item.key, data,this.reload)}
      >
        {item.text || ''}
      </Button>
    ));
  }

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

  render() {
    const { location, breadcrumbNameMap, mods } = this.props;
    const {data, pageSize, currentPage, total } = this.state;
    const modConfig = mods[breadcrumbNameMap[location.pathname].key];
    // headerPage
    const headerPage = (
      <Pagination
        size="small"
        onChange={this.pageChange}
        pageSize={pageSize}
        pageSizeOptions={['10','20','30','50','100']}
        showSizeChanger
        onShowSizeChange={this.pageSizeChange}
        current={currentPage}
        total={total}
      />
    );
    return (
      <PageHeaderWrapper headerPage={headerPage}>
        <ModHeaderBtnFilter modConfig={modConfig} reload={this.reload} />
        <Col className={styles.List}>
          <Col className={styles.itemBox}>
            {data.map(item => (
              <Booking data={item} key={item.id} btnChildren={this.btnChildren(item)} />
            ))}
          </Col>
        </Col>
      </PageHeaderWrapper>
    );
  }
}

export default List;
