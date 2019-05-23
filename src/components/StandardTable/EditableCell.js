import React from 'react';
import { Form, Select, Input, InputNumber, DatePicker } from 'antd';

import { BodyRow } from './DragAndDropRow';

const { Option } = Select;
const { FormItem } = Form;

//   可编辑表格 =========
const EditableContext = React.createContext();

export const EditableRow = ({ form, index, ...props }) => {
  return (
    <EditableContext.Provider value={form}>
      {/* <tr {...props} /> */}
      <BodyRow {...props} index={index} />
    </EditableContext.Provider>
  );
};


//   Table => 更改单元格 =============

export class EditableCell extends React.Component {
  state = {
    editing: false,
    openShow: false,
  };

  // changeDate(date, dateString) {
  //   console.log(date);
  //   console.log(dateString);
  // }

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
    const { editing, openShow } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target) && !openShow) {
      this.save();
    }
  };

  save = () => {
    const { record, handleSave, type, dataIndex } = this.props;
    if (type === 'date') {
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        values[dataIndex] = values[dataIndex].format('YYYY-MM-DD');
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
      return;
    }
    if (type === 'time') {
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        values[dataIndex] = values[dataIndex].format('YYYY-MM-DD HH:mm:ss');
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
      return;
    }

    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  editHTML(id, options) {
    if (options.type === '' || options.type === null || options.type === 'text') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(id, {
            rules: [
              {
                required: true,
                message: `${options.title} 是必填项.`,
              },
            ],
            initialValue: options.record[id],
          })(
            <Input
              ref={node => (this.input = node)}
              // onPressEnter={this.save}
            />
          )}
        </FormItem>
      );
    }
    if (options.type === 'number') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(id, {
            rules: [
              {
                required: true,
                message: `${options.title} 是必填项.`,
              },
            ],
            initialValue: options.record[id],
          })(
            <InputNumber
              min={0}
              max={10000}
              style={{ width: '112px' }}
              Group
              ref={node => (this.input = node)}
              // onChange={this.save}
            />
          )}
        </FormItem>
      );
    }
    if (options.type === 'date') {
      options.record[id] = moment(options.record[id]);
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(id, {
            rules: [
              {
                required: true,
                message: `${options.title} 是必填项.`,
              },
            ],
            initialValue: options.record[id],
          })(
            <DatePicker
              ref={node => (this.input = node)}
              className="Table-DatePicker"
              format="YYYY-MM-DD"
              onOpenChange={status => this.openModal(status)}
            />
          )}
        </FormItem>
      );
    }
    if (options.type === 'time') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(id, {
            rules: [
              {
                required: true,
                message: `${options.title} 是必填项.`,
              },
            ],
            initialValue: moment(options.record[id]),
          })(
            <DatePicker
              locale={locale}
              ref={node => (this.input = node)}
              showTime
              className="Table-DatePicker"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onOpenChange={status => this.openModal(status)}
            />
          )}
        </FormItem>
      );
    }

    if (options.type === 'select') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(id, {
            rules: [
              {
                required: true,
                message: `${options.title} 是必填项.`,
              },
            ],
            initialValue: options.record[id],
          })(
            <Select
              style={{ width: 120 }}
              ref={node => (this.input = node)}
              onDropdownVisibleChange={open => this.openModal(open)}
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
          )}
        </FormItem>
      );
    }
    return null;
  }

  openModal(status) {
    this.setState({ openShow: status });
  }

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, handleSave, ...restProps } = this.props;
    const options = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                this.editHTML(dataIndex, options)
              ) : (
                // <FormItem style={{ margin: 0 }}>
                //     {form.getFieldDecorator(dataIndex, {
                //         rules: [{
                //             required: true,
                //             message: `${title} 是必填项.`,
                //         }],
                //         initialValue: record[dataIndex],
                //     })(this.editHTML(dataIndex, options))}
                // </FormItem>
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24, borderRadius: '4px' }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}
