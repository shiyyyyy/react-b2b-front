// 批零分销 => 团偏散买(车票/机票)
// 批零分销 => 当地参团
import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Radio, Avatar, Carousel, DatePicker , Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import { FilterDefault, MultiCarousel, ProductList, FormAndCarsou } from '../../util/common';

import moment from 'moment';
import 'moment/locale/zh-cn';

const Option = Select.Option;

export default class ScatteredTicket extends React.Component {
    constructor() {
        super();
        this.state = {
            cur_page: 1,
            total: 110,
            photos: ['http://uploads.5068.com/allimg/151111/48-151111112Z8.jpg', 'http://img.kutoo8.com/upload/image/34092560/1390442684896_960x540.jpg',
                'http://f0.topitme.com/0/6a/6c/11800178627706c6a0o.jpg', 'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/07/ChMkJ1bKyyOIEM-iAAoiMiNFwUcAALImgJO8skACiJK516.jpg',
                'http://uploads.5068.com/allimg/1802/78-1P211141141.jpg', 'http://2t.5068.com/uploads/allimg/151024/48-151024111511-50.jpg',
                'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg', 'http://pic1.16pic.com/00/05/21/16pic_521052_b.jpg',
                'http://b.zol-img.com.cn/desk/bizhi/image/5/960x600/1410751686498.jpg', 'http://images.ali213.net/picfile/pic/2013/04/09/927_hzw%20%282%29.jpg',
                'http://pic1.win4000.com/wallpaper/2018-09-18/5ba0a6c8b3571.jpg?down', 'http://bangimg1.dahe.cn/forum/pw/Mon_1207/254_162850_a7cf02bc3731570.gif',
                'http://xbox360.tgbus.com/UploadFiles/201004/20100427142822574.jpg', 'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg'
            ],
            recommend: [
                { id: '1', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                { id: '2', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                { id: '3', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                { id: '4', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
            ],
        }
    }

    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ cur_page: page })
    }
    // 入住日期 && 退房日期 && 酒店级别
    CheckInDate(moment, dateString){
        console.log(moment)
        console.log(dateString)
    }
    CheckOutDate(moment, dateString){
        console.log(moment)
        console.log(dateString)
    }
    handleChangeHotelLevel(value, option){
        console.log(value)
        console.log(option)
    }

    filterAndCarousel() {
        let param = {
            data: this.state.photos,
            height: '382px',
        }
        return (
            <FormAndCarsou view={this} param={param} >
                <Col className="Scattered-left-form box-shadow" style={{ height: param.height }}>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>入住国家: </span><Input style={{ flex: '1' }} placeholder="请输入出发城市" />
                    </div>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>入住城市: </span><Input style={{ flex: '1' }} placeholder="请输入抵达城市" />
                    </div>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>入住日期: </span><DatePicker style={{ flex: '1' }} onChange={this.CheckInDate.bind(this)} placeholder="请选择入住日期" />
                    </div>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>退房日期: </span><DatePicker style={{ flex: '1' }} onChange={this.CheckOutDate.bind(this)} placeholder="请选择退房日期" />
                    </div>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>酒店级别: </span>
                        <Select defaultValue="4" style={{ flex: 1 }} onChange={this.handleChangeHotelLevel.bind(this)}>
                            <Option value="3">三星级</Option>
                            <Option value="4">四星级</Option>
                            <Option value="5">五星级</Option>
                            <Option value="6">六星级</Option>
                        </Select>
                    </div>
                    <div className="Scattered-input-box">
                        <span style={{ width: '80px' }}>关 键 字 : </span><Input style={{ flex: '1' }} placeholder="请输入关键字" />
                    </div>
                    <div className="Scattered-submit-box">
                        <div style={{width: '88%'}}>
                            <Button type="primary" block>搜索</Button>
                        </div>
                    </div>
                </Col>
            </FormAndCarsou>
        )
    }
    hotRecommend() {
        let swiperCfg = {
            id: 'ScatteredTicket',
            loop: true,
            numSwiper: 5,
            height: '180px',
            data: this.state.photos
        }
        return (
            <MultiCarousel view={this} swiperCfg={swiperCfg} />
        )
    }
    productList() {
        let param = {
            data: this.state.recommend
        }
        return (
            <ProductList view={this} param={param} />
        )
    }



    render() {
        return (
            <div className="Home-Tabs">
                {/* 搜索添加哦填写和轮播图 */}
                {this.filterAndCarousel()}

                {/* 热卖推介 多图轮播图 */}
                {this.hotRecommend()}

                {/* 产品列表 可展开 */}
                {this.productList()}

                {/* 分页 */}
                <Row>
                    <Col className="history-pages">
                        <Pagination defaultCurrent={this.state.cur_page} total={this.state.total}
                            onChange={(page) => this.pageChange(page)} />
                    </Col>
                </Row>
            </div>
        )
    }
}
