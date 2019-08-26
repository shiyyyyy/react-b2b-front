import React, { Component } from 'react';
import { Table, Divider } from 'antd';

import styles from './AuthorizedOverview.less';

class AuthorizedOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '3',
          employee_id: '1',
          name: '供应商无权限',
          scope: '系统维护,权限管理',
          state: '1',
          is_ty_auth: '1',
          last_update: '2019-03-15 14:10:12',
          employee_name: 'admin',
          department_id: '0',
          department_name: null,
          company_id: null,
          company_name: null,
          members: '11',
        },
        {
          id: '1',
          employee_id: '1',
          name: '系统管理员',
          scope: '系统维护,权限管理',
          state: '1',
          is_ty_auth: '0',
          last_update: '2019-03-13 10:26:11',
          employee_name: 'admin',
          department_id: '0',
          department_name: null,
          company_id: null,
          company_name: null,
          members: '计3,admin,计胜,计,计2',
        },
        {
          id: '2',
          employee_id: '1',
          name: '供应商有权限',
          scope: '系统维护,权限管理',
          state: '1',
          is_ty_auth: '1',
          last_update: '2018-09-18 10:58:02',
          employee_name: 'admin',
          department_id: '0',
          department_name: null,
          company_id: null,
          company_name: null,
          members: '去玩儿',
        },
      ],
      columns: [
        {
          title: '创建人',
          dataIndex: 'employee_name',
          key: 'employee_name',
          render: text => (
            <div className="tdDiv">
              <a href="javascript:;">{text}</a>
            </div>
          ),
        },
        {
          title: '权限名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <div className="tdDiv">{text}</div>,
        },
        {
          title: '适用范围',
          dataIndex: 'scope',
          key: 'scope',
          width: 250,
          render: text => <div className="tdDiv">{text}</div>,
        },
        {
          title: '角色成员',
          dataIndex: 'members',
          key: 'members',
          render: text => <div className="tdDiv">{text}</div>,
        },
        {
          title: '启停状态',
          dataIndex: 'state',
          key: 'state',
          render: text => <div className="tdDiv">{text}</div>,
        },
        {
          title: '操作',
          key: 'action',
          render: record => (
            <div className="tdDiv">
              <span>
                <a href="javascript:;">修改</a>
                <Divider type="vertical" />
                <a href="javascript:;">复制</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
                <Divider type="vertical" />
                <a href="javascript:;">启停</a>
              </span>
            </div>
          ),
        },
      ],
    };
  }

  render() {
    const { data, columns } = this.state;

    return (
      <div className={styles.AuthorizedOverview}>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default AuthorizedOverview;
