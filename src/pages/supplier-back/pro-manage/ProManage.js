import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Breadcrumb, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import '../../../css/Supplier-back.css';

import { loadIfEmpty } from '../../../util/request';
import { AppConst } from '../../../util/const';

import { UserBackDeskHeader, LeftTabs, RightHeaderBreadcrumb, RightSetAndBtn, RightFilterAndSearch, RightProList} from '../../../util/common';
import GroupTicket from './GroupTicket';

const { Header, Content, Footer } = Layout;


export default class ProManage extends React.Component {
    constructor() {
        super();
        this.state = { 
            filter: [
                { text: '大陆', id: 1, children: [{ text: '阿拉德大陆', id: 11 }, { text: '失落的大陆', id: 12 }, { text: '尼古拉大陆', id: 13 }, { text: '阿拉德大陆', id: 111 }, { text: '失落的大陆', id: 112 }, { text: '尼古拉大陆', id: 113 }, { text: '阿拉德大陆', id: 1111 }, { text: '失落的大陆', id: 1112 }, { text: '尼古拉大陆', id: 1113 }, { text: '阿拉德大陆', id: 3311 }, { text: '失落的大陆', id: 3312 }, { text: '尼古拉大陆', id: 3313 }, { text: '阿拉德大陆', id: 11111 }, { text: '失落的大陆', id: 11112 }, { text: '尼古拉大陆', id: 11113 }, { text: '阿拉德大陆', id: 2211 }, { text: '失落的大陆', id: 2212 }, { text: '尼古拉大陆', id: 2213 },] },
                { text: '星系', id: 2, children: [{ text: '太阳系嘻嘻嘻嘻嘻', id: 21 }, { text: '月亮系', id: 22 }, { text: '仙女系', id: 23 }] },
                { text: '星云', id: 3, children: [{ text: 'M-78星云', id: 31 }, { text: 'L-77星云', id: 32 }, { text: 'U-40星云', id: 33 }] },
            ]
        }
    }

    // tab切换
    TabsChange(key) {
        console.log(key);
    }

    header() {
        let param = {
            index: '2',
            Menu: [
                { key: 1, icon: 'home', name: '平台首页', path: '/supplier-back/platform' },
                { key: 2, icon: 'home', name: '个人首页', path: '/supplier-back/pro-manage' },
                { key: 3, icon: 'home', name: '店铺管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
                { key: 4, icon: 'home', name: '产品管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
                { key: 5, icon: 'home', name: '账号管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
                { key: 6, icon: 'home', name: '交易管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
            ],
        }
        return (
            <UserBackDeskHeader param={param}></UserBackDeskHeader>
        )
    }
    leftTabs(){
        let param = {
            tabs: [
                { text: '单签证', key: 1, path: '/supplier-back/pro-manage' },
                { text: '当地游', key: 2, path: '/supplier-back/pro-manage/group-tour'},
                { text: '跟团游', key: 3, },
                { text: '团队票', key: 4, },
                { text: '团队房', key: 5, },
            ]
        }
        return(
            <LeftTabs param={param} />
        )
    }
    rightHeaderBreadcrumb(){

        return(
            <RightHeaderBreadcrumb />
        )
    }

    rightSetAndBtn(){

        return(
            <RightSetAndBtn />
        )
    }

    rightFilterAndSearch(){
        let DropdownMenu = (childrens) => (
            <Menu>
                {childrens.map(item => 
                    <Menu.Item key={item.id}>
                        <a href="http://www.alipay.com/">{item.text}</a>
                    </Menu.Item>
                )}
                {/* 分隔线 */}
                {/* <Menu.Divider /> */}
            </Menu>
        )
        return(
            <RightFilterAndSearch >
                <Row>
                    <Col className="RightFilterAndSearch-left-item-box">
                    {this.state.filter.map( item =>
                        <Col className="RightFilterAndSearch-left-item">
                            <Dropdown overlay={DropdownMenu(item.children)} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    {item.text} <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Col>
                    )}
                    </Col>
                </Row>
            </RightFilterAndSearch>  
        )
    }

    rightProLsit(){
     
        return(
            <RightProList />
        )
    }

    index() {
        return (
            <div>index</div>
        )
    }

    qqqqq(){
        return(
            <GroupTicket />
        )
    }
    render() {
        return (
            <Layout className="">
                {this.header()}
                <Content className="" style={{ marginTop: '24px' }}>
                    <Row gutter={16}>
                        <Col span={3} >
                            {this.leftTabs()}
                        </Col>

                        <Col span={21} className="supplier-back-right">
                            {/* tabs component */}
                            <Row>
                                <Col>
                                    {this.rightHeaderBreadcrumb()}
                                </Col>
                                <Col className='supplier-back-right-content'>
                                    <Col className='supplier-back-right-content-topBtn'>
                                        {this.rightSetAndBtn()}
                                        {this.rightFilterAndSearch()}
                                    </Col>
                                    <Col className='supplier-back-right-content-topBtn'>
                                        {/* {this.rightProLsit()} */}
                                        {this.qqqqq()}
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Content>

                <Footer>

                </Footer>
            </Layout>
        )
    }
}