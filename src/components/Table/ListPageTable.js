import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

import ActionModal from './ActionModal';
import CommonTable from './index';

import { trigger } from '@/utils/utils';

import {getRowBtnArray} from '@/utils/Btn';

import {actionColWidth,getTableConfig} from './TableUtil';

const defaultPaginationCfg = page => {
  if (page) {
    const pagination = {
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100', '200'],
    };
    if (page) {
      // 页数更改回调
      if (page.onChange) {
        pagination.onChange = page.onChange;
      }
      // 总条数
      if (page.total) {
        pagination.total = page.total;
      }
      // 当前页数
      if (page.current) {
        pagination.current = page.current;
      }
      // 每页条数
      if (page.pageSize) {
        pagination.pageSize = page.pageSize;
      }
      // 更改pageSize回调
      if (page.onShowSizeChange) {
        pagination.onShowSizeChange = page.onShowSizeChange;
      }
    }
    return pagination;
  }
  return false;
};

class ListPageTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    bordered: PropTypes.bool,
    mod:PropTypes.string,
    modConfig: PropTypes.object,
  };

  static defaultProps = {
    dataSource: [],
    loading: false,
    bordered: false,
    mod:'',
    modConfig: {},
  };

  constructor(props){
    super(props)
    this.state = {
      actionModal: '',
    }

    this.closeActionModal = this.closeActionModal.bind(this);
  }

  openActionModal = data => {
    const { hashKey } = data;
    this.setState({ actionModal: hashKey });
  };

  renderRowBtns = data => {
    const { modConfig, reload } = this.props;

    const rst =  getRowBtnArray(data,modConfig.action,true);

    const btnCfg = rst.map(action => {
      const cfg = { ...modConfig.action[action]};
      cfg.key = action;
      return cfg;
    });
    return btnCfg.map((item, i) => (
      <div key={item.key} className="dib">
        <Button
          icon={item.icon || ''}
          type={item.type || ''}
          onClick={() => trigger(item.key, data, reload )}
        >
          {item.text || ''}
        </Button>
        {i !== btnCfg.length - 1 && <span style={{ width: '8px', display: 'inline-block' }} />}
      </div>
    ));
  };

  

  getModConfig = () => {
    const { modConfig, rowSelection,mod ,dataSource, block, actionMap} = this.props;
    const config =  getTableConfig(modConfig,rowSelection,mod,dataSource,1);
    if (modConfig.action) {
      const col = {
        title: '操作',
        key: 'action',
        // 以下两个属性,是为了保证弹窗正常显示
        fixed: 'right',
        className: 'noOver',
        // width: actionColWidth(modConfig,dataSource),
        width: 80,
        // render: (text, record) => <span>{this.renderRowBtns(record)}</span>,
        render: (text, data, index) => (
          <ActionModal
            data={data}
            width={actionColWidth(modConfig, this.props.dataSource)}
            renderRowBtns={() => this.renderRowBtns(data)}
            openActionModal={this.openActionModal}
            actionModal={this.state.actionModal}
            closeActionModal={this.closeActionModal}
          />
        ),
      };
      config.columns.push(col);
    }
    return config;
  };

  closeActionModal() {
    this.setState({ actionModal: '' });
  }

  render() {
    const { loading, dataSource, page ,mod} = this.props;
    return (
      <CommonTable
        loading={loading}
        dataSource={dataSource}
        page={page || undefined}
        tableKey={mod}
        // pagination={defaultPaginationCfg}
        pagination={false}
        {...this.getModConfig()}
      />
    );
  }
}

export default ListPageTable;
