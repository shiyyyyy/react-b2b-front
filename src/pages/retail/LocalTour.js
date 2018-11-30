// 批零分销 => 当地参团
import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Pagination, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import { FilterDefault, MultiCarousel, ProductList } from '../../util/common';

export default class LocalTour extends React.Component {
    constructor() {
        super();
        this.state = {
            cur_page: 1,
            total: 110,
            filterObj: {
                dep_city: {
                    title: '出发城市',
                    data: { 1: '北京', 2: '天津', 3: '上海', 4: '深圳', 5: '广州', 6: '哈尔滨', 7: '成都', 8: '厦门' },
                },
                level_one: {
                    title: '一级标签',
                    data: { 1: '北美', 2: '南美', 3: '欧洲', 4: '东南亚', 5: '非洲', 6: '大洋洲', 7: '南北极', 8: '国内', 9: '日韩朝鲜', 10: '全球游轮', 11: '全球签证', 12: '月球登陆', 13: '太空美景', 14: '太阳系环游' },
                },
                // level_two:{
                //     title: '二级标签',
                //     data: { 1: { 1: '美国', 2: '加拿大' }, 2: { 1: '里约热内卢', 2: '秘鲁' }, 3: { 1: '英国', 2: '德国', 3: '法国', 4: '意大利' }, 4: { 1: '越南', 2: '缅甸', 3: '泰国' }, 5: { 1: '南非', 2: '肯尼亚' }, 6: { 1: '澳大利亚', 2: '新西兰' }, 7: { 1: '北极极昼之旅', 2: '南极企鹅之旅' }, 8: { 1: '东北游', 2: '长城游' }, 9: { 1: '韩国', 2: "朝鲜", 3: '日本' }, 10: { 1: '太平洋邮轮', 2: '大西洋邮轮' }, 11: { 1: '日本签证', 2: '印尼签证' }, },
                // }, 
                theme: {
                    title: '游玩主题',
                    data: { 1: '亲子', 2: '蜜月', 3: '夕阳红', 4: '探险', 5: '美容', 6: '体验', 7: '自驾', 8: 'SPA', 9: '游学' },
                },
                travel_date: {
                    title: '出行月份',
                    data: { 1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月', 13: '十三月', 14: '星期八' },
                },
            },
            filterSearch: {
                dep_city: [1, 2],
                level_one: [2, 3],
                theme: [3, 4],
                travel_date: [4, 5],
            },
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

    filter() {
        return (
            <FilterDefault view={this} />
        )
    }
    hotRecommend() {
        let swiperCfg = {
            id: 'LocalTour',
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
                {/* filterMore 带日期/价格的过滤 */}
                {this.filter()}

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
