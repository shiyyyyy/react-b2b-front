import React from 'react';
import { Form, Input, InputNumber, DatePicker, TimePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import PropTypes from 'prop-types';

import getEnum from '@/utils/enum';

import GridContext from './GridContext';

import styles from './Cell.less';

const { Option } = Select;

class Cell extends React.Component {
  static propTypes = {
    cellChange: PropTypes.func,
  };

  static defaultProps = {
    cellChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      openShow: false,
      openPicker: true,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { editable } = this.props;
    if (editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    const { editable } = this.props;
    if (editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const { editing } = this.state;
    const editingContrary = !editing;
    this.setState({ editing: editingContrary }, () => {
      if (editingContrary) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing, openShow, openPicker } = this.state;
    const { type } = this.props;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target) && !openShow) {
      if (type === 'date' || type === 'time') {
        if (!openPicker) {
          this.save();
          this.setState({ openPicker: !openPicker });
        }
      } else {
        this.save();
      }
    }
  };

  save = () => {
    const { cellChange, type, rowIndex, dataIndex } = this.props;
    const { data } = this.form.getFieldsValue();
    this.toggleEdit();
    this.form.validateFields(error => {
      if (error) {
        // do something
      }

      if (type === 'date') {
        data[rowIndex][dataIndex] = data[rowIndex][dataIndex].format('YYYY-MM-DD');
      }
      if (type === 'time') {
        data[rowIndex][dataIndex] = data[rowIndex][dataIndex].format('HH:mm:ss');
      }
      if (cellChange) {
        cellChange(data[rowIndex][dataIndex], rowIndex, dataIndex);
      }
    });
  };

  editHTML(rowIndex, dataIndex, cfg) {
    const { openPicker } = this.state;
    const fieldKey = `data.${rowIndex}.${dataIndex}`;
    const required = cfg.rq === 1;
    const message = `${cfg.title} 是必填项.`;
    if (cfg.type === '' || cfg.type === null || cfg.type === 'text') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: cfg.record[dataIndex],
          })(
            <Input
              ref={node => {
                this.input = node;
              }}
            />
          )}
        </Form.Item>
      );
    }
    if (cfg.type === 'number') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: cfg.record[dataIndex],
          })(
            <InputNumber
              min={0}
              max={10000}
              style={{ width: '112px' }}
              Group
              ref={node => {
                this.input = node;
              }}
            />
          )}
        </Form.Item>
      );
    }
    if (cfg.type === 'date') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: moment(cfg.record[dataIndex]),
          })(
            <DatePicker
              open={openPicker}
              ref={node => {
                this.input = node;
              }}
              className="Table-DatePicker"
              format="YYYY-MM-DD"
              onOpenChange={status => this.openModal(status)}
            />
          )}
        </Form.Item>
      );
    }
    if (cfg.type === 'time') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: moment(cfg.record[dataIndex], 'HH:mm:ss'),
          })(
            <TimePicker
              open={openPicker}
              locale={locale}
              ref={node => {
                this.input = node;
              }}
              showTime
              className="Table-TimePicker"
              format="HH:mm:ss"
              placeholder="Select Time"
              onOpenChange={status => this.openModal(status)}
            />
          )}
        </Form.Item>
      );
    }
    if(cfg.type === 'ArrayEdit'){
      const Enum = getEnum(cfg);
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required: cfg.rq === '1',
                message: `${cfg.title} 是必填项.`,
              },
            ],
            initialValue: cfg.record[dataIndex],
          })(
            <Select
              style={{ width: 120 }}
              ref={node => {
                this.input = node;
              }}
              onDropdownVisibleChange={open => this.openModal(open)}
              optionFilterProp="children"
              showSearch
            >
              {Object.keys(Enum).map(key => (
                <Option key={key} value={Enum[key]}>
                  {Enum[key]}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      );
    }
    const Enum = getEnum(cfg) || {};
    return (
      <Form.Item style={{ margin: 0 }}>
        {this.form.getFieldDecorator(fieldKey, {
          rules: [
            {
              required: cfg.rq === '1',
              message: `${cfg.title} 是必填项.`,
            },
          ],
          initialValue: cfg.record[dataIndex],
        })(
          <Select
            style={{ width: 120 }}
            ref={node => {
              this.input = node;
            }}
            onDropdownVisibleChange={open => this.openModal(open)}
            optionFilterProp="children"
            showSearch
          >
            {Object.keys(Enum).map(key => (
              <Option key={key} value={key}>
                {Enum[key]}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }

  openModal(status) {
    this.setState({ openShow: status, openPicker: status });
  }

  render() {
    const { editing } = this.state;
    const {
      dataIndex,
      rowIndex,
      editable,
      title,
      record,
      render,
      cellChange,
      ...restProps
    } = this.props;
    const { className } = this.props;
    // 如果存在为noOver的className,就不需要overflow:hidden;
    const noOver = className ? className.split(' ').find(item => item === 'noOver') : false;
    return (
      <td
        ref={node => {
          this.cell = node;
        }}
        {...restProps}
        className={styles.td}
      >
        {editable ? (
          <GridContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <div className={styles.editing}>
                  {this.editHTML(rowIndex, dataIndex, this.props)}
                </div>
              ) : (
                <div
                  className={[styles.noEditing, 'editable-cell-value-wrap'].join(' ')}
                  style={{ borderRadius: '4px' }}
                  onClick={this.toggleEdit}
                >
                  {render ? render() : restProps.children}
                </div>
              );
            }}
          </GridContext.Consumer>
        ) : (
          <div className={styles.noEditble} style={noOver ? { overflow: 'visible' } : {}}>
            {render ? render() : restProps.children}
          </div>
        )}
      </td>
    );
  }
}

export default Cell;
