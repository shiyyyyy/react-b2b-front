import React, { PureComponent } from 'react';
import {Table,Divider,Button} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';

/* eslint react/no-multi-comp:0 */
@connect(({ product, loading }) => ({
  product,
  loading: loading.models.product,
}))
class ProductList extends PureComponent {
  state = {
    pageSize:10,
    currentPage:1
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentPage, pageSize} = this.state;
    const params = {start:pageSize * (currentPage-1),limit:pageSize,mod:'产品管理'};
    dispatch({
      type: 'product/fetch',
      payload:params
    });
  }

  onEdit(pd){
    const { dispatch } = this.props;
    dispatch({
      type:'product/edit',
      payload:{id:pd.id}
    })
  }

  render(){
    const columns = [{
      title: '产品名称',
      dataIndex: 'pd_name',
      key: 'pd_name',
      render: text => <a>{text}</a>,
    }, {
      title: '产品编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '供应商',
      dataIndex: 'sup_id',
      key: 'sup_id',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={()=>this.onEdit(record)}>
            编辑
          </Button>
          <Divider type="vertical" />
        </span>
      ),
    }];

    const {
      product:{data},
      loading,
      location:{pathname} 
    }  = this.props;
    const routerConfig = getRouteAuthority(pathname);
    return (
      <PageHeaderWrapper>
        <Table columns={columns} dataSource={data?data.list:[]} rowKey='id' loading={loading} />
      </PageHeaderWrapper>
    );
  }
}

export default ProductList;
