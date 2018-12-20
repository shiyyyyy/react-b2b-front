import React from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import '../../../css/Home.css';

import { loadIfEmpty } from '../../../util/request';
import { AppConst } from '../../../util/const';

import { UserFrontDeskHeader } from '../../../util/common';
import NormalRegiment from "./NormalRegiment";
import LocalTour from "./LocalTour";
import ScatteredTicket from "./ScatteredTicket";
import ScatteredRoom from "./ScatteredRoom";
import VisaAgent from "./VisaAgent";

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

export default class Retail extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }

    // tab切换
    TabsChange(key) {
        console.log(key);
    }

    header(){
        let param = {
            index: '2',
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
        return(
            <UserFrontDeskHeader view={this} param={param}></UserFrontDeskHeader>
        )
    }

    index(){
        return(
            <div>idnex</div>
        )
    }

    render(){
        return(
            <Layout className="Home">
                {this.header()}
                <Content className="Home-content">
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1" onChange={e => this.TabsChange(e)}>
                                <TabPane tab="分销首页" key="1">
                                    {this.index()}
                                </TabPane>
                                <TabPane tab="常规跟团" key="2">
                                    <NormalRegiment />
                                </TabPane>
                                <TabPane tab="当地参团" key="3">
                                    <LocalTour />
                                    {/* <Route path="/Personal/History" component={History} /> */}
                                </TabPane>
                                <TabPane tab="团票散买" key="4">
                                    <ScatteredTicket />
                                    {/* <Route path="/Personal/QA" component={QA} /> */}
                                </TabPane>
                                <TabPane tab="团房散卖" key="5">
                                    <ScatteredRoom />
                                    {/* <Route path="/Personal/LatestNews" component={LatestNews} /> */}
                                </TabPane>
                                <TabPane tab="签证代办" key="6">
                                    <VisaAgent />
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