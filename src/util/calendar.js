// 日历组件

import React from 'react';
import moment from "moment";

import '../css/Calendar.css';
import { Row, Col, Icon } from 'antd';
import { debug } from 'util';


export class Calendar extends React.Component{
    constructor(props){
        super();
        this.state = {
            date: props.date,
            year: props.date.year(),
            month: props.date.month(),
            daysArr: [],
            user_select: '',
        }
        this.weekString = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }

    componentWillMount(){
        let date = this.state.date.format('YYYY-MM-DD')
        let daysArr = this.monthDay(date)
        this.setState({ daysArr: daysArr })
    }
    monthDay(date){
        const daysArr = [[], [], [], [], [], []]; // 6*7的日历数组
        const currentYear = moment(date).year(); // 获取当前年份
        const currentMonth = moment(date).month(); // 获取当前月份
        const currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
        const lastMonthDays = moment(date).subtract(1, 'month').daysInMonth(); // 获取上月天数
        const currentMonthDays = moment(date).daysInMonth(); // 获取当月天数

        //  日期处理
        const getDay = function(day){
            if (day <= lastMonthDays){
                // 上个月的
                let month = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
                let year = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
                let date = {
                    day: day,
                    month: month ,
                    year: year,
                    date: `${year}-${month}-${day}`
                }
                return date
            } else if (day <= (lastMonthDays + currentMonthDays)){
                // 本月的
                let date = {
                    day: day - lastMonthDays,
                    month: currentMonth,
                    year: currentYear,
                    date: `${currentYear}-${currentMonth}-${day-lastMonthDays}`
                }
                return date
            }else{
                // 下个月
                let month = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
                let year = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;
                let date = {
                    day: day - (lastMonthDays + currentMonthDays),
                    month: month,
                    year: year,
                    date: `${year}-${month}-${day-(lastMonthDays+currentMonthDays)}`
                }
                return date
            }
        }
        for (let i = 0; i < 7; i += 1) {
            let virtualDay = (lastMonthDays - currentWeekday) + i + 1;
            for (let j = 0; j < 6; j += 1) {
                daysArr[j][i] = getDay(virtualDay + (j * 7));
            }
        }
        console.table(daysArr);
        console.log(daysArr);
        return daysArr
    }

    plusMonth(){
        let date = this.props.date.add(1, 'M');
        let dateFormat = date.format('YYYY-MM-DD');
        let daysArr = this.monthDay(dateFormat)
        this.setState({ daysArr: daysArr, date: date })
    }
    minusMonth(){
        let date = this.props.date.subtract(1, 'M');
        let dateFormat = date.format('YYYY-MM-DD');
        let daysArr = this.monthDay(dateFormat)
        this.setState({ daysArr: daysArr, date: date })
    }

    // selectDate
    selectDate(cell){
        console.log(cell)
        console.log(this)
        this.setState({ user_select: cell.date })
    }




    render(){
        return(
            <Row>
                <Col className="Calendar" span={10}>
                    <Col className="Calendar-title-box">
                        <div className="Calendar-title-prev" onClick={_ => this.minusMonth()}><Icon type="left-circle" /></div>
                        {`${this.state.date.format('YYYY-MM-DD')}`}
                        <div className="Calendar-title-next" onClick={_ => this.plusMonth()}><Icon type="right-circle" /></div>
                    </Col>
                    <Col className="Calendar-week-box">
                    {this.weekString.map(item => 
                            <Col className="Calendar-week-item">{item}</Col>
                    )}
                    </Col>
                    <Col className="Calendarday-box">
                        {this.state.daysArr && 
                            this.state.daysArr.map(item => 
                            <Col className="Calendar-day-col">   
                            {
                                item.map(cell=>
                                <Col className={"Calendar-day-col-item " + (this.state.user_select === cell.date?'Calendar-day-col-item-active':'') + 
                                (cell.month == this.state.month?'cur_month':'')}
                                onClick={this.selectDate.bind(this,cell)}>
                                    <span className={"Calendar-day-col-day " + (this.state.user_select === (`${cell.year}-${cell.month}-${cell.day}`)?'Calendar-day-col-day-active':'')}>{cell.day}</span>
                                    <span className={"Calendar-day-col-Surplus " + (this.state.user_select === (`${cell.year}-${cell.month}-${cell.day}`)?'Calendar-day-col-Surplus-active':'')}>{'余: 20'}</span>
                                    <span className={"Calendar-day-col-price " + (this.state.user_select === (`${cell.year}-${cell.month}-${cell.day}`)?'Calendar-day-col-price-active':'')}>{'￥29998'}</span>
                                </Col>
                            )}
                            </Col>
                        )}
                    </Col>
                </Col>
            </Row>
        )
    }
}