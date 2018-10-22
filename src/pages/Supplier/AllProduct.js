// 全部产品
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Rate, Avatar, DatePicker, Input, Pagination, Tooltip, Badge, Dropdown } from 'antd';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

import "../../css/AllProduct.css";

moment.locale('zh-cn');


class AllProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            cur_page: 1,
            total: 998,
            dep_date: moment(),
            back_date: moment(),
            dep_city: { 1: '北京', 2: '天津', 3: '上海', 4: '深圳', 5: '广州', 6: '哈尔滨', 7: '成都', 8: '厦门'},
            level_one: { 1: '北美', 2: '南美', 3: '欧洲', 4: '东南亚', 5: '非洲', 6: '大洋洲', 7: '南北极', 8: '国内', 9: '日韩朝鲜', 10: '全球游轮', 11: '全球签证', },
            level_two: { 1: {1:'美国', 2:'加拿大'}, 2: {1:'里约热内卢',2:'秘鲁'}, 3: {1:'英国',2:'德国',3:'法国',4:'意大利'}, 4: {1:'越南', 2:'缅甸',3:'泰国'}, 5: {1:'南非',2:'肯尼亚'}, 6: {1:'澳大利亚',2:'新西兰'}, 7: {1:'北极极昼之旅',2:'南极企鹅之旅'}, 8: {1:'东北游',2:'长城游'}, 9: {1:'韩国',2:"朝鲜",3:'日本'}, 10: {1:'太平洋邮轮',2:'大西洋邮轮'}, 11: {1:'日本签证',2:'印尼签证'},},
            theme: { 1: '亲子', 2: '蜜月', 3: '夕阳红', 4: '探险', 5: '美容', 6: '体验', 7: '自驾', 8: 'SPA', 9:'游学'},
            search:{
                cur_city:'',
                cur_one:'',
                cur_two:'',
                cur_theme: '',
                cur_dap_date: '',
                cur_back_date: '',
                min_price: '',
                max_price: '',
                supplier: '',
            }
        }
    }

    // 设置 search 里的发搜索条件
    setSearch(key,val){
        let search = this.state.search
        search[key] = val
        if(key === 'cur_one'){
            search.cur_two = ''
        }
        this.setState({ search: search })
    }
    setDep_date(date, dateString){
        this.setState({ dep_date: date, search:{...this.state.search, cur_dap_date: dateString} })
    }
    setBack_date(date, dateString) {
        this.setState({ back_date: date, search: { ...this.state.search, cur_back_date: dateString } })
    }
    setPrice(key,e){
        console.log(e.target.value)
        let search = this.state.search
        search[key] = e.target.value
        this.setState({search: search})
    }
    setSupplier(e){
        let search = this.state.search
        search.supplier = e.target.value
        this.setState({search: search})
    }
    search(){
        console.log(this)
    }
    // 展开折叠
    open_eva(index) {
        if (index === this.state.open_eva_index) {
            this.setState({ open_eva_index: '' })
            return
        }
        this.setState({ open_eva_index: index })
    }
    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ cur_page: page })
    }

    render() {
        return (
            <div className="AllProduct">
                {/* 团-类型 */}
                <Row>
                    <Col className="AllProduct-header-type">
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 1?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:1})}>常规参团</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 2?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:2})}>当地参团</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 3?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:3})}>团票散卖</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 4?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:4})}>团房散卖</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 5?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:5})}>签证代办</Col>
                    </Col>
                </Row>
                {/* filter */}
                <Row>
                    <Col className="AllProduct-filter">
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">出发城市:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.dep_city).map(key=>
                                <Col className={"AllProduct-filter-main-item "+ (this.state.search.cur_city === key?"active-filter-main-item":"")}
                                onClick={_=>this.setSearch('cur_city',key)} key={key}>
                                    {this.state.dep_city[key]}
                                </Col>                                
                            )}
                            </Col>
                        </Col>
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">一级导航:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.level_one).map(key =>
                                <Col className={"AllProduct-filter-main-item "+ (this.state.search.cur_one === key?"active-filter-main-item":"")} 
                                onClick={_=>this.setSearch('cur_one',key)} key={key}>
                                    {this.state.level_one[key]}
                                </Col>
                            )}
                            </Col>
                        </Col>
                        {
                        this.state.search.cur_one && 
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">二级导航:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                                {this.state.search.cur_one &&
                                    Object.keys(this.state.level_two[this.state.search.cur_one]).map(key =>
                                        <Col className={"AllProduct-filter-main-item " + (this.state.search.cur_two === key ? "active-filter-main-item" : "")}
                                            onClick={_ => this.setSearch('cur_two', key)} key={key}>
                                            {this.state.level_two[this.state.search.cur_one][key]}
                                        </Col>
                                    )}
                            </Col>
                        </Col>
                        }

                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">游玩主题:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.theme).map(key =>
                                <Col className={"AllProduct-filter-main-item " + (this.state.search.cur_theme === key ? "active-filter-main-item" : "")}
                                onClick={_=>this.setSearch('cur_theme',key)} key={key}>
                                    {this.state.theme[key]}
                                </Col>
                            )}
                            </Col>
                        </Col>
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">其他条件:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                                <Col span={3} style={{marginRight: '12px'}}>
                                    <DatePicker defaultValue={this.state.date} placeholder="出团日起"
                                    onChange={this.setDep_date.bind(this)} />
                                </Col>
                                <Col span={3} style={{marginRight: '12px'}}>
                                    <DatePicker defaultValue={this.state.date} placeholder="出团日止"
                                    onChange={this.setBack_date.bind(this)} />
                                </Col>
                                <Col span={3} style={{marginRight: '12px'}}>
                                    <Input placeholder="最低价格" onChange={this.setPrice.bind(this, 'min_price')} />
                                </Col>
                                <Col span={3} style={{marginRight: '12px'}}>
                                    <Input placeholder="最高价格" onChange={this.setPrice.bind(this, 'max_price')} />                                
                                </Col>
                                <Col span={3} style={{marginRight: '12px'}}>
                                    <Input placeholder="供应商名称" onChange={this.setSupplier.bind(this)} />
                                </Col>
                                <Col span={3}>
                                    <Button type="primary" icon="search" 
                                    onClick={_=>this.search()}>搜索</Button>
                                </Col>

                                
                            </Col>
                        </Col>
                    </Col>
                </Row>

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

export default withRouter(AllProduct); 