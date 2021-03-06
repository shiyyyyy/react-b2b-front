import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Resizable } from 'react-resizable';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Breadcrumb, Table, Popconfirm, Divider, Upload, Spin, Form, Tag, Button, Tabs, Radio, Rate, Carousel, DatePicker, Checkbox, Select, InputNumber, Badge, Dropdown } from 'antd';

// import G2 from '@antv/g2';
// import Swiper from 'swiper/dist/js/swiper.js';
import Swiper from 'swiper';
import moment from 'moment';

import locale from 'antd/lib/date-picker/locale/zh_CN';
import Calendar from '../Calendar';

// 供应商前台 组件 => css (零批分销)
import './UserFront.less';
// 供应商后台 => 供应商后台 组件 => css 
import './Supplier-back.less';

import styles from './index.less';


const { Header } = Layout;
const RadioGroup = Radio.Group;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Search } = Input;
const InputGroup = Input.Group;
const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;



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
        <div className="home-header" >
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
                defaultSelectedKeys={[this.props.param.index]}
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
                                    <Col span={24} className="Recommend-pro-group-title">
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

    componentDidMount(){
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
                                <Menu theme="light" mode="inline" defaultSelectedKeys={[this.props.param.index]}
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

// 产品热度
export class ProductHot extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
  }
  
	render(){
		const { title, more, maxNum, data  } = this.props;
		return (
      <Col>
        <Col className="mod-title">
          <Col className="mod-text">{title}</Col>
          <Col className={more ? 'mod-more' : 'hide'}>
            {more}
            <Icon type="right" />
          </Col>
        </Col>
        <Col className={styles.ProductHot}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={6} lg={6} xl={6} className={styles.itemPadding} key={index}>
              <Col className={[styles.item, index >= maxNum ? 'hide' : ''].join(' ')} key={item.id}>
                <Col className={styles['item-photo']} key={item.id}>
                  <img
                    src={
                      item.url
                        ? item.url
                        : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'
                    }
                    className="img-size"
                  />
                </Col>
                <Col className={styles['item-pro-info']}>
                  <Col className={[styles['info'], 'text-overflow-2'].join(' ')}>
                    南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游南非欧洲双周双洲尽情游
                  </Col>
                  <Col className={styles['prici-discount']}>
                    <Col span={12} className={styles['origin-price']}>昨日访问: <span style={{color: '#F43266'}}>{288}</span></Col>
                    <Col span={12} className={styles['price']}>今日访问: <span style={{color: '#F43266'}}>{888}</span></Col>
                  </Col>
                </Col>
              </Col>
            </Col>
          ))}
        </Col>
      </Col>
    );
	}
}

// 销售机会(产品分类标签)
export class ProductTypeTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, more, maxNum, data } = this.props;
    return (
      <Col>
        <Col className="mod-title">
          <Col className="mod-text">{title}</Col>
          <Col className={more ? 'mod-more' : 'hide'}>
            {more}
            <Icon type="right" />
          </Col>
        </Col>
        <Col className={styles.ProductTypeTag}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={6} lg={6} className={styles.itemPadding} key={index}>
              <Col className={[styles.item, index >= maxNum ? 'hide' : ''].join(' ')} key={item.id}>
                <Col className={styles.header}>
                  <Row type="flex">
                    <Col span={10} className={styles.avatar}>
                      <Avatar size={48} src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    </Col>
                    <Col span={14}>
                      <Col className={[styles.company, 'text-overflow-2'].join(' ')}>北京凤凰假期国际旅行社有限公司</Col>
                      <Col className={styles.info}>
                        <span className={styles.name}>张三</span>
                        <span className={styles.mobile}>13400009998</span>
                        <Icon className={styles.eye} type="eye" theme="filled" />
                      </Col>
                    </Col>
                  </Row>
                </Col>
                <Col className={styles.tags}>
                  <span>最近搜索:</span>
                  <span>德意日<span style={{color: 'hotpink'}}>(18)</span></span>
                </Col>
              </Col>
            </Col>
          ))}
        </Col>
      </Col>
    );
  }
}

