// 用户后台页面 => 供应商后台 => 平台首页
// 批零分销 => 当地参团
import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import { ThreeEqualBlock, NoticeAndActivity, TitleFliterOrder, OpportunityTracking } from '../../util/common';

class Platform extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    header(){

        return(
            <ThreeEqualBlock />
        )
    }
    noticeAndActivity(){

        return(
            <NoticeAndActivity />
        )
    }

    orderManagement(){

        return(
            <TitleFliterOrder />
        )
    }
    opportunityTracking(){

        return(
            <OpportunityTracking />
        )
    }
    
    render() {
        return (
            <Row>
                <Col>
                    {this.header()}
                </Col>
                <Col>
                    {this.noticeAndActivity()}
                </Col>
                <Col>
                    {this.orderManagement()}
                </Col>
                <Col>
                    {this.opportunityTracking()}
                </Col>
            </Row>
        )
    }
}

export default withRouter(Platform);
