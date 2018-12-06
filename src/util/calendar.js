// 日历组件

import React from 'react';
import moment from "moment";

import '../css/Calendar.css';
import { Row, Col, Icon, Modal } from 'antd';
import { debug } from 'util';


export class Calendar extends React.Component{
    constructor(props){
        super();
        this.state = {
            date: props.date,
            year: props.date.year(),
            month: props.date.month() + 1,
            daysArr: [],
            // 
            user_select: '',
            user_select_id: '',
            _user_select_id: '',
            // 一天多团时,弹窗和多团数据
            visible: false,
            much_groups: []
        }
        this.weekString = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }

    componentWillMount(){
        let date = this.state.date.format('YYYY-MM-DD')
        let daysArr = this.monthDay(date)
        this.setState({ daysArr: daysArr })
    }
    monthDay(date){
        let that = this
        const daysArr = [[], [], [], [], [], []]; // 6*7的日历数组
        const currentYear = moment(date).year(); // 获取当前年份
        const currentMonth = moment(date).month() + 1; // 获取当前月份
        const currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
        const lastMonthDays = moment(date).subtract(1, 'month').daysInMonth(); // 获取上月天数
        const currentMonthDays = moment(date).daysInMonth(); // 获取当月天数
        //  日期处理
        const getDay = function(day){
            let date;
            if (day <= lastMonthDays){
                // 上个月的
                let dayString = day
                let monthString = currentMonth - 1 < 1 ? 12 : (currentMonth - 1 < 10 ? '0' + (currentMonth - 1) : (currentMonth - 1));
                let year = currentMonth - 1 < 1 ? currentYear - 1 : currentYear;
                date = {
                    day: day,
                    month: currentMonth - 1 < 1 ? 12 : (currentMonth - 1) ,
                    year: year,
                    date: `${year}-${monthString}-${dayString}`
                }
            } else if (day <= (lastMonthDays + currentMonthDays)){
                // 本月的
                let dayString = (day - lastMonthDays < 10) ? ('0' + (day - lastMonthDays)) : (day - lastMonthDays)
                let monthString = currentMonth < 10 ? '0' + currentMonth : currentMonth
                let year = currentYear;
                date = {
                    day: day - lastMonthDays,
                    month: currentMonth,
                    year: year,
                    date: `${year}-${monthString}-${dayString}`,
                }
            }else{
                // 下个月
                let dayString = (day - (lastMonthDays + currentMonthDays) < 10) ? ('0' + (day - (lastMonthDays + currentMonthDays))) : (day - lastMonthDays)
                let monthString = currentMonth + 1 > 12 ? '01' : (currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1);
                let year = currentMonth + 1 > 12 ? currentYear + 1 : currentYear;
                date = {
                    day: day - (lastMonthDays + currentMonthDays),
                    month: currentMonth + 1 > 12 ? 1 : currentMonth + 1,
                    year: year,
                    date: `${year}-${monthString}-${dayString}`
                }
            }

            // 不用find 因为万一不止一个团,find就不行了
            let group = that.props.data.filter(item => item.dep_date === date.date)
            date.group = group
            return date
        }
        for (let i = 0; i < 7; i += 1) {
            let virtualDay = (lastMonthDays - currentWeekday) + i + 1;
            for (let j = 0; j < 6; j += 1) {
                daysArr[j][i] = getDay(virtualDay + (j * 7));
            }
        }
        return daysArr
    }

