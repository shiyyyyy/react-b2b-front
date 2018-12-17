import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Breadcrumb, Tag, Button, Tabs, Radio, Rate, Carousel, DatePicker, Checkbox, Select, InputNumber, Pagination, Tooltip, Badge, Dropdown } from 'antd';

import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import { Calendar } from './calendar';
import moment from 'moment';
import { debug } from 'util';

// 供应商前台 组件 => css (零批分销)
import '../css/Retail.css';
// 供应商后台 => 供应商后台 组件 => css 
import '../css/Supplier-back.css';

const { Header, Content, Footer } = Layout;
const RadioGroup = Radio.Group;
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
        this.slider = []
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
        let that = this
        let SwiperEl = document.getElementById(`${this.props.swiperCfg.id}`);
        this.slider = Array.from(SwiperEl.children[0].children);
        this.slider.forEach(item =>{
            item.addEventListener('click', function () { 
                (that.clickSwiper.bind(this,that))()
            })
        })
    }

    // clickSwiper
    clickSwiper(that){
        // this 是 当前标签元素,that是组件
        console.log(this)
        console.log(that)
    }

    render(){
        return(
            <Row style={{ marginTop: '16px' }}>
                <Col className="MultiCarousel">
                    <div className="MultiCarousel-title">
                        <span className="MultiCarousel-title-left">热卖推介</span>
                        <span className="MultiCarousel-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="MultiCarousel-content">
                        {/* 轮播图版本的 照片墙 */}
                        <div className="swiper-container" style={{ width: '100%' }} id={this.props.swiperCfg.id}>
                            <div className="swiper-wrapper">
                                {
                                    this.props.swiperCfg.data.map((item, index) => (
                                        <div className="swiper-slide MultiCarousel-content-item" key={index} style={{ height: this.props.swiperCfg.height }}
                                            id={item}>
                                            <img onClick={_ => this.setState({ photoWallShow: true })}
                                                src={item} className="MultiCarousel-content-item-img img-size" />
                                            {/* 隐藏(鼠标移动澳div则显示) */}
                                            <div className="MultiCarousel-content-item-text-box">
                                                <div className="MultiCarousel-content-item-text">
                                                    <div className="MultiCarousel-content-item-text-name text-overflow-2">法意日法西斯三国游,让你体验不一样的世界.希特勒自传,墨索里尼的宣言和日本天皇的内裤,都是你人生路上必不可少的乐趣.</div>
                                                    <div className="MultiCarousel-content-item-text-synopsis text-overflow-3">希特勒自传: 希特勒自传,带你领略顶级侵略者的意志和希特勒独特的的人格魅力, 给你不一样的体验,你还在等什么?</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="swiper-button-prev Supplier-index-prev" id={this.props.swiperCfg.id + 'prevCtrl'}> <Icon type="left-circle" theme="filled" /></div>
                            <div className="swiper-button-next Supplier-index-next" id={this.props.swiperCfg.id + 'nextCtrl'}> <Icon type="right-circle" theme="filled" /></div>

                        </div>
                    </Col>
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
                        <Col className="Recommend-pro-info-item" key={item.id}>
                            <Col className="Recommend-top">
                                <Col span={3} className="Recommend-pro-img-box">
                                    <img src={'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'}
                                        className="Recommend-pro-img" />
                                    <span className="Recommend-pro-img-text">产品编号: P0-4396</span>
                                </Col>
                                <Col span={21} style={{ paddingLeft: '20px' }}>
                                    <Col className="Recommend-pro-r-top" onClick={_ => this.props.param.toPage(item.id)}>
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

// =============================================== 带日历的 产品列表
export class ProductCalendarList extends React.Component {
    constructor() {
        super();
        this.state = {
            // 当前展开的产品id
            cur_pro_id: '',
            // 日历需要
            date: moment(),
            NextDate: moment().add(1, 'M'),
            data:[

            ],
            dateData: [
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
            selectDateString: '',
            selectId: '',
            AdultNum: 1,
            ChildrenNum: 0,
        }
    }

    // 两个 日历
    calendarFun1() {
        let that = this
        let param = {
            // 多个日历时需要统一控制当前日期(否则多个日历都会有自己的当前日期)
            selectDateString: this.state.selectDateString,
            selectId: this.state.selectId,
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
            selectDateCb(date) {
                that.setState({ selectDateString: date })
            },
            selectIdCb(id) {
                that.setState({ selectId: id })
            }
        }

        return (
            <Calendar date={this.state.date} data={this.state.dateData} param={param} />
        )
    }
    calendarFun2() {
        let that = this
        let param = {
            selectDateString: this.state.selectDateString,
            selectId: this.state.selectId,
            prev() {
                let date = that.state.date.subtract(1, 'M')
                let NextDate = that.state.NextDate.subtract(1, 'M')
                that.setState({ date: date, NextDate: NextDate })
            },
            prevCtrl: false,
            next() {
                let date = that.state.date.add(1, 'M')
                let NextDate = that.state.NextDate.add(1, 'M')
                that.setState({ date: date, NextDate: NextDate })
            },
            selectDateCb(date) {
                that.setState({ selectDateString: date })
            },
            selectIdCb(id) {
                that.setState({ selectId: id })
            }
        }

        return (
            <Calendar date={this.state.NextDate} data={this.state.dateData} param={param} />
        )
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
    render() {
        return (
            <Row className="Recommend-pro-recommend">
                <div className="index-title">
                    <span className="index-title-left">主推产品</span>
                    <span className="index-title-right">更多<Icon type="right" /></span>
                </div>
                <Col className="Recommend-pro-info">
                    {this.props.param.data.map((item, index) =>
                        <Col className="Recommend-pro-info-item" key={item.id}>
                            <Col className="Recommend-top">
                                <Col span={3} className="Recommend-pro-img-box">
                                    <img src={'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'}
                                        className="Recommend-pro-img" />
                                    <span className="Recommend-pro-img-text">产品编号: P0-4396</span>
                                </Col>
                                <Col span={21} style={{ paddingLeft: '20px' }}>
                                    <Col className="Recommend-pro-r-top" onClick={_ => this.props.param.toPage(item.id)}>
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
                            {/* 展开 */}
                            <Col className={"Recommend-btm " + (this.state.cur_pro_id === item.id ? '' : 'hide')}>
                                <Col className="Recommend-pro-group-list-box">
                                    <Col span={12} style={{margin: '12px 0'}}>
                                        {this.calendarFun1()}
                                    </Col>
                                    <Col span={12} style={{margin: '12px 0'}}>
                                        {this.calendarFun2()}
                                    </Col>
                                    <Col className="Recommend-pro-group-title">
                                        <Col span={3}>房型</Col>
                                        <Col span={2}>床型</Col>
                                        <Col span={2}>面积</Col>
                                        <Col span={2}>早餐</Col>
                                        <Col span={2}>宽带</Col>
                                        <Col span={2}>入住人数</Col>
                                        <Col span={2}>可否加床</Col>
                                        <Col span={3}>销售价</Col>
                                        <Col span={3}>同行价</Col>
                                        <Col span={3}></Col>
                                    </Col>
                                    {item.group.map(list =>
                                        <Col className="Recommend-pro-group-list" key={list.id}>
                                            <Col className="Recommend-pro-group-list-main">
                                                <Col span={3}>大总理大床房</Col>
                                                <Col span={2}>圆水床</Col>
                                                <Col span={2}>30㎡</Col>
                                                <Col span={2}>有</Col>
                                                <Col span={2}>有</Col>
                                                <Col span={2}>2</Col>
                                                <Col span={2}>可加</Col>
                                                <Col span={3}>￥ 599</Col>
                                                <Col span={3}>￥ 499</Col>
                                                <Col span={3}><Button type="primary" size='small' ghost>预定</Button></Col>
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
                <Col className="FlightDetail">
                    <Col className="FlightDetail-title">航班详情</Col>
                    <Col className="FlightDetail-content">
                    {[1,2,3].map(item=>
                        <Col className="FlightDetail-con-cell">
                            <Col className="FlightDetail-con-cell-top">
                                <Col span={10}><img src="/img/avatar1.png" /> <span>中国东方航空</span> <span>MU4567</span></Col>
                                <Col span={4}>机型 : 波音787-9(大)</Col>
                                <Col span={3}>机龄 : 6年</Col>
                                <Col span={3}>准点率 : 50%</Col>
                                <Col span={4}>提前三分钟到达</Col>
                            </Col>
                            <Col className="FlightDetail-con-cell-btm">
                                <Col span={13} className="FlightDetail-con-cell-btm-left">
                                    <div className="FlightDetail-con-cell-btm-left-Airport">
                                        <div>09:20 am</div><div>北京</div><div>首都机场T1</div>
                                    </div>
                                    <div className="FlightDetail-con-cell-btm-left-Pass">
                                        <div>停靠点</div>
                                        <div><div></div><div></div><div></div></div>
                                        <div>上海</div>
                                    </div>
                                    <div className="FlightDetail-con-cell-btm-left-Airport">
                                        <div>10:30 pm</div><div>洛杉矶</div><div>洛杉矶机场</div>
                                    </div>
                                </Col>
                                <Col span={6} className="FlightDetail-con-cell-btm-center">
                                    <span>飞行时长 : </span>&nbsp;<span> 14小时12分钟</span>
                                </Col>
                                <Col span={5} className="FlightDetail-con-cell-btm-right">
                                    <div><span>￥21580 </span><span> 起</span></div>
                                    <div>(不含税)</div>
                                </Col>
                            </Col>
                        </Col>
                    )}
                    </Col>
                </Col>
            </Row>
        )
    }
}


// ============================================================== 产品评价 Product evaluation
export class ProductEvaluation extends React.Component{
    constructor(){
        super();
        this.state = {
            cur_tag: 1,
            open_eva_index: '', // 展开的是第几条评论
            open_show: [], // 按钮是否显示数组
            evaluate: [
                { tag: '1', praise: 1, com: '', emp: '', pro_name: '', time: '2018-08-09', num: '2', evaluate: "好好好,这个导游真的好(每条5毛,括号内删掉)", id: '1' },
                { tag: '2', praise: 2, com: '', emp: '', pro_name: '', time: '2018-08-09', num: '2', evaluate: "好好好,这个导游真的好(每条5毛,括号内删掉)", id: '2' },
                { tag: '1', praise: 3, com: '', emp: '', pro_name: '', time: '2018-08-09', num: '2', evaluate: "好好好,这个导游真的好(每条5毛,括号内删掉)", id: '3' },
                { tag: '2', praise: 1, com: '', emp: '', pro_name: '', time: '2018-08-09', num: '2', evaluate: "好好好,这个导游真的好(每条5毛,括号内删掉)", id: '4' },
            ],
        }

    }
    //  如果,评价文字大于两行,则只显示2行,并显示展开按钮 
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
    // 'evaluate'+index 评价 是否超过2行?超过则只显示两行,并显示展开按钮
    componentDidMount(){
        let open_show = this.state.open_show
        open_show.length = this.state.evaluate.length
        this.state.evaluate.forEach( (item,index) => {
            if (document.getElementById('evaluate'+item.id).offsetHeight >= 41){
                open_show[index] = true
            }
        })
        this.setState({ open_show: open_show})
        console.log(open_show)
    }

    // 标签样式
    tags_color = [
        'magenta', 'cyan', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple'
    ]
    // 切换 评价标签
    tagChange(e) {
        console.log(e.target.value)
        this.setState({ cur_tag: e.target.value })
    }
    // 展开折叠
    open_eva(index) {
        if (index === this.state.open_eva_index) {
            this.setState({ open_eva_index: '' })
            return
        }
        this.setState({ open_eva_index: index })
    }

    render(){
        return(
            <Row>
                <Col className="ProductEvaluation">
                    <Col className="ProductEvaluation-title">
                        <div className="ProductEvaluation-title-text">产品评价</div>
                        <div className="ProductEvaluation-title-more">更多<Icon type="right" /></div>
                    </Col>
                    <Col className="ProductEvaluation-tag">
                        <div className="ProductEvaluation-tag-radio" style={{ width: 'auto' }}>
                            <RadioGroup onChange={this.tagChange.bind(this)} value={this.state.cur_tag}>
                                <Radio value={1} className={this.state.cur_tag === 1 ? "ProductEvaluation-tag-radio-active" : ""}>全部评价(4396)</Radio>
                                <Radio value={2} className={this.state.cur_tag === 2 ? "ProductEvaluation-tag-radio-active" : ""}>卖方评价(3600)</Radio>
                                <Radio value={3} className={this.state.cur_tag === 3 ? "ProductEvaluation-tag-radio-active" : ""}>买方评价(796)</Radio>
                                <Radio value={4} className={this.state.cur_tag === 4 ? "ProductEvaluation-tag-radio-active" : ""}>好评(2864)</Radio>
                                <Radio value={5} className={this.state.cur_tag === 5 ? "ProductEvaluation-tag-radio-active" : ""}>中评(998)</Radio>
                                <Radio value={6} className={this.state.cur_tag === 6 ? "ProductEvaluation-tag-radio-active" : ""}>差评(34)</Radio>
                                <Radio value={7} className={this.state.cur_tag === 7 ? "ProductEvaluation-tag-radio-active" : ""}>追评(23)</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                    <Col className="ProductEvaluation-list">
                        {
                            this.state.evaluate.map((item, index) =>
                                <Col span={24} className={"ProductEvaluation-cell-box " + (index > 9 ? "hide" : "")} key={item.id}>
                                    <Col span={2}>
                                        <Avatar src={item.avatar ? '/img/avatar1.png' : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                            size={64} />
                                    </Col>
                                    <Col span={22} style={{ textAlign: 'left' }}>
                                        <Col>
                                            <Col span={18} className="ProductEvaluation-cell-info">
                                                <Col className="ProductEvaluation-cell-com-emp">北京神州国际旅行社有限责任公司-哈士奇</Col>
                                                <Col className="ProductEvaluation-cell-type"><Tag color={this.tags_color[item.tag]} className="m-0">{item.tag === '1' ? '卖方' : '买方'}</Tag></Col>
                                            </Col>
                                            <Col span={6} className="ProductEvaluation-cell-time">2018-08-24 20:32:54</Col>
                                        </Col>
                                        <Col>
                                            <Col className="ProductEvaluation-cell-pro_name-box">
                                                <Col className="ProductEvaluation-cell-pro_name">纵情法兰西14日深度一国游</Col>
                                                <Col className="ProductEvaluation-cell-dep_date">8月25日</Col>
                                                <Col className="ProductEvaluation-cell-num">5人</Col>
                                            </Col>
                                            <Col>
                                                <Col className={this.state.open_eva_index === index ? "ProductEvaluation-cell-main-open" : "ProductEvaluation-cell-main"}
                                                id={'evaluate'+item.id}>o,乌云开始遮蔽,夜色很干净,公园里葬礼的回音,在满天飞行,送你的白色玫瑰在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静静听,我黑色的大衣,想吻着你日渐冰冷的回忆,走过的错过的森林,哎,我在空空的墓地,老去后还爱你.为你弹奏肖邦的夜曲,几点我死去的爱情,而我为你隐姓埋名在月光下弹琴,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥.</Col>
                                                <Col className="ProductEvaluation-cell-open">
                                                {this.state.open_show[index] &&  
                                                    <span onClick={_ => this.open_eva(index)}>
                                                        <Icon className={this.state.open_eva_index === index ? 'ProductEvaluation-cell-fold-icon' : 'ProductEvaluation-cell-open-icon'}
                                                            type="double-left" theme="outlined" /> &nbsp;
                                                        {this.state.open_eva_index === index ? '收起全部' : '展开全部'}
                                                    </span>
                                                }
                                                </Col>
                                            </Col>
                                            <Col className="ProductEvaluation-cell-praise">
                                                <Col span={18}>
                                                    <Col className="ProductEvaluation-cell-sell">
                                                        <span className="ProductEvaluation-cell-sell-title">卖方评价:</span>
                                                        <span>总体评分：<strong> 9.6分</strong></span>
                                                        <span>售前答疑：<strong> 9.0分</strong></span>
                                                        <span>专业知识：<strong> 9.9分</strong></span>
                                                        <span>服务态度：<strong> 9.8分</strong></span>
                                                        <span>售后很总：<strong> 9.4分</strong></span>
                                                    </Col>
                                                    <Col className="ProductEvaluation-cell-sell">
                                                        <span className="ProductEvaluation-cell-sell-title">卖方评价:</span>
                                                        <span>总体评分：<strong> 9.6分</strong></span>
                                                        <span>销售能力：<strong> 9.0分</strong></span>
                                                        <span>沟通效率：<strong> 9.9分</strong></span>
                                                        <span>应变能力：<strong> 9.8分</strong></span>
                                                        <span>结款速度：<strong> 9.4分</strong></span>
                                                    </Col>
                                                </Col>
                                                <Col span={6}>
                                                    <Col span={12} push={12} style={{ textAlign: 'center' }}>
                                                        <Col>
                                                            <Rate className="rate-color" style={{ fontSize: '16px' }} allowHalf defaultValue={4.6} disabled />
                                                        </Col>
                                                        <Col>好评</Col>
                                                    </Col>
                                                </Col>
                                            </Col>
                                        </Col>
                                    </Col>
                                </Col>
                            )}
                        <Col></Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

// ====================================================  类似产品/挥泪专区(打折产品) Discount
export class DiscountProduct extends React.Component{
    constructor(){
        super();
        this.state = {
            discount: [
                { url: 'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg', id: '1', path: 'lalalla' },
                { url: 'http://attachments.gfan.com/forum/201504/15/202327b405oo5c0bgz01oo.jpg', id: '2', path: 'lalalla' },
                { url: 'http://t1.niutuku.com/960/45/45-439758.jpg', id: '3', path: 'lalalla' },
                { url: 'http://pic25.photophoto.cn/20121211/0005018603291216_b.jpg', id: '4', path: 'lalalla' },
                { url: 'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg', id: '5', path: 'lalalla' },
                { url: 'http://img2.imgtn.bdimg.com/it/u=1033197597,3656846721&fm=26&gp=0.jpg', id: '6', path: 'lalalla' },
            ],
            viewNum: 4
        }
        this.title = {
            text: '类似产品',
            url: ''
        }
    }

    render(){
        return(
            <Row>
                <Col className="DiscountProduct">
                    <Col className="DiscountProduct-title">
                        <Col className="DiscountProduct-title-text">{this.title.text}</Col>
                        <Col className="DiscountProduct-title-more">更多<Icon type="right" /></Col>
                    </Col>
                    <Col className="DiscountProduct-content">
                    {this.state.discount.map((item, index) =>
                        <Col className={"DiscountProduct-content-cell " + (index > 3 ? "hide " : "") 
                        + (this.state.viewNum === 4? 'w-25 ':'') + (this.state.viewNum === 5? 'w-20' :'')} key={item.id}>
                            <Col className="DiscountProduct-content-cell-photo" key={item.id}>
                                <img src={item.url ? item.url : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'}
                                    className="img-size" />
                            </Col>
                            <Col className="DiscountProduct-content-cell-pro-info">
                                <Col span={16} className="DiscountProduct-content-info">
                                    <div className="DiscountProduct-content-name">南非欧洲双周双洲尽情游</div>
                                    <div className="DiscountProduct-content-dep_date">2018-08-08</div>
                                </Col>
                                <Col span={7} push={1} className="prici-discount">
                                    <div className="DiscountProduct-content-origin-price">￥28888</div>
                                    <div className="DiscountProduct-content-price">￥19999</div>
                                </Col>
                            </Col>
                        </Col>
                    )}
                    </Col>
                </Col>
            </Row>
        )
    }
}






// =======================================   用户后台 页面   ========================================  //

// =========================================== 用户后台页面 => header =====================================
export class UserBackDeskHeader extends React.Component{
    constructor(){
        super();
        this.state = { }

    }

    // user 下拉菜单
    DropdownMenu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">支付宝</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">淘宝</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">天猫</a>
            </Menu.Item>
        </Menu>
    )
    render(){
        return(
            <Row>
                <Col>
                    {/* 顶部 登录人 */}
                    <Row className="personal-top">
                        <Col span={6} push={1} className="personal-top-right">
                            <Col span={6} className="personal-top-right-item"><a>设为首页</a></Col>
                            <Col span={6} className="personal-top-right-item"><a>加入收藏</a></Col>
                            <Col span={6} className="personal-top-right-item"><a>官方微信</a></Col>
                            <Col span={6} className="personal-top-right-item"><a>在线帮助</a></Col>
                        </Col>
                        <Col span={2} push={13}>
                            <Dropdown overlay={this.DropdownMenu} placement="bottomCenter">
                                <div style={{ cursor: 'pointer' }}>
                                    <Icon style={{ fontSize: '20px' }} type="user" theme="outlined" />
                                    &nbsp;王二麻子&nbsp;
                                <Icon style={{ fontSize: '14px' }} type="caret-down" theme="outlined" />
                                </div>
                            </Dropdown>
                        </Col>
                        <Col span={1} push={13}>
                            <Badge count={1} style={{ transform: 'scale(.7) translateX(7px)' }}>
                                <Icon style={{ fontSize: '20px', cursor: 'pointer' }} type="message" theme="outlined" />
                            </Badge>
                        </Col>
                    </Row>
                    {/* header-tab  */}
                    <Header>
                        <Row style={{ height: '64px' }} gutter={16}>
                            <Col span={3} className="personal-logo" ></Col>
                            <Col span={21} className="personal-header">
                                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}
                                    mode='horizontal' className="personal-header-menu">
                                    {this.props.param.Menu.map((item, index) =>
                                        item.children ?
                                            (
                                                <SubMenu title={<span><Icon type={item.icon} /><span>{item.name}</span></span>} key={item.key}>
                                                    {item.children &&
                                                        item.children.map(child =>
                                                            <Menu.Item key={child.key}>
                                                                <Link to={child.path}>
                                                                    <Icon type={child.icon} />
                                                                    <span className="nav-text">{child.name}</span>
                                                                </Link>
                                                            </Menu.Item>
                                                        )}
                                                </SubMenu>
                                            ) : (
                                                <Menu.Item key={item.key}>
                                                    <Link to={item.path}>
                                                        <Icon type={item.icon} />
                                                        <span className="nav-text">{item.name}</span>
                                                    </Link>
                                                </Menu.Item>
                                            )
                                    )}
                                </Menu>

                            </Col>
                        </Row>
                    </Header>
                </Col>
            </Row>
        )
    }
}


// ===============================================  供应商后台 => 平台首页(header/3等块)
export class ThreeEqualBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            task: [
                {text:'查产品', icon:'avatar1.png',url:'',new: 0},
                {text:'提问题', icon:'avatar1.png',url:'',new: 2},
                {text:'答问题', icon:'avatar1.png',url:'',new: 4},
                {text:'找特价', icon:'avatar1.png',url:'',new: 6},
                {text:'找订单', icon:'avatar1.png',url:'',new: 8},
                {text:'看特们', icon:'avatar1.png',url:'',new: 10}
            ]
        }

    }

    render(){
        return (
            <Row gutter={16}>
                <Col className="ThreeEqualBlock">
                    <Col span={8} className="ThreeEqualBlock-block">
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">个人信息</Col>
                                {/* <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col> */}
                            </Col>
                            <Col className="ThreeEqualBlock-block-content">
                                <Col className="ThreeEqualBlock-block-content-1">
                                    <Col span={6}>
                                        <Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                            size={64} />
                                        <Col className="ThreeEqualBlock-block-content-left-text">个人中心</Col>
                                    </Col>
                                    <Col span={18} className="ThreeEqualBlock-block-content-right">
                                        <Col className="ThreeEqualBlock-block-company">北京凤凰假期国际旅行社有限责任公司</Col>
                                        <Col className="ThreeEqualBlock-block-brand">--环宇风情</Col>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">每日任务</Col>
                                {/* <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col> */}
                            </Col>
                            <Col className="ThreeEqualBlock-block-content">
                                {this.state.task.map(item => 
                                    <Col span={8} key={item.text} className="ThreeEqualBlock-block-2-item">
                                        <Badge count={item.new}>
                                            <img src={'img/'+item.icon} className="ThreeEqualBlock-block-content-icon" />
                                        </Badge>
                                        <Col className="ThreeEqualBlock-block-content-icon-text">{item.text}</Col>
                                    </Col>
                                )}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">交易数据</Col>
                                {/* <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col> */}
                            </Col>
                            <Col className="ThreeEqualBlock-block-content">
                                <Col className="ThreeEqualBlock-block-content-3-item">
                                    <Col className="ThreeEqualBlock-block-content-3-left">我的余额：<span>2387986.55</span></Col>
                                    <Col className="ThreeEqualBlock-block-content-3-right"><Button size="small" ghost type="primary">明细</Button></Col>                                    
                                </Col>
                                <Col className="ThreeEqualBlock-block-content-3-item">
                                    <Col className="ThreeEqualBlock-block-content-3-left">用券抵扣：<span>4536.34</span></Col>
                                    <Col className="ThreeEqualBlock-block-content-3-right"><Button size="small" ghost type="primary">明细</Button></Col>                                
                                </Col>
                                <Col className="ThreeEqualBlock-block-content-3-item">
                                    <Col className="ThreeEqualBlock-block-content-3-left">优&nbsp;&nbsp;惠&nbsp;&nbsp;券：<span>16</span></Col>
                                    <Col className="ThreeEqualBlock-block-content-3-right"><Button size="small" ghost type="primary">领券</Button></Col>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        )
    }
}


//  ========================================= 供应商后台 => 平台首页=> 平台公告&官方活动(2不等块)
export class NoticeAndActivity extends React.Component{
    constructor(){
        super();
        this.state = {
            Notice:[
                { id: 0, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 1, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 2, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 3, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 4, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 5, date: '2018-08-08', title: '进一步建设社会主义新农村' },
            ],
            Activity: [
                { id: 0, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 1, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 2, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 3, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 4, date: '2018-08-08', title: '进一步建设社会主义新农村' },
                { id: 5, date: '2018-08-08', title: '进一步建设社会主义新农村' },
            ],
        }

    }

    render(){
        return(
            <Row gutter={16}>
                <Col className="NoticeAndActivity">
                    <Col span={14}>
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">平台公告</Col>
                                <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col>
                            </Col>
                            <Col className="NoticeAndActivity-content">
                            {this.state.Notice.map((item,index) => 
                                <Col className={"NoticeAndActivity-content-item "+(index>4?'hide':'')} key={index}>
                                    <Col span={5} className="NoticeAndActivity-content-item-left">{item.date}</Col>
                                    <Col span={19} className="NoticeAndActivity-content-item-right text-overflow">{item.title}</Col>
                                </Col>
                            )}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">官方活动</Col>
                                <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col>
                            </Col>
                            <Col className="NoticeAndActivity-content">
                            {this.state.Activity.map((item,index) =>
                                <Col className={"NoticeAndActivity-content-item "+(index>4?'hide':'')} key={index}>
                                    <Col span={6} className="NoticeAndActivity-content-item-left">{item.date}</Col>
                                    <Col span={18} className="NoticeAndActivity-content-item-right text-overflow">{item.title}</Col>
                                </Col>
                            )}
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        )
    }
}


// ====================================== 供应商后台 => 平台首页=> 带filter的title,底下是订单(订单管理)
export class TitleFliterOrder extends React.Component{
    constructor(){
        super();
        this.state = {
            cur_filter: 0,
        }

    }

    clickFilter(type){
        this.setState({cur_filter: type})
    }

    render(){
        return(
            <Row>
                <Col className="TitleFliterOrder">
                    <Col className="Supplier-back-title">
                        <Col className="Supplier-back-title-text">订单管理</Col>
                        <Col className="TitleFliterOrder-title-tilter">
                            <div className={"TitleFliterOrder-title-tilter-item "+(this.state.cur_filter === 0?"TitleFliterOrder-title-tilter-item-active":"")}
                            onClick={_=>this.clickFilter(0)}>全部</div>
                            <div className={"TitleFliterOrder-title-tilter-item "+(this.state.cur_filter === 1?"TitleFliterOrder-title-tilter-item-active":"")}
                            onClick={_=>this.clickFilter(1)}>待处理</div>
                            <div className={"TitleFliterOrder-title-tilter-item "+(this.state.cur_filter === 2?"TitleFliterOrder-title-tilter-item-active":"")}
                            onClick={_=>this.clickFilter(2)}>占位中</div>
                            <div className={"TitleFliterOrder-title-tilter-item "+(this.state.cur_filter === 3?"TitleFliterOrder-title-tilter-item-active":"")}
                            onClick={_=>this.clickFilter(3)}>已确认</div>
                            <div className={"TitleFliterOrder-title-tilter-item "+(this.state.cur_filter === 4?"TitleFliterOrder-title-tilter-item-active":"")}
                            onClick={_=>this.clickFilter(4)}>已取消</div>
                        </Col>
                        <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col>
                    </Col>
                    <Col></Col>
                </Col>
            </Row>
        )
    }
}


// ====================================== 供应商后台 => 平台首页=> 机会跟踪 ==========
export class OpportunityTracking extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                Opportunity:[
                    { id: 0, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 1, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 2, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 3, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 4, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 5, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 6, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 7, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 8, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 9, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 10, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                    { id: 11, user_search: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},] },
                ],
                qa:[
                    { id: 0, like: 4 },
                    { id: 2, like: 427 },
                    { id: 3, like: 247 },
                    { id: 5, like: 1432 },
                    { id: 6, like: 1432 },
                    { id: 7, like: 1432 },
                ]
            }
        }

    }


    render() {
        return (
            <Row gutter={16}>
                <Col className="OpportunityTracking">
                    <Col span={18} className="OpportunityTracking-left">
                        <Row>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">机会跟踪</Col>
                                <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col>
                            </Col>
                            <Col className="OpportunityTracking-left-content">
                            {this.state.data.Opportunity.map( (item,index) =>
                                { return ( index <= 5 &&
                                <Col span={12} className="OpportunityTracking-left-content-item" key={item.id}>
                                    <Col span={6} className="OpportunityTracking-left-content-item-left">
                                        <Col className="OpportunityTracking-left-item-left-avatar">
                                            <Avatar src={item.avatar ? '/img/avatar1.png' : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                                size={64} />
                                        </Col>
                                        <Col className="OpportunityTracking-left-item-left-name">韩启明</Col>
                                        <Col className="OpportunityTracking-left-item-left-mobile">13488883434</Col>
                                    </Col>
                                    <Col span={18} className="OpportunityTracking-content-item-right">
                                        <div className="OpportunityTracking-left-item-right-top"><span>最后检索</span><span>最后登录时间: 2018-08-08</span></div>
                                        <div className="OpportunityTracking-left-item-right-search-box">
                                            {item.user_search.map((cell, i) =>
                                                <div className="OpportunityTracking-left-item-right-search-item" key={i}>
                                                    <span>四国连游</span>
                                                    <span>(4)</span>
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Col>
                                )}
                            )}
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6} className="OpportunityTracking-right">
                        <Row style={{height: '100%'}}>
                            <Col className="Supplier-back-title">
                                <Col className="Supplier-back-title-text">热门问答</Col>
                                <Col className="Supplier-back-title-more">更多<Icon type="right" /></Col>
                            </Col>
                            <Col className="OpportunityTracking-right-qa">
                            {this.state.data.qa.map((item,index) =>
                                {return ( index < 5 && 
                                    <Col className="OpportunityTracking-right-qa-item">
                                        <Col className="OpportunityTracking-right-qa-item-q text-overflow-2">
                                            死神里面的实力设定是不是很乱?没有一个统一的标准?反正主角开挂就完事了?
                                        </Col>
                                        <Col className="OpportunityTracking-right-qa-item-btn">
                                            <Col className="OpportunityTracking-right-qa-item-like">
                                                <Icon type="like" style={{ fontSize: '16px', color: '#D34646' }} /> <span>({item.like})</span>
                                            </Col>
                                            <Col className="OpportunityTracking-right-qa-item-a">
                                                <Icon type="form" style={{ fontSize: '16px', color: '#17BC37' }} /> <span>回答</span>
                                            </Col>
                                        </Col>
                                    </Col>
                                )}
                            )}
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
        )
    }
}



// ====================================== 供应商后台 => 店铺管理=> 左侧Tabs ==========
export class LeftTabs extends React.Component{
    constructor(){
        super();
        this.state = {}

    }

    render(){
        return(
            <Row>
                <Col className="LeftTabs">
                    <div className="LeftTabs-title">供应商中心</div>
                    <Tabs defaultActiveKey="1" onChange={e => this.TabsChange(e)} tabPosition='left'>
                        <TabPane tab="平台首页" key="1">
                        </TabPane>
                        <TabPane tab="个人首页" key="2">
                        </TabPane>
                        <TabPane tab="店铺管理" key="3">
                        </TabPane>
                        <TabPane tab="账号管理" key="4">
                        </TabPane>
                        <TabPane tab="产品管理" key="5">
                        </TabPane>
                        <TabPane tab="交易管理" key="6">
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 => 店铺管理=> 右侧头部 面包屑(级别导航) ==========
export class RightHeaderBreadcrumb extends React.Component{
    constructor() {
        super();
        this.state = {
            // 面包屑
            Breadcrunmb: [
                { text: '平台首页', path: '/supplier-back/platform' },
                { text: '个人首页', path: '/supplier-back/personalHomePage' },
                { text: '首页', path: '/home' },
            ]
        }

    }

    render(){
        return(
            <Row>
                <Col className="RightHeaderBreadcrumb">
                    <Breadcrumb className="text-left">
                        {this.state.Breadcrunmb.map((item, index) =>
                            <Breadcrumb.Item key={index}>
                                <Link to={item.path}>{item.text}</Link>
                            </Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 => 店铺管理=> 右侧头部 设置和按钮 ==========
export class RightSetAndBtn extends React.Component {
    constructor() {
        super();
        this.state = {}

    }

    render() {
        return (
            <Row>
                <Col className="RightSetAndBtn">
                    <Icon type="appstore" style={{ fontSize: '24px', marginRight: '24px' }} />
                    <Button size="small">新增</Button>
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 => 店铺管理=> 右侧头部 过滤和搜索 ==========
export class RightFilterAndSearch extends React.Component{
    constructor() {
        super();
        this.state = {
            filter: [
                {text: "北京" ,id: 0}, {text: "上海" ,id: 1}, {text: "深圳" ,id: 2},
            ],
            search: {
                filter: 0,
                search: '',
            }
        }

    }

    // 右边搜索 
    selectChange(val){

    }
    inputChange(val){
        let search = this.state.search
        search.search = val
        this.setState({ search: search})
    }
    inputSearch(){
        console.log(this)
    }

    render() {
        return (
            <Row>
                <Col className="RightFilterAndSearch">
                    <Col span={12} className="RightFilterAndSearch-left">
                        {this.props.children}
                    </Col>
                    <Col span={12} className="RightFilterAndSearch-right">
                        <Col>
                            <InputGroup compact size="small">
                                <Select defaultValue={this.state.search.filter}
                                size="small"
                                onChange={this.selectChange.bind(this)}>
                                {this.state.filter.map( item =>
                                    <Option value={item.id} key={item.id}>{item.text}</Option>
                                )}
                                </Select>
                                <Input style={{ width: '50%' }} value={this.state.search.search} 
                                onChange={this.inputChange.bind(this)} />
                                <Button type="primary" size="small" 
                                onClick={_=>this.inputSearch()}>搜索</Button>
                            </InputGroup>
                        </Col>
                        <Col className="RightFilterAndSearch-right-icon" style={{color:'#E13E3E'}}>
                            <Icon type="close-circle" />
                        </Col>
                        <Col className="RightFilterAndSearch-right-icon" style={{color:'#3FB50B'}}>
                            <Icon type="sync" />
                        </Col>
                    </Col>
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 => 店铺管理=> 右侧 产品列表 ==========
export class RightProList extends React.Component {
    constructor() {
        super();
        this.state = {}

    }

    render() {
        return (
            <Row>
                <Col className="RightProList">
                </Col>
            </Row>
        )
    }
}