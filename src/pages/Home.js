import React from 'react';
import moment from 'moment';
import {Link, Route, withRouter} from 'react-router-dom';
import { Row, Col, Icon, Avatar, Button, Table, Divider, Tag} from 'antd';
import '../css/Home.css';

class Home extends React.Component{
    constructor(){
        super();

        this.state = {

        }
    }

    // 新闻 列表
    newsColumns = [{
        title: '标题',
        dataIndex: 'title',
    }, {
        title: '创建人',
        dataIndex: 'create',
    }, {
        title: '时间',
        dataIndex: 'time',
    }];
    newsData = [{
        key: '1',
        title: '震惊!原来还可以这样',
        create: '粉红色',
        time: '2018-08-08',
    }, {
        key: '2',
        title: '你不知道的事',
        create: '东风破',
        time: '2018-10-02',
    }, {
        key: '3',
        title: '结局我早就看透',
        create: '王二麻子',
        time: '2018-11-22',
    }];

    // 专线 列表
    expertColumns = [{
        title: '控团人',
        dataIndex: 'kongtuanren',
        key: 'kongtuanren',
        width: 80
    },{
        title: '出团日期',
        dataIndex: 'dep_date',
        key: 'dep_date',
        width: 100,
        sorter: (a, b) => moment(a.dep_date).valueOf() - moment(b.dep_date).valueOf(),
    },{
        title: '回团日期',
        dataIndex: 'back_date',
        key: 'back_date',
        width: 100
    },{
        title: '出发地',
        dataIndex: 'dep_city',
        key: 'dep_city',
        width: 80
    },{
        title: '产品名称',
        dataIndex: 'pro_name',
        key: 'pro_name',
        width: 150,
        render: text => <a onClick={_=>this.routePro_name(text)}>{text}</a>,
    },{
        title: '行程下载',
        dataIndex: 'down',
        key: 'down',
        width: 80
    },{
        title: '团号',
        dataIndex: 'group_num',
        key: 'group_num',
        width: 100,
        render: text => <a onClick={_=>this.routeGroup_num(text)}>{text}</a>,
    },{
        title: '天数',
        dataIndex: 'days',
        key: 'days',
        width: 70,
        sorter: (a, b) => a.days - b.days,
    },{
        title: '同行价',
        dataIndex: 'th_price',
        key: 'th_price',
        width: 100,
        sorter: (a, b) => a.th_price - b.th_price,
    },{
        title: '直客价',
        dataIndex: 'zk_price',
        key: 'zk_price',
        width: 100,
        sorter: (a, b) => a.zk_price - b.zk_price,
    },{
        title: '计划位',
        dataIndex: 'totle',
        key: 'totle',
        width: 80
    },{
        title: '库存',
        dataIndex: 'surplus',
        key: 'surplus',
        width: 80
    },{
        title: '报名确认',
        dataIndex: 'confirm',
        key: 'confirm',
        width: 100
    },{
        title: '团组类型',
        dataIndex: 'type',
        key: 'type',
        width: 100
    },{
        title: '产品提供',
        dataIndex: 'provide',
        key: 'provide',
        width: 100
    },{
        title: '销售备注',
        dataIndex: 'comment',
        key: 'comment',
        width: 100
    },{
        title: '操作',
        dataIndex: 'ctrl',
        key: 'ctrl',
        fixed: 'right',
        width: 110,
        render: (text, record) => {
            return (
                <span>
                    <a onClick={_ => this.changeTible(record)}>更改</a>
                    <Divider type="vertical" />
                    <a onClick={_ => this.deleteTible(record)}>删除</a>
                </span>
            )
        },
    }]
    expertData = [{
        key: '1',
        kongtuanren: '张三',
        dep_date: '2018-08-08',
        back_date: '2018-09-08',
        dep_city: '北京',
        pro_name: '欧洲一月',
        down: '下载行程',
        group_num: 'TH01234234',
        days: '30',
        th_price: '18888',
        zk_price: '29999',
        totle: '20',
        surplus: '10',
        confirm: '电话确认',
        type: '跟团游',
        provide: '南亚风情',
        comment: '不要购物'
    }, {
        key: '2',
        kongtuanren: '李四',
        dep_date: '2018-12-12',
        back_date: '2018-12-22',
        dep_city: '上海',
        pro_name: '南非10日',
        down: '下载行程',
        group_num: 'TH01542243',
        days: '10',
        th_price: '12999',
        zk_price: '16999',
        totle: '30',
        surplus: '14',
        confirm: '合同确认',
        type: '自由行',
        provide: '亚美运通',
        comment: '不要自费'
    }]


    routePro_name(target){
        console.log(target)
        console.log('跳转产品页面:'+target)
    }
    routeGroup_num(target) {
        console.log(target)
        console.log('跳转团号页面:' + target)
    }
    changeTible(item){
        console.log(item)
        console.log('更改表格')        
    }
    deleteTible(item){
        console.log(item)
        console.log('删除表格') 
    }
    
    render(){
        return(
            <div className="Home">
            {/* 第一 横排 */}
                <Row gutter={16}>
                    {/* 个人信息 */}
                    <Col span={8}>
                        <Row className="user-info p-0 box-shadow">
                            <Col className="home-header">
                                <div><Icon type="user" theme="outlined" />个人信息</div>
                            </Col>
                            <Col span={8} className="user-avarat-box">
                                <Avatar size={64}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Col>
                            <Col span={16} className="user-info-box">
                                <div>
                                    <p>欢迎登录</p>
                                    <span>所属中心: 营销中心</span><br />
                                    <span>所属部门: 信息部</span><br />
                                    <span>员工姓名: 计胜</span><br />
                                </div>
                            </Col>
                            <Col className="d-f-j-sa user-btn-box" span={24}>
                                <Button size="small" style={{ fontSize: '12px' }}>修改头像</Button>
                                <Button size="small" style={{ fontSize: '12px' }}>修改密码</Button>
                                <Button size="small" style={{ fontSize: '12px' }}>关闭消息</Button>
                                <Button size="small" style={{ fontSize: '12px' }}>系统设置</Button>
                                <Button size="small" style={{ fontSize: '12px' }}>退出登录</Button>
                            </Col>
                        </Row>
                    </Col>
                    {/* 站内新闻 */}
                    <Col span={16}>
                        <Row className="news box-shadow p-0">
                            <Col className="home-header">
                                <div><Icon type="message" theme="outlined" />站内新闻</div> 
                                <div><Button size="small" style={{ fontSize: '11px' }}>更多</Button></div>
                            </Col>
                            <Col>
                                <Table columns={this.newsColumns} dataSource={this.newsData}
                                pagination={false} size="small" bordered={false} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            
                {/* 第一 横排 */}
                <Row className="m-top-16 p-0 box-shadow">
                    <Col className="home-header">
                        <div><Icon type="message" theme="outlined" />北青专线</div>
                        <div><Button size="small" style={{ fontSize: '11px' }}>更多</Button></div>
                    </Col>
                    <Col>
                        <Table columns={this.expertColumns} dataSource={this.expertData}
                        pagination={false} bordered={false}  scroll={{ x: 1800 }} />
                    </Col>
                </Row>
            </div>
        )
    }




}

// export default withRouterr(connect(...)(MyComponent))
export default withRouter(Home);