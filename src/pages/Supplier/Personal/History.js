// 历史记录
import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Icon, Row, Col, Button, Tag, Rate, Avatar, Pagination, Tooltip, Radio, Dropdown } from 'antd';

// import "../../css/History.css";

const RadioGroup = Radio.Group;

class History extends React.Component{
    constructor(){
        super()
        this.state = {
            total: 666, // 评论总条数
            cur_page: 1, // 当前第几页
            // 
            cur_tag: 1,
            open_eva_index: '', // 展开的是第几条评论

            evaluate: [
                {tag:'1',praise:1 , com:'', emp:'', pro_name:'', time:'2018-08-09',num:'2',evaluate:"好好好,这个导游真的好(每条5毛,括号内删掉)",id:'1' },
                {tag:'2',praise:2 , com:'', emp:'', pro_name:'', time:'2018-08-09',num:'2',evaluate:"好好好,这个导游真的好(每条5毛,括号内删掉)",id:'2' },
                {tag:'1',praise:3 , com:'', emp:'', pro_name:'', time:'2018-08-09',num:'2',evaluate:"好好好,这个导游真的好(每条5毛,括号内删掉)",id:'3' },
                {tag:'2',praise:1 , com:'', emp:'', pro_name:'', time:'2018-08-09',num:'2',evaluate:"好好好,这个导游真的好(每条5毛,括号内删掉)",id:'4' },
            ],
        }
    }

    // 标签样式
    tags_color = [
        'magenta', 'cyan', 'red', 'volcano', 'orange', 'gold', 'lime', 'green',  'blue', 'geekblue', 'purple'
    ]
    // 切换 评价标签
    tagChange(e){
        console.log(e.target.value)
        this.setState({cur_tag: e.target.value})
    }
    // 展开折叠
    open_eva(index){
        if(index === this.state.open_eva_index){
            this.setState({ open_eva_index: '' })
            return
        }
        this.setState({open_eva_index: index})
    }
    // 切换不同 pages
    pageChange(page){
        console.log(page)
        this.setState({cur_page: page})
    }

