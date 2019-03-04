// 金牌员工
import React from 'react';

import {
  Icon,
  Row,
  Col,
  Avatar,
} from 'antd';

import styles from './Employee.less';

class Employee extends React.Component {
  constructor(){
    super();
    this.state = {
      EmployeeArr: [
        { avatar: '', name: '张胜男', id: '1' },
        { avatar: '', name: '张胜男', id: '7' },
        { avatar: '', name: '张胜男', id: '13' },
        { avatar: '', name: '张胜男', id: '2' },
        { avatar: '', name: '张胜男', id: '8' },
        { avatar: '', name: '张胜男', id: '14' },
        { avatar: '', name: '张胜男', id: '3' },
        { avatar: '', name: '张胜男', id: '9' },
        { avatar: '', name: '张胜男', id: '15' },
        { avatar: '', name: '张胜男', id: '4' },
        { avatar: '', name: '张胜男', id: '10' },
        { avatar: '', name: '张胜男', id: '16' },
        { avatar: '', name: '张胜男', id: '5' },
        { avatar: '', name: '张胜男', id: '11' },
        { avatar: '', name: '张胜男', id: '17' },
        { avatar: '', name: '张胜男', id: '6' },
        { avatar: '', name: '张胜男', id: '12' },
        { avatar: '', name: '张胜男', id: '18' },
      ],
    };
  }

  render() {
    const { EmployeeArr} = this.state;
    return (
      <div className={styles.Employee}>
        {/* 金牌销售 */}
        <Row type="flex">
          <div className={styles.title}>
            <span className={styles.titleLeft}>金牌销售</span>
            <span className={styles.titleRight}>
              更多
              <Icon type="right" />
            </span>
          </div>
          {EmployeeArr.map(item => (
            <Col className={styles.employeeItem} key={item.id}>
              <Col span={12}>
                <Avatar
                  size={80}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Col>
              <Col span={12}>
                <Col>{item.name}</Col>
                <Col>13812348765</Col>
                <Col>综合评价: 9.6</Col>
              </Col>
            </Col>
          ))}
        </Row>
        {/* 最佳新人 */}
        <Row type="flex">
          <div className={styles.title}>
            <span className={styles.titleLeft}>最佳新人</span>
            <span className={styles.titleRight}>
              更多
              <Icon type="right" />
            </span>
          </div>
          {EmployeeArr.map(item => (
            <Col className={styles.employeeItem} key={item.id}>
              <Col span={12}>
                <Avatar
                  size={80}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Col>
              <Col span={12}>
                <Col>{item.name}</Col>
                <Col>13812348765</Col>
                <Col>综合评价: 9.6</Col>
              </Col>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Employee;
