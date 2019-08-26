import React from 'react';
import { Row, Col, Divider, Input, InputNumber, Icon, Form } from 'antd';
import ModalFormBtn from '@/components/ModalFormBtn';
import styles from './index.less';

/* eslint react/no-multi-comp:0 */
const FormItem = Form.Item;
const Context = React.createContext();

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
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
    const { editing } = this.state;
    if (editing && this.input !== e.target) {
      this.save();
    }
  };

  save = () => {
    const { cellChange, field, index, block } = this.props;
    const { data } = this.form.getFieldsValue();
    this.toggleEdit();
    if (cellChange) {
      cellChange(data[block][index][field], index, field);
    }
  };

  getInput = () => {
    const { type } = this.props;
    if (type === 'number') {
      return (
        <InputNumber
          ref={node => {
            this.input = node;
          }}
        />
      );
    }
    return (
      <Input
        ref={node => {
          this.input = node;
        }}
      />
    );
  };

  render() {
    const { field, index, block, text, data, rq, ro, type } = this.props;
    const { editing } = this.state;
    const fieldKey = `data.${block}.${index}.${field}`;
    return (
      <Context.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          this.form = form;
          return ro !== 1 ? (
            <Col span={8} key={index} style={{ padding: '0 4px' }}>
              {editing ? (
                <FormItem label={text || ''}>
                  {getFieldDecorator(fieldKey, {
                    rules: [
                      {
                        required: rq === 1,
                        message: `请输入 ${text} !`,
                      },
                    ],
                    initialValue: data[field] || (type === 'number' ? 0 : ''),
                  })(this.getInput())}
                </FormItem>
              ) : (
                <Col onClick={this.toggleEdit} className={styles.noEditing}>
                  <div className={[styles.label, (rq === 1 ? styles.labelRq : ' ')].join(' ')}>{text}</div>
                  <div className={styles.valBox}>
                    <span className={styles.val}>{data[field] || (type === 'number' ? 0 : '')}</span>
                  </div>
                </Col>
              )}
            </Col>
          ) : (
            <Col span={8} style={{ padding: '0 4px' }} className={styles.noRO}>
              <div className={[styles.label, (rq === 1 ? styles.labelRq : ' ')].join(' ')}>{text}</div>
              <div className={styles.valBox}>
                <span className={styles.val}>{data[field] || (type === 'number' ? 0 : '')}</span>
              </div>
            </Col>
          );
        }}
      </Context.Consumer>
    );
  }
}

const BlockRow = props => {
  const { data, index, list, block, config, deleteRow = () => {}, cellChange = () => {} } = props;
  return (
    <Row type="flex" align="middle" className={[styles.content, 'clear'].join(' ')}>
      <Col span={23}>
        {Object.keys(list).map(field => (
          <Cell
            field={field}
            block={block}
            index={index}
            text={list[field].text || ''}
            type={list[field].type}
            rq={list[field].rq}
            ro={list[field].ro}
            data={data}
            key={field}
            cellChange={cellChange}
          />
        ))}
      </Col>
      {config.action && config.action['删除行'] && (
        <Col span={1} className="text-center" style={{ padding: 0 }}>
          <Icon
            type="minus-circle"
            className="pointer"
            style={{ color: '#ff4d4f' }}
            onClick={() => {
              deleteRow(block, index);
            }}
          />
        </Col>
      )}
    </Row>
  );
};

const Block = props => {
  const {
    block,
    config,
    data,
    addRow = () => {},
    cellChange = () => {},
    deleteRow = () => {},
  } = props;
  const blockCellChange = (value, index, field) => {
    if (cellChange) {
      cellChange(value, block, index, field);
    }
  };
  return (
    <Col className={['clear', styles.ModBox].join(' ')} key={block}>
      <Col className={styles.title}>
        <Col span={23}>
          <Icon type="unordered-list" style={{ color: '#1890FF', marginRight: 8 }} />
          {config.text || ''}
        </Col>
        {config.action && config.action['添加行'] && (
          <Col span={1} className="text-center">
            <Icon
              type="plus-circle"
              className="pointer"
              style={{ color: '#1890FF' }}
              onClick={() => {
                addRow(block);
              }}
            />
          </Col>
        )}
      </Col>
      {data.map((row, index) => (
        <BlockRow
          data={row}
          block={block}
          config={config}
          list={config.list || {}}
          index={index}
          key={row.id || index}
          deleteRow={deleteRow}
          cellChange={blockCellChange}
        />
      ))}
      <Divider style={{ marginTop: 0 }} />
    </Col>
  );
};

class BlocksModal extends React.Component {
  constructor(props) {
    super(props);
    const { data = {} } = this.props;
    this.state = {
      data,
    };
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  submit = () => {
    const { modal, afterOk, form } = this.props;
    form.validateFields((err) => {
      if (err) return false;
      modal.destroy();
      if (afterOk) {
        const {data} = this.state;
        afterOk(data);
      }
    });
  };

  cancel = () => {
    const { modal, afterCancel } = this.props;
    modal.destroy();
    if (afterCancel) {
      afterCancel();
    }
  };

  addRow = block => {
    const { data } = this.state;
    data[block].push({});
    this.setState({ data });
  };

  deleteRow = (block, index) => {
    const { data } = this.state;
    data[block].splice(index, 1);
    this.setState({ data });
  };

  cellChange = (value, block, index, field) => {
    const { data } = this.state;
    data[block][index][field] = value;
    this.setState({ data });
  };

  render() {
    const { form } = this.props;
    const {
      config: { blocks = {} },
    } = this.props;

    const { data } = this.state;
    return (
      <Context.Provider value={form}>
        {Object.keys(blocks).map(block => (
          <Block
            key={block}
            data={data[block] || []}
            config={blocks[block]}
            block={block}
            addRow={this.addRow}
            deleteRow={this.deleteRow}
            cellChange={this.cellChange}
          />
        ))}
        <ModalFormBtn
          submit={() => {
            this.submit();
          }}
          cancel={() => {
            this.cancel();
          }}
        />
      </Context.Provider>
    );
  }
}

const BlocksFormModal = Form.create()(BlocksModal);
export default BlocksFormModal;
