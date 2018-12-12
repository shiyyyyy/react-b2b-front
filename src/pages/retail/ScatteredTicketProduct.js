// 批零分销 => 常态参团 => 产品详情
import React, { Fragment } from 'react';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';
import moment from 'moment';

import { ProductHeaderInfo, ScheduleAndPrice, FlightDetail, ProductEvaluation, DiscountProduct } from '../../util/common';

export class ScatteredTicketProduct extends React.Component {
    constructor() {
        super();
        this.state = {

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
                            <span className="ProInfo-right-detail-title">出&nbsp;&nbsp;发&nbsp;&nbsp;地 : </span><span className="ProInfo-right-detail-main">北京</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">抵达城市 : </span><span className="ProInfo-right-detail-main">曼谷</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">行程天数 : </span><span className="ProInfo-right-detail-main">6天7晚</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">票种类型 : </span><span className="ProInfo-right-detail-main">飞机票</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">单程往返 : </span><span className="ProInfo-right-detail-main">往返</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">票程信息 : </span><span className="ProInfo-right-detail-main">北京/曼谷   曼谷/北京</span>
                        </div>
                        <div className="ProInfo-right-detail-item">
                            <span className="ProInfo-right-detail-title">销&nbsp;&nbsp;售&nbsp;&nbsp;价 : </span>
                            <span className="ProInfo-right-detail-main"><strong>￥5980</strong>起/人</span>
                            <span className="ProInfo-right-detail-title" style={{ marginLeft: '32px' }}>同&nbsp;&nbsp;行&nbsp;&nbsp;价 : </span>
                            <span className="ProInfo-right-detail-main"><strong>￥5580</strong>起/人</span>
                        </div>
                    </Col>
                </Col>
            </ProductHeaderInfo>
        )
    }

    // 班期 选择
    scheduleAndPrice() {
        let that = this
        let param = {
            defaultDate: that.state.selectDateString || '',
            ChildrenNum: that.state.ChildrenNum,
            AdultNum: that.state.AdultNum,
            // 回调函数
            AdultNumChange(val) {
                console.log(val)
                that.setState({ AdultNum: val })
            },
            ChildrenNumChange(val) {
                console.log(val)
                that.setState({ ChildrenNum: val })
            },
            reserve() {
                console.log('预定')
            }
        }
        return (
            <ScheduleAndPrice param={param} />
        )
    }

    // 航班详情 
    flightDetail(){
        let that = this
        let param = {

        }
        return(
            <FlightDetail param={param} /> 
        )
    }

    productEvaluation(){
        let that = this;
        let param = {

        }
        return(
            <ProductEvaluation />
        )
    }

    // 类似产品
    discountProduct(){
        let that = this
        let param = {
            
        }
        return(
            <DiscountProduct />
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
                        {this.scheduleAndPrice()}
                    </Col>
                </Row>
                <Row className="mod">
                    <Col className="">
                        {this.flightDetail()}
                    </Col>
                </Row>
                <Row className="mod">
                    <Col className="">
                        {this.productEvaluation()}
                    </Col>
                </Row>
                <Row className="mod">
                    <Col className="">
                        {this.discountProduct()}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}