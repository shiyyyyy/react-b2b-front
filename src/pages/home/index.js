import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Button, Tabs, Rate, Select, Tooltip, Badge, Dropdown } from 'antd';

import '../../css/Home.css';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            cityArr: [
                {value:'北京',id:'1'},
                {value:'天津',id:'2'},
                {value:'上海',id:'3'},
            ],
            cur_city: '北京',
            lineArr: [
                { value: '东南亚', id: '1' },
                { value: '南北美', id: '2' },
                { value: '国内', id: '3' },
            ],
            cur_line: '东南亚',
            search: '',
            lineType: [
                { name: '全球', id: '1', img: '' },
                { name: '东南亚', id: '2', img: '' },
                { name: '日韩', id: '3', img: '' },
                { name: '南北美', id: '4', img: '' },
                { name: '欧洲', id: '5', img: '' },
                { name: '南北极', id: '6', img: '' },
            ],
            weInfo:[
                { name: '入驻商家', id: '1', num: '998' },
                { name: '产品团期', id: '2', num: '20694928' },
                { name: '尾货甩卖', id: '3', num: '44396' },
                { name: '销售人数', id: '4', num: '13287' },
                { name: '产品类型', id: '5', num: '43' },
                { name: '对接国家', id: '6', num: '132' },
                { name: '服务人次', id: '7', num: '23875862' },
            ],
        }
    }

    // 城市 改变 回调
    cityChange(value,option){
        console.log(value)
        console.log(option)
    }

    // 线路 改变 回调
    lineChange(value, option){
        console.log(value)
        console.log(option)
    }


    // 顶部搜索事件
    search(value,event){
        console.log(value)
    }


    render(){
        return(
            <Layout className="Home">
                <div className="home-header">
                    <div className="home-logo"></div>
                    <div className="home-search">

                        <Select defaultValue={this.state.cur_city} className="home-search-city"
                            onChange={(value, option) => this.cityChange(value, option)}>
                            {this.state.cityArr.map(item=>
                                <Option value={item.id} key={item.id}>{item.value}</Option>
                            )}
                        </Select>

                        <InputGroup compact className="home-search-input">
                            <Select defaultValue={"东南亚"} onChange={(value, option) => this.lineChange(value, option)}>
                                {this.state.lineArr.map(item =>
                                    <Option value={item.id} key={item.id}>{item.value}</Option>
                                )}
                            </Select>
                            <Search
                                placeholder={'请输入产品名称'}
                                onSearch={(value, event) => this.search(value, event)}
                                enterButton
                            />
                        </InputGroup>
                    </div>
                    <div className="home-info">
                        <div span={6} push={1} className="home-info-right-top">
                            <div className="home-info-right-top-item">
                                <span className="home-info-right-top-item-text">设为首页</span>
                                {/* <a href='#' onClick={"this.style.behavior='url(#default#homepage)';this.setHomePage('http://www.baidu.com')}"}>设为首页</a> */}
                            </div>
                            <div className="home-info-right-top-item">
                                <span className="home-info-right-top-item-text">加入收藏</span>
                                {/* <a target='_top' href="javascript:window.external.AddCollection('http://www.baidu.com','百度');">加入收藏</a> */}
                            </div>
                            <div className="home-info-right-top-item">
                                <span className="home-info-right-top-item-text">官方微信</span>
                            </div>
                            <div className="home-info-right-top-item" style={{paddingRight:'0'}}>
                                <span className="home-info-right-top-item-text">在线帮助</span>
                            </div>
                        </div>
                        <div className="home-info-right-btm">
                            <div className="home-info-right-btm-serv">
                                <div className="home-header-icon-box"><Icon type="customer-service" theme="outlined" /></div>
                                <div>
                                    <div>欢迎使用</div><div>在线客服</div>
                                </div>
                            </div>
                            <div className="home-info-right-btm-mobile">
                                <div className="home-header-icon-box"><Icon type="phone" theme="outlined" /></div>
                                <div>
                                    <div>24h客户服务电话</div><div>400-800-8888</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content className="home-content">
                    <Row>
                        <Col span={3} className="home-content-left">
                        {this.state.lineType.map( item =>
                            <Col className="home-content-left-item" key={item.id}>
                                <img src='/img/avatar1.png'
                                className="home-content-left-img" />
                                <span className="home-content-left-text">{item.name}</span>
                            </Col>
                        )}
                        </Col>
                        <Col span={17}>
                            <img src="/img/Login-bg.jpg" style={{width: '98%'}} />
                        </Col>
                        <Col span={4} className="home-content-right">
                        {this.state.weInfo.map((item,index) =>
                            <Col className="home-content-left-item" key={item.id}>
                                    <Col className={"home-content-left-item-top "+('bgc-'+index)}>
                                    {item.name}
                                    <div className="home-content-left-item-top-circle"></div>
                                    <div className="home-content-left-item-top-step">STEP</div>
                                    <div className="home-content-left-item-top-num">{"0" + (index + 1)}</div>
                                </Col>
                                <Col className="home-content-left-item-btm">
                                    <span>{item.num}条</span>
                                    <span><Button size={'small'}>查看</Button></span>
                                </Col>
                            </Col>
                        )}
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(Home);