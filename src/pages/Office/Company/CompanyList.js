import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ListPage from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
/* eslint react/no-multi-comp:0 */
@connect(({ companylist, loading, menu: menuModel, meta: { mods, actions } }) => ({
  companylist,
  loading: loading.models.companylist,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  mods,
  actions,
}))
class CompanyList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 100,
      currentPage: 1,
    };
    this.reload = this.reload.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  reload = cond => {
    const {
      dispatch,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    const { currentPage, pageSize } = this.state;
    let params = { start: pageSize * (currentPage - 1), limit: pageSize };
    params.mod = breadcrumbNameMap[pathname].key;
    params = { ...params, ...cond };
    dispatch({
      type: 'companylist/fetch',
      payload: params,
    });
  }

  pageChange(page, pageSize) {
    console.log(page, pageSize);
    this.setState(
      {
        currentPage: page,
      },
      () => this.reload()
    );
  }

  pageSizeChange(current, size) {
    console.log(current, size);
    this.setState(
      {
        currentPage: current,
        pageSize: size
      },
      () => this.reload()
    );
  }

  render() {
    const {
      companylist: { data, total },
      loading,
      location: { pathname },
      breadcrumbNameMap,
      mods,
      actions,
    } = this.props;
    const { currentPage, pageSize } = this.state;

    const config = mods[breadcrumbNameMap[pathname].key];
    const page = {
      pageSize,
      total,
      current: currentPage,
      onChange: this.pageChange,
      onShowSizeChange: this.pageSizeChange,
    };

    return (
      <PageHeaderWrapper>
        <ListPage
          data={data}
          loading={loading}
          modConfig={config}
          actionConfig={actions}
          reload={this.reload}
          page={page}
        />
      </PageHeaderWrapper>
    );
  }
}

export default CompanyList;
