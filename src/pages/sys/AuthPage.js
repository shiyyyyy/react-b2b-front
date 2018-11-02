import React from 'react';
import {withRouter,Redirect} from 'react-router-dom';
import { AppCore ,haveActionAuth,AppMeta,goTo} from '../../util/core';
import { loadIfEmpty } from '../../util/request';
import { AppConst } from '../../util/const';
import { masking } from '../../util/com'; 
import { Table , Button} from 'antd';

class AuthPage extends React.Component{
    constructor(){
        super();

        this.state = {
        };

        this.mod = '权限设置';
        this.authType = AppConst.User;

        this.cols =  [{
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: '范围',
          dataIndex: 'scope',
          key: 'scope',
        }, {
          title: '成员',
          dataIndex: 'members',
          key: 'members',
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                  <Button onClick={_=>goTo('/authEdit',{data:record,action:'修改权限'})}>修改</Button>
                </span>
            ),
        }];
    }

    componentDidMount() {
        loadIfEmpty(this);
    }

    EditAuth(id){
        console.log(id);
    }

    render(){
        return(
            <div>
                {
                    this.state.loading && masking()
                }
                {
                    this.state.data &&
                    <Table dataSource = {this.state.data} columns = {this.cols}
                    rowKey={record => record.id}/>

                }
            </div>
        )
    }

}

export default withRouter(AuthPage);