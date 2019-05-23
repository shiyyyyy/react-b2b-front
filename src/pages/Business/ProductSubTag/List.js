import React, { PureComponent } from 'react';
import { connect } from 'dva';
import ListPage from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
/* eslint react/no-multi-comp:0 */
@connect(({ productsubtaglist, loading , menu: menuModel,meta:{mods,actions}}) => ({
  productsubtaglist,
  loading: loading.models.productsubtaglist,
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

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch ,location: { pathname },
      breadcrumbNameMap } = this.props;
    const { currentPage, pageSize} = this.state;
    const params = {start:pageSize * (currentPage-1),limit:pageSize};
    params.mod = breadcrumbNameMap[pathname].key;
    dispatch({
      type: 'productsubtaglist/fetch',
      payload:params
    });
  }

  handleSearch = (cond)=>{
    const { currentPage ,pageSize} = this.state;
    const { dispatch ,location: { pathname },
      breadcrumbNameMap } = this.props;
    let params = {start:pageSize * (currentPage-1),limit:pageSize};
    params.mod = breadcrumbNameMap[pathname].key;
    params = { ...params,...cond}
    dispatch({
      type:'productsubtaglist/fetch',
      payload:params
    })
  }


  render(){
    
    const {
      productsubtaglist:{data},
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
          handleSearch={this.handleSearch}
        />
      </PageHeaderWrapper>
    );
  }
}

export default List;
