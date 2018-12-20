// 批零分销 => 常态参团 => 产品详情
import React, { Fragment } from 'react';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';
import moment from 'moment';

import { Calendar } from "../../../util/calendar";
import { ProductHeaderInfo, RoomstatusAndPrice } from '../../../util/common';

export class ScatteredRoomProduct extends React.Component {
    constructor() {
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
                { id: 9, dep_date: '2018-12-31', price: 39999, seat_surplus: 23 },
                { id: 10, dep_date: '2019-01-12', price: 8888, seat_surplus: 3 },
            ],
            // 用户选择的东西
            selectDate: '',
            selectDateString: '',
            selectId: '',
            AdultNum: 1,
            ChildrenNum: 0,
        }
    }

    // 顶部 信息
    productheaderInfo() {
        let param = {
            // 用 id 区分相同组件不同轮播图
            id: 'Normal',
            // reserve: true,
            data: ['http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
                'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
                'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg'
            ]
        }
        return (
            <ProductHeaderInfo param={param} >
                <Col>
                    <Col className="ProInfo-right-name text-overflow-2">法意瑞三国13日连游,万人出游,林志颖同款,一价全含,4星到五星任选,至尊奢享,你想要的全都有,你还在等什么?赶快报名让我赚钱!</Col>
                    <Col className="ProInfo-right-info">
                        <div className="ProInfo-right-info-item">
                            <div>供应商</div><div>广西桂林甲天下之旅</div>
                        </div>
                        <div className="ProInfo-right-info-item">
                            <div>在售团期</div><div>82个</div>
                        </div>
                        <div className="ProInfo-right-info-item">
                            <div>访问次数</div><div>19998次</div>
                        </div>
                        <div className="ProInfo-right-info-item">
                            <div>产品评分</div><div>9.8</div>
                        </div>
                    </Col>
                    <Col className="ProInfo-right-detail">
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">产品编号 : </span><span className="ProInfo-right-detail-main">DC929844</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">所在城市 : </span><span className="ProInfo-right-detail-main">北京</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">酒店级别 : </span><span className="ProInfo-right-detail-main">豪华型</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">酒店星级 : </span><span className="ProInfo-right-detail-main">4星级</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">酒店地址 : </span><span className="ProInfo-right-detail-main">北京市朝阳区东三环华为前西500米陕西大厦</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">酒店网址 : </span><span className="ProInfo-right-detail-main">www.shanxidasha.com</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">前台电话 : </span><span className="ProInfo-right-detail-main">400-8888-6666</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">销&nbsp;&nbsp;售&nbsp;&nbsp;价 : </span>
                            <span className="ProInfo-right-detail-main"><strong>￥28889</strong>起/人</span>
                            <span className="ProInfo-right-detail-title" style={{ marginLeft: '32px' }}>同&nbsp;&nbsp;行&nbsp;&nbsp;价 : </span>
                            <span className="ProInfo-right-detail-main"><strong>￥16698</strong>起/人</span>
                        </div>
                    </Col>
                </Col> 
            </ProductHeaderInfo>
        )
    }

    // 房间选择
    RoomstatusAndPriceRender(){
        let that = this
        let param = {
            
        }
        return (
            <RoomstatusAndPrice param={param} />
        )
    }


    render() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        {this.productheaderInfo()}
                    </Col>
                </Row>
                <Row className="mod">
                    <Col className="">
                        {this.RoomstatusAndPriceRender()}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}