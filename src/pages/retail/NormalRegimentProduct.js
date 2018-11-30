// 批零分销 => 常态参团 => 产品详情
import React from 'react';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';
import moment from 'moment';

import {Calendar} from "../../util/calendar";

export class NormalRegimentProduct extends React.Component{
    constructor(){
        super();
        this.state = {}
        this.date = moment();
    }

    render(){
        return(
            <div>
                NormalRegimentProduct
                <div>
                    <Calendar date={this.date} />
                </div>
            </div>
        )
    }
}