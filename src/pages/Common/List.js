import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd';
import ListPage from '@/components/Table/ListPage';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ModPageHoc from '@/components/ModPageHoc';
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
      data:[],
      pageSize: 10,
      currentPage: 1,
      loading:true,
      total:0
    };

    const {reload} = this.props;
    this.reload = reload;
    this.pageChange = this.pageChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }

  pageChange(page, size) {
    this.setState(
      {
        currentPage: page,
        pageSize:size
      },()=>{
        this.reload();
      }
    );
  }

  pageSizeChange(current, size) {
    this.setState(
      {
        currentPage: current,
        pageSize: size
      },()=>
      {
        this.reload()
      }
    );
  }

  render() {
    const {
      location,
      breadcrumbNameMap,
      mods,
      actions,
    } = this.props;
    const {data,pageSize,currentPage,total,loading} = this.state;
    const mod = breadcrumbNameMap[location.pathname].key;
    const config = mods[mod];

    // const paging = {
    //   pageSize,
    //   total,
    //   current: currentPage,
    //   onChange: this.pageChange,
    //   onShowSizeChange: this.pageSizeChange,
    // };

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
        <ListPage
          dataSource={data}
          modConfig={config}
          actionConfig={actions}
          reload={this.reload}
          loading={loading}
          // page={paging}
          mod={mod}
        />
      </PageHeaderWrapper>
    );
  }
}

export default List;
