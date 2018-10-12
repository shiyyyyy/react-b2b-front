import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Layout, Menu, Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag, Modal } from 'antd';

// modal
export class ComModal extends React.Component{
    constructor(){
        super();
        this.state = {}
        console.log(this)
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
            cancelText={this.props.data.cancelText || '提示'} centered={this.props.data.centered || false}
            onOk={this.props.data.onOk || false} onCancel={this.props.data.onCancel || false }
            >
                {this.props.children}
            </Modal >
        )
    }
}