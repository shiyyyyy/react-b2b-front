import React from 'react';
import { Select, Input, InputNumber, DatePicker, Row, Col, Button } from 'antd';

const { Option } = Select;

// ========================================      Table Filter      ================================= //

export default class TableFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: {},
    };
  }

  changeFilter(val, index) {
    console.log(val);
    console.log(index);
    console.log(this);
  }

  render() {
    const { data, columns } = this.props.param;
    const param = { data, columns };
    const columnsCfg = columns.map((col, index) => {
      console.log(col);
      console.log(index);
      if (col.type === null || col.type === undefined || col.type === 'text') {
        return (
          <div className="Table-Filter-item" key={index}>
            <Input
              placeholder={`请填写${col.title}`}
              onChange={e => this.changeFilter(e.target.value, index)}
            />
          </div>
        );
      }
      if (col.type === 'number') {
        return (
          <div className="Table-Filter-item" key={index}>
            <InputNumber
              min={0}
              style={{ width: '120px' }}
              onChange={val => this.changeFilter(val, index)}
            />
          </div>
        );
      }
      if (col.type === 'select') {
        return (
          <div className="Table-Filter-item" key={index}>
            <Select
              style={{ width: 120 }}
              onChange={(value, option) => this.changeFilter(value, index)}
            >
              <Option className="Table-Dat" value="1">
                111
              </Option>
              <Option className="Table-Dat" value="2">
                222
              </Option>
              <Option className="Table-Dat" value="3">
                333
              </Option>
            </Select>
          </div>
        );
      }
      if (col.type === 'date') {
        return (
          <div className="Table-Filter-item" key={index}>
            <DatePicker
              className="Table-DatePicker"
              format="YYYY-MM-DD"
              onChange={(date, dateString) => this.changeFilter(dateString, index)}
            />
          </div>
        );
      }
      if (col.type === 'time') {
        return (
          <div className="Table-Filter-item" key={index}>
            <DatePicker
              showTime
              className="Table-DatePicker"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={(date, dateString) => this.changeFilter(dateString, index)}
            />
          </div>
        );
      }
    });

    return (
      <Row>
        <Col className="TableFilter">
          <Col className="TableFilter-Ctrl">
            <div className="TableFilter-Ctrl-item">
              {' '}
              <Button shape="circle" icon="bars" />{' '}
            </div>
            <div className="TableFilter-Ctrl-item">
              {' '}
              <Button shape="circle" icon="close" />{' '}
            </div>
            <div className="TableFilter-Ctrl-item">
              {' '}
              <Button shape="circle" icon="search" />{' '}
            </div>
          </Col>
          <Col className="TableFilter-Filter-box">{columnsCfg}</Col>
        </Col>
      </Row>
    );
  }
}

