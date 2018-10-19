// 推介产品
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Tooltip, Badge, Dropdown } from 'antd';

import "../../css/Recommend.css";


class Recommend extends React.Component{
    constructor(){
        super()
        this.state = {
            recommend: [
                {id:'1'},
                // {id:'2'},
                // {id:'3'},
                // {id:'4'},
            ],
            discount: [
                {url:'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg', id: '1', path:'lalalla'},
                {url:'http://attachments.gfan.com/forum/201504/15/202327b405oo5c0bgz01oo.jpg', id: '2', path:'lalalla'},
                {url:'http://t1.niutuku.com/960/45/45-439758.jpg', id: '3', path:'lalalla'},
                {url:'http://pic25.photophoto.cn/20121211/0005018603291216_b.jpg', id: '4', path:'lalalla'},
                {url:'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg', id: '5', path:'lalalla'},
                {url:'http://img2.imgtn.bdimg.com/it/u=1033197597,3656846721&fm=26&gp=0.jpg', id: '6', path:'lalalla'},
            ],
        }
        console.log(222)
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
                    {this.state.recommend.map((item,index)=>
                        <Col className="Recommend-pro-info-item" key={item.id}>
                            <Col span={2} className="Recommend-pro-img-box">
                                <img src={'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'} 
                                className="Recommend-pro-img" />
                                <span className="Recommend-pro-img-text">产品编号: P0-4396</span>
                            </Col>
                            <Col span={8}>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                            </Col>
                            <Col span={4}>

                            </Col>
                            <Col span={3}>

                            </Col>
                            <Col span={3}>

                            </Col>
                            <Col span={3}>

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
                            this.state.discount.map((item,index) =>
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
            </div>

        )
    }
}

export default withRouter(Recommend);