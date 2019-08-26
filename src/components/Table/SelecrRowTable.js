import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'antd';

import CommonTable from './index';

import { trigger } from '@/utils/utils';

import { getRowBtnArray } from '@/utils/Btn';

import { actionColWidth, getTableConfig } from './TableUtil';

class SelecrRowTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    bordered: PropTypes.bool,
    mod: PropTypes.string,
    modConfig: PropTypes.object,
  };

  static defaultProps = {
    dataSource: [],
    loading: false,
    bordered: false,
    mod: '',
    modConfig: {},
  };

  renderRowBtns = data => {
    const { modConfig, reload } = this.props;

    const rst = getRowBtnArray(data, modConfig.action, true);

    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action] };
      cfg.key = action;
      return cfg;
    });
    return btnCfg.map((item, i) => (
      <div key={item.key} className="dib">
        <Button
          icon={item.icon || ''}
          type={item.type || ''}
          onClick={() => trigger(item.key, data, reload)}
        >
          {item.text || ''}
        </Button>
        {i !== btnCfg.length - 1 && <span style={{ width: '8px', display: 'inline-block' }} />}
      </div>
    ));
  };

  getModConfig = () => {
    const { modConfig, rowSelection, mod, dataSource } = this.props;
    const config = getTableConfig(modConfig, rowSelection, mod, dataSource, 1);
    if (modConfig.action) {
      const col = {
        title: '操作',
        key: 'action',
        width: actionColWidth(modConfig, dataSource),
        render: (text, record) => <span>{this.renderRowBtns(record)}</span>,
      };
      config.columns.push(col);
    }
    return config;
  };

  render() {
    const { loading, dataSource, rowSelection, page, mod } = this.props;
    const style = {
      padding: '16px',
      textAlign: 'center',
    }
    return (
      <Col>
        <CommonTable
          loading={loading}
          rowSelection={rowSelection}
          dataSource={dataSource}
          page={page || undefined}
          tableKey={mod}
          pagination={false}
          {...this.getModConfig()}
        />
        <Col style={style}>
          <Button type="primary" style={{marginRight: '8px'}}>确定</Button>
          <Button>取消</Button>
        </Col>
      </Col>
    );
  }
}

export default SelecrRowTable;
