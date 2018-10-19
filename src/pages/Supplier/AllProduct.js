// 全部产品
// 历史记录
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Rate, Avatar, Pagination, Tooltip, Badge, Dropdown } from 'antd';

import "../../css/AllProduct.css";

class AllProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            cur_page: 1,
            total: 998,
            dep_city: { 1: '北京', 2: '天津', 3: '上海', 4: '深圳', 5: '广州', 6: '哈尔滨', 7: '成都', 8: '厦门'}
        }
    }

    // 展开折叠
    open_eva(index) {
        if (index === this.state.open_eva_index) {
            this.setState({ open_eva_index: '' })
            return
        }
        this.setState({ open_eva_index: index })
    }
    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ cur_page: page })
    }

    render() {
        return (
            <div className="AllProduct">
                {/* 团-类型 */}
                <Row>
                    <Col className="AllProduct-header-type">
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 1?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:1})}>常规参团</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 2?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:2})}>当地参团</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 3?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:3})}>团票散卖</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 4?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:4})}>团房散卖</Col>
                        <Col className={"AllProduct-header-type-item "+(this.state.group_type === 5?"active-header-type-item":"")} 
                        onClick={_=>this.setState({group_type:5})}>签证代办</Col>
                    </Col>
                </Row>
                {/* filter */}
                <Row>
                    <Col className="AllProduct-filter">
                        <Col className="AllProduct-filter-item">
                            <Col span={2} className="AllProduct-filter-title">出发城市:</Col>
                            <Col span={22} className="AllProduct-filter-main">
                            {Object.keys(this.state.dep_city).map(key=>
                                <Col className="AllProduct-filter-main-item">
                                    {this.state.dep_city[key]}
                                </Col>                                
                            )}
                            </Col>
                        </Col>
                        {/* <Col>
                            <Col span={3} className="AllProduct-filter-title">一级导航:</Col>
                            <Col span={21} className="AllProduct-filter-main"></Col>
                        </Col>
                        <Col>
                            <Col span={3} className="AllProduct-filter-title">二级导航:</Col>
                            <Col span={21} className="AllProduct-filter-main"></Col>
                        </Col>
                        <Col>
                            <Col span={3} className="AllProduct-filter-title">游玩主题:</Col>
                            <Col span={21} className="AllProduct-filter-main"></Col>
                        </Col>
                        <Col>
                            <Col span={3} className="AllProduct-filter-title">其他条件:</Col>
                            <Col span={21} className="AllProduct-filter-main"></Col>
                        </Col> */}
                    </Col>
                </Row>

                {/* 分页 */}
                <Row>
                    <Col className="history-pages">
                        <Pagination defaultCurrent={this.state.cur_page} total={this.state.total}
                            onChange={(page) => this.pageChange(page)} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(AllProduct); 