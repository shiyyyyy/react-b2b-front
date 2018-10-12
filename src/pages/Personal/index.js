
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

import {ComModal} from '../com';

import History from './History';
import LatestNews from './LatestNews';
import QA from './QA';
import Recommend from './Recommend';
import "../../css/Personal.css";

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class index extends React.Component {

    constructor(){
        super();
        this.state = {
            Menu: [
                { key: 1, icon: 'home', name: '首页', path: '/' },
                { key: 2, icon: 'home', name: '英雄列表', children: [{ key: 21, path: 'Gailun', icon: 'home', name: '盖伦' }, { key: 22, path: 'Timor', icon: 'home', name: '提莫' }, { key: 23, path: 'Eyu', icon: 'home', name: '鳄鱼' }] },
                { key: 3, icon: 'home', name: '海贼', children: [{ key: 31, path: 'Sabo', icon: 'home', name: '萨博' }, { key: 32, path: 'Aisi', icon: 'home', name: '艾斯' }, { key: 33, path: 'Lufei', icon: 'home', name: '路飞' }] },
            ],
            tags: ['导游好漂亮', '导游很帅', '这是一个专业的导游!', '认真负责吃苦耐劳的好劳模',
                   '很认真的一个人', '游戏大神', '标准宅男', '这个导游坑得很', '态度恶劣', '不负责任的导游',
                   '可恶啊', '可以,但没必要', '玩你尕爹', '像个鬼一样', '驴酱一号', '噔噔噔噔噔噔', '说好的幸福呐',
                   '香草吧噗', '南拳妈妈', '昨晚下过雨后', '操场的湿气很重', '篮球上的水滴也没有干过', '啦啦啦啦啦',
                   '伽蓝寺', '将军和小姑娘'
            ],
            photos: ['http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
                     'http://img2.imgtn.bdimg.com/it/u=3192920352,1788776726&fm=214&gp=0.jpg', 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
                     'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg'
            ],
            photoWallShow: false, // 照片墙弹窗默认不显示
        }
        this.swiperId = null
    }

    componentDidMount() {
        console.log(Swiper)
        new Swiper('#swiper', {
            loop: true, // 循环模式选项
            slidesPerView: 4,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }
    tags_color = [
        'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
    ]

    // 照片墙 弹窗
    photoWallShowFun(){

        const data = {
            title: '照片墙', // 标题
            cancelText: false, // 是否取消标题文本
            visible: true, // 显示隐藏
            centered: true, // 是否垂直居中展示
            onOk: null, // 点击确定按钮的回调
            onCancel: null, // 关闭modal回调
        }

        return(
            <ComModal data={data}>
                <Row>
                    
                </Row>
            </ComModal>
        )
    }

    // tab切换
    TabsChange(key){
        console.log(key);
    }
    // 个人首页 tab 样式
    index(){
        return(
            <div>
                {/* 评分 && 标签 */}
                <Row>
                    <Col span={12} style={{ borderRight: '1px solid #d9d9d9'}}>
                        <Col span={6}>
                            <div className="index-score">
                                <strong>4.9</strong>
                                <span>分</span><br />
                                <span>非常靠谱</span>
                            </div>
                            <div className="index-comment">圈内综合评分</div>
                        </Col>
                        <Col span={17}>
                            <Col>买家评分<Rate allowHalf defaultValue={5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>卖家评分<Rate allowHalf defaultValue={5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>资历评分<Rate allowHalf defaultValue={5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>口碑评分<Rate allowHalf defaultValue={5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                        </Col>
                    </Col>
                    <Col span={12} style={{paddingLeft: '16px'}}>
                        <div className="index-impress-tags">印象标签</div>
                        <Col style={{maxHeight: '120px', overflow: 'hidden'}}>
                            {this.state.tags.map((item, index) => (
                                <Tag color={this.tags_color[index]} 
                                className="index-tags-item" key={item}>{item}</Tag>
                            ))}
                        </Col>
                    </Col>
                </Row>
                {/* 照片墙 */}
                <Row style={{marginTop: '16px'}}>
                    <div className="index-photo-wall">照片墙</div>
                    <Col className="index-photos">
                    {/* 非轮播图版本的 照片墙 */}
                    {/* {
                        this.state.photos.map( (item,index) => (
                            <Col className={"index-photo-box " + (index > 3 ? 'hide' : '')} key={index}>
                                <img onClick={_=>this.setState({photoWallShow: true})}
                                src={item} className="index-photo-item img-size" />
                            </Col>
                        ))
                    } */}
                    {/* 轮播图版本的 照片墙 */}
                        <div className="swiper-container index-photos" id="swiper">
                            <div className="swiper-wrapper">
                                {
                                    this.state.photos.map((item, index) => (
                                        <div className="swiper-slide index-photo-box w-25" key={index}>
                                            <img onClick={_ => this.setState({ photoWallShow: true })}
                                                src={item} className="index-photo-item img-size" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <Layout className="layout">
            {/* 顶部 登录人 */}
                <Row className="personal-top">
                    <Col span={3} push={1}>您好! 张三! [退出]</Col>
                    <Col span={2} push={1}><Icon type="message" /> 我的消息</Col>

                    <Col span={6} push={12} className="personal-top-right">
                        <Col span={6} className="personal-top-right-item"><span>设为首页</span></Col>
                        <Col span={6} className="personal-top-right-item"><span>加入收藏</span></Col>
                        <Col span={6} className="personal-top-right-item"><span>官方微信</span></Col>
                        <Col span={6} className="personal-top-right-item"><span>在线帮助</span></Col>
                    </Col>
                </Row>
                {/* tab  */}
                <Header>
                    <Row style={{height: '64px'}}>
                        <Col span={3} className="personal-logo" ></Col>
                        <Col span={21} className="personal-header">
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                                mode='horizontal' className="personal-header-menu">
                                {this.state.Menu.map((item, index) =>
                                    item.children ?
                                        (
                                            <SubMenu title={<span><Icon type={item.icon} /><span>{item.name}</span></span>} key={item.key}>
                                                {item.children &&
                                                    item.children.map(child =>
                                                        <Menu.Item key={child.key}>
                                                            <Link to={child.path}>
                                                                <Icon type={child.icon} />
                                                                <span className="nav-text">{child.name}</span>
                                                            </Link>
                                                        </Menu.Item>
                                                    )}
                                            </SubMenu>
                                        ) : (
                                            <Menu.Item key={item.key}>
                                                <Link to={item.path}>
                                                    <Icon type={item.icon} />
                                                    <span className="nav-text">{item.name}</span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                )}
                            </Menu>

                        </Col>
                    </Row>
                </Header>
                {/* 内容 */}
                <Content className="personal-content">
                    <Row >
                        <Col className="user-info">
                            <Col className="user-autograph">
                                个性签名: 一盏离愁,一壶漂泊,你走之后思念瘦,花开一次却错过,谁再用琵琶弹奏一曲东风破,岁月在墙上剥落看见小时候,枫叶将故事染色结局我看透,篱笆外的古道我牵着你走过,荒烟蔓草的年头,就连分手都很沉默.
                            </Col>
                            <Col className="user-infos">
                                <Col className="user-infos-item"><span>2578</span><br />到访</Col>
                                <Col className="user-infos-item"><span>14754</span><br />成交</Col>
                                <Col className="user-avatar">
                                    {/* <Avatar src="../../../public/img/avatar.png" style={{ height: '100%', width: '100%' }} /> */}
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    style={{height: '100%', width: '100%'}} />
                                </Col>
                                <Col className="user-infos-item"><span>256</span><br />问答</Col>
                                <Col className="user-infos-item"><span>78</span><br />动态</Col>
                            </Col>
                        </Col>
                        <Col className="user-company">
                            <Col>北京凤凰假期国际旅行社有限责任公司 - 寰宇风情</Col>
                            <Col>
                                <span>阿斯蒂芬</span>   
                                <span>13566655554</span>   
                                <Button type="danger" size='small'><Icon type="plus" theme="outlined" />关注</Button>
                                <Button type="primary" size='small'><Icon type="notification" theme="outlined" />咨询</Button>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1" onChange={_=>this.TabsChange()}>
                                <TabPane tab="个人首页" key="1">
                                    {/* <Route exact path="/Personal" component={index} /> */}
                                    {this.index()}
                                </TabPane>
                                <TabPane tab="推介产品" key="2">
                                    推介产品
                                    {/* <Route path="/Personal/Recommend" component={Recommend} /> */}
                                </TabPane>
                                <TabPane tab="历史成交" key="3">
                                    历史成交
                                    {/* <Route path="/Personal/History" component={History} /> */}
                                </TabPane>
                                <TabPane tab="我的问答" key="4">
                                    我的问答
                                    {/* <Route path="/Personal/QA" component={QA} /> */}
                                </TabPane>
                                <TabPane tab="最新动态" key="5">
                                    最新动态
                                    {/* <Route path="/Personal/LatestNews" component={LatestNews} /> */}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
                {this.state.photoWallShow && this.photoWallShowFun()}
            </Layout>
        )
    }
}

export default withRouter(index);