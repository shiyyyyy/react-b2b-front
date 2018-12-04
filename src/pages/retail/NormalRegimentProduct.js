// 批零分销 => 常态参团 => 产品详情
import React, { Fragment } from 'react';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';
import moment from 'moment';

import {Calendar} from "../../util/calendar";
import { ProductHeaderInfo } from '../../util/common';

export class NormalRegimentProduct extends React.Component{
    constructor(){
        super();
        this.state = {
            date: moment(),
            NextDate: moment().add(1, 'M'),
            data: [
                { id: 1, dep_date: '2018-11-30', price: 19999, seat_surplus: 20 },
                { id: 2, dep_date: '2018-12-01', price: 29999, seat_surplus: 10 },
                { id: 3, dep_date: '2018-12-05', price: 18888, seat_surplus: 6 },
                { id: 3.2, dep_date: '2018-12-05', price: 23333, seat_surplus: 14 },
                { id: 4, dep_date: '2018-12-12', price: 16666, seat_surplus: 14 },
                { id: 5, dep_date: '2018-12-16', price: 29999, seat_surplus: 23 },
                { id: 6, dep_date: '2018-12-19', price: 19998, seat_surplus: 26 },
                { id: 7, dep_date: '2018-12-27', price: 19888, seat_surplus: 12 },
                { id: 8, dep_date: '2018-12-30', price: 9999, seat_surplus: 0 },
                { id: 8, dep_date: '2019-01-12', price: 8888, seat_surplus: 3 },
            ]
        }
    }

    // 顶部 信息
    productheaderInfo(){
        let param = {
            bigId: 'Normal',
            smallId: 'Normal',
            data: ['http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
                'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
                'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg'
            ]
        }
        return(
            <ProductHeaderInfo param={param} />
        )
    }


    // 两个 日历
    calendarFun1(){
        let that = this
        let param = {
            prev() {
                let date = that.state.date.subtract(1, 'M')
                let NextDate = that.state.NextDate.subtract(1, 'M')
                that.setState({ date: date, NextDate: NextDate })
            },
            next() {
                let date = that.state.date.add(1, 'M')
                let NextDate = that.state.NextDate.add(1, 'M')
                that.setState({ date: date, NextDate: NextDate })
            },
            nextCtrl: false,
        }

        return(
            <Calendar date={this.state.date} data={this.state.data} param={param} />
        )
    }
    calendarFun2() {
        let that = this
        let param = {
            prev(){
                let date = that.state.date.subtract(1, 'M')
                let NextDate = that.state.NextDate.subtract(1, 'M')
                that.setState({ date: date, NextDate: NextDate})
            },
            prevCtrl: false,
            next() {
                let date = that.state.date.add(1, 'M')
                let NextDate = that.state.NextDate.add(1, 'M')
                that.setState({ date: date, NextDate: NextDate })
            }
        }
        
        return(
            <Calendar date={this.state.NextDate} data={this.state.data} param={param} />
        )
    }

    render(){
        return(
            <Fragment>
                <Row>
                    <Col>
                        {this.productheaderInfo()}
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col>NormalRegimentProduct</Col>    
                    <Col span={2}></Col>                
                    <Col span={10}>
                        {this.calendarFun1()}
                    </Col>
                    <Col span={10}>
                        {this.calendarFun2()}
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </Fragment>
        )
    }
}