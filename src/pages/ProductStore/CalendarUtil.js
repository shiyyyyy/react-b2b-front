import React from 'react';
import { Row, Col, Checkbox, Calendar, Divider, DatePicker, Modal, Icon, message } from 'antd';
import moment from 'moment';

import styles from './CalendarUtil.less';

class Util extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      dateArr: [],
      page: 0,
      everyDays: { start: '', end: '', dateArr: [] },
      weekly: { start: '', end: '', dayOfWeek: [], dateArr: [] },
    };
    this.startDate = moment();
    this.calendarsNum = 6;
    if (props.calendarsNum) {
      this.calendarsNum = props.calendarsNum;
    }
    this.dateFullCellRender = this.dateFullCellRender.bind(this);
    this.renderCalendarList = this.renderCalendarList.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  selectDate = date => {
    const dateString = date.format('YYYY-MM-DD');
    const { dateArr } = this.state;
    if (dateArr.indexOf(dateString) === -1) {
      dateArr.push(dateString);
    } else {
      dateArr.splice(dateArr.indexOf(dateString), 1);
    }
  };

  dateFullCellRender = (date, calendar) => {
    const { dateArr } = this.state;
    let addClass = 'ant-calendar-date multdate ';
    if (dateArr.indexOf(date.format('YYYY-MM-DD')) !== -1) {
      addClass = styles.selected;
    }
    // isBetween start < x < end 不包括start和end.
    if (
      !date.isBetween(
        moment(calendar.range[0]).subtract(1, 'd'),
        moment(calendar.range[1]).add(1, 'd'),
        'day'
      )
    ) {
      addClass = styles.disabled;
    }
    return <div className={addClass}>{date.date()}</div>;
  };

  renderCalendarList = () => {
    const arr = [];
    const { page } = this.state;
    for (let i = 0; i < this.calendarsNum; i += 1) {
      let start = '';
      if (i === 0 && page === 0) {
        start = moment(`${moment(this.startDate).format('YYYY-MM-DD')}`);
      } else {
        start = moment(
          `${moment(this.startDate)
            .add(page * this.calendarsNum + i, 'months')
            .startOf('month')}`
        );
      }
      const end = moment(moment(start).endOf('month'));
      const range = [start, end];

      arr.push({ val: start, range });
    }
    return arr.map(item => (
      <Col style={{ width: 200 }} key={item.val}>
        <Calendar
          fullscreen={false}
          value={item.val}
          headerRender={() => {
            return <div className={styles.calendarHeader}>{item.val.format('YYYY-MM')}</div>;
          }}
          disabledDate={current => {
            if (this.startDate.month() === current.month()) {
              return current.date() < this.startDate.date();
            }
            return item.val.month() !== current.month();
          }}
          dateFullCellRender={date => this.dateFullCellRender(date, item)}
          onSelect={this.selectDate}
        />
      </Col>
    ));
  };

  changeTab = tab => {
    this.setState({ tab });
  };

  // 批量天天开团
  onEveryDaysChange = (type, date) => {
    const { everyDays } = this.state;
    // function allDays(){
    //   if (everyDays.start && everyDays.end) {
    //     // numallDaysNumDays是start到end的天数 包括start但是不包括end, start <= x < end(但是需要选中的日期也选上,所以用<=,这样就等于多加了一个最后一天,就对了)
    //     const allDaysNum = moment(everyDays.end).diff(moment(everyDays.start), 'days');
    //     const allDaysArr = []
    //     for (let i = 0; i <= allDaysNum; i += 1) {
    //       const days = moment(everyDays.start).add(i, 'd').format('YYYY-MM-DD');
    //       allDaysArr.push(days)
    //     }
    //     console.log(allDaysArr)
    //   }
    // }
    if (date) {
      everyDays[type] = date.format('YYYY-MM-DD');
      this.setState({ everyDays });
    } else {
      everyDays[type] = '';
      this.setState({ everyDays });
    }
  };

  onWeeklyChange = (type, date) => {
    const { weekly } = this.state;
    if (date) {
      weekly[type] = date.format('YYYY-MM-DD');
      this.setState({ weekly });
    } else {
      weekly[type] = '';
      this.setState({ weekly });
    }
  };

  startDateDisabled = (type, current) => {
    const date = this.state[type];
    const now = moment();
    return (
      current &&
      !current.isBetween(
        now.subtract(1, 'd').format('YYYY-MM-DD'),
        date.end ? moment(date.end).add(1, 'd') : '2100-12-31',
        'day'
      )
    );
  };

  endDateDisabled = (type, current) => {
    const date = this.state[type];
    return current && current.isBefore(date.start || this.startDate);
  };

  onOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      const dateArr = this.promptAndDateArr();
      if(!dateArr) return false
      // const { dateArr } = this.state;
      onOk(dateArr);
      this.setState({ dateArr: [] });
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  plusPage = () => {
    let { page } = this.state;
    page -= 1;
    this.setState({ page });
  };

  minusPage = () => {
    let { page } = this.state;
    page += 1;
    this.setState({ page });
  };

  // 按周开团
  changeWeek = checkedValue => {
    const { weekly } = this.state;
    weekly.dayOfWeek = checkedValue;
    this.setState({ weekly });
  };

  // 按周开团 最后返回的日期数组
  endWeekReturnArr = () => {
    const { weekly } = this.state;
    const endArr = [];
    const week = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期日',
    };
    // numDays是start到end的天数 包括start但是不包括end, start <= x < end
    const numDays = moment(weekly.end).diff(moment(weekly.start), 'days');
    for (let i = 0; i < numDays; i += 1) {
      const days = moment(weekly.start).add(i, 'd');
      const isPush = weekly.dayOfWeek.includes(week[days.day()]);
      if (isPush) {
        endArr.push(days.format('YYYY-MM-DD'));
      }
    }
    return endArr;
  };

  // 计算最后的天数数组和确认时的提示信息
  promptAndDateArr = () => {
    const { tab, dateArr, everyDays, weekly } = this.state;
    if (tab === 1) {
      return dateArr;
    }
    if (tab === 2) {
      const allDaysArr = [];
      if (!everyDays.start) {
        message.error('请选择开始日期!');
        return false
      }
      if (!everyDays.end) {
        message.error('请选择结束日期!');
        return false
      }
      // numallDaysNumDays是start到end的天数 包括start但是不包括end, start <= x < end(但是需要选中的日期也选上,所以用<=,这样就等于多加了一个最后一天,就对了)
      const allDaysNum = moment(everyDays.end).diff(moment(everyDays.start), 'days');
      for (let i = 0; i <= allDaysNum; i += 1) {
        const days = moment(everyDays.start)
          .add(i, 'd')
          .format('YYYY-MM-DD');
        allDaysArr.push(days);
      }
      return allDaysArr
    }
    // 肯定是tba===3了
    if (!weekly.start) {
      message.error('请选择开始日期!');
      return false
    }
    if (!weekly.end) {
      message.error('请选择结束日期!');
      return false
    }
    if (weekly.dayOfWeek.length === 0) {
      message.error('请选择周几开团!');
      return false
    }
    return this.endWeekReturnArr();
  };

  render() {
    const { tab } = this.state;
    const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const { title, visible, width } = this.props;
    return (
      <Modal
        title={title}
        width={width || 520}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Col className={styles.BatchOpen}>
          <Col className={styles.tabBox}>
            <div
              className={[styles.tabItem, tab === 1 ? styles.active : ''].join(' ')}
              onClick={() => this.changeTab(1)}
            >
              固定日期开团
            </div>
            <div
              className={[styles.tabItem, tab === 2 ? styles.active : ''].join(' ')}
              onClick={() => this.changeTab(2)}
            >
              批量天天开团
            </div>
            <div
              className={[styles.tabItem, tab === 3 ? styles.active : ''].join(' ')}
              onClick={() => this.changeTab(3)}
            >
              按周循环开团
            </div>
          </Col>
          <Divider style={{ margin: 0 }} />
          {/* 固定日期开团 */}
          <Row
            gutter={8}
            type="flex"
            justify="space-between"
            className={[styles.calendarsBox, tab !== 1 ? 'hide' : ''].join(' ')}
          >
            {this.renderCalendarList()}
            <Icon className={styles.pervPage} type="left-circle" onClick={() => this.plusPage()} />
            <Icon
              className={styles.nextPage}
              type="right-circle"
              onClick={() => this.minusPage()}
            />
          </Row>
          {/* 批量天天开团 */}
          <Row className={[tab !== 2 ? 'hide' : '', styles.everyDays].join(' ')}>
            <Col className={styles.DatePicker}>
              <span>开始日期：</span>
              <DatePicker
                onChange={date => this.onEveryDaysChange('start', date)}
                disabledDate={current => this.startDateDisabled('everyDays', current)}
              />
            </Col>
            <Divider style={{ margin: 0 }} />
            <Col className={styles.DatePicker}>
              <span>结束日期：</span>
              <DatePicker
                onChange={date => this.onEveryDaysChange('end', date)}
                disabledDate={current => this.endDateDisabled('everyDays', current)}
              />
            </Col>
            <Divider style={{ margin: 0 }} />
          </Row>
          {/* 按周循环开团 */}
          <Row className={[tab !== 3 ? 'hide' : '', styles.weekOpen].join(' ')}>
            <Col className={[styles.date, 'clear'].join(' ')}>
              <Col span={9}>
                <span>开始日期：</span>
                <DatePicker
                  onChange={date => this.onWeeklyChange('start', date)}
                  disabledDate={current => this.startDateDisabled('weekly', current)}
                />
              </Col>
              <Col span={9}>
                <span>结束日期：</span>
                <DatePicker
                  onChange={date => this.onWeeklyChange('end', date)}
                  disabledDate={current => this.endDateDisabled('weekly', current)}
                />
              </Col>
            </Col>
            <Divider style={{ margin: 0 }} />
            <Col className={styles.weeks}>
              <Checkbox.Group
                options={week}
                defaultValue={[]}
                onChange={checkedValue => this.changeWeek(checkedValue)}
              />
            </Col>
            <Divider style={{ margin: 0 }} />
          </Row>
        </Col>
      </Modal>
    );
  }
}

export default Util;
