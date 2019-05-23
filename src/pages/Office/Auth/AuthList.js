import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ListPage from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
/* eslint react/no-multi-comp:0 */
@connect(({ authlist, loading, menu: menuModel, meta: { mods, actions } }) => ({
  authlist,
  loading: loading.models.authlist,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  mods,
  actions,
}))
class Authlist extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pageSize: 10,
      currentPage: 1,
    };

    this.modalChild = React.createRef();

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const { currentPage, pageSize } = this.state;
    const {
      dispatch,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    const params = { start: pageSize * (currentPage - 1), limit: pageSize };
    params.mod = breadcrumbNameMap[pathname].key;
    dispatch({
      type: 'authlist/fetch',
      payload: params,
    });
  }

  render() {
    const {
      authlist: { data },
      loading,
      location: { pathname },
      breadcrumbNameMap,
      mods,
      actions,
    } = this.props;
    const config = mods[breadcrumbNameMap[pathname].key];
    return (
      <PageHeaderWrapper>
        <ListPage
          data={data}
          loading={loading}
          modConfig={config}
          actionConfig={actions}
          reload={this.reload}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Authlist;
