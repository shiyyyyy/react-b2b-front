// 我的问答
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Icon, Row, Col, Avatar, Tag, Pagination} from 'antd';

import '../../css/QA.css';

class QA extends React.Component{
    constructor(){
        super();
        this.state = {
            cur_tag: 1, // 当前标签
            total: 666, // 评论总条数
            cur_page: 1, // 当前第几页=
            open_QA_index: '', // 展开的是第几条问答
            QA: [
                {type:1 ,Q:'',A:''},
                {type:2 ,Q:'',A:''},
                {type:1 ,Q:'',A:''},
                {type:2 ,Q:'',A:''},
            ]
        }
    }

    // 标签样式
    tags_color = [
        'volcano','geekblue','magenta', 'cyan', 'red',  'orange', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple'
    ]
    // 展开折叠 
    open_QA(index) {
        if (index === this.state.open_QA_index) {
            this.setState({ open_QA_index: '' })
            return
        }
        this.setState({ open_QA_index: index })
    }

    // 切换不同 pages
    pageChange(page) {
        console.log(page)
        this.setState({ cur_page: page })
    }

    render(){
        return(
            <div className="QA">
                {/* 问答 */}
                <Row>
                    <Col className="QA-tags">
                        <Col className={"QA-tags-item "+(this.state.cur_tag===1?"QA-tags-item-active":"")}
                        onClick={_=>this.setState({cur_tag: 1})}>全部问答(1998)</Col>
                        <Col className={"QA-tags-item "+(this.state.cur_tag===2?"QA-tags-item-active":"")}
                        onClick={_=>this.setState({cur_tag: 2})}>发起提问(298)</Col>
                        <Col className={"QA-tags-item "+(this.state.cur_tag===3?"QA-tags-item-active":"")}
                        onClick={_=>this.setState({cur_tag: 3})}>参与解答(1700)</Col>
                        <Col className={"QA-tags-item "+(this.state.cur_tag===4?"QA-tags-item-active":"")}
                        onClick={_=>this.setState({cur_tag: 4})}>中标采纳(998)</Col>
                    </Col>
                    <Col className="QA-content">
                    {this.state.QA.map((item,index)=>
                        <Col className="QA-item-box" key={index}>
                            <Col span={2}>
                                <Avatar src={item.avatar ? '/img/avatar1.png' : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                    size={64} />
                            </Col>
                            <Col span={22} style={{ textAlign: 'left' }}>
                                <Col>
                                    <Col span={18} className="evaluate-info">
                                        <Col className="evaluate-type"><Tag color={this.tags_color[item.type]} className="m-0">{item.type === 1 ? '问' : '答'}</Tag></Col>
                                        <Col className="evaluate-com-emp">北京神州国际旅行社有限责任公司-哈士奇</Col>
                                    </Col>
                                    <Col span={6} className="evaluate-time">提问时间: 2018-08-24 20:32:54</Col>
                                </Col>
                                <Col>
                                    <Col span={21}>
                                        <Col className="QA-Q">
                                            请问泰国签证有几种类型?一般需要多久能下来?加急那?具体费用是多少?
                                        </Col>
                                        <Col className={this.state.open_QA_index === index ? "QA-A-main-open" : "QA-A-main"}>泰国签证是泰国作为一个主权国家对来自其他国家访问泰国的人士所核发的官网文件。除非该国已经与泰国签订了免签协议，否则必须到泰国驻外大使馆或领事馆办理签证后才能入境，目前泰国给予57个国家/地区的居民免签证待遇。 [1]  根据泰国相关法律规定，逾期在泰国停留的受到500泰铢/天，最高20000铢的罚款，最高10年禁止再入境</Col>
                                        <Col className="evaluate-open">
                                            <span onClick={_ => this.open_QA(index)}>
                                                {this.state.open_QA_index === index ? '收起' : '展开'}
                                                <Icon className={this.state.open_QA_index === index ? 'evaluate-fold-icon' : 'evaluate-open-icon'}
                                                    type="double-left" theme="outlined" />
                                            </span>
                                        </Col>
                                    </Col>
                                    <Col span={3} className="evaluate-praise">
                                        <Icon type={item.praise === 1 ? 'smile' : (item.praise === 2 ? "meh" : "frown")} theme="outlined"
                                            className={item.praise === 1 ? 'praise1' : (item.praise === 2 ? "praise2" : "praise3")} /><br />
                                        <span style={{ fontSize: '16px', display: 'block' }}>{item.praise === 1 ? '好评' : (item.praise === 2 ? "中评" : "差评")}</span>
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    )}
                    </Col>
                </Row>
                {/* 分页 */}
                <Row>
                    <Col className="history-pages">
                        <Pagination defaultCurrent={1} total={this.state.total}
                            onChange={(page) => this.pageChange(page)} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(QA);