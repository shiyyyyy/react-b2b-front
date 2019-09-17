import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Col, Icon, Button, Input, Select, Divider, Tooltip } from 'antd';

import getEnum from '@/utils/enum';

import { trigger,searchChange } from '@/utils/utils';
import { getHeaderBtnArray } from '@/utils/Btn';

import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const InputGroup = Input.Group;

@Form.create()
class ModHeaderBtnFilter extends Component {
  static propTypes = {
    modConfig: PropTypes.object,
    reload: PropTypes.func,
    search: PropTypes.object,
    changeSearch: PropTypes.func,
  };

  static defaultProps = {
    modConfig: {},
    reload: () => {},
    search: {},
    changeSearch: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      searchType: Object.keys(props.modConfig.s_text)[0] || '',
      searchValues: '',
      curType: 'lg',
      more: false,
    };

    this.toggleForm = this.toggleForm.bind(this);

    this.searchSelectChange = this.searchSelectChange.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.searchReset = this.searchReset.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizePageSize);
    this.resizePageSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizePageSize);
  }

  resizePageSize = () => {
    // 根据basiclayout来确定媒体查询范围.再根据底下配置的span来确定每个范围每个input的占比.
    // xs=24 sm=12 md=6 lg=6
    const curWidth = window.innerWidth;
    let curType = '';
    if (curWidth <= 1599) {
      curType = 'xl';
    } else {
      curType = 'xxl';
    }
    if (curWidth <= 1199) {
      curType = 'lg';
    }
    if (curWidth <= 991) {
      curType = 'md';
    }
    if (curWidth <= 767) {
      curType = 'sm';
    }
    if (curWidth <= 575) {
      curType = 'xs';
    }
    this.setState({ curType });
  };

  search =  e => {
    e.preventDefault();

    const { reload, form, changeSearch } = this.props;

    const values = form.getFieldsValue();
    const { searchType, searchValues } = this.state;
    values[searchType] = searchValues;
    Object.keys(values).forEach( k => {
      if(!values[k]){
        delete values[k]
      }
    })
    changeSearch(values)
  };

  toggleForm = () => {
    const { more } = this.state;
    this.setState({
      more: !more,
    });
  };

  // 右侧 search 函数
  searchSelectChange = (val) => {
    this.setState({ searchType: val ,searchValues:''});
  };

  searchInputChange = e => {
    this.setState({ searchValues: e.target.value });
  };

  searchReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      searchValues: '',
    });
  };

  onSelectChange = (field) =>{
    const { form,modConfig } = this.props;
    const data = form.getFieldsValue();
    const rst = searchChange(modConfig.s_regular,field,data);
    form.setFieldsValue({
      ...rst
    })
  }

  renderEnumSelect = (cfg,field) => {
    const { form } = this.props;
    const data = form.getFieldsValue();
    const Enum = getEnum(cfg, data) || {};
    return (
      <Select
        size="small"
        showSearch
        optionFilterProp="children"
        onChange={()=>this.onSelectChange(field)}
        placeholder={cfg.text}
      >
        {Object.keys(Enum).map(key => (
          <SelectOption key={key} value={key}>
            {Enum[key]}
          </SelectOption>
        ))}
      </Select>
    );
  };

  renderHeaderBtns = (btnCfg) => {
    const { reload } = this.props;

    return btnCfg.map(item => (
      <div key={item.key} className={[styles.btnBox, 'dib'].join(' ')}>
        <Button
          icon={item.icon || ''}
          type={item.type || 'primary'}
          size={item.size || 'small'}
          onClick={() => trigger(item.key, {}, reload)}
          ghost
        >
          {item.text || ''}
        </Button>
      </div>
    ));
  };

  renderMoreSerach(modConfig) {
    const {
      form:{getFieldDecorator}
    } = this.props;
    if(!modConfig.s_regular){
      return null;
    }
    const rKeys = Object.keys(modConfig.s_regular);
    if(rKeys.length === 0){
      return null;
    }
    const rConfig = modConfig.s_regular;
    const { curType, more } = this.state;

    let rowColumns = 4;
    let showDownIcon = false;
    switch (curType) {
      case 'xs':
        rowColumns = 1;
        break;
      case 'sm':
        rowColumns = 2;
        break;
      default:
        rowColumns = 4;
    }
    if (rKeys.length > rowColumns) {
      showDownIcon = true;
    }
    const moreTrueStyle = {
      padding: 0,
      height: '32px',
      overflow: 'hidden',
    };
    return (
      <Row gutter={16}>
        <Form onSubmit={this.search} layout="inline">
          <Col xs={24} sm={18} md={18} lg={18} style={more ? { padding: 0 } : moreTrueStyle}>
            {rKeys &&
              rKeys.map(key => (
                <Col xs={24} sm={12} md={6} lg={6} key={key}>
                  <FormItem>{getFieldDecorator(key)(this.renderEnumSelect(rConfig[key],key))}</FormItem>
                </Col>
              ))}
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} style={{ lineHeight: '32px' }}>
            {showDownIcon && !more && (
              <Tooltip placement="top" title="展开">
                <Button
                  onClick={this.toggleForm}
                  size="small"
                  icon="down"
                  shape="circle"
                  style={{ marginRight: 8 }}
                />
              </Tooltip>
            )}
            {showDownIcon && more && (
              <Tooltip placement="top" title="收起">
                <Button
                  onClick={this.toggleForm}
                  size="small"
                  icon="up"
                  shape="circle"
                  style={{ marginRight: 8 }}
                />
              </Tooltip>
            )}
            <Tooltip placement="top" title="搜索">
              <Button type="primary" htmlType="submit" size="small" shape="circle" icon="search" />
            </Tooltip>
            <Tooltip placement="top" title="重置">
              <Button
                onClick={this.searchReset}
                size="small"
                icon="close"
                shape="circle"
                style={{ marginLeft: 8 }}
              />
            </Tooltip>
          </Col>
        </Form>
      </Row>
    );
  }

  renderSerach() {
    const { modConfig } = this.props;
    return this.renderMoreSerach(modConfig);
  }

  render() {
    const { modConfig } = this.props;
    const sKeys = Object.keys(modConfig.s_text);
    const sConfig = modConfig.s_text;
    const { searchType, searchValues } = this.state;

    // 第二行btn,显示与否 
    const rst = getHeaderBtnArray(modConfig.action, true);
    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action] };
      cfg.key = action;
      return cfg;
    });
    return (
      <div className={styles.tableList}>
        <div className={[styles.tableListOperator, btnCfg.length > 0 ? '' : 'hide'].join(' ')}>{this.renderHeaderBtns(btnCfg)}</div>
        <Divider style={{ margin: 0 }} />
        <div className={[styles.tableListForm, 'clear'].join(' ')}>
          <Col xs={24} sm={24} md={16} lg={16}>
            {this.renderSerach()}
          </Col>
          <Col className={styles.rightSearch}>
            <Col>
              <InputGroup compact size="small">
                <Select defaultValue={searchType} size="small" onChange={this.searchSelectChange}>
                  {sKeys.map(key => (
                    <SelectOption value={key} key={key}>
                      {sConfig[key].text}
                    </SelectOption>
                  ))}
                </Select>
                <Input
                  style={{ width: '50%' }}
                  value={searchValues}
                  onChange={this.searchInputChange}
                  placeholder="请输入搜索条件"
                  allowClear
                />
                <Button type="primary" size="small" onClick={this.search}>
                  搜索
                </Button>
              </InputGroup>
            </Col>
            <Col className={styles.Icon} style={{ color: '#3FB50B' }}>
              <Tooltip placement="top" title="刷新">
                <Icon type="sync" onClick={this.search} />
              </Tooltip>
            </Col>
          </Col>
        </div>
      </div>
    );
  }
}

export default ModHeaderBtnFilter;
