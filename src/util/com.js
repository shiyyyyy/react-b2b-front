import React from 'react';
import { Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag, Tooltip, Badge, Dropdown, Modal, Carousel } from 'antd';

import { BrowserRouter } from 'react-router-dom';
import { History } from './core';

import Swiper from 'swiper/dist/js/swiper.js';
import { debug } from 'util';
import { i18n } from './i18n';

import { userInit,pubInit } from './data';

export class HistoryBrowserRouter extends BrowserRouter {
    constructor() {
        super();

        this.history = History;
    }
}



//  弹出框-轮播图 组件
export class ModalCarousel extends React.Component {

    constructor(){
        super();

        this.carouselRef = null
        this.setCarouselRef = el => {
            this.carouselRef = el;
        };
    }
    prevImg(){
        console.log(this.carouselRef)
        if (this.carouselRef) this.carouselRef.prev();
    }
    nextImg(){
        if (this.carouselRef) this.carouselRef.next();
    }
    render() {
        return (
            <Modal className="modal-carousel"
            title={this.props.info.title || ''}  // 标题
            visible={this.props.info.visible || false} // 显示隐藏
            footer={this.props.info.footer || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
            bodyStyle={this.props.info.bodyStyle || null}
            style={this.props.info.style || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
            width={this.props.info.width || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
            onOk={this.props.info.handleOk || null}  // 点击确定
            onCancel={this.props.info.handleCancel || null} // 点击取消或者点击蒙层(Modal隐藏就触发)
            > 
                <Carousel style={{ width: '100%', height: '400px' }} ref={this.setCarouselRef}>
                {this.props.info.data.map((item,index)=>
                    <div style={{width:'100%',height:'400px'}} key={index}>
                        <img src={item?item:'/img/Login-bg.jpg'} className="img-initial" />
                    </div>
                )}
                </Carousel>
                <div className="modal-carousel-prev" onClick={_ => this.prevImg()}>
                    <Icon type="left-circle" theme="filled" />
                </div>
                <div className="modal-carousel-next" onClick={_ => this.nextImg()}>
                    <Icon type="right-circle" theme="filled" />
                </div>
            </Modal>
        )
    }
}



export class ModalCom extends React.Component {

    constructor() {
        super();
        // this.props.children是上一个页面里面包在 ModalCom里的子元素
    }
    render() {
        return (
            <Modal className="modal-carousel"
                title={this.props.info.title || ''}  // 标题
                visible={this.props.info.visible || false} // 显示隐藏
                footer={this.props.info.footer || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
                bodyStyle={this.props.info.bodyStyle || null}
                style={this.props.info.style || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
                width={this.props.info.width || null} // 底部内容，当不需要默认底部按钮时，可以设为 footer={null}
                onOk={this.props.info.handleOk || null}  // 点击确定
                onCancel={this.props.info.handleCancel || null} // 点击取消或者点击蒙层(Modal隐藏就触发)
            >
            {this.props.children} 
            </Modal>
        )
    }
}


// 供应商页面 -> filter 条件过滤
export class SupplierFilter extends React.Component{
    constructor(){
        super()
        console.log(this)
        this.state={
            data:{}
        }
    }
    componentWillMount(){
        this.setState({data: this.props.info.data})
        // 
    }

    render(){
        console.log(this.state.data)
        return(
            <Col className="AllProduct-filter">
                {this.state.data &&
                    Object.keys(this.state.data).map(item =>
                        <Col className="AllProduct-filter-item" key={item}>
                            <Col span={2} className="AllProduct-filter-title">{this.state.data[item].title}:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.data[item].data).map(key =>
                                <Col key={key} onClick={_=>this.props.info.cb(item,key)}
                                className={"AllProduct-filter-main-item " + (this.props.info.search[item] === key ? "active-filter-main-item" : "")}
                                >{this.state.data[item].data[key]}</Col>
                            )}
                            </Col>
                        </Col>
                    )
                }
            </Col>
        )
    }
}

export function error(p) {
    let m = {
        content: p.message || p,
        title: p.title || i18n.get('ERROR'),
    };
    if(p.onOk){
        m.onOk = p.onOk;
    }
    return Modal.error(m);
}

export function masking() {
    return (
        <div className="mask">111</div>
    );
}