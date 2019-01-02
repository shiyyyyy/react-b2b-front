import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Breadcrumb, Avatar, Button, Table, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import { loadIfEmpty } from '../../../util/request';
import { AppConst } from '../../../util/const';

import { UserBackDeskHeader, LeftTabs, RightHeaderBreadcrumb, RightSetAndBtn, RightFilterAndSearch, RightProList } from '../../../util/common';



export default class GroupTour extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
        console.log(this)
    }

    render() {
        return (
            <Row>
                <Col>
                    grouptour
                </Col>
                {/* <Col className='supplier-back-right-content'>
                    <Col className='supplier-back-right-content-topBtn'>
                        GroupTour
                    </Col>
                    <Col className='supplier-back-right-content-topBtn'>
                        group_tour
                    </Col>
                </Col> */}
            </Row>
        )
    }
}