    render(){
        return(
            <div className="History">
                {/* 评分 && 标签 */}
                <Row style={{fontSize:'12px'}}>
                    <div className="index-title">
                        <span className="index-title-left">综合评分</span>
                        <span className="index-title-right">
                        </span>
                    </div>
                    <Col span={12} className="d-f-c" style={{borderRight: "1px solid #d9d9d9"}}>
                        {/* <div className="index-impress-tags">商家评分</div> */}
                        <Col span={6}>
                            <div className="index-score">
                                <strong>4.9</strong>
                                <span>分</span><br />
                                <span>非常靠谱</span>
                            </div>
                            <div className="index-comment">作为卖家的综合评分</div>
                        </Col>
                        <Col span={17}>
                            <Col>售前答疑<Rate className="rate-color" allowHalf defaultValue={4.6} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>专业知识<Rate className="rate-color" allowHalf defaultValue={4.4} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>服务态度<Rate className="rate-color" allowHalf defaultValue={4.8} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>售后跟踪<Rate className="rate-color" allowHalf defaultValue={3.5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                        </Col>
                    </Col>
                    <Col span={12} className="d-f-c">
                        {/* <div className="index-impress-tags">商家评分</div> */}
                        <Col span={6}>
                            <div className="index-score">
                                <strong>4.9</strong>
                                <span>分</span><br />
                                <span>非常靠谱</span>
                            </div>
                            <div className="index-comment">作为买家的综合评分</div>
                        </Col>
                        <Col span={17}>
                            <Col>销售水平<Rate className="rate-color" allowHalf defaultValue={4.6} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>沟通效率<Rate className="rate-color" allowHalf defaultValue={4.4} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>应变能力<Rate className="rate-color" allowHalf defaultValue={4.8} disabled />4.8分  打败全国98%的同行从业人员</Col>
                            <Col>结款速度<Rate className="rate-color" allowHalf defaultValue={3.5} disabled />4.8分  打败全国98%的同行从业人员</Col>
                        </Col>
                    </Col>
                </Row>
                {/* 评价 */}
                <Row className="evaluate">

                    <Col className="evaluate-tag">
                        <div className="index-title" style={{width: 'auto'}}>
                            <span className="index-title-left">产品评价</span>
                            <span className="index-title-right" style={{marginLeft: '24px'}}>
                                <RadioGroup onChange={this.tagChange.bind(this)} value={this.state.cur_tag}>
                                    <Radio value={1} className={this.state.cur_tag===1?"evaluate-tag-item-active":""}>全部评价(4396)</Radio>
                                    <Radio value={2} className={this.state.cur_tag===2?"evaluate-tag-item-active":""}>卖方评价(3600)</Radio>
                                    <Radio value={3} className={this.state.cur_tag===3?"evaluate-tag-item-active":""}>买方评价(796)</Radio>
                                    <Radio value={4} className={this.state.cur_tag===4?"evaluate-tag-item-active":""}>好评(2864)</Radio>
                                    <Radio value={5} className={this.state.cur_tag===5?"evaluate-tag-item-active":""}>中评(998)</Radio>
                                    <Radio value={6} className={this.state.cur_tag===6?"evaluate-tag-item-active":""}>差评(34)</Radio>
                                    <Radio value={7} className={this.state.cur_tag===7?"evaluate-tag-item-active":""}>追评(23)</Radio>
                                </RadioGroup>
                            </span>
                        </div>
                        {/* <Col className={"evaluate-tag-item "+ (this.state.cur_tag===1?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(1)}>全部评价(4396)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===2?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(2)}>卖方评价(3600)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===3?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(3)}>买方评价(796)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===4?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(4)}>好评(2864)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===5?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(5)}>中评(998)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===6?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(6)}>差评(34)</Col>
                        <Col className={"evaluate-tag-item "+ (this.state.cur_tag===7?"evaluate-tag-item-active":"")}
                        onClick={_=>this.tagChange(7)}>追评(23)</Col> */}
                    </Col>
                    <Col className="evaluate-box">
                    {
                    this.state.evaluate.map((item,index) =>
                        <Col span={24} className={"evaluate-item-box "+ (index>9?"hide":"")} key={item.id}>
                            <Col span={2}>
                                <Avatar src={item.avatar ? '/img/avatar1.png' :'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                size={64} />
                            </Col>
                            <Col span={22}  style={{textAlign: 'left'}}>
                                <Col>
                                    <Col span={18} className="evaluate-info">
                                        <Col className="evaluate-com-emp">北京神州国际旅行社有限责任公司-哈士奇</Col>
                                        <Col className="evaluate-type"><Tag color={this.tags_color[item.tag]} className="m-0">{item.tag === '1'?'卖家':'买家'}</Tag></Col>
                                    </Col>
                                    <Col span={6} className="evaluate-time">2018-08-24 20:32:54</Col>
                                </Col>
                                <Col>
                                    <Col className="evaluate-pro_name-box">
                                        <Col className="evaluate-pro_name">纵情法兰西14日深度一国游</Col>
                                        <Col className="evaluate-dep_date">8月25日</Col>
                                        <Col className="evaluate-num">5人</Col>
                                    </Col>
                                    <Col>
                                        <Col className={this.state.open_eva_index===index?"evaluate-main-open":"evaluate-main"}>o,乌云开始遮蔽,夜色很干净,公园里葬礼的回音,在满天飞行,送你的白色玫瑰在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静静听,我黑色的大衣,想吻着你日渐冰冷的回忆,走过的错过的森林,哎,我在空空的墓地,老去后还爱你.为你弹奏肖邦的夜曲,几点我死去的爱情,而我为你隐姓埋名在月光下弹琴,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥.</Col>
                                        <Col className="evaluate-open">
                                            <span onClick={_=>this.open_eva(index)}>
                                                <Icon className={this.state.open_eva_index===index?'evaluate-fold-icon':'evaluate-open-icon'}
                                                type="double-left" theme="outlined" /> &nbsp;
                                                {this.state.open_eva_index === index ? '收起全部' : '展开全部'}
                                            </span>
                                        </Col>
                                    </Col>
                                    <Col className="evaluate-praise">
                                        <Col span={18}>
                                            <Col className="evaluate-sell">
                                                <span className="evaluate-sell-title">卖方评价:</span> 
                                                <span>总体评分：<strong> 9.6分</strong></span>  
                                                <span>售前答疑：<strong> 9.0分</strong></span>  
                                                <span>专业知识：<strong> 9.9分</strong></span>  
                                                <span>服务态度：<strong> 9.8分</strong></span>  
                                                <span>售后很总：<strong> 9.4分</strong></span> 
                                            </Col>
                                            <Col className="evaluate-sell">
                                                <span className="evaluate-sell-title">卖方评价:</span> 
                                                <span>总体评分：<strong> 9.6分</strong></span>  
                                                <span>销售能力：<strong> 9.0分</strong></span>  
                                                <span>沟通效率：<strong> 9.9分</strong></span>  
                                                <span>应变能力：<strong> 9.8分</strong></span>  
                                                <span>结款速度：<strong> 9.4分</strong></span> 
                                            </Col>
                                        </Col>
                                        <Col span={6}>
                                            <Col span={12} push={12} style={{textAlign: 'center'}}>
                                                <Col>
                                                    <Rate className="rate-color" style={{ fontSize: '16px' }} allowHalf defaultValue={4.6} disabled />
                                                </Col>
                                                <Col>好评</Col>
                                            </Col>
                                        </Col>
                                    </Col>
                                </Col>
                            </Col>
                        </Col>
                    )}
                        <Col></Col>
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

export default withRouter(History); 