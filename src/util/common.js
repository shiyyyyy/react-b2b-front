import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Tag, Button, Tabs, Radio, Rate, Carousel, DatePicker, Checkbox, Select, InputNumber, Pagination, Tooltip, Badge, Dropdown } from 'antd';

import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import moment from 'moment';
import { debug } from 'util';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;


// =====================================   用户前台页面 => 通用顶部
export class UserFrontDeskHeader extends React.Component{
    constructor(props){
        super();
        console.log(this)
        this.view = props.view
    }
    cityChange(value, option){
        console.log(value)
        console.log(option)
    }
    lineChange(value, option){
        console.log(value)
        console.log(option)
    }
    search(value, event){
        console.log(value)
        console.log(event)
    }

    render(){
        return(
    <div>
        <div className = "home-header" >
            <div className="home-logo"></div>
            <div className="home-search">

                <Select defaultValue={this.props.param.city} className="home-search-city"
                    onChange={(value, option) => this.cityChange(value, option)}>
                    {this.props.param.cityArr.map(item =>
                        <Option value={item.id} key={item.id}>{item.value}</Option>
                    )}
                </Select>

                <InputGroup compact className="home-search-input">
                    <Select defaultValue={this.props.param.line} onChange={(value, option) => this.lineChange(value, option)}>
                        {this.props.param.lineArr.map(item =>
                            <Option value={item.id} key={item.id}>{item.value}</Option>
                        )}
                    </Select>
                    <Search
                        placeholder={'请输入产品名称'}
                        onSearch={(value, event) => this.search(value, event)}
                        enterButton
                    />
                </InputGroup>
            </div>
            <div className="home-info">
                <div span={6} push={1} className="home-info-right-top">
                    <div className="home-info-right-top-item">
                        <span className="home-info-right-top-item-text">设为首页</span>
                        {/* <a href='#' onClick={"this.style.behavior='url(#default#homepage)';this.setHomePage('http://www.baidu.com')}"}>设为首页</a> */}
                    </div>
                    <div className="home-info-right-top-item">
                        <span className="home-info-right-top-item-text">加入收藏</span>
                        {/* <a target='_top' href="javascript:window.external.AddCollection('http://www.baidu.com','百度');">加入收藏</a> */}
                    </div>
                    <div className="home-info-right-top-item">
                        <span className="home-info-right-top-item-text">官方微信</span>
                    </div>
                    <div className="home-info-right-top-item" style={{ paddingRight: '0' }}>
                        <span className="home-info-right-top-item-text">在线帮助</span>
                    </div>
                </div>
                <div className="home-info-right-btm">
                    <div className="home-info-right-btm-serv">
                        <div className="home-header-icon-box"><Icon type="customer-service" theme="outlined" /></div>
                        <div>
                            <div>欢迎使用</div><div>在线客服</div>
                        </div>
                    </div>
                    <div className="home-info-right-btm-mobile">
                        <div className="home-header-icon-box"><Icon type="phone" theme="outlined" /></div>
                        <div>
                            <div>24h客户服务电话</div><div>400-800-8888</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1"><Link to="/home">平台首页</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/retail">批零分销</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/home">尾货专区</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/home">问答论坛</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/home">大神学院</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/home">业内招聘</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/home">产品软件</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/home">开放接口</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/home">关于我们</Link></Menu.Item>
            </Menu>
        </Header>
    </div>
    )}
}




