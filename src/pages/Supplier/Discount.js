// 尾货甩卖
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, withRouter } from 'react-router-dom';
import { Icon, Row, Col, Button, Pagination, Checkbox } from 'antd';
import { SupplierFilter } from '../../util/com';

import '../../css/Discount.css';
import { debug } from 'util';
import { get } from 'http';

const CheckboxGroup = Checkbox.Group;
class Discount extends React.Component{
    constructor(){
        super()
        this.state = {
            page: 1,
            total: 998,
            data: {
                dep_city:{
                    title: '出发城市',
                    data: { 1: '北京', 2: '天津', 3: '上海', 4: '深圳', 5: '广州', 6: '哈尔滨', 7: '成都', 8: '厦门' },
                }, 
                level_one:{
                    title: '一级标签',
                    data: { 1: '北美', 2: '南美', 3: '欧洲', 4: '东南亚', 5: '非洲', 6: '大洋洲', 7: '南北极', 8: '国内', 9: '日韩朝鲜', 10: '全球游轮', 11: '全球签证', 12: '月球登陆', 13: '太空美景', 14: '太阳系环游' },
                },
                // level_two:{
                //     title: '二级标签',
                //     data: { 1: { 1: '美国', 2: '加拿大' }, 2: { 1: '里约热内卢', 2: '秘鲁' }, 3: { 1: '英国', 2: '德国', 3: '法国', 4: '意大利' }, 4: { 1: '越南', 2: '缅甸', 3: '泰国' }, 5: { 1: '南非', 2: '肯尼亚' }, 6: { 1: '澳大利亚', 2: '新西兰' }, 7: { 1: '北极极昼之旅', 2: '南极企鹅之旅' }, 8: { 1: '东北游', 2: '长城游' }, 9: { 1: '韩国', 2: "朝鲜", 3: '日本' }, 10: { 1: '太平洋邮轮', 2: '大西洋邮轮' }, 11: { 1: '日本签证', 2: '印尼签证' }, },
                // }, 
                theme:{
                    title: '游玩主题',
                    data: { 1: '亲子', 2: '蜜月', 3: '夕阳红', 4: '探险', 5: '美容', 6: '体验', 7: '自驾', 8: 'SPA', 9: '游学' },
                }, 
                travel_date:{
                    title: '出行月份',
                    data: { 1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月', 13: '十三月', 14: '星期八' },
                }, 
            },

            search: {
                // cur_city: '',
                // cur_one: '',
                // cur_two: '',
                // cur_theme: '',
                // cur_travel_date: '',
                dep_city: [],
                level_one: [],
                theme: [],
                travel_date: [],
            },
            discount: [
                { path: 'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', name: '东南亚4国连游', id: '1', origin: '29999', present: '28888' },
                { path: 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg', name: '东南亚4国连游', id: '2', origin: '19999', present: '18888' },
                { path: 'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', name: '东南亚4国连游', id: '3', origin: '9999', present: '8888' },
                { path: 'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg', name: '东南亚4国连游', id: '4', origin: '13899', present: '9999' },
                { path: 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg', name: '东南亚4国连游', id: '5', origin: '24999', present: '20999' },
            ]
        }
    }

    SupplierFilterFunc(){
        let that = this;
        let info = {
            data: this.state.data,
            search: this.state.search,
            cb(item, key) {
                let search = that.state.search;
                search[item] = key;
                that.setState({ search: search });
                console.log(that)
            }
        }
        return(
            <SupplierFilter info={info} />
        )
    }

    // filter search
    setSearch(key, val) {
        console.log(this)
        let search = this.state.search
        search[key] = val
        if (key === 'cur_one') {
            search.cur_two = ''
        }
        this.setState({ search: search })
    }
    setCheckbox(e,item,key){
        let search = this.state.search
        // 想办法关联起来(选项true和fales=>当前选中)
        if (search[item].indexOf(key)!==-1){
            search[item].splice(search[item].indexOf(key),1)
        }else{
            search[item].push(key)
        }
        this.setState({search: search})
    }
    setAllCheckbox(item){
        let search = this.state.search
        let data = this.state.data
        if (Object.keys(data[item].data).length === search[item].length){
            search[item] = []
        }else{
            search[item] = []
            search[item] = search[item].concat(Object.keys(data[item].data))
        }
        this.setState({search: search})
    }
    // more filter
    moreFilter(item){
        let dom = ReactDOM.findDOMNode(this[item])
        if (dom.offsetHeight > 40){
            dom.style.height = '40px'
            dom.style.overflow = 'hidden'
            this.setState({[item+'Text']: '展开'})
        }else{
            dom.style.height = 'auto';
            dom.style.overflow = 'auto';
            this.setState({ [item + 'Text']: '收起' })
        }
    }
    //  取消 您已选择
    closeSelect(key){
        let search = this.state.search
        search[key] = []
        this.setState({search: search})
    }

    // 如果 高度大于40 则隐藏并显示 more
    judgeMore(){
        Object.keys(this.state.data).map(item=>{
            let dom = ReactDOM.findDOMNode(this[item])
            if(dom.offsetHeight > 40){
                dom.style.height = '40px'
                dom.style.overflow = 'hidden'
                this.setState({[item+'More']: true})
            }
        })
    }

    componentDidMount(){
        console.log(this)
        Object.keys(this.state.data).map(item=>{
            this[item] = document.getElementById(item)
        })
        this.judgeMore()
    }

    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ page: page })
    }

