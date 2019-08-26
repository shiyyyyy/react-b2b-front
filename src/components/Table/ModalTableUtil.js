import React from 'react';
import { Icon, Input, DatePicker, Select, InputNumber, TimePicker, Form } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import getEnum from '@/utils/enum';
import GridContext from './GridContext';
import { cellColWidth } from './TableUtil';

// import styles from './Cell.less';
import styles from './ActionModal.less';

const { Option } = Select;

export class ActionCellModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ActionModalRef = React.createRef();
    this.allPageClickClose = this.allPageClickClose.bind(this);
  }

  allPageClickClose = e => {
    const { closeActionModal } = this.props;
    if (this.ActionModalRef.current && !this.ActionModalRef.current.contains(e.target)) {
      document.removeEventListener('click', this.allPageClickClose, true);
      closeActionModal();
    }
  };

  render() {
    const { openActionModal, renderRowBtns, actionModal, data, width } = this.props;
    if (actionModal === data.hashKey) {
      document.addEventListener('click', this.allPageClickClose, true);
    }
    return (
      <div className={styles.actionBox}>
        <Icon className={styles.actionIcon} type="menu" onClick={() => openActionModal(data)} />
        <span
          ref={this.ActionModalRef}
          className={[
            actionModal === data.hashKey ? 'animated fadeInRight' : 'animated fadeOutRight hide',
            styles.actionModal,
            // 这个calss是用来判断展示与否的,不要删除(因为会有两个弹窗,table本身的和right固定的,table的是需要隐藏的)
            'modalBtns',
          ].join(' ')}
          style={{ left: -width }}
        >
          {renderRowBtns()}
          <div className={styles.triangle} />
        </span>
      </div>
    );
  }
}

class CellTypeRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      openShow: false,
      openPicker: true,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { editable } = this.props;
    if (editable) {
      document.addEventListener('click', this.handleClickOutside, false);
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
    const { record, cellKey, index, cellChange } = this.props;
    const { data } = this.form.getFieldsValue();
    this.form.validateFields(error => {
      if (error) {
        // do something
      }
      if (record[cellKey].type === 'date') {
        data[index][cellKey] = data[index][cellKey].format('YYYY-MM-DD');
      }
      if (record[cellKey].type === 'time') {
        data[index][cellKey] = data[index][cellKey].format('HH:mm');
      }
      if (cellChange) {
        cellChange(data[index][cellKey], index, cellKey);
      }
    });
    this.toggleEdit();
  };

  editHTML() {
    const { openPicker } = this.state;
    const { record, cellKey, index } = this.props;
    const required = record[cellKey].rq === 1;
    const message = `${record[cellKey].text} 是必填项.`;
    const fieldKey = `data.${index}.${cellKey}`;
    if (
      record[cellKey].type === '' ||
      record[cellKey].type === null ||
      record[cellKey].type === 'text'
    ) {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: record[cellKey].text,
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
    if (record[cellKey].type === 'number') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: record[cellKey].text,
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
    if (record[cellKey].type === 'date') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: moment(record[cellKey].text),
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
    if (record[cellKey].type === 'time') {
      return (
        <Form.Item style={{ margin: 0 }}>
          {this.form.getFieldDecorator(fieldKey, {
            rules: [
              {
                required,
                message,
              },
            ],
            initialValue: moment(record[cellKey].text, 'HH:mm'),
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

    const Enum = getEnum(record[cellKey].type) || {};

    return (
      <Form.Item style={{ margin: 0 }}>
        {this.form.getFieldDecorator(fieldKey, {
          rules: [
            {
              required: record[cellKey].rq === '1',
              message: `${record[cellKey].type} 是必填项.`,
            },
          ],
          initialValue: record[cellKey].text,
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
    const { record, cellKey, editable } = this.props;
    return (
      <div
        ref={node => {
          this.cell = node;
        }}
      >
        {editable ? (
          <GridContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <div className={styles.editing}>{this.editHTML()}</div>
              ) : (
                <div
                  className={[styles.noEditing, 'editable-cell-value-wrap'].join(' ')}
                  style={{ borderRadius: '4px' }}
                  onClick={this.toggleEdit}
                >
                  {record[cellKey].text || ''}
                </div>
              );
            }}
          </GridContext.Consumer>
        ) : (
          <div className={styles.noEditble} style={{ overflow: 'visible' }}>
            {record[cellKey].text || ''}
          </div>
        )}
      </div>
    );
  }
}

export function getModalTableConfig(cfg, rowSelection, tabKey, dataSource, ro, onCellChange) {
  const config = {
    rowKey: 'hashKey',
  };
  if (cfg.list) {
    config.columns = [];
    const len = Object.keys(cfg.list).length;
    Object.keys(cfg.list).forEach((v, index) => {
      const colCfg = cfg.list[v];
      if (colCfg.ro === undefined && config.ro) {
        colCfg.ro = config.ro;
      }
      if (ro) {
        colCfg.ro = ro;
      }
      // 设置column基础属性
      const col = {
        title: colCfg.text,
        dataIndex: v,
        key: v,
        editable: !(colCfg.ro === 1),
        width: colCfg.width ? colCfg.width : cellColWidth(colCfg.text, v, len, index, dataSource),
      };
      // 如果需要同一columns不同type
      col.render = (text, record, index) => (
        <CellTypeRender
          record={record}
          cellKey={v}
          index={index}
          editable={colCfg.ro !== 1}
          cellChange={onCellChange}
        />
      );
      col.cellType = 1;
      // 设置 column 排序
      // col.sorter = (a, b) => (a[v] > b[v] ? 1 : -1);

      if (colCfg.type) {
        col.type = colCfg.type;
      }
      if (colCfg.rq) {
        col.rq = colCfg.rq;
      }
      config.columns.push(col);
    });
  }
  // 如果存在rowSelection
  if (rowSelection) {
    config.rowSelection = {
      ...rowSelection,
      onChange: (selectedRowKeys, selectedRows) => {
        if (rowSelection.onChange) {
          rowSelection.onChange(selectedRowKeys, selectedRows, tabKey);
        }
      },
    };
  }
  // 添加 table的scroll属性
  // if (!config.scroll) {
  //   const allWidth = config.columns.map(item => item.width).reduce((total, cur) => total + cur);
  //   config.scroll = {
  //     // 最后一个columns是没有宽度的,所以多给点
  //     x: allWidth + 100 + (config.rowSelection ? config.rowSelection.width || 60 : 0),
  //     Y: null,
  //   };
  // }
  return config;
}
