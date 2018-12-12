import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import '../../css/Supplier-back.css';

import { loadIfEmpty } from '../../util/request';
import { AppConst } from '../../util/const';

import { UserBackDeskHeader } from '../../util/common';

import Platform from './Platform';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class Retail extends React.Component {
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

        return (
            <UserBackDeskHeader ></UserBackDeskHeader>
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
                <Content className="">
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1" onChange={e => this.TabsChange(e)}>
                                <TabPane tab="平台首页" key="1">
                                    {<Platform />}
                                </TabPane>
                                <TabPane tab="个人首页" key="2">
                                    {/* <NormalRegiment /> */}
                                </TabPane>
                                <TabPane tab="店铺管理" key="3">
                                    {/* <LocalTour /> */}
                                    {/* <Route path="/Personal/History" component={History} /> */}
                                </TabPane>
                                <TabPane tab="账号管理" key="4">
                                    {/* <ScatteredTicket /> */}
                                    {/* <Route path="/Personal/QA" component={QA} /> */}
                                </TabPane>
                                <TabPane tab="产品管理" key="5">
                                    {/* <ScatteredRoom /> */}
                                    {/* <Route path="/Personal/LatestNews" component={LatestNews} /> */}
                                </TabPane>
                                <TabPane tab="交易管理" key="6">
                                    {/* <VisaAgent /> */}
                                    {/* <Route path="/Personal/LatestNews" component={LatestNews} /> */}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>

                </Content>

                <Footer>

                </Footer>
            </Layout>
        )
    }
}