import React from 'react';
import { Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag, Tooltip, Badge, Dropdown, Modal, Carousel } from 'antd';

import { BrowserRouter } from 'react-router-dom';
import { History } from './core';

import Swiper from 'swiper/dist/js/swiper.js';

export class HistoryBrowserRouter extends BrowserRouter {
    constructor() {
        super();

        this.history = History;
    }
}


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
                    <Icon type="left-circle" theme="outlined" />
                </div>
                <div className="modal-carousel-next" onClick={_ => this.nextImg()}>
                    <Icon type="right-circle" theme="outlined" />
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