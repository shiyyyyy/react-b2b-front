import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Layout, Menu, Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag, Modal } from 'antd';

import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
// modal
export class ComModal extends React.Component{
    constructor(){
        super();
        this.state = {}
        this.swiperId = null
    }


    componentDidMount() {
        console.log(Swiper)
        new Swiper('#photoWallSwiper', {
            loop: true, // 循环模式选项
            slidesPerView: 1,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-prev',
                prevEl: '.swiper-button-next',
            },
            // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true,
        });
    }

    // 关闭 回调
    onCancel(){
        if (this.data.close_cb){
            this.data.close_cb()
        }
    }
    // 点击确定 回调
    onOk(){
        if (this.data.submit_cb) {
            this.data.submit_cb()
        }
    }
    

    render(){
        return(
            < Modal title = {this.props.data.title} visible = { this.props.data.visible }
            okText={this.props.data.okText || '确定'} cancelText={this.props.data.cancelText || '取消'} 
                centered={this.props.data.centered || false} style={this.props.data.style || null}
            onOk={this.props.data.onOk || false} onCancel={this.props.data.onCancel || false }
            footer={this.props.data.footer || false} 
            >
                <Row>
                    <div className="swiper-container" id="photoWallSwiper">
                        <div className="swiper-wrapper">
                            {
                                this.props.data.data.map((item, index) => (
                                    <div className="swiper-slide" key={index}>
                                        <img onClick={_ => this.setState({ photoWallShow: true })}
                                            src={item} className="img-size" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="swiper-button-prev photoWall-prev"></div>
                        <div className="swiper-button-next photoWall-next"></div>

                    </div>
                </Row>
            </Modal >
        )
    }
}