    render(){
        return(
            <div className="Discount">
                {/*  */}
                <Row>
                    {/* 抽象 filter 单选 */}
                    {/* {this.state.data && this.SupplierFilterFunc()} */}

                    <Col className="AllProduct-filter">
                    {/* 抽象-单写出来 */}
                    {/* {this.state.data &&
                    Object.keys(this.state.data).map(item =>
                        <Col className="AllProduct-filter-item" key={item}>
                            <Col span={2} className="AllProduct-filter-title">{this.state.data[item].title}:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.data[item].data).map(key =>
                                <Col key={key} onClick={_=>this.setSearch(item,key)}
                                className={"AllProduct-filter-main-item " + (this.state.search[item] === key ? "active-filter-main-item" : "")}
                                >{this.state.data[item].data[key]}</Col>
                            )}
                            </Col>
                        </Col>
                    )} */}
                    </Col>

                    <Col className="AllProduct-filter">
                        {/* 抽象-多选 */}
                        {this.state.data &&
                        Object.keys(this.state.data).map(item =>
                        <Row style={{borderBottom: '1px #d9d9d9 dashed'}} key={item}>
                            <Col className="AllProduct-filter-item">
                                <Col span={2} className="AllProduct-filter-title">{this.state.data[item].title}:</Col>
                                <Col span={21} className="AllProduct-filter-main" id={[item]} ref={ref=>this[item]=ref}>
                                <Checkbox checked={this.state.search[item].length === Object.keys(this.state.data[item].data).length}
                                onChange={this.setAllCheckbox.bind(this,item)} style={{marginLeft: '8px'}} >不限</Checkbox>
                                {Object.keys(this.state.data[item].data).map(key =>
                                    <Checkbox key={key}
                                        checked={this.state.search[item].indexOf(key-0) !== -1}
                                        onChange={e=>this.setCheckbox(e,item,key-0)}
                                    >{this.state.data[item].data[key]}</Checkbox>
                                )}
                                </Col>
                                {this.state[item+"More"] && 
                                <Col span={1} className={'AllProduct-filter-more ' + (this.state[item+"More"]?'':'hide')} onClick={_ => this.moreFilter(item)}>
                                    {this.state[item+'Text']?this.state[item+'Text']:'展开'}<Icon type={this.state[item+'Text']==='收起'?"up":'down'} theme="outlined" />
                                </Col>
                                }
                            </Col>
                        </Row>
                        )}
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">您已选择:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                                {Object.keys(this.state.search).map(key =>
                                    <div key={key}
                                        className={(this.state.search[key].length === 0 ? 'hide' : 'AllProduct-filter-userSelect')}>
                                        <span style={{ marginRight: '8px' }} >
                                            {this.state.search[key].map((itemText,index) => {
                                                if ((index + 1) === this.state.search[key].length){
                                                    return this.state.data[key].data[itemText]
                                                }
                                                else{
                                                    return this.state.data[key].data[itemText] + '、'
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
                
                {/*  */}
                <Row type="flex">
                    <div className="index-title">
                        <span className="index-title-left">挥泪专区</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="supplier-discount">
                        {this.state.discount.map((item, index) =>
                            <Col className={"Recommend-pro-discount-item " + (index > 4 ? "hide" : "")} key={item.id}>
                                <Col className="Recommend-pro-discount-item-photo" key={item.id}>
                                    <img src={item.url ? item.url : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'}
                                        className="img-size" />
                                </Col>
                                <Col className="Recommend-pro-discount-item-pro-info">
                                    <Col span={16} className="Recommend-discount-info">
                                        <div className="Recommend-discount-name">南非欧洲双周双洲尽情游</div>
                                        <div className="Recommend-discount-dep_date">2018-08-08</div>
                                    </Col>
                                    <Col span={7} push={1} className="prici-discount">
                                        <div className="Recommend-origin-price">￥28888</div>
                                        <div className="Recommend-discount-price">￥19999</div>
                                    </Col>
                                </Col>
                            </Col>
                        )}
                    </Col>
                </Row>
                {/*  */}
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

export default withRouter(Discount);