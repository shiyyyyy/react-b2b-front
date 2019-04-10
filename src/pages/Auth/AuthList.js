import React, { PureComponent } from 'react';
import {Divider,Button} from 'antd';
import { connect } from 'dva';
import ListPage from '@/components/CommonTable';

/* eslint react/no-multi-comp:0 */
@connect(({ authlist, loading }) => ({
  authlist,
  loading: loading.models.authlist,
}))
class AuthList extends PureComponent {
  state = {
    pageSize:10,
    currentPage:1
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentPage, pageSize} = this.state;
    const params = {start:pageSize * (currentPage-1),limit:pageSize};
    dispatch({
      type: 'authlist/fetch',
      payload:params
    });
  }

  onEdit(auth){
    const { dispatch } = this.props;
    dispatch({
      type:'authlist/edit',
      payload:{id:auth.id}
    })
  }

  render(){
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width:200,
      render: text => <a>{text}</a>,
    },{
      title: '适用范围',
      dataIndex: 'scope',
      width:200,
      key: 'scope',
    }, {
      title: '按钮',
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
      authlist:{data},
      loading
    }  = this.props;
    const textSerach = {
      'name':{'text':'名称'},
      'scope':{'text':'范围'}
    };

    const moreSearch = {
      'employee':{'text':'创建人','type':'Employee'},
      'data1':{'text':'时间','type':'Date'}
    };
    return (
      <ListPage 
        columns={columns} 
        dataSource={data} 
        rowKey='id' 
        loading={loading} 
        textSerach={textSerach}
        moreSearch={moreSearch}
        title="权限设置" 
      />
    );
  }
}

export default AuthList;
