import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Tag, Button, Tabs, Radio, Rate, Carousel, DatePicker, Checkbox, Select, InputNumber, Pagination, Tooltip, Badge, Dropdown } from 'antd';

import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import { debug } from 'util';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;


// 用户前台页面 => 通用顶部 
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




// 搜索 filtermore 带日期/价格等的filter通用组件
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





// 多图轮播图 (热卖推介)
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



// ProductList  产品列表 
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


// 左边表单 , 右边轮播图(散票/散房)
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


// 左 轮播图/  右 商品详情
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
        this.state.bigSwiper = new Swiper(`#${this.props.param.bigId+'big-id'}`, {
            // loop: true, // 循环模式选项
            slidesPerView: 1,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: `#${this.props.param.bigId}big-prevCtrl`,
                prevEl: `#${this.props.param.bigId}big-nextCtrl`,
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
        let smallSwiper = new Swiper(`#${this.props.param.smallId + 'small-id'}`, {
            // loop: true, // 循环模式选项
            slidesPerView: 4,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: `#${this.props.param.smallId}small-prevCtrl`,
                prevEl: `#${this.props.param.smallId}small-nextCtrl`,
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
                            <div className="swiper-container" id={this.props.param.bigId + 'big-id'}>
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
                                <div className="swiper-button-prev Supplier-index-prev" id={this.props.param.bigId+"big-prevCtrl"}
                                onClick={_=>this.bigToSmall()}> 
                                    <Icon type="left-circle" theme="filled" />
                                </div>
                                <div className="swiper-button-next Supplier-index-next" id={this.props.param.bigId+"big-nextCtrl"}
                                onClick={_=>this.bigToSmall()}> 
                                    <Icon type="right-circle" theme="filled" />
                                </div>
                            </div>
                        </Col>
                        <Col>
                            {/* 小图 */}
                            <div className="swiper-container ProInfo-left-small-box" id={this.props.param.smallId + 'small-id'}>
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
                                <div className="swiper-button-prev Supplier-index-prev" id={this.props.param.smallId + "small-prevCtrl"}>
                                    <Icon type="left-circle" theme="filled" />
                                </div>
                                <div className="swiper-button-next Supplier-index-next" id={this.props.param.smallId + "small-nextCtrl"}>
                                    <Icon type="right-circle" theme="filled" />
                                </div>
                            </div>
                        </Col>  
                    </Col>
                    <Col span={10} className="ProInfo-right">
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
                                <span className="ProInfo-right-detail-title">出&nbsp;&nbsp;发&nbsp;&nbsp;地 : </span><span className="ProInfo-right-detail-main">北京发团</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">分类标签 : </span><span className="ProInfo-right-detail-main">跟团游-东南亚-泰一地</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">行程天数 : </span><span className="ProInfo-right-detail-main">6晚7天</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">往返交通 : </span><span className="ProInfo-right-detail-main">飞机去 自行车回</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">自费购物 : </span><span className="ProInfo-right-detail-main">有自费 无购物</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">游玩主题 : </span><span className="ProInfo-right-detail-main">古镇游 山水游 蜜月游</span>
                            </div>
                            <div className="ProInfo-right-detail-item">
                                <span className="ProInfo-right-detail-title">销&nbsp;&nbsp;售&nbsp;&nbsp;价 : </span>
                                <span className="ProInfo-right-detail-main"><strong>￥28889</strong>起/人</span>
                                <span className="ProInfo-right-detail-title" style={{marginLeft: '32px'}}>同&nbsp;&nbsp;行&nbsp;&nbsp;价 : </span>
                                <span className="ProInfo-right-detail-main"><strong>￥16698</strong>起/人</span>
                            </div>
                        </Col>
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