    plusMonth(){
        // 这个是不通过上级页面的date改变,通过本组件自身date改变month 
        // let date = this.state.date.add(1, 'M');
        // let year = date.year()
        // let month = date.month()+1
        // let dateFormat = date.format('YYYY-MM-DD');
        // let daysArr = this.monthDay(dateFormat)
        // this.setState({ daysArr: daysArr, date: date, year: year, month: month })

        // 通过上级页面传过来的 date 改变月份 (通过componentWillReceiveProps生命周期来重新渲染日历)
        this.props.param.next()
    }
    minusMonth(){
        console.log(this)
        // let date = this.state.date.subtract(1, 'M');
        // let year = date.year()
        // let month = date.month()+1
        // let dateFormat = date.format('YYYY-MM-DD');
        // let daysArr = this.monthDay(dateFormat)
        // this.setState({ daysArr: daysArr, date: date, year: year, month: month })

        this.props.param.prev()
    }
    // props改变 => 
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            let date = this.props.date;
            let year = this.props.date.year();
            let month = this.props.date.month() + 1;
            let dateFormat = date.format("YYYY-MM-DD");
            let daysArr = this.monthDay(dateFormat)
            this.setState({ daysArr: daysArr, date: date, year: year, month: month })
        }
    }

    // selectDate
    selectDate(cell){
        console.log(cell)
        console.log(this)
        if(cell.month !== this.state.month) return
        if(cell.group.length === 0) return
        if(cell.group.length > 1){
            // 一天多团,打开团期弹窗选择团期
            // this.setState({ visible: true, much_groups: cell, user_select: cell.date })

            this.setState({ visible: true, much_groups: cell})
            this.props.param.selectDateCb(cell.date)
        }else{
            // 这个是内部自己控制当前,每个日历组件都会有一个自己的当前日期
            // this.setState({ user_select: cell.date, user_select_id: cell.group[0].id })
            // 但是对于两个日历组件一起使用的情况,显然是由父组件统一一个当前日期更好
            this.props.param.selectDateCb(cell.date)
            this.props.param.selectIdCb(cell.group[0].id)
        }
    }

    // 弹出框(一天多团选团期)
    handleOk(e){
        console.log(e)
        // this.setState({ visible: false, user_select_id: this.state._user_select_id })        
        this.setState({ visible: false })
        this.props.param.selectIdCb(this.state._user_select_id)
    }
    handleCancel(e){
        console.log(e)
        this.setState({ visible: false, _user_select_id: '' })
    }

    selectMuch_groups(item){
        this.setState({ _user_select_id: item.id })
    }




    render(){
        return(
            <Row>
                <Col className="Calendar">
                    <Col className="Calendar-title-box">
                        <div>
                            <Icon type="left" className={"Calendar-title-ctrl " + (this.props.param.prevCtrl === false ? "hide" : "")} 
                            onClick={_ => this.minusMonth()}/>
                        </div>
                        {`${this.state.date.format('YYYY-MM-DD')}`}
                        <div>
                            <Icon type="right" className={"Calendar-title-ctrl " + (this.props.param.nextCtrl === false ? "hide" : "")}
                            onClick={_ => this.plusMonth()}/>
                        </div>
                    </Col>
                    <Col className="Calendar-week-box">
                    {this.weekString.map(item => 
                            <Col className="Calendar-week-item" key={item}>{item}</Col>
                    )}
                    </Col>
                    <Col className="Calendarday-box">
                        {this.state.daysArr && 
                            this.state.daysArr.map((item,i) => 
                            <Col className="Calendar-day-col" key={i}>   
                            {
                                item.map(cell=>
                                <Col className={"Calendar-day-col-item " + (this.props.param.selectDateString === cell.date?'Calendar-day-col-item-active':'') + 
                                (cell.month == this.state.month?'cur_month':'')} key={cell.date}
                                onClick={this.selectDate.bind(this,cell)}>
                                    <span className={"Calendar-day-col-day " + (this.props.param.selectDateString === cell.date && cell.month === this.state.month?'Calendar-day-col-day-active':'')}>{cell.day}</span>
                                    {cell.group && cell.group.length <= 1 && 
                                        <div style={{height: '28px'}} className={cell.month !== this.state.month ? "opcity0":""}>
                                            <span className={"Calendar-day-col-Surplus " + (this.props.param.selectDateString === cell.date ? 'Calendar-day-col-Surplus-active' : '') + 
                                            (this.state.month === cell.month? '':'hide')}>{(cell.group[0]?'余: '+ cell.group[0].seat_surplus:'')}</span>
                                            <span className={"Calendar-day-col-price " + (this.props.param.selectDateString === cell.date ? 'Calendar-day-col-price-active' : '') + 
                                            (this.state.month === cell.month? '':'hide')}>{(cell.group[0]?'￥' + cell.group[0].price:'')}</span>
                                        </div>
                                    }
                                    {/* 一天多团 */}
                                    {cell.group && cell.group.length > 1 && 
                                        <div style={{height: '28px', lineHeight: '28px'}} className={cell.month !== this.state.month ? "opcity0":""}> 
                                            {this.props.param.selectDateString === cell.date && 
                                                cell.group.map(group => 
                                                    <div style={{ height: '28px' }} key={group.id} className={group.id === this.props.param.selectId ? '':'hide'}>
                                                        <span className={"Calendar-day-col-Surplus Calendar-day-col-Surplus-active"}>
                                                            {(group ? '余: ' + group.seat_surplus : '')}</span>
                                                        <span className={"Calendar-day-col-price Calendar-day-col-price-active"}>
                                                            {(group ? '￥' + group.price : '')}</span>
                                                    </div>   
                                            )}
                                            {this.props.param.selectDateString !== cell.date &&
                                                <div>多团</div>
                                            }
                                        </div>
                                    }
                                    
                                </Col>
                            )}
                            </Col>
                        )}
                    </Col>
                    <Modal
                        title="请选择团期" okText="确认" cancelText="取消"
                        visible={this.state.visible}
                        onOk={e=>this.handleOk(e)}
                        onCancel={e=>this.handleCancel(e)}
                        width="400px"
                    >
                        <div>
                            {this.state.much_groups.group && 
                            this.state.much_groups.group.map(item=>
                                <div className={"Calendar-modal-list " + 
                                (this.state._user_select_id?
                                    (this.state._user_select_id===item.id?'Calendar-modal-list-active':''):
                                    (this.props.param.selectId===item.id?'Calendar-modal-list-active':''))}
                                key={item.id}
                                onClick={this.selectMuch_groups.bind(this,item)}>
                                    <span className="Calendar-modal-list-item">日期: {this.state.much_groups.date}</span>    
                                    <span className="Calendar-modal-list-item">余位: {item.seat_surplus}</span>    
                                    <span className="Calendar-modal-list-item">价格: {'￥' + item.price}</span>    
                                </div>    
                            )}
                        </div>
                    </Modal>
                </Col>
            </Row>
        )
    }
}