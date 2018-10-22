// 金牌员工
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Rate, Avatar, DatePicker, Input, Pagination, Tooltip, Badge, Dropdown } from 'antd';

import '../../css/Employee.css';

class Employee extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <div className="Employee">
                {/* 金牌销售 */}
                <Row>
                    {this.state.Employee_arr.map(item=>
                    <Col className="employee-item">
                        <Col>
                            <Avatar />
                        </Col>
                        <Col>
                            
                        </Col>
                    </Col>
                    )}
                </Row>
                {/* 最佳新人 */}
                <Row>
                    <Col>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Employee);