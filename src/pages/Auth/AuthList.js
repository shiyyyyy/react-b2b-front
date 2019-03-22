import React, { PureComponent } from 'react';
import {Table,Divider,Button} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { getRouteAuthority } from '@/utils/utils';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/Exception/403';
import styles from './AuthList.less';

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
    const params = {start:pageSize * (currentPage-1),limit:pageSize,mod:'权限管理'};
    dispatch({
      type: 'authlist/load',
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
      render: text => <a>{text}</a>,
    },{
      title: '适用范围',
      dataIndex: 'scope',
      key: 'scope',
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
      authlist:{data},
      loading,
      location:{pathname} 
    }  = this.props;
    const routerConfig = getRouteAuthority(pathname);
    return (
      // <Authorized authority={routerConfig} noMatch={<Exception403 />}>
        <PageHeaderWrapper>
          <Table columns={columns} dataSource={data} rowKey='id' loading={loading} className={styles.AuthList}/>
        </PageHeaderWrapper>
      // </Authorized>
    );
  }
}

export default AuthList;