// ===============================    搜索 filtermore 带日期/价格等的filter通用组件
export class FilterDefault extends React.Component{
    constructor(props){
        super();
        this.state = { }
        this.view = props.view
    }
    // 设置 全选
    setAllCheckbox(e,item) {
        let filterSearch = this.view.state.filterSearch
        let filterObj = this.view.state.filterObj
        if (Object.keys(filterObj[item].data).length === filterSearch[item].length) {
            filterSearch[item] = []
        } else {
            filterSearch[item] = []
            filterSearch[item] = filterSearch[item].concat(Object.keys(filterObj[item].data))
        }
        this.view.setState({ filterSearch: filterSearch })
    }
    //  设置 多选
    setCheckbox(e, item, key) {
        let filterSearch = this.view.state.filterSearch
        // 想办法关联起来(选项true和fales=>当前选中)
        if (filterSearch[item].indexOf(key) !== -1) {
            filterSearch[item].splice(filterSearch[item].indexOf(key), 1)
        } else {
            filterSearch[item].push(key)
        }
        this.view.setState({ filterSearch: filterSearch })
    }
    //  取消 您已选择
    closeSelect(key) {
        let filterSearch = this.view.state.filterSearch
        filterSearch[key] = []
        this.view.setState({ filterSearch: filterSearch })
    }
    // more filter 是否显示 更多
    moreFilter(e,item) {
        let dom = ReactDOM.findDOMNode(this[item])
        if (dom.offsetHeight > 40) {
            dom.style.height = '40px'
            dom.style.overflow = 'hidden'
            this.setState({ [item + 'Text']: '展开' })
        } else {
            dom.style.height = 'auto';
            dom.style.overflow = 'auto';
            this.setState({ [item + 'Text']: '收起' })
        }
    }
    // 如果 高度大于40 则隐藏并显示 more
    judgeMore(that) {
        Object.keys(that.view.state.filterObj).map(item => {
            let dom = ReactDOM.findDOMNode(that[item])
            if (dom.offsetHeight > 40) {
                dom.style.height = '40px'
                dom.style.overflow = 'hidden'
                that.setState({ [item + 'More']: true })
            }
        })
    }

    componentDidMount() {
        let that = this
        Object.keys(this.view.state.filterObj).map(item => {
            that[item] = document.getElementById(that.view.state.id+item)
        })
        this.judgeMore(that)
    }

    render(){
        return(
            <Row>
                <Col className="AllProduct-filter">
                    {/* 抽象-多选 */}
                    {this.view.state.filterObj &&
                        Object.keys(this.view.state.filterObj).map(item =>
                            <Row style={{ borderBottom: '1px #d9d9d9 dashed' }} key={item}>
                                <Col className="AllProduct-filter-item">
                                    <Col span={2} className="AllProduct-filter-title">{this.view.state.filterObj[item].title}:</Col>
                                    <Col span={21} className="AllProduct-filter-main" id={this.view.state.id+item} ref={ref => this[item] = ref}>
                                        <Checkbox checked={this.view.state.filterSearch[item].length === Object.keys(this.view.state.filterObj[item].data).length}
                                            onChange={e=>this.setAllCheckbox(e,item)} style={{ marginLeft: '8px' }} >不限</Checkbox>
                                        {Object.keys(this.view.state.filterObj[item].data).map(key =>
                                            <Checkbox key={key}
                                                checked={this.view.state.filterSearch[item].indexOf(key-0) !== -1}
                                                onChange={e => this.setCheckbox(e, item, key-0,)}
                                            >{this.view.state.filterObj[item].data[key]}</Checkbox>
                                        )}
                                    </Col>
                                    {this.state[item + "More"] &&
                                        <Col span={1} className={'AllProduct-filter-more ' + (this.state[item + "More"] ? '' : 'hide')} onClick={e => this.moreFilter(e,item)}>
                                            {this.state[item + 'Text'] ? this.state[item + 'Text'] : '展开'}<Icon type={this.state[item + 'Text'] === '收起' ? "up" : 'down'} theme="outlined" />
                                        </Col>
                                    }
                                </Col>
                            </Row>
                        )}

                    {/* 您已选择 */}
                    <Col className="AllProduct-filter-item">
                        <Col span={2} className="AllProduct-filter-title">您已选择:</Col>
                        <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.view.state.filterSearch).map(key =>
                                <div key={key}
                                    className={(this.view.state.filterSearch[key].length === 0 ? 'hide' : 'AllProduct-filter-userSelect')}>
                                    <span style={{ marginRight: '8px' }} >
                                        {this.view.state.filterSearch[key].map((itemText, index) => {
                                            if ((index + 1) === this.view.state.filterSearch[key].length) {
                                                return this.view.state.filterObj[key].data[itemText]
                                            }
                                            else {
                                                return this.view.state.filterObj[key].data[itemText] + '、'
                                            }
                                        })}
                                    </span>
                                    <Icon type="close-circle" theme="outlined" className="AllProduct-filter-userSelect-close"
                                        onClick={_ => this.closeSelect(key)} />
                                </div>
                            )}
                        </Col>
                    </Col>
                </Col>
            </Row>

        )
    }
}





