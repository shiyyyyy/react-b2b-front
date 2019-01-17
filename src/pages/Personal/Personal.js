
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Avatar, Button, Tabs, Rate, Tag, Tooltip, Badge, Dropdown } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';

import {ModalCarousel} from '../../util/com';

import History from './History';
import LatestNews from './LatestNews';
import QA from './QA';
import Recommend from './Recommend';
import "../../css/Personal.css";

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class Personal extends React.Component {

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
                     'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
                     'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg'
            ],
            message: [
                {
                    company: '北京青年旅行社有限公司', department: '信息部', employee: '计胜', time: '2018-08-08 12:53:24', zan: '996', qa: '4396', content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`},
{
                    company: '北京青年旅行社有限公司', department: '信息部', employee: '计胜', time: '2018-08-08 12:53:24', zan: '996', qa: '4396', content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`},
{
                    company: '北京青年旅行社有限公司', department: '信息部', employee: '计胜', time: '2018-08-08 12:53:24', zan: '996', qa: '4396', content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`},

            ],
            visitingRecords: [
                { time: '2018-08-07', name: '我落泪', avatar: '' },
                { time: '2018-08-07', name: '情绪零碎', avatar: '' },
                { time: '2018-08-07', name: '地上断了翅的蝶', avatar: '' },
                { time: '2018-08-07', name: '张三', avatar: '' },
                { time: '2018-08-07', name: '李四', avatar: '' },
                { time: '2018-08-07', name: '王二麻子', avatar: '' },
                { time: '2018-08-07', name: '小淘气', avatar: '' },
                { time: '2018-08-07', name: '满地的落叶', avatar: '' },
                { time: '2018-08-07', name: '凋谢', avatar: '' },
                { time: '2018-08-07', name: '我不想再写', avatar: '' },
                { time: '2018-08-07', name: '随手撕下这一页', avatar: '' },
                { time: '2018-08-07', name: '把诗折叠', avatar: '' },
                { time: '2018-08-07', name: '分手在季风这个季节', avatar: '' },
            ],
            photoWallShow: false, // 照片墙弹窗默认不显示
        }
    }

    componentDidMount() {
        new Swiper('#swiper', {
            // loop: true, // 循环模式选项
            slidesPerView: 4,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.Personal-prev',
                prevEl: '.Personal-next',
            },
            // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
            observer: true,
        });
    }


    // 标签样式
    tags_color = [
        'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
    ]

    // user 下拉菜单
    DropdownMenu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">支付宝</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">淘宝</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">天猫</a>
            </Menu.Item>
        </Menu>
    )


    // 照片墙 弹窗
    photoWallShowFun(){
        var that = this
        const info = {
            data: this.state.photos,
            title: '照片墙',
            visible: this.state.photoWallShow,
            footer: null,
            bodyStyle: { padding: '0' },
            style: { top: 50 },
            width: 800,
            handleCancel() {
                that.setState({ photoWallShow: false })
            }
        }
        return (
            <ModalCarousel info={info} ></ModalCarousel>
        )
    }  

    // tab切换
    TabsChange(key){
        console.log(key);
    }
    // 个人首页 tab 样式
    index(){
        return(
            <div className="Personal-index">
                {/* 评分 && 标签 */}
                <Row style={{fontSize:'12px'}}>
                    <Col span={12} style={{ borderRight: '1px solid #d9d9d9'}}>
                        <div className="index-impress-tags">商家评分</div>
                        <Col span={6}>
                            <div className="index-score">
                                <strong>4.9</strong>
                                <span>分</span><br />
                                <span>非常靠谱</span>
                            </div>
                            <div className="index-comment">圈内综合评分</div>
                        </Col>
                        <Col span={17} className="index-comment-contrast">
                            <Col>买家评分<Rate className="rate-color" allowHalf defaultValue={4.6} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>卖家评分<Rate className="rate-color" allowHalf defaultValue={4.4} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>资历评分<Rate className="rate-color" allowHalf defaultValue={4.8} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>口碑评分<Rate className="rate-color" allowHalf defaultValue={3.5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                        </Col>
                    </Col>
                    <Col span={12} style={{paddingLeft: '16px'}}>
                        <div className="index-impress-tags">印象标签</div>
                        <Col style={{maxHeight: '150px', overflow: 'hidden'}}>
                            {this.state.tags.map((item, index) => (
                                <Tag 
                                color={this.tags_color[index]} 
                                className="index-tags-item" key={item}>{item}</Tag>
                            ))}
                        </Col>
                    </Col>
                </Row>
                {/* 照片墙 */}
                <Row style={{marginTop: '16px'}}>
                    <div className="index-title">
                        <span className="index-title-left">照片墙</span>
                        {/* <span className="index-title-right">更多<Icon type="right" /></span> */}
                    </div>
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
                        <div className="swiper-container" style={{width: '100%'}} id="swiper">
                            <div className="swiper-wrapper">
                                {
                                    this.state.photos.map((item, index) => (
                                        <div className="swiper-slide index-photo-box" key={index}>
                                            <img onClick={_ => this.setState({ photoWallShow: true })}
                                            src={item} className="index-photo-item img-size" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="swiper-button-prev Personal-prev"><Icon type="left-circle" theme="filled" /></div>
                            <div className="swiper-button-next Personal-next"><Icon type="right-circle" theme="filled" /></div>

                        </div>
                    </Col>
                </Row>
                {/* 同行留言 */}
                <Row>
                    <div className="index-title">
                        <span className="index-title-left">同行留言</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    { this.state.message.map( (item,index)=> 
                        <Col className="index-message" key={index}>
                            <Col className="index-message-avatar" span={2}>
                                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                style={{ height: '100%', width: '100%' }} /> */}
                                <Avatar src={item.avatar ? '/img/avatar1.png' :'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                size={64} />
                            </Col>
                            <Col className="index-message-box" span={22}>
                                <Col className="index-message-top">
                                    <p className="index-message-top-left">{item.company}-{item.department}-{item.employee}</p>
                                    <p className="index-message-top-right">{item.time}</p>
                                </Col>
                                <Col className="index-message-content">{item.content}</Col>
                                <Col className="index-message-footer">
                                    <span className="index-message-footer-zan"><Icon type="like" theme="outlined" /> {item.zan}</span>
                                    <span className="index-message-footer-qa"><Icon type="form" theme="outlined" /> {item.qa}</span>
                                </Col>
                            </Col>
                        </Col>
                    )}
                </Row>
                {/* 到访记录 */}
                <Row>
                    <div className="index-title">
                        <span className="index-title-left">到访记录</span>
                        <span className="index-title-right">更多<Icon type="right" /></span>
                    </div>
                    <Col className="index-record">
                        {this.state.visitingRecords.map( (item,index)=>(
                            <Col span={2} className={'index-record-box '+(index>10?"hide":"")} key={index}>
                                <Avatar shape="square" size={64} 
                                src={item.avatar ? "img/avatar1.png" :"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                                <div className="index-record-name" title={item.name}>{item.name}</div>
                                <div className="index-record-time" title={item.time}>{item.time}</div>
                            </Col>
                        ))}
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
                    <Col span={6} push={1} className="personal-top-right">
                        <Col span={6} className="personal-top-right-item"><a>设为首页</a></Col>
                        <Col span={6} className="personal-top-right-item"><a>加入收藏</a></Col>
                        <Col span={6} className="personal-top-right-item"><a>官方微信</a></Col>
                        <Col span={6} className="personal-top-right-item"><a>在线帮助</a></Col>
                    </Col>
                    <Col span={2} push={13}>
                        <Dropdown overlay={this.DropdownMenu} placement="bottomCenter">
                            <div style={{cursor: 'pointer'}}>
                                <Icon style={{ fontSize: '20px' }} type="user" theme="outlined" /> 
                                &nbsp;王二麻子&nbsp; 
                                <Icon style={{ fontSize: '14px' }} type="caret-down" theme="outlined" />
                            </div>
                        </Dropdown>
                    </Col>
                    <Col span={1} push={13}>
                        <Badge count={1} style={{ transform:'scale(.7) translateX(7px)'}}>
                            <Icon style={{ fontSize: '20px', cursor: 'pointer'}} type="message" theme="outlined" />
                        </Badge>
                    </Col>
                </Row>
                {/* header-tab  */}
                <Header>
                    <Row style={{height: '64px'}} gutter={16}>
                        <Col span={3} className="personal-logo" ></Col>
                        <Col span={21} className="personal-header">
                            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}
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
                    {/* <Row > */}
                        <Col className="user-info">
                            <Col className="user-autograph">
                                <span>个性签名: 一盏离愁,一壶漂泊,你走之后思念瘦,花开一次却错过,谁再用琵琶弹奏一曲东风破,岁月在墙上剥落看见小时候,枫叶将故事染色结局我看透,篱笆外的古道我牵着你走过,荒烟蔓草的年头,就连分手都很沉默.</span>
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
                            <Col className="user-company-emp">
                                <span>阿斯蒂芬 &nbsp;&nbsp;&nbsp;</span>   
                                <span style={{ fontSize: '18px' }}>13566655554</span>   &nbsp;&nbsp;&nbsp;
                                <Tooltip placement="top" title={'+关注'}>
                                    <strong className="user-company-heart"><Icon type="heart" theme="filled" /></strong>&nbsp;&nbsp;&nbsp;
                                </Tooltip>
                                <Tooltip placement="top" title={'咨询'}>
                                    <strong className="user-company-msg"><Icon type="message" theme="filled" /></strong>
                                </Tooltip>
                            </Col>
                            <Col>北京凤凰假期国际旅行社有限责任公司 - 寰宇风情</Col>
                        </Col>
                    {/* </Row> */}
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1" onChange={ e=>this.TabsChange(e)}>
                                <TabPane tab="个人首页" key="1">
                                    {/* <Route exact path="/Personal" component={index} /> */}
                                    {this.index()}
                                </TabPane>
                                <TabPane tab="推介产品" key="2">
                                    <Recommend />
                                     {/* <Route path="/Personal/Recommend" component={Recommend} /> */}
                                </TabPane>
                                <TabPane tab="历史成交" key="3">
                                    <History />
                                     {/* <Route path="/Personal/History" component={History} /> */}
                                </TabPane>
                                <TabPane tab="我的问答" key="4">
                                    <QA />
                                    {/* <Route path="/Personal/QA" component={QA} /> */}
                                </TabPane>
                                <TabPane tab="最新动态" key="5">
                                    <LatestNews />
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

export default withRouter(Personal);