import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import '../../css/Supplier-back.css';

import { loadIfEmpty } from '../../util/request';
import { AppConst } from '../../util/const';

import { UserBackDeskHeader } from '../../util/common';

import Platform from './platform/Platform';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class SupplierBack extends React.Component {
    constructor() {
        super();
        this.state = {
            headerSearch: {
                city: '1',
                cityArr: [
                    { value: '北京', id: '1' },
                    { value: '天津', id: '2' },
                    { value: '上海', id: '3' },
                ],
                line: '3',
                lineArr: [
                    { value: '东南亚', id: '1' },
                    { value: '南北美', id: '2' },
                    { value: '国内', id: '3' },
                ],
                search: '',
            }

        }
    }

    // tab切换
    TabsChange(key) {
        console.log(key);
    }

    header() {
        let param = {
            index: '1',
            Menu: [
                { key: 1, icon: 'home', name: '平台首页', path: '/supplier-back/platform' },
                { key: 2, icon: 'home', name: '个人首页', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
                { key: 3, icon: 'home', name: '店铺管理', path: '/supplier-back/shop-manage' },
                { key: 4, icon: 'home', name: '产品管理', path: '/supplier-back/pro-manage' },
                { key: 5, icon: 'home', name: '账号管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
                { key: 6, icon: 'home', name: '交易管理', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
            ],
        }
        return (
            <UserBackDeskHeader param={param}></UserBackDeskHeader>
        )
    }

    index() {
        return (
            <div>index</div>
        )
    }

    render() {
        return (
            <Layout className="">
                {this.header()}
                <Content className="" style={{marginTop: '24px'}}>
                    <Row>
                        <Col>
                            {<Platform />}

                            {/* <Tabs defaultActiveKey="1" onChange={e => this.TabsChange(e)}>
                                <TabPane tab="平台首页" key="1">
                                    {<Platform />}
                                </TabPane>
                                <TabPane tab="个人首页" key="2">
                                </TabPane>
                                <TabPane tab="店铺管理" key="3">
                                </TabPane>
                                <TabPane tab="账号管理" key="4">
                                </TabPane>
                                <TabPane tab="产品管理" key="5">
                                </TabPane>
                                <TabPane tab="交易管理" key="6">
                                </TabPane>
                            </Tabs> */}
                        </Col>
                    </Row>

                </Content>

                <Footer>

                </Footer>
            </Layout>
        )
    }
}