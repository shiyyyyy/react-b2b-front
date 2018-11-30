// 推介产品
import React,{Fragment}from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Tooltip, Badge, Dropdown } from 'antd';

import "../../css/Recommend.css";


class Recommend extends React.Component{
    constructor(){
        super()
        this.state = {
            cur_pro_id: '', // 当前展开列表id
            data:{
                recommend:[
                    { id: '1', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '2', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '3', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                    { id: '4', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
                ],
                discount: [
                    { url: 'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg', id: '1', path: 'lalalla' },
                    { url: 'http://attachments.gfan.com/forum/201504/15/202327b405oo5c0bgz01oo.jpg', id: '2', path: 'lalalla' },
                    { url: 'http://t1.niutuku.com/960/45/45-439758.jpg', id: '3', path: 'lalalla' },
                    { url: 'http://pic25.photophoto.cn/20121211/0005018603291216_b.jpg', id: '4', path: 'lalalla' },
                    { url: 'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg', id: '5', path: 'lalalla' },
                    { url: 'http://img2.imgtn.bdimg.com/it/u=1033197597,3656846721&fm=26&gp=0.jpg', id: '6', path: 'lalalla' },
                ],
            },
            
        }
    }

    // 点击查看详情 展开团期列表
    checkDetail(id){
        console.log(id)
        if(id === this.state.cur_pro_id){
            this.setState({cur_pro_id: ''})
        }else{
            this.setState({ cur_pro_id: id })
        }
    }


    render(){
        return(
            <div className="Recommend">
                {/* 产品推介 */}
                <Row className="Recommend-pro-recommend">
                    <div className="index-title">
                        <span className="index-title-left">主推产品</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="Recommend-pro-info">
                    {this.state.data.recommend.map((item,index)=>
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
                                                    <span className="imp-text cursor" onClick={_=>console.log('跳转登录页')}>登录可查</span>
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
                                                <Button type="primary" icon={this.state.cur_pro_id === item.id ?'caret-up':"caret-down"} size='small' ghost
                                            onClick={_=>this.checkDetail(item.id)}>查看详情</Button>
                                        </Col>
                                    </Col>
                                </Col>
                            </Col>

                            <Col className={"Recommend-btm "+(this.state.cur_pro_id === item.id?'':'hide')}>
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
                                                <Button type="primary" size='small' ghost style={{marginRight: '16px'}}>查看</Button>
                                                <Button type="primary" size='small' ghost style={{marginRight: '16px'}}>下载</Button>
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
                {/* 尾货甩卖 */}
                <Row className="Recommend-pro-discount">
                    <div className="index-title">
                        <span className="index-title-left">尾货甩卖</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="Recommend-pro-discount-content">
                        {
                            this.state.data.discount.map((item,index) =>
                            <Col className={"Recommend-pro-discount-item " + (index > 4 ? "hide" : "")} key={item.id}>
                                <Col className="Recommend-pro-discount-item-photo" key={item.id}>
                                    <img src={item.url ? item.url : 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'}
                                        className="img-size" />
                                </Col>
                                <Col className="Recommend-pro-discount-item-pro-info">
                                    <Col span={16} className="Recommend-discount-info">
                                        <div className="Recommend-discount-name">南非欧洲双周双洲尽情游</div>
                                        <div className="Recommend-discount-dep_date">2018-08-08 &nbsp; 库存: 20</div>
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
            </div>

        )
    }
}

export default withRouter(Recommend);