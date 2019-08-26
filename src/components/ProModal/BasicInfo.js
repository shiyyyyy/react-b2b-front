import React from 'react';
import { Row, Col, Icon, Table, Tag, Divider } from 'antd';

import styles from './Edit.less';

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          width:100,
        },
        {
          title: 'Num',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: 'Lucky',
          dataIndex: 'lucky',
          key: 'lucky',
        },
        {
          title: 'Beautiful',
          dataIndex: 'beautiful',
          key: 'beautiful',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          // fixed: 'right',
          render: (text, record) => (
            <span>
              <a href="javascript:;">Invite {record.name}</a>
              <Divider type="vertical" />
              <a href="javascript:;">Delete</a>
            </span>
          ),
        },
      ],

      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          num: 110,
          lucky: '幸运',
          beautiful: '美丽的',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          num: 1110,
          lucky: '倒霉',
          beautiful: '丑的',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          num: 11110,
          lucky: '一般',
          beautiful: '默认的',
          tags: ['cool', 'teacher'],
        },
      ],
    };
  }

  render() {
    const { data, columns } = this.state;
    const { item, historyBtn } = this.props;
    return (
      <Row>
        <Col className={styles.EditTable} style={{boxShadow: '0 0 10px rgba(0,0,0,.1)'}}>
          <Col className={styles.title}>
            <Col className={styles.text}>基础信息</Col>
            <Col className={[styles.btn, 'active', historyBtn ? '' : 'hide' ].join(' ')}>
              历史记录
              <Icon type="arrow-right" />
            </Col>
          </Col>

          <Col className={[styles.Table, 'TableEditModal'].join(' ')}>
            <Table dataSource={data} columns={columns} scroll={{ x: 1200 }} pagination={false} />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default BasicInfo;
