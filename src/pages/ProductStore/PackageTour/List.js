import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ListPage from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
/* eslint react/no-multi-comp:0 */
@connect(({ packagetourlist, loading , menu: menuModel,meta:{mods,actions}}) => ({
  packagetourlist,
  loading: loading.models.packagetourlist,
  breadcrumbNameMap:menuModel.breadcrumbNameMap,
  mods,
  actions
}))
class List extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      pageSize:100,
      currentPage:1
    };

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  reload = (cond)=>{
    const { currentPage ,pageSize} = this.state;
    const { dispatch ,location: { pathname },
      breadcrumbNameMap } = this.props;
    let params = {start:pageSize * (currentPage-1),limit:pageSize};
    params.mod = breadcrumbNameMap[pathname].key;
    params = { ...params,...cond}
    dispatch({
      type:'packagetourlist/fetch',
      payload:params
    })
  }


  render(){
    
    const {
      packagetourlist:{data},
      loading,
      location: { pathname },
      breadcrumbNameMap,
      mods,
      actions
    }  = this.props;

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

export default List;
