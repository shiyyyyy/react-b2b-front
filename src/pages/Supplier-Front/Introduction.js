// 企业简介
import React from 'react';

import {
  DatePicker,
} from 'antd';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Introduction extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <DatePicker onChange={onChange} />
      </div>
    );
  }
}

export default Introduction;
