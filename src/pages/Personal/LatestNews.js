// 最新动态// 历史记录
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Tag, Rate, Avatar, Pagination } from 'antd';
import { ModalCarousel} from '../../util/com';

import "../../css/LatestNews.css";

class LatestNews extends React.Component {
    constructor() {
        super()
        this.state = {
            total: 998, // 评论总条数
            cur_page: 1, // 当前第几页
            open_latest_index: '', // 展开的是第几条评论
            modal_visible: false, // img 弹窗开关
            latest: [
                {time: '2018-09-09', conttent: 'ad asdf af ', imgs:['','','','','',''], id:'1'},
                {time: '2018-09-09', conttent: 'ad asdf af ', imgs:['','','','','',''], id:'2'},
                {time: '2018-09-09', conttent: 'ad asdf af ', imgs:['','','','','',''], id:'3'},
                {time: '2018-09-09', conttent: 'ad asdf af ', imgs:['','','','','',''], id:'4'},
            ],
            photos: ['http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg', 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
                'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg', 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
                'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg'
            ],
        }
    }

    // 标签样式
    tags_color = [
        'magenta', 'cyan', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple'
    ]
    // 切换 评价标签
    tagChange(index) {
        this.setState({ cur_tag: index })
    }
    // 展开折叠
    open_latest(index) {
        if (index === this.state.open_latest_index) {
            this.setState({ open_latest_index: '' })
            return
        }
        this.setState({ open_latest_index: index })
    }
    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ cur_page: page })
    }

    // 打开modal
    openModal(){
        this.setState({modal_visible: true})
    }
    imgModal(index){
        // console.log(this.props.location)
        // console.log(this)
        // this.props.history.push('/QA')
        // return;
        var that = this
        const info = {
            data: this.state.photos,
            title: '动态分享图片',
            visible: this.state.modal_visible,
            footer: null,
            bodyStyle: {padding: '0'},
            style: {top:50},
            width: 800,
            handleCancel(){
                that.setState({modal_visible: false})
            }
        }
        return(
            <ModalCarousel info={info} ></ModalCarousel>
        )
    }
    render() {
        return (
            <div className="LatestNews">
                {/* 评价 */}
                <Row>
                    <Col className="LatestNews-content">
                    {this.state.latest.map( (item,index) => 
                        <Col className="LatestNews-item" key={item.id}>
                            <Col span={2}>
                                <Avatar src={item.avatar ? '/img/avatar1.png' : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                    size={64} />
                            </Col>
                            <Col span={22}>
                                <Col className="LatestNews-item-r-t">
                                    <Col className="LatestNews-user">G2爆锤RNG</Col>
                                    <Col className="LatestNews-time">2018-10-20 17:24:53</Col>
                                </Col>
                                <Col className={this.state.open_latest_index === index ? "LatestNews-main-open" : "LatestNews-main"}>
                                    韩国旅行，其实是需要具有一些头铁精神的，3选奥巴马这种事,并不需要一起旅游的人认可，大不了一拍两散,反正都叫我拆队狂魔。比赛,其实是一场旅行，头脑清醒的话, 还可以是一种代购方式, 那是一种一种孤独的感觉，“此时,一名高调的世界第一中单路过,嗯?小伙计,你也是世界第一?'世界第一吹jb'”，比赛后我洗澡狗可不是孑然一身，隐入苍茫自然，我还可以逛街、代购; 输了比赛，赢了代购，这波不亏。
                                </Col>
                                <Col className="evaluate-open" style={{ paddingRight: '5%' }}>
                                    <span onClick={_ => this.open_latest(index)}>
                                        <Icon className={this.state.open_latest_index === index ? 'evaluate-fold-icon' : 'evaluate-open-icon'}
                                            type="double-left" theme="outlined" /> &nbsp;
                                {this.state.open_latest_index === index ? '收起全部' : '展开全部'}
                                    </span>
                                </Col>
                                <Col className="LatestNews-imgs">
                                    {item.imgs.map((imgs, index) =>
                                        <Col className={"LatestNews-imgs-item "+(index>5?"hide":"")} span={3} key={index} 
                                            onClick={_ => this.openModal()}>
                                            <img src={imgs ? imgs : '/img/Login-bg.jpg'} className="LatestNews-img-item img-size" />
                                        </Col>
                                    )}
                                </Col>
                                {/* <Col>
                                <span><Icon type="like" theme="outlined" /></span>
                                <span></span>
                                </Col> */}
                                <Col className="index-message-footer">
                                    <span className="index-message-footer-zan"><Icon type="like" theme="outlined" />(998)</span>
                                    <span className="index-message-footer-qa"><Icon type="form" theme="outlined" />(666)</span>
                                </Col>
                            </Col>
                            
                        </Col>
                    )}
                    </Col>
                </Row>
                {/* 分页 */}
                <Row>
                    <Col className="history-pages">
                        <Pagination defaultCurrent={this.state.cur_page} total={this.state.total}
                            onChange={(page) => this.pageChange(page)} />
                    </Col>
                </Row>
                {
                    this.state.modal_visible && this.imgModal()
                }
            </div>
        )
    }
}

export default withRouter(LatestNews); 