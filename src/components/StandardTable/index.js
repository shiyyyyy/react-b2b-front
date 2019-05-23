import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Row, Col, Icon, Button, Input, Select, Divider } from 'antd';

import CommonTable from './CommonTable';
import getEnum from '@/utils/enum';
import Authorized from '@/utils/Authorized';
import Display from '@/utils/display';
import {trigger} from '@/utils/utils';

import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { checkMeta } = Authorized;

function renderEnumSelect(cfg) {
  const Enum = getEnum(cfg.type) || {};
  return (
    <Select 
      defaultValue={cfg.text}
      showSearch
      optionFilterProp='children'
    >
      {Object.keys(Enum).map(key => (
        <SelectOption key={key} value={Enum[key]}>
          {Enum[key]}
        </SelectOption>
      ))}
    </Select>
  );
}

@Form.create()
class StandardTable extends Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    bordered: PropTypes.bool,
    modConfig: PropTypes.object,
    reload: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    loading: false,
    bordered: false,
    modConfig: {},
    reload: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      more: false,
      actionWidth: 0,
    };

    this.search = this.search.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = pagination => {
    const { formValues } = this.state;
    const { reload } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    reload(params);
  };

  search = e => {
    e.preventDefault();

    const { reload, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      reload(values);
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  toggleForm = () => {
    const { more } = this.state;
    this.setState({
      more: !more,
    });
  };

  renderHeaderBtns = () => {
    const { modConfig, actionConfig, reload } = this.props;
    if (modConfig.action) {
      let rst = [...Object.keys(modConfig.action)];

      rst = rst
        .map(action => {
          const cfg = modConfig.action[action];
          if (cfg.bind && cfg.bind === 'row') {
            return null;
          }
          if (!checkMeta(action)) {
            return null;
          }
          if (!actionConfig[action]) {
            return null;
          }
          return action;
        })
        .filter(action => action);
      const btnCfg = rst.map(action => {
        const cfg = { ...modConfig.action[action], ...actionConfig[action] };
        cfg.key = action;
        return cfg;
      });

      return btnCfg.map(item => (
        <div key={item.key} className="dib">
          <Button icon={item.icon || ''} type={item.type || ''} onClick={() => trigger(item.key,item,null,{},reload)}>
            {item.text || ''}
          </Button>
        </div>
      ));
    }
    return null;
  };

  renderRowButton = data => {
    const { modConfig, actionConfig, reload } = this.props;
    let rst = [...Object.keys(modConfig.action)];

    rst = rst
      .map(action => {
        const cfg = modConfig.action[action];
        if (!cfg.bind || cfg.bind !== 'row') {
          return null;
        }
        if (!checkMeta(action)) {
          return null;
        }
        if (!actionConfig[action]) {
          return null;
        }
        if (modConfig.action[action].show) {
          const flag = Object.keys(modConfig.action[action].show)
            .map(item => {
              if (modConfig.action[action].show[item].indexOf(data[item]) === -1) {
                return false;
              }
              return true;
            })
            .find(item => item === false);
          if (flag) return null;
        }
        return action;
      })
      .filter(action => action);

    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action], ...actionConfig[action] };
      cfg.key = action;
      return cfg;
    });
    return btnCfg.map((item, i) => (
      <div key={item.key} className="dib">
        <Button icon={item.icon || ''} type={item.type || ''} onClick={() => trigger(item.key,item,null,data,reload)}>
          {item.text || ''}
        </Button>
        {i !== btnCfg.length - 1 && <Divider type="vertical" />}
      </div>
    ));
  };

  actionColWidth = () => {
    const { modConfig, actionConfig, data } = this.props;
    const { actionWidth } = this.state;
    let width;
    let rst = [...Object.keys(modConfig.action)];
    rst = rst
      .map(action => {
        const cfg = modConfig.action[action];
        if (!cfg.bind || cfg.bind !== 'row') {
          return null;
        }
        if (!checkMeta(action)) {
          return null;
        }
        if (!actionConfig[action]) {
          return null;
        }
        if (modConfig.action[action].show) {
          const flag = Object.keys(modConfig.action[action].show)
            .map(item => {
              if (modConfig.action[action].show[item].indexOf(data[item]) === -1) {
                return false;
              }
              return true;
            })
            .find(item => item === false);
          if (flag) return null;
        }
        return action;
      })
      .filter(action => action);
    if (rst.length) {
      width = rst
        .map((action, i) => {
          // 15为每个汉字的长,30是button的padding,17是分隔线的宽度
          return modConfig.action[action].text.length * 15 + 30 + (i === 0 ? 0 : 17);
        })
        .reduce((total, cur) => total + cur);
      // 24是父级cell的padding
      if (width > actionWidth) {
        this.setState({ actionWidth: width });
        return width + 24;
      }
      return actionWidth + 24;
    }
    return 200;
  };

  getTableConfig = () => {
    const { modConfig } = this.props;
    const config = { rowKey: modConfig.key || 'id' };
    if (modConfig.list) {
      config.columns = [];
      Object.keys(modConfig.list).forEach(v => {
        const colCfg = modConfig.list[v];
        // 设置column基础属性
        const col = {
          title: colCfg.text,
          dataIndex: v,
          key: v,
          width: colCfg.width ? colCfg.width : 200,
        };
        // 设置 column 排序
        col.sorter = (a, b) => (a[v] > b[v] ? 1 : -1);

        // if(colCfg.sort){
        //   // 数字排序
        //   if(colCfg.sort === 'number'){
        //     col.sorter = (a, b) => a[v] - b[v];
        //   }
        //   // 字符排序
        //   if(colCfg.sort === 'string'){
        //     col.sorter = (a, b) => {
        //       const sorts = [a[v], b[v]].sort();
        //       return sorts[0] === a[v];
        //     };
        //   }
        //   // 通用排序
        //   col.sorter = (a, b) => a[v] > b[v] ? 1 : -1
        // }
        // 设置column的render
        if (colCfg.type) {
          col.render = (text, record) => Display(text, colCfg, record);
        }
        // if(colCfg.render){
        //   col.render = colCfg.render;
        // }
        config.columns.push(col);
      });
      if (modConfig.action) {
        const col = {
          title: '操作',
          key: 'action',
          width: this.actionColWidth(),
          render: (text, data) => <span>{this.renderRowButton(data)}</span>,
        };
        config.columns.push(col);
      }
    }
    // 添加 table的scroll属性
    if (!config.scroll) {
      const allWidth = config.columns.map(item => item.width).reduce((total, cur) => total + cur);
      config.scroll = {
        x: allWidth,
        Y: null,
      };
    }
    return config;
  };

  renderSimpleSerach(modConfig) {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const sKeys = Object.keys(modConfig.s_text);
    const sConfig = modConfig.s_text;
    return (
      <Form onSubmit={this.search} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {sKeys.length > 0 && (
            <Col md={8} sm={12} xs={24}>
              <FormItem label={sConfig[sKeys[0]].text || ''}>
                {getFieldDecorator(sKeys[0])(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          )}
          <Col md={8} sm={12} xs={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderMoreSerach(modConfig) {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const sKeys = Object.keys(modConfig.s_text);
    const sConfig = modConfig.s_text;

    const rKeys = Object.keys(modConfig.s_regular);
    const rConfig = modConfig.s_regular;
    const labelCol = {
      xs: { span: 6 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
    };
    return (
      <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 24 }}>
        <Form onSubmit={this.search} layout="inline" labelCol={labelCol}>
          {sKeys &&
            sKeys.map(key => (
              <Col xs={24} sm={12} md={8} lg={8} key={key}>
                <FormItem label={sConfig[key].text || ''}>
                  {getFieldDecorator(key)(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            ))}
          {rKeys &&
            rKeys.map(key => (
              <Col xs={24} sm={12} md={8} lg={8} key={key}>
                <FormItem label={rConfig[key].text || ''}>
                  {getFieldDecorator(key)(renderEnumSelect(rConfig[key]))}
                </FormItem>
              </Col>
            ))}
          <Col style={{ overflow: 'hidden' }} span={24}>
            <Col style={{ marginBottom: 24 }} xs={24} sm={12} md={8} lg={8}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </Col>
          </Col>
        </Form>
      </Row>
    );
  }

  renderSerach() {
    const { more } = this.state;
    const { modConfig } = this.props;
    return more ? this.renderMoreSerach(modConfig) : this.renderSimpleSerach(modConfig);
  }

  render() {
    const { loading, data, bordered, page } = this.props;
    return (
      <Card bordered={bordered}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderSerach()}</div>
          <div className={styles.tableListOperator}>{this.renderHeaderBtns()}</div>
          <div className={styles.tableStyle}>
            <CommonTable
              loading={loading}
              dataSource={data}
              page={page}
              onChange={this.StandardTable}
              {...this.getTableConfig()}
              />
          </div>
        </div>
      </Card>
    );
  }
}

export default StandardTable;
