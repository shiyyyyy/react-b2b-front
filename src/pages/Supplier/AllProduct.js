// 全部产品
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Rate, Avatar, DatePicker, Select, Input, InputNumber , Pagination, Tooltip, Badge, Dropdown } from 'antd';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

import "../../css/AllProduct.css";

moment.locale('zh-cn');

const InputGroup = Input.Group;
const Option = Select.Option;

class AllProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            total: 998,
            dep_date: moment(),
            back_date: '',
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
            },
            data: {
                recommend: [
                    { id: '1', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '2', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '3', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '4', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                ],
            },
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
    setPrice(key,price){
        let search = this.state.search
        search[key] = price
        this.setState({search: search})
    }
    setSupplier(e){
        let search = this.state.search
        search.supplier = e.target.value
        this.setState({search: search})
    }
    closeSelect(key){
        let search = this.state.search;
        search[key] = '';
        console.log(key)
        console.log(search)
        console.log(this.state.search)
        this.setState({search: search})
    }
    search(){
        console.log(this)
    }
    userSelectModel(key){
        if(this.state.search[key]==='')return;
        let keysMenu;
        switch (key) {
            case 'cur_city':
            console.log('city')
                keysMenu = 'dep_city'
                break;
            case 'cur_one':
                console.log('one')
                keysMenu = 'level_one'
                break;
            case 'cur_two':
                keysMenu = 'level_two'
                console.log(this.state.search.cur_one, this.state.search[key])
                return(
                    <div key={key}
                        className={(this.state.search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect')}>
                        <span style={{ marginRight: '8px' }}>{this.state.level_two[this.state.search.cur_one][this.state.search.cur_two]}</span>
                        <Icon type="close-circle" theme="outlined" className="AllProduct-filter-userSelect-close"
                            onClick={_ => this.closeSelect(key)} />
                    </div>
                )
            case 'cur_theme':
                console.log('theme')
                keysMenu = 'theme'
                break;
            default:
                console.log('default')
                break;
        }
        return(
            <div key={key}
                className={(this.state.search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect')}>
                <span style={{ marginRight: '8px' }}>{this.state[keysMenu][this.state.search[key]]}</span>
                <Icon type="close-circle" theme="outlined" className="AllProduct-filter-userSelect-close"
                    onClick={_ => this.closeSelect(key)} />
            </div>
        )
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
        this.setState({ page: page })
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
                            <Col span={2} className="AllProduct-filter-title">您已选择:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                                {/* {Object.keys(this.state.search).map(key => this.userSelectModel(key))} */}
                                {/* {Object.keys(this.state.search).map(key =>
                                    <div key={key}
                                    className={(this.state.search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect')}>
                                        <span style={{marginRight: '8px'}}>{this.state.search[key]}</span>
                                        <Icon type="close-circle" theme="outlined" className="AllProduct-filter-userSelect-close"
                                        onClick={_ => this.closeSelect(key)} />
                                    </div>
                                )} */}
                            </Col>
                        </Col>

                        <Col className="AllProduct-filter-item">
                            {/* <Col span={2} className="AllProduct-filter-title">其他条件:</Col> */}
                            <Col className="AllProduct-filter-main">
                                <Col span={8} className="AllProduct-filter-main-block" style={{marginRight: '12px', marginLeft: '16px'}}>
                                    <DatePicker defaultValue={this.state.dep_date} placeholder="出团日起"
                                    onChange={this.setDep_date.bind(this)} />
                                    <span> &nbsp;~&nbsp; </span> 
                                    <DatePicker defaultValue={this.state.back_date} placeholder="出团日止"
                                    onChange={this.setBack_date.bind(this)} />
                                </Col>
                                <Col span={6} className="AllProduct-filter-main-block">
                                    {/* <Input placeholder="最低价格" prefix={<Icon type="property-safety" theme="outlined"
                                    style={{color: 'rgba(0,0,0,.25)', fontSize: '16px'}} />}
                                    onChange={this.setPrice.bind(this, 'min_price')} /> */}
                                    <InputNumber style={{width:'45%'}}
                                        defaultValue={this.state.search.min_price}
                                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        onChange={this.setPrice.bind(this, 'min_price')}
                                    />
                                    <span> &nbsp;~&nbsp; </span> 
                                    {/* <Input placeholder="最高价格" prefix={<Icon type="property-safety" theme="outlined"
                                    style={{color: 'rgba(0,0,0,.25)', fontSize: '16px'}} />}
                                    onChange={this.setPrice.bind(this, 'max_price')} />  */}
                                    <InputNumber style={{width: '45%' }}
                                        defaultValue={this.state.search.max_price}
                                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        onChange={this.setPrice.bind(this, 'max_price')}
                                    />                             
                                </Col>
                                <Col span={6} className="AllProduct-filter-main-block">
                                    {/* <Input placeholder="供应商名称" onChange={this.setSupplier.bind(this)} /> */}
                                    <InputGroup compact>
                                        <Select defaultValue="supplier_name">
                                            <Option value="supplier_name">供应商名称</Option>
                                            <Option value="pro_name">产品名称</Option>
                                            <Option value="order_num">订单号</Option>
                                        </Select>
                                        <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
                                    </InputGroup>
                                </Col>
                                <Col span={3}>
                                    <Button type="primary" icon="search" 
                                    onClick={_=>this.search()}>搜索</Button>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Row>


                {/* 产品推介 */}
                <Row className="Recommend-pro-recommend">
                    <div className="index-title">
                        <span className="index-title-left">主推产品</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="Recommend-pro-info">
                        {this.state.data.recommend.map((item, index) =>
                            <Col className="Recommend-pro-info-item" key={item.id}>
                                <Col className="Recommend-top">
                                    <Col span={3} className="Recommend-pro-img-box">
                                        <img src={'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'}
                                            className="Recommend-pro-img" />
                                        <span className="Recommend-pro-img-text">产品编号: P0-4396</span>
                                    </Col>
                                    <Col span={21} style={{ paddingLeft: '20px' }}>
                                        <Col className="Recommend-pro-r-top">
                                            <span className="Recommend-pro-name">超值无忧泰一地,体验泰国风情超值无忧泰一地,体验泰国风情</span>
                                            <span className="Recommend-pro-tag1">跟团游</span>
                                            <span className="Recommend-pro-tag2">蜜月游</span>
                                        </Col>
                                        <Col className="Recommend-pro-r-center">
                                            <Col span={10} className="Recommend-pro-r-center-left">
                                                <div>分类标签: <span>东南亚-泰一地</span></div>
                                                <div>供应商: <span>广西桂林甲天下之旅</span></div>
                                                <div className="text-overflow">最近班期: <span>2018-09-08、2018-12-12、2018-11-11、2018-12-21、2018-12-12、2018-11-11</span></div>
                                            </Col>
                                            <Col span={14} className="Recommend-pro-r-center-right">
                                                <Col style={{ display: 'flex' }}>
                                                    <Col span={8}>同行价:
                                                    <span className="imp-text cursor" onClick={_ => console.log('跳转登录页')}>登录可查</span>
                                                    </Col>
                                                    <Col span={8}>在售团期: <span className="imp-text">76</span>个</Col>
                                                    <Col span={8}>产品评分: <span className="imp-text">9.6</span>分</Col>
                                                </Col>
                                                <Col style={{ display: 'flex' }}>
                                                    <Col span={8}>销售价: <span className="imp-text">￥29998</span>/人起</Col>
                                                    <Col span={8}>访问次数: <span className="imp-text">32685</span>次</Col>
                                                </Col>
                                            </Col>
                                        </Col>
                                        <Col className="Recommend-pro-r-btm">
                                            <Col span={20} className="Recommend-pro-r-btm-left">
                                                <div>北京出发</div>
                                                <div>5晚6天</div>
                                                <div>飞机来回</div>
                                                <div>无自费</div>
                                                <div>无购物</div>
                                            </Col>
                                            <Col span={4}>
                                                <Button type="primary" icon={this.state.cur_pro_id === item.id ? 'caret-up' : "caret-down"} size='small' ghost
                                                    onClick={_ => this.checkDetail(item.id)}>查看详情</Button>
                                            </Col>
                                        </Col>
                                    </Col>
                                </Col>

                                <Col className={"Recommend-btm " + (this.state.cur_pro_id === item.id ? '' : 'hide')}>
                                    <Col className="Recommend-pro-group-list-box">
                                        <Col span={24} className="Recommend-pro-group-title">
                                            <Col span={4}>团号</Col>
                                            <Col span={3}>出团日期</Col>
                                            <Col span={3}>回团日期</Col>
                                            <Col span={3}>同行价</Col>
                                            <Col span={3}>销售价</Col>
                                            <Col span={3}>利润</Col>
                                            <Col span={3}>总位</Col>
                                            <Col span={2}>剩余</Col>
                                        </Col>
                                        {item.group.map(list =>
                                            <Col className="Recommend-pro-group-list" key={list.id}>
                                                <Col className="Recommend-pro-group-list-main">
                                                    <Col span={4}>RNG-60E-HZ-SM-S8</Col>
                                                    <Col span={3}>2018-08-12</Col>
                                                    <Col span={3}>2018-08-20</Col>
                                                    <Col span={3}>￥24000</Col>
                                                    <Col span={3}>￥28888</Col>
                                                    <Col span={3}>￥4888</Col>
                                                    <Col span={3}>100</Col>
                                                    <Col span={2}>20</Col>
                                                </Col>
                                                <Col className="Recommend-pro-group-list-btn">
                                                    <Button type="primary" size='small' ghost style={{ marginRight: '16px' }}>查看</Button>
                                                    <Button type="primary" size='small' ghost style={{ marginRight: '16px' }}>下载</Button>
                                                    <Button type="primary" size='small' ghost>占位</Button>
                                                </Col>
                                            </Col>
                                        )}
                                    </Col>
                                </Col>
                            </Col>
                        )}
                    </Col>
                </Row>

                {/* 分页 */}
                <Row>
                    <Col className="history-pages">
                        <Pagination defaultCurrent={this.state.page} total={this.state.total}
                            onChange={(page) => this.pageChange(page)} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(AllProduct); 