// ============================================   多图轮播图 (热卖推介)
export class MultiCarousel extends React.Component{
    constructor(props){
        super();
        this.state = {}
        // this.view = this.props.view
        console.log(this)

    }

    componentDidMount() {
        new Swiper(`#${this.props.swiperCfg.id}`, {
            loop: this.props.swiperCfg.loop, // 循环模式选项
            slidesPerView: this.props.swiperCfg.numSwiper,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: `#${this.props.swiperCfg.id}prevCtrl`,
                prevEl: `#${this.props.swiperCfg.id}nextCtrl`,
            },
            // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true,
        });
    }

    render(){
        return(
            <Row style={{ marginTop: '16px' }}>
                <div className="index-title">
                    <span className="index-title-left">热卖推介</span>
                    <span className="index-title-right">更多<Icon type="right" /></span>
                </div>
                <Col className="supplier-hot">
                    {/* 轮播图版本的 照片墙 */}
                    <div className="swiper-container" style={{ width: '100%' }} id={this.props.swiperCfg.id}>
                        <div className="swiper-wrapper">
                            {
                                this.props.swiperCfg.data.map((item, index) => (
                                    <div className="swiper-slide supplier-hot-item" key={index} style={{height: this.props.swiperCfg.height}}>
                                        <img onClick={_ => this.setState({ photoWallShow: true })}
                                            src={item} className="index-photo-item img-size" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="swiper-button-prev Supplier-index-prev" id={this.props.swiperCfg.id+'prevCtrl'}> <Icon type="left-circle" theme="filled" /></div>
                        <div className="swiper-button-next Supplier-index-next" id={this.props.swiperCfg.id+'nextCtrl'}> <Icon type="right-circle" theme="filled" /></div>

                    </div>
                </Col>
            </Row>
        )
    }

}



// ============================================  ProductList  产品列表
export class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {
            cur_pro_id: ''
        }
    }

    // 点击查看详情 展开团期列表
    checkDetail(id) {
        console.log(id)
        if (id === this.state.cur_pro_id) {
            this.setState({ cur_pro_id: '' })
        } else {
            this.setState({ cur_pro_id: id })
        }
    }
    render(){
        return(
            <Row className="Recommend-pro-recommend">
                <div className="index-title">
                    <span className="index-title-left">主推产品</span>
                    <span className="index-title-right">更多<Icon type="right" /></span>
                </div>
                <Col className="Recommend-pro-info">
                    {this.props.param.data.map((item, index) =>
                        <Col className="Recommend-pro-info-item" key={item.id} onClick={_=>this.props.param.toPage(item.id)}>
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
                                    <Col className="Recommend-pro-group-title">
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
        )
    }
}


// ============================================  左边表单 , 右边轮播图(散票/散房)
export class FormAndCarsou extends React.Component{
    constructor(){
        super();
        this.state = {

        }
        console.log(this)
        this.carouselRef = null
        this.setCarouselRef = el => {
            this.carouselRef = el;
        };
    }

    prevImg() {
        console.log(this.carouselRef)
        if (this.carouselRef) this.carouselRef.prev();
    }
    nextImg() {
        if (this.carouselRef) this.carouselRef.next();
    }

    render(){
        return(
            <Row gutter={16}>
                {/* 左表单,右轮播图 */}
                <Col className="Scattered-col">
                    <Col span={6}>
                        {this.props.children}
                    </Col>
                    <Col span={18}>
                        <Col className="Scattered-right-carousel box-shadow p-0" style={{height: this.props.param.height}}>
                            <Carousel autoplay ref={this.setCarouselRef} >
                                {this.props.param.data.map((item, index) =>
                                    <div key={index}><img src={item} className="img-size" style={{ borderRadius: '4px' }} /></div>
                                )}
                            </Carousel>
                            <div className="modal-carousel-prev" onClick={_ => this.prevImg()}>
                                <Icon type="left-circle" theme="filled" />
                            </div>
                            <div className="modal-carousel-next" onClick={_ => this.nextImg()}>
                                <Icon type="right-circle" theme="filled" />
                            </div>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}


// ============================================ 左 轮播图/  右 商品详情
export class ProductHeaderInfo extends React.Component{
    constructor(){
        super();
        // 这个已经做了,但是好像有个更好用的方式(swiper官网双向控制 controller )
        this.state = {
            // big控制small的index
            SwiperIndex: 0,
            // 如果有预定模块, 则成人和儿童人数
            AdultNum: 1,
            ChildrenNum: 0,
        }

    }

    componentDidMount(){
        let that = this
        // big
        this.state.bigSwiper = new Swiper(`#${this.props.param.id+'big-id'}`, {
            // loop: true, // 循环模式选项
            slidesPerView: 1,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: `#${this.props.param.id}big-prevCtrl`,
                prevEl: `#${this.props.param.id}big-nextCtrl`,
            },
            on: {
                slideChangeTransitionEnd: function (event) {
                    that.bigToSmall()
                },
            },
            // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true,
        });
        // small
        let smallSwiper = new Swiper(`#${this.props.param.id + 'small-id'}`, {
            // loop: true, // 循环模式选项
            slidesPerView: 4,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: `#${this.props.param.id}small-prevCtrl`,
                prevEl: `#${this.props.param.id}small-nextCtrl`,
            },
            // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true,
        });
    }

    smallToBig(i){
        // small控制big
        this.state.bigSwiper.slideTo(i, 1000, false); //切换到第一个slide，速度为1秒
        this.setState({SwiperIndex: i})
    }
    bigToSmall(){
        let bigBox = document.getElementById('big-box');
        for(let i = 0, len = bigBox.children.length; i < len; i++){
            if (bigBox.children[i].className === 'swiper-slide ProInfo-left-big-item swiper-slide-active'){
                this.setState({ SwiperIndex: i })
            }
        }
    }
    // 改变 成人/儿童 人数
    onChangeAdult(val){
        console.log(val)
        this.setState({ AdultNum: val })
    }
    onChangeChildren(val){
        console.log(val)
        this.setState({ ChildrenNum: val })
    }



    render(){
        return(
            <Row className="ProInfo-header">
                <Col style={{overflow: 'hidden'}}>
                    <Col span={14} className="ProInfo-left">
                        <Col>
                            {/* 大图 */}
                            <div className="swiper-container" id={this.props.param.id + 'big-id'}>
                                <div className="swiper-wrapper ProInfo-left-big" id="big-box">
                                    {
                                        this.props.param.data.map((item, index) => (
                                            <div className="swiper-slide ProInfo-left-big-item" key={index} index={index}>
                                                <img onClick={_ => this.setState({ photoWallShow: true })}
                                                    src={item} className="img-size border-radius" />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="swiper-button-prev Supplier-index-prev" id={this.props.param.id+"big-prevCtrl"}
                                onClick={_=>this.bigToSmall()}> 
                                    <Icon type="left-circle" theme="filled" />
                                </div>
                                <div className="swiper-button-next Supplier-index-next" id={this.props.param.id+"big-nextCtrl"}
                                onClick={_=>this.bigToSmall()}> 
                                    <Icon type="right-circle" theme="filled" />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            {/* 小图 */}
                            <div className="swiper-container ProInfo-left-small-box" id={this.props.param.id + 'small-id'}>
                                <div className="swiper-wrapper ProInfo-left-small">
                                    {
                                        this.props.param.data.map((item, index) => (
                                            <div className={"swiper-slide ProInfo-left-small-item "+ (this.state.SwiperIndex === index?'ProInfo-left-small-item-active':'')} key={index} 
                                            onClick={_ => this.smallToBig(index)} >
                                                <img onClick={_ => this.setState({ photoWallShow: true })}
                                                    src={item} className="index-photo-item img-size" />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="swiper-button-prev Supplier-index-prev" id={this.props.param.id + "small-prevCtrl"}>
                                    <Icon type="left-circle" theme="filled" />
                                </div>
                                <div className="swiper-button-next Supplier-index-next" id={this.props.param.id + "small-nextCtrl"}>
                                    <Icon type="right-circle" theme="filled" />
                                </div>
                            </div>
                        </Col>  
                    </Col>
                    <Col span={10} className="ProInfo-right">
                        {this.props.children}
                    </Col>
                </Col>
                {/* 预定 */}
                {this.props.param && this.props.param.reserve && 
                    <Col className="ProInfo-num">
                        <Col span={16} className="ProInfo-num-left">
                            <div className="ProInfo-num-left-Adult">成人 : &nbsp;&nbsp;<InputNumber min={1} max={100} defaultValue={1} onChange={val => this.onChangeAdult(val)} /></div>
                            <div className="ProInfo-num-left-Children">儿童 : &nbsp;&nbsp;<InputNumber min={0} max={100} defaultValue={0} onChange={val => this.onChangeChildren(val)} /></div>
                        </Col>
                        <Col span={8} className="ProInfo-num-right">
                            <div className="ProInfo-num-right-price">总价: ￥ <span>29998</span>&nbsp;&nbsp;<Icon type="exclamation-circle" className="pointer" /></div>
                            <div className="ProInfo-num-right-Reserve">立即预定</div>
                        </Col>
                    </Col>
                }

            </Row>
        )
    }
}


// ============================================ 时间/人数 预定按钮
export class DateAndNumReserve extends React.Component{
    constructor(){
        super();
        this.state = {}
        // forceUpdate()
    }

    render(){
        return(
            <Row>
                <Col className="DateAndNumReserve">
                    <Col span={16} className="DateAndNumReserve-num-left">
                        <div className="DateAndNumReserve-num-left-date">选择日期 : &nbsp;&nbsp;
                            <DatePicker disabled value={this.props.param.defaultDate ? moment(this.props.param.defaultDate) : moment()}
                            // onChange={(date, dateString) => this.onChangeAdult(date, dateString)}
                             />
                        </div>
                        <div className="DateAndNumReserve-num-left-Adult">成人 : &nbsp;&nbsp;
                            <InputNumber min={1} max={100} defaultValue={this.props.param.AdultNum} onChange={val => this.props.param.AdultNumChange(val)} />
                        </div>
                        <div className="DateAndNumReserve-num-left-Children">儿童 : &nbsp;&nbsp;
                            <InputNumber min={0} max={100} defaultValue={this.props.param.ChildrenNum} onChange={val => this.props.param.AdultNumChange(val)} />
                            &nbsp;&nbsp;<span className="pointer">儿童标准价 <Icon type="exclamation-circle" /></span>
                        </div>
                    </Col>
                    <Col span={8} className="DateAndNumReserve-num-right">
                        <div className="DateAndNumReserve-num-right-price">总价: ￥ <span>29998</span>&nbsp;&nbsp;<Icon type="exclamation-circle" className="pointer" /></div>
                        <div className="DateAndNumReserve-num-right-Reserve" onClick={_ => this.props.param.reserve()}>立即预定</div>
                    </Col>
                </Col>
            </Row>
        )
    }
}




// ============================================ 房态/价格
export class RoomstatusAndPrice extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [
                { date: '2018-08-08', type: [{ name: '豪华标准间' }, { name: '豪华大床房' }, { name: '豪华家庭房' }, { name: '豪华家庭房' }] },
                { date: '2018-10-18', type: [{ name: '海底套房' }, { name: '海底大床房' }, { name: '海底家庭房' }, { name: '海底家庭房' }] },
                { date: '2018-12-12', type: [{ name: '总统套房' }, { name: '总理大床房' }, { name: '外交部长家庭房' }, { name: '外交部长家庭房' }] },
                { date: '2018-12-12', type: [{ name: '大总统套房' }, { name: '大总理大床房' }, { name: '大外交部长家庭房' }, { name: '外交部长家庭房' }] },
            ],
            // 搜索条件
            fromDate: '',
            toDate: '',
            roomType: '',
            // 现实更多 日期 判断条件
            dateMore: 2,
            // 显示更多 房间类型 判断条件
            roomTypeMore: []
        }
        this.day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    }

    componentWillMount(){
        let roomTypeMore = []
        this.state.data.forEach(item => {
            roomTypeMore.push(2)
        })
        this.setState({ roomTypeMore: roomTypeMore})
    }
    // 禁止选择的日期
    disabledDate(current){
        return current && current < moment().startOf('day')
    }
    // 选择入住/离开日期
    fromDate(date, dateString){
        console.log(date)
        console.log(dateString)
        this.setState({ fromDate: dateString })
    }
    toDate(date, dateString){
        console.log(date)
        console.log(dateString)
        this.setState({ toDate: dateString })
    }
    selectRoomType(val, options){
        console.log(val);console.log(options);
        this.setState({ roomType: val })
    }
    // 搜索 房间
    searchRoom(){
        console.log(this)
        console.log('搜索')
        console.log(this.state.fromDate, this.state.toDate, this.state.roomType)
    }
    // 查看更多房型
    checkMoreRoomType(index){
        let roomTypeMore = this.state.roomTypeMore
        if (roomTypeMore[index] === 1000){
            roomTypeMore[index] = 2
            this.setState({ roomTypeMore: roomTypeMore })
        }else{
            roomTypeMore[index] = 1000
            this.setState({ roomTypeMore: roomTypeMore })
        }
    }
    // 查看更多 日期
    checkDateMore(){
        this.setState({dateMore: this.state.dateMore + 3})
    }
    // fold 折叠更多 日期
    foldDateMore() {
        this.setState({ dateMore: 2 })
    }
    // onChangeNum 填写人数
    onChangeNum(val, index, i){
        // val: input的值, index: data数据的下标, i: data下标的type的下标
        let data = this.state.data
        data[index].type[i].num = val
        console.log(data)
        this.setState({data})
    }

    render(){
        return(
            <Row>
                <Col className="RoomstatusAndPrice">
                    <Col className="RoomstatusAndPrice-title">房态价格</Col>
                    <Col className="RoomstatusAndPrice-date">
                        <Col span={6} style={{textAlign:'left'}}>
                            <span>入住日期 : </span><DatePicker disabledDate={this.disabledDate} onChange={this.fromDate.bind(this)} />
                        </Col>                
                        <Col span={7} style={{textAlign:'center'}}>
                            <span>离店日期 : </span><DatePicker disabledDate={this.disabledDate} onChange={this.toDate.bind(this)} />
                        </Col>                
                        <Col span={6} style={{textAlign:'right'}}><span>选择房型 : </span>
                            <Select defaultValue="2" onChange={this.selectRoomType.bind(this)}
                            style={{width:'180px'}}>
                                <Option value="1">家庭房</Option>
                                <Option value="2">大床房</Option>
                                <Option value="3">双床房</Option>
                                <Option value="4">情趣房</Option>
                            </Select>
                        </Col>                
                        <Col span={5} style={{textAlign:'right'}}>
                            <Button type="primary" icon="search" className="RoomstatusAndPrice-date-btn"
                            onClick={_=>this.searchRoom()}>搜索</Button>
                        </Col>                
                    </Col>
                    <Col className="RoomstatusAndPrice-info">
                    {this.state.data.map((item,index) => 
                        <Col className={"RoomstatusAndPrice-info-box "+(index > this.state.dateMore ? "hide" : "")}>
                            <Col className="RoomstatusAndPrice-info-header">
                                <span>{moment(item.date).format('YYYY-MM-DD')} <i> {this.day[moment(item.date).day()]}</i></span>
                                {this.state.roomTypeMore[index] === 2 && 
                                <Button type="primary" icon="down" size="small" ghost
                                    className="RoomstatusAndPrice-info-header-more"
                                    onClick={_ => this.checkMoreRoomType(index)}>
                                    更多房型</Button>
                                }
                                {this.state.roomTypeMore[index] === 1000 &&
                                <Button type="primary" icon="up" size="small" ghost
                                    className="RoomstatusAndPrice-info-header-more"
                                    onClick={_ => this.checkMoreRoomType(index)}>
                                    收起展开</Button>
                                }
                            </Col>
                            <Col className="RoomstatusAndPrice-info-content">
                                <Col className="RoomstatusAndPrice-info-title">
                                    <Col span={2}>房型</Col>
                                    <Col span={2}>床型</Col>
                                    <Col span={2}>面积</Col>
                                    <Col span={2}>早餐</Col>
                                    <Col span={2}>宽带</Col>
                                    <Col span={2}>入住人数</Col>
                                    <Col span={3}>可否加床</Col>
                                    <Col span={2}>同行价</Col>
                                    <Col span={2}>销售价</Col>
                                    <Col span={2}>剩余</Col>
                                    <Col span={3}>数量</Col>
                                </Col>
                                {item.type.map((cell,i) => 
                                <Col className={"RoomstatusAndPrice-info-main " + (i > this.state.roomTypeMore[index] ? "hide" : "")} key={i}>
                                    <Col span={2} title={cell.name}>{cell.name}</Col>
                                    <Col span={2} title={cell.name}>双床</Col>
                                    <Col span={2} title={cell.name}>30㎡</Col>
                                    <Col span={2} title={cell.name}>有</Col>
                                    <Col span={2} title={cell.name}>有</Col>
                                    <Col span={2} title={cell.name}>2人</Col>
                                    <Col span={3} title={cell.name}>可加</Col>
                                    <Col span={2} title={cell.name}>298</Col>
                                    <Col span={2} title={cell.name}>328</Col>
                                    <Col span={2} title={cell.name}>38</Col>
                                    <Col span={3}>
                                        <InputNumber min={0} max={100} defaultValue={0} onChange={val => this.onChangeNum(val, index, i)} />
                                    </Col>
                                </Col>
                                )}
                            </Col>
                        </Col>
                    )}    
                    {this.state.dateMore < this.state.data.length && 
                        <Col className="RoomstatusAndPrice-info-dateMore" title="加载更多"
                        onClick={_=>this.checkDateMore()}>
                            <Icon type="double-right" className="dateMore-open" />
                        </Col> 
                    }   
                    {this.state.dateMore >= this.state.data.length &&
                        <Col className="RoomstatusAndPrice-info-dateMore" title="收起展开"
                            onClick={_ => this.foldDateMore()}>
                            <Icon type="double-right" className="dateMore-fold" />
                        </Col>
                    }    
                                      
                    </Col>                
                    <Col className="RoomstatusAndPrice-reserve">
                        <Col span={16} className="RoomstatusAndPrice-reserve-left">
                            {[1,2,3,4,5].map((item,index) => 
                                <Col className="RoomstatusAndPrice-reserve-left-info" key={index} >
                                    <div className="RoomstatusAndPrice-reserve-left-info-date">2018-07-07</div>
                                    <div className="RoomstatusAndPrice-reserve-left-info-type">总统大床房 * 1</div>
                                </Col>                     
                            )}
                        </Col>
                        <Col span={8} className="RoomstatusAndPrice-reserve-right">
                            <div className="RoomstatusAndPrice-reserve-right-price">总价: ￥ <span>29998</span>&nbsp;&nbsp;<Icon type="exclamation-circle" className="pointer" /></div>
                            <div className="RoomstatusAndPrice-reserve-right-Reserve" onClick={_ => this.props.param.reserve()}>立即预定</div>
                        </Col>
                    </Col>                
                </Col>
            </Row>
        )
    }
}


// ============================================  散票 班期价格
export class ScheduleAndPrice extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    changeNum(val){
        console.log(val)
        
    }
    render(){
        return(
            <Row>
                <Col className="ScheduleAndPrice">
                    <Col className="ScheduleAndPrice-title">班期价格</Col>
                    <Col className="ScheduleAndPrice-table">
                        <Col className="ScheduleAndPrice-table-title">
                            <Col span={3}>单程往返</Col>
                            <Col span={3}>出团日期</Col>
                            <Col span={3}>回团日期</Col>
                            <Col span={3}>出发城市</Col>
                            <Col span={3}>抵达城市</Col>
                            <Col span={3}>同行价</Col>
                            <Col span={3}>销售价</Col>
                            <Col span={3}>利润</Col>
                        </Col>
                        <Col className="ScheduleAndPrice-table-main">
                        {[1,2,3,4].map(item => 
                            <Col>
                                <Col className="ScheduleAndPrice-table-main-top">
                                    <Col span={3}>往返</Col>
                                    <Col span={3}>2018-08-08</Col>
                                    <Col span={3}>2018-10-10</Col>
                                    <Col span={3}>加格达奇乌鲁斯</Col>
                                    <Col span={3}>艾尔鹿特丹德玛西亚</Col>
                                    <Col span={3}>￥25888</Col>
                                    <Col span={3}>￥28888</Col>
                                    <Col span={3}>￥3000</Col>
                                </Col>
                                <Col className="ScheduleAndPrice-table-main-btm">
                                    <Col span={3} offset={15}>总位 : <span className="ScheduleAndPrice-table-main-top-total">100</span></Col>
                                    <Col span={3}>剩余 : <span className="ScheduleAndPrice-table-main-top-Surplus">>10</span></Col>
                                    <Col span={3}> <InputNumber max={100} min={0} defaultValue={0} onChange={val=>this.changeNum(val)} /> </Col>
                                </Col>
                            </Col>
                        )}
                        </Col>
                    </Col>
                    <Col className="DateAndNumReserve">
                        <Col span={16} className="DateAndNumReserve-num-left">
                            <div className="DateAndNumReserve-num-left-date">选择日期 : &nbsp;&nbsp;
                                <DatePicker disabled value={this.props.param.defaultDate || ''}
                                // onChange={(date, dateString) => this.onChangeAdult(date, dateString)}
                                />
                            </div>
                            <div className="DateAndNumReserve-num-left-Adult">成人 : &nbsp;&nbsp;
                            <InputNumber min={1} max={100} defaultValue={this.props.param.AdultNum} onChange={val => this.props.param.AdultNumChange(val)} />
                            </div>
                            <div className="DateAndNumReserve-num-left-Children">儿童 : &nbsp;&nbsp;
                            <InputNumber min={0} max={100} defaultValue={this.props.param.ChildrenNum} onChange={val => this.props.param.AdultNumChange(val)} />
                                &nbsp;&nbsp;<span className="pointer">儿童标准价 <Icon type="exclamation-circle" /></span>
                            </div>
                        </Col>
                        <Col span={8} className="DateAndNumReserve-num-right">
                            <div className="DateAndNumReserve-num-right-price">总价: ￥ <span>29998</span>&nbsp;&nbsp;<Icon type="exclamation-circle" className="pointer" /></div>
                            <div className="DateAndNumReserve-num-right-Reserve" onClick={_ => this.props.param.reserve()}>立即预定</div>
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}


// ============================================ 航班详情 (散卖机票)
export class FlightDetail extends React.Component{
    constructor(){
        super();
        this.state = {}

    }


    render(){
        return(
            <Row>
                <Col>
                    <Col>航班详情</Col>
                    <Col>

                        <Col>
                            <Col>
                                <Col span={10}>中国东方航空 MU4567</Col>
                                <Col span={4}>机型 : 波音787-9(大)</Col>
                                <Col span={3}>机龄 : 6年</Col>
                                <Col span={3}>准点率 : 50%</Col>
                                <Col span={4}>提前三分钟到达</Col>
                            </Col>
                            <Col>
                                <Col span={4}></Col>
                                <Col span={5}></Col>
                                <Col span={4}></Col>
                                <Col span={6}></Col>
                                <Col span={5}></Col>
                            </Col>
                        </Col>

                    </Col>
                </Col>
            </Row>
        )
    }
}