// 最近订单
export class RecentOrder extends React.Component{
  constructor(props) {
		super(props)
		this.state = {
			active: 0
		}
	}


	changeActive(index){
		this.setState({active: index})
	}

  render(){
		const { active } = this.state;
		const { data } = this.props;
    return (
      <Row>
				<Col className={styles.RecentOrder}>
          <Col className="mod-title">
            <Col className="mod-text">
              最近订单
							<div className={styles.headerTags}>
              	<span className={[styles.itemTag,(active === 0 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(0)}>全部</span>
              	<span className={[styles.itemTag,(active === 1 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(1)}>占位待确认</span>
								<span className={[styles.itemTag,(active === 2 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(2)}>占位已确认</span>
              	<span className={[styles.itemTag,(active === 3 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(3)}>实报待确认</span>
              	<span className={[styles.itemTag,(active === 4 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(4)}>实报已确认</span>
              	<span className={[styles.itemTag,(active === 5 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(5)}>变更待确认</span>
              	<span className={[styles.itemTag,(active === 6 ? styles.headerActive:'')].join(' ')} onClick={e => this.changeActive(6)}>变更已确认</span>
							</div>
            </Col>
            <Col className="mod-more">
              更多
              <Icon type="right" />
            </Col>
          </Col>

          <Col>
						{data.map((item,index) => 
							<Col key={index} className={[styles.item, 'clear'].join(' ')}>
								<Col className={styles.itemHeader}>
									<div className={styles.hLeft}>订单号: D023456789</div>
									<div className={styles.hRight}>占位待确认</div>
								</Col>
								<Col className={[styles.content, 'clear'].join(' ')}>
									<Col xs={24} sm={6} md={3} lg={3} xl={3}>
										<div className={styles.imgBox}>
											<img src= {require('@public/favicon.png')} alt="图片" />
											<div className={styles.num}>编号: 89757</div>
										</div>
									</Col>
									<Col xs={24} sm={18} md={21} lg={21} xl={21}>
										<Col className={[styles.top, 'clear'].join(' ')}>
											<Col xs={20} sm={18} md={16} lg={12} xl={12} className={[styles.title,'text-overflow'].join(' ')}>超值无忧天一地K-98K, 5晚6天, 全程五星级酒店住宿, 让你欢乐到家.</Col>
											<Col xs={2} sm={2} md={2} lg={2} xl={2} className={styles.tag}><Tag color="blue">跟团游</Tag></Col>
										</Col>
										<Col className={[styles.btm, 'clear'].join(' ')}>
											<Col xs={24} sm={24} md={14} lg={14} xl={14}>
												<Col>
													<span className={styles.key}>报名人: </span>
													<span className={styles.val}>北青旅</span>
													<span className={styles.val}>十里河门市</span>
													<span className={styles.val}>门管中心</span>
													<span className={styles.val} style={{width: '48px'}}>张三</span>
													<span className={styles.val} style={{width: '72px'}}>13344445555</span>
												</Col>
												<Col>
													<span className={styles.key}>接单人: </span>
													<span className={styles.val}>北青旅</span>
													<span className={styles.val}>十里河门市</span>
													<span className={styles.val}>门管中心</span>
													<span className={styles.val} style={{width: '48px'}}>张三</span>
													<span className={styles.val} style={{width: '72px'}}>13344445555</span>
												</Col>
												<Col>
													<span className={styles.key}>受理人: </span>
													<span className={styles.val}>北青旅</span>
													<span className={styles.val}>十里河门市</span>
													<span className={styles.val}>门管中心</span>
													<span className={styles.val} style={{width: '48px'}}>张三</span>
													<span className={styles.val} style={{width: '72px'}}>13344445555</span>
												</Col>
											</Col>
											<Col xs={24} sm={24} md={10} lg={10} xl={10}>
												<Col className={styles.contentR}>
													<div className={styles.obj}>
														<span className={styles.key}>出团: </span> <span className={styles.val}>2018-02-02</span>
													</div>
													<div className={styles.obj}>
														<span className={styles.key}>回团: </span> <span className={styles.val}>2018-08-09</span>
													</div>
												</Col>
												<Col className={styles.contentR}>
													<div className={styles.obj}>
														<span className={styles.key}>人数: </span> <span className={styles.val}>24人</span>
													</div>
													<div className={styles.obj}>
														<span className={styles.key}>金额: </span> <span className={styles.money}>9998.00</span>
													</div>
												</Col>
												<Col className={styles.contentR}>
													<Button size={'small'} className='m-r-8 m-t-4'>上架</Button>
													<Button size={'small'} className='m-r-8 m-t-4'>修改</Button>
													<Button size={'small'} className='m-r-8 m-t-4'>删除</Button>
													<Button size={'small'} className='m-r-8 m-t-4'>复制</Button>
												</Col>
											</Col>
										</Col>
									</Col>
								</Col>
							</Col>	
						)}
					</Col>
        </Col>
      </Row>
    );
  }
}




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


// ====================================== 供应商后台 => 平台首页 => 机会跟踪 ==========
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
                                    <Col className="OpportunityTracking-right-qa-item" key={item.id}>
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



// ====================================== 供应商后台 =>  menu页面  => 左侧Tabs ==========
export class 
LeftTabs extends React.Component{
    constructor(){
        super();
        this.state = {}

    }

    render(){
        return(
            <Row>
                {/* <Col className="LeftTabs">
                    <div className="LeftTabs-title">供应商中心</div>
                    <Tabs defaultActiveKey="1" onChange={e => this.TabsChange(e)} tabPosition='left'>
                    {this.props.param.tabs.map( item =>
                        <TabPane tab={item.text} key={item.key}>
                            <Link to={item.path}>{item.text}</Link>
                        </TabPane>
                    )}
                    </Tabs>
                </Col> */}
                <Col className="LeftTabs">
                    <div className="LeftTabs-title">供应商中心</div>
                    <div className="LeftTabs-link">
                        {this.props.param.tabs.map(item =>
                            <Link to='/supplier-back/pro-manage/group-tour' key={item.key}
                            className={"LeftTabs-link-item " + (item.key === 2?'LeftTabs-link-item-active':'')}>{111}</Link>
                        )}
                    </div>
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 =>  menu页面  => 右侧头部 面包屑(级别导航) ==========
export class RightHeaderBreadcrumb extends React.Component{
    constructor() {
        super();
        this.state = {
            // 面包屑
            Breadcrunmb: [
                { text: '平台首页', path: '/supplier-back/platform' },
                { text: '个人首页', path: '/supplier-back/pro-manage' },
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

// ====================================== 供应商后台 =>  menu页面 => 右侧头部 设置和按钮 ==========
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

// ====================================== 供应商后台 =>  menu页面 => 右侧头部 过滤和搜索 ==========
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

// ====================================== 供应商后台 =>  menu页面 => 右侧 产品列表 ==========
export class RightProList extends React.Component {
    constructor() {
        super();
        this.state = {
            ProList:[
                { id: 1, proId: 11, name: 'meiugo十年B1签证,出签率98.7%,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 2, proId: 22, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 3, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 4, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 5, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 6, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 7, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 8, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 9, proId: 33, name: '美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
                { id: 10, proId: 33, name:'美国十年B1签证,出签率98.7%,专家指导,不出退钱,美国十年B1签证,出签率98.7%,专家指导,不出退钱,', },
            ]
        }
    }

    render() {
        return (
            <Row>
                <Col className="RightProList">
                {this.state.ProList.map( item => 
                    <Col className="RightProList-item" key={item.id}>
                        <Col span={3} className="RightProList-item-left">
                            <img src="/img/Login-bg.jpg" />
                            <span>编号: P04396</span>
                        </Col>
                        <Col span={21} className="RightProList-item-right">
                            <Col className="RightProList-item-right-top">
                                <span className="RightProList-item-right-top-name text-overflow" title={item.name}
                                >{item.name}</span>
                                <span className="RightProList-item-right-top-tag" style={{background: "#FECA76"}}>单签证</span>
                                <span className="RightProList-item-right-top-tag" style={{background: "#84C1FF"}}>跟团游</span>
                            </Col>
                            <Col className="RightProList-item-right-btm">
                                <Col span={12} className="RightProList-item-right-btm-left">
                                    <div className="RightProList-item-right-btm-left-item">
                                        <span>供 &nbsp;应 &nbsp;商 : </span>
                                        <span style={{color: '#666'}}>&nbsp;恒信西部-张三</span>
                                    </div>
                                    <div className="RightProList-item-right-btm-left-item">
                                        <span>送签国家 : </span>
                                        <span style={{color: '#666'}}>&nbsp;澳大利亚</span>
                                    </div>
                                    <div className="RightProList-item-right-btm-left-item">
                                        <span>送签类型 : </span>
                                        <span style={{color: '#666'}}>&nbsp;个人旅游</span>
                                    </div>
                                </Col>
                                <Col span={12} className="RightProList-item-right-btm-right">
                                    <Col className="RightProList-item-right-btm-right-text">
                                        <Col span={8} offset={6} className="RightProList-item-right-btm-left-item">
                                            <span>在售团期 : </span>
                                            <span style={{ color: '#E03737' }}>&nbsp; 76</span>个
                                        </Col>
                                        <Col span={8} offset={2} className="RightProList-item-right-btm-left-item">
                                            <span>产品评分 : </span>
                                            <span style={{ color: '#E03737' }}>&nbsp; 9.6</span>
                                        </Col>
                                        <Col span={8} offset={6} className="RightProList-item-right-btm-left-item">
                                            <span>访问次数 : </span>
                                            <span style={{ color: '#E03737' }}>&nbsp; 8265</span>次
                                        </Col>
                                        <Col span={8} offset={2} className="RightProList-item-right-btm-left-item">
                                            <span>审批状态 : </span>
                                            <span style={{ color: '#E03737' }}>&nbsp; 拒审批</span>
                                        </Col>
                                    </Col>
                                    <Col className="RightProList-item-right-btm-right-btn">
                                        <Button size="small">开团</Button>
                                        <Button size="small">修改</Button>
                                        <Button size="small">删除</Button>
                                        <Button size="small">复制</Button>
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                )}
                    
                </Col>
            </Row>
        )
    }
}


// ====================================== 供应商后台 =>  menu页面 => 新增页面 => 产品图片 ==========
export class ProductPictures extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false
        }
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
        // let that = this
        // let SwiperEl = document.getElementById(`${this.props.swiperCfg.id}`);
        // this.slider = Array.from(SwiperEl.children[0].children);
        // this.slider.forEach(item => {
        //     item.addEventListener('click', function () {
        //         (that.clickSwiper.bind(this, that))()
        //     })
        // })
    }

    // clickSwiper (循环swiper的时候,用这个,不是循环的不用)
    // clickSwiper(that) {
    //     // this 是 当前标签元素,that是组件
    //     console.log(this)
    //     console.log(that)
    // }

    clickPhotos(item, index){
        console.log(item)
        console.log(index)
    }

    // add photos
    addPhotos(){
        console.log('add')
    }
    // delete photos
    deletePhotos(item){
        console.log(item)
    }
    // 图片描述(备注)
    photoComment(val,index){
        console.log(val)
        console.log(index)
    }

    render(){
        return(
            <Row>
                <Col style={{overflow: 'hidden'}}>
                    {/* 产品图片 */}
                    <Col span={21} className="swiper-container" id={this.props.swiperCfg.id}>
                        <div className="swiper-wrapper">
                            {(this.props.swiperCfg.data.length >= 3 ? 
                                this.props.swiperCfg.data : 
                                this.props.swiperCfg.data.concat(new Array(3 - [this.props.swiperCfg.data].length).fill({})) 
                                )
                                .map((item, index) => (
                                    <div className="swiper-slide ProductPictures-item" key={index} style={{ height: this.props.swiperCfg.height }}
                                        id={item}>
                                        <div className="ProductPictures-item-top">
                                            <div>{index+1}</div>
                                            <div><Icon type="minus-circle" onClick={_ => this.deletePhotos(item)} /></div>
                                        </div>
                                        <div className="ProductPictures-item-content">
                                            <img onClick={_ => this.setState({ photoWallShow: true })}
                                            onClick={_ => this.clickPhotos(item,index)}
                                            src={item} className=" img-size" />    
                                        </div>
                                        <div className="ProductPictures-item-btm">
                                            <Input placeholder="请输入图片文字描述" onChange={e=>this.photoComment(e.target.value,index)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </Col>
                    {/* + */}
                    <Col span={3} className="ProductPictures-add-btn">
                        <Upload
                            name="avatar"
                            listType="text"
                            className=""
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            // beforeUpload={beforeUpload}
                            // onChange={this.handleChange}
                        >
                            <Icon type="plus" className="ProductPictures-add-btn-icon" onClick={_ => this.addPhotos()} />
                        </Upload>
                    </Col>
                    <div className="swiper-button-next ProductPictures-next" id={this.props.swiperCfg.id + 'nextCtrl'}> <Icon type="right-circle" theme="filled" /></div>
                    <div className="swiper-button-prev ProductPictures-prev" id={this.props.swiperCfg.id + 'prevCtrl'}> <Icon type="left-circle" theme="filled" /></div>

                </Col>
            </Row>
        )
    }
}


// ====================================== 供应商后台 =>  menu页面 => 新增页面 => 产品特色 ==========

export class ProductCharacteristic extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    textAearChange(val){
        console.log(val)
    }
    render(){
        return(
            <Row>
                <Col>
                    <TextArea placeholder="自适应高度文本域" autosize={{ minRows: 2, maxRows: 8 }} 
                    // style={{fontSize: '13px'}}
                    onChange={e => this.textAearChange(e.target.value)} />
                </Col>
            </Row>
        )
    }
}

// ====================================== 供应商后台 =>  menu页面 => 新增页面 => 产品行程 ==========

export class ProductScheduling extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
        }

        this.maxPage = 12
    }
    chengePage = (val) => this.setState({page: val})
    plusPage(){
        if(this.state.page >= this.maxPage) return
        this.setState({ page: ++this.state.page })
    }
    minusPage(){
        if (this.state.page <= 1) return
        this.setState({ page: --this.state.page })
    }
    blurPage(val){
        console.log(val)
    }

    render() {
        return (
            <Row>
                <Col className="ProductScheduling">
                    <Col className="ProductScheduling-top">
                        <Col className="ProductScheduling-top-btn">
                            <Button shape="circle" icon="upload" />
                            <Button shape="circle" icon="delete" />
                        </Col>
                        <Col className="ProductScheduling-top-pageNum">
                            <Button shape="circle" icon="minus" disabled={this.state.page <= 1}
                            onClick={_ => this.minusPage()} />
                            <input value={this.state.page} className="ProductScheduling-top-pageNum-input"
                                onChange={e => this.chengePage(e.target.value)}
                                onBlur={e => this.blurPage(e.target.value)} />
                            <Button shape="circle" icon="plus" disabled={this.state.page >= this.maxPage}
                            onClick={_ => this.plusPage()} />
                        </Col>                    
                    </Col>
                    <Col className="ProductScheduling-content">
                        PDF
                    </Col>
                </Col>
            </Row>
        )
    }
}


// ============================================    供应商后台 =>  menu页面 => Table    =========================================== //
 // =============================================   Table Table Table Table Table   ============================================ //
  // ===============================================            Table             ============================================= //

//   可编辑表格 =========
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => {
    return (
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
    )
};

export const EditableFormRow = Form.create()(EditableRow);

//   可伸缩列 =========
export const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};


//   Table => 更改单元格 =============

export class EditableCell extends React.Component {
    state = {
        editing: false,
        openShow: false
    }

    openModal(status){
        this.setState({openShow: status})
    }

    editHTML(id, options){
        // console.log(this)
        // console.log(options)
        if (options.type === '' || options.type === null || options.type === 'text'){
            return (
                <FormItem style={{ margin: 0 }}>
                    {this.form.getFieldDecorator(id, {
                        rules: [{
                            required: true,
                            message: `${options.title} 是必填项.`,
                        }],
                        initialValue: options.record[id],
                    })(<Input
                        ref={node => (this.input = node)}
                        // onPressEnter={this.save}
                    />)}
                </FormItem>
            )
        }
        if (options.type === 'number') {
            return (
                <FormItem style={{ margin: 0 }}>
                    {this.form.getFieldDecorator(id, {
                        rules: [{
                            required: true,
                            message: `${options.title} 是必填项.`,
                        }],
                        initialValue: options.record[id],
                    })(
                        <InputNumber min={0} max={10000} style={{ width: '112px' }} Group
                            ref={node => (this.input = node)}
                        // onChange={this.save}
                        />
                    )}
                </FormItem>
            )
        }
        if (options.type === 'date') {
            options.record[id] = moment(options.record[id])
            return (
                <FormItem style={{ margin: 0 }}>
                    {this.form.getFieldDecorator(id, {
                        rules: [{
                            required: true,
                            message: `${options.title} 是必填项.`,
                        }],
                        initialValue: options.record[id],
                    })(
                        <DatePicker ref={node => (this.input = node)}
                        className="Table-DatePicker"
                        format="YYYY-MM-DD"
                        onOpenChange={status => this.openModal(status)}
                        />
                    )}
                </FormItem>
            )
        }
        if (options.type === 'time') {
            return (
                <FormItem style={{ margin: 0 }}>
                    {this.form.getFieldDecorator(id, {
                        rules: [{
                            required: true,
                            message: `${options.title} 是必填项.`,
                        }],
                        initialValue: moment(options.record[id]),
                    })(
                        <DatePicker
                            locale={locale}
                            ref={node => (this.input = node)}
                            showTime
                            className="Table-DatePicker"
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"
                            onOpenChange={status => this.openModal(status)}
                        />
                    )}
                </FormItem>
            )
        }

        if (options.type === 'select') {
            return (
                <FormItem style={{ margin: 0 }}>
                    {this.form.getFieldDecorator(id, {
                        rules: [{
                            required: true,
                            message: `${options.title} 是必填项.`,
                        }],
                        initialValue: options.record[id],
                    })(
                        <Select style={{ width: 120 }} ref={node => (this.input = node)} 
                        onDropdownVisibleChange={open => this.openModal(open)} >
                            <Option className="Table-Dat" value="1">111</Option>
                            <Option className="Table-Dat" value="2">222</Option>
                            <Option className="Table-Dat" value="3">333</Option>
                        </Select>
                    )}
                </FormItem>
            )
        }
        
    }
    changeDate(date, dateString){
        console.log(date)
        console.log(dateString)
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        console.log(this)
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing, openShow } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target) && !openShow) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        console.log(this.props)
        if (this.props.type === 'date'){
            this.form.validateFields((error, values) => {
                console.log(values)
                if (error) {
                    return;
                }
                values[this.props.dataIndex] = values[this.props.dataIndex].format("YYYY-MM-DD")
                console.log(values)
                this.toggleEdit();
                handleSave({ ...record, ...values });
            });
            return
        }
        if (this.props.type === 'time') {
            this.form.validateFields((error, values) => {
                console.log(values)
                if (error) {
                    return;
                }
                values[this.props.dataIndex] = values[this.props.dataIndex].format("YYYY-MM-DD HH:mm:ss")
                console.log(values)
                this.toggleEdit();
                handleSave({ ...record, ...values });
            });
            return
        }

        this.form.validateFields((error, values) => {
            console.log(error, values)
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        const options = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (this.editHTML(dataIndex, options)
                                    // <FormItem style={{ margin: 0 }}>
                                    //     {form.getFieldDecorator(dataIndex, {
                                    //         rules: [{
                                    //             required: true,
                                    //             message: `${title} 是必填项.`,
                                    //         }],
                                    //         initialValue: record[dataIndex],
                                    //     })(this.editHTML(dataIndex, options))}
                                    // </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24, borderRadius: '4px' }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

//   Table => 本体 =============
export class TableRender extends React.Component{
    constructor(){
        super();
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
        }
    }

    // 分页、排序、筛选变化时触发
    TableChange(pagination, filters, sorter, extra){
        console.log(this)
        console.log(pagination)
        console.log(filters)
        console.log(sorter)
        console.log(extra)
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    //  ====  这里要求 父级页面的  数据源  名字叫做 data ====
    handleSave = (row) => {
        console.log(row)
        const newData = [...this.props.param.data];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.props.view.setState({ data: newData });
    }
    //  ====  这里要求 父级页面的  列配置  名字叫做 columns ====
    handleResize = index => (e, { size }) => {
        this.props.view.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    render(){
        // 数据源
        const data = this.props.param.data;
        // 筛选和排序
        const { sortedInfo, filteredInfo } = this.state;
        // sortedInfo = sortedInfo || {};
        // filteredInfo = filteredInfo || {};
        // 固定的列 和 header
        const components = {
            header: {
                cell: ResizeableTitle,
            },
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        // row 每一排的 className
        const RowClassName = this.props.param.rowClassName || ''
        // 需要不要滚动
        const scroll = this.props.param.scroll ? {
                            x: this.props.param.scroll.x || true,
                            y: this.props.param.scroll.y || null
                        } : null
        console.log(scroll)
        // 需不需要 可选择(单radio/多checkbox)
        const rowSelection = this.props.param.rowSelection ? { ...this.props.param.rowSelection } : null
                                
        // 列配置
        const columns = this.props.param.columns.map((col, index) => {
            if (!col.editable) {
                return {
                    ...col,
                    onHeaderCell: column => {
                        return ({
                            width: column.width,
                            onResize: this.handleResize(index),
                        })
                    }
                }
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    type: col.type || null
                }),
                onHeaderCell: column => ({
                    width: column.width,
                    onResize: this.handleResize(index),
                }),
            };
        });

        return (
            <Table
                bordered
                rowSelection={rowSelection}
                components={components}
                columns={columns}
                dataSource={data}
                scroll={scroll}
                rowClassName={RowClassName}
                onChange={this.TableChange.bind(this)}
            />
        )
    }
}


// ========================================      Table Filter      ================================= //
export class TableFilter extends React.Component{
    constructor(){
        super();
        this.state = {
            filter: {

            }
        }
    }

    changeFilter(val, index){
        console.log(val)
        console.log(index)
        console.log(this)
    }

    render(){
        const { data, columns } = this.props.param;
        const param = { data,columns }
        const columnsCfg = columns.map((col, index) => {
            console.log(col)
            console.log(index)
            if (col.type === null || col.type === undefined || col.type === 'text') {
                return (
                    <div className="Table-Filter-item" key={index}>
                        <Input placeholder={`请填写${col.title}`}
                        onChange={e => this.changeFilter(e.target.value, index)}
                        />
                    </div>
                )
            }
            if (col.type === 'number') {
                return (
                    <div className="Table-Filter-item" key={index}>
                        <InputNumber min={0} style={{ width: '120px' }}
                        onChange={val => this.changeFilter(val,index)}
                        />
                    </div>
                )
            }
            if (col.type === 'select') {
                return (
                    <div className="Table-Filter-item" key={index}>
                        <Select style={{ width: 120 }} 
                            onChange={(value, option) => this.changeFilter(value, index)} >
                            <Option className="Table-Dat" value="1">111</Option>
                            <Option className="Table-Dat" value="2">222</Option>
                            <Option className="Table-Dat" value="3">333</Option>
                        </Select>
                    </div>
                )
            }
            if (col.type === 'date') {
                return (
                    <div className="Table-Filter-item" key={index}>
                        <DatePicker 
                            className="Table-DatePicker"
                            format="YYYY-MM-DD"
                            onChange={(date, dateString) => this.changeFilter(dateString,index)}
                        />
                    </div>
                )
            }
            if (col.type === 'time') {
                return (
                    <div className="Table-Filter-item" key={index}>
                        <DatePicker
                            showTime
                            className="Table-DatePicker"
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Time"
                            onChange={(date, dateString) => this.changeFilter(dateString,index)}
                        />
                    </div>
                )
            }
        })

        return (
            <Row>
                <Col className="TableFilter">
                    <Col className="TableFilter-Ctrl">
                        <div className="TableFilter-Ctrl-item"> <Button shape="circle" icon="bars" /> </div>
                        <div className="TableFilter-Ctrl-item"> <Button shape="circle" icon="close" /> </div>
                        <div className="TableFilter-Ctrl-item"> <Button shape="circle" icon="search" /> </div>
                    </Col>
                    <Col className="TableFilter-Filter-box">
                        {columnsCfg}
                    </Col>
                </Col>
            </Row>
        )
    }
}



// Table 组件 使用的其他组件 =======================
export class TableBtn extends React.Component{
    constructor(){
        super();
        this.state = {
            btn: [
                {text: '添加', url: 'www.baidu.com', submit: 'www.zhifubao.com'},
                {text: '保存', url: 'www.baidu.com', submit: 'www.zhifubao.com'},
                {text: '删除', url: 'www.baidu.com', submit: 'www.zhifubao.com'},
            ]
        }
        console.log(this)
    }

    handleBtn = (item) => {
        console.log('按钮: ' + item.text)
        console.log(this.props)
    }

    render(){
        return(
            <Row>
                <Col>
                {this.state.btn.map((item, index) => 
                    <span key={index}>
                        <Popconfirm title={`确定${item.text}?`} cancelText="取消" okText="确认"
                        onConfirm={() => this.handleBtn(item)}>
                            <a href="javascript:;">{item.text}</a>
                        </Popconfirm>
                        <Divider type="vertical" className={this.state.btn.length-1 === index ? 'hide' : '' } />
                    </span>
                )}
                </Col>
            </Row>
        )
    }
    
}



// =====================================     Hoc 高阶组件部分     ===========================================
// =====================================     Hoc 高阶组件部分     ===========================================
// =====================================     Hoc 高阶组件部分     ===========================================

// =====================================     Loading Hoc
export const LoadingHoc = WrappedComponent => class extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: true
        }
        console.log(this)
        console.log('LoadingHoc')
    }

    render() {
        if(this.state.loading){
            return (
                <div className="Spin-box">
                    <Spin onClick={_ => this.setState({ loading: false })} />
                </div>
            )
        }else{
            return <WrappedComponent {...this.props} />
        }
    }
}




// =====================================     AntV G2     ===========================================
// =====================================     AntV G2     ===========================================
// =====================================     AntV G2     ===========================================

//  使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表===
// export class G2Interval extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             data: [
//                 { genre: '广西甲天下之旅', sold: 275 },
//                 { genre: '南亚风情', sold: 225 },
//                 { genre: '众信旅游', sold: 120 },
//                 { genre: '去哪儿', sold: 350 },
//                 { genre: '途牛牛人专线', sold: 160 },
//             ]
//         }
//     }

//     componentDidMount(){
//         const chartCfg = this.props.param
//         // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
//         // Step 1: 创建 Chart 对象
//         const chart = new G2.Chart({
//             container: chartCfg.id,
//             forceFit: chartCfg.forceFit || false, // 宽度自适应,为true会覆盖width
//             width: chartCfg.width,
//             height: chartCfg.height,
//             // 配置区
//             animate: chartCfg.animate || false,
//         });
//         const defs = chartCfg.defs || {
//             percent: {
//                 formatter: function formatter(val) {
//                     val = val * 100 + '%';
//                     return val;
//                 }
//             }
//         }
//         // Step 2: 载入数据源
//         chart.source(this.state.data, defs);
//         chart.coord('theta', {
//             redius: 0.75
//         })
//         // Step 3：创建图形语法，绘制图. position(只有两个坐标,就是柱状图)
//         // 通过坐标系的转置、变化，可以生成各种常见的图表类型；所有的图表都可以进行层叠、分组。
//         chart.interval().position('genre*sold').color('genre')
//         // Step 4: 渲染图表
//         chart.render();
//     }

//     render(){
//         return(
//             <Row>
//                 <Col>
//                     <div id={this.props.param.id}></div>
//                 </Col>
//             </Row>
//         )
//     }
// }

//  饼图================================
