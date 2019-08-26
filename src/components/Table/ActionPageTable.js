import React, { Component } from 'react';
import { Col, Icon, Divider, Button } from 'antd';
import PropTypes from 'prop-types';

import ActionModal from './ActionModal';
import CommonTable from './index';
import { trigger } from '@/utils/utils';
import styles from './ActionPageTable.less';

import { getTitleBtnArray, getCellBtnArray, getRowBtnArray } from '@/utils/Btn';
import { renderHeaderBtns, getTableConfig, actionColWidth, lastWidth } from './TableUtil';

class ActionPageTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    actionMap: PropTypes.object,
    ro: PropTypes.number,
    block: PropTypes.string.isRequired,
    blockConfig: PropTypes.object.isRequired,
    onCellChange: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    actionMap: {},
    ro: 0,
    onCellChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      actionModal: '',
    };

    this.getblockConfig = this.getblockConfig.bind(this);
    this.closeActionModal = this.closeActionModal.bind(this);
  }

  openActionModal = data => {
    const { hashKey } = data;
    this.setState({ actionModal: hashKey });
  };

  renderRowBtns = (config, tabKey, actionMap, data, index) => {
    const rst = getRowBtnArray(data, config.action, false);
    const btnCfg = rst.map(action => {
      const cfg = { ...config.action[action] };
      cfg.key = action;
      return cfg;
    });

    return btnCfg.map((item, i) => (
      <div key={item.key} className="dib">
        <Button
          icon={item.icon || ''}
          type={item.type || ''}
          onClick={() => {
            if (actionMap[item.key]) {
              actionMap[item.key](config, tabKey, data, index);
            } else {
              trigger(item.key, data);
            }
          }}
        >
          {item.text || ''}
        </Button>
        {i !== btnCfg.length - 1 && <span style={{ width: '8px', display: 'inline-block' }} />}
      </div>
    ));
  };

  getblockConfig = () => {
    const { blockConfig, block, actionMap,rowSelection, dataSource, ro } = this.props;
    const config = getTableConfig(blockConfig,rowSelection,block,dataSource,ro);
    if (blockConfig.action) {
      // 底下的报错不能改,改了之后,actionModal获取不到最新的值
      const col = {
        title: '操作',
        key: 'action',
        fixed: 'right',
        className: 'noOver',
        width: 80,
        render: (text, data, index) => (
          <ActionModal
            data={data}
            width={actionColWidth(blockConfig, this.props.dataSource)}
            renderRowBtns={() => this.renderRowBtns(blockConfig, block, actionMap, data, index)}
            openActionModal={this.openActionModal}
            actionModal={this.state.actionModal}
            closeActionModal={this.closeActionModal}
          />
        ),
      };
      config.columns.push(col);
    }
    // 如果存在 title和cell按钮 (plus, minus), 主要判断有没有title按钮,不需要吧title按钮取出来
    const ifTitleBtn = Object.keys(blockConfig.action || {}).find(item => {
      return blockConfig.action[item] && blockConfig.action[item].bindToTitle;
    });
    if (ifTitleBtn) {
      // 在这里才会把符合条件的title按钮筛选出来
      this.renderTitleBtns(config);
    }
    // 添加 table的scroll属性
    if (!config.scroll) {
      // 把第一个clo的width去掉,再添加到总体里,因为都有width可能导致width失效, 但是吧width去掉会导致不能设置宽度,resizeble失效
      // const firstWidth = config.columns[0].width || 80
      // config.columns[0].width = null
      const width = lastWidth()
      const allWidth = config.columns.map(item => item.width).reduce((total, cur) => total + cur);
      config.scroll = {
        // 最后一个columns是没有宽度的,所以多给点
        x: allWidth + width + (config.rowSelection ? config.rowSelection.width || 60 : 0),
        Y: null,
      };
    }
    return config;
  };

  renderCellBtns = (data, bindToTitle, index) => {
    const { blockConfig, block } = this.props;
    const { actionMap = {} } = this.props;
    const rst = getCellBtnArray(data, blockConfig.action, false, bindToTitle);
    const btnCfg = rst.map(action => {
      const cfg = { ...blockConfig.action[action] };
      cfg.key = action;
      return cfg;
    });
    return btnCfg.map(item => (
      <Icon
        key={item.text}
        type="minus-circle"
        theme="filled"
        className={styles.iconMinus}
        onClick={() => {
          if (actionMap[item.key]) {
            actionMap[item.key](blockConfig, block, data, index);
          } else {
            trigger(item.key, data);
          }
        }}
      />
    ));
  };

  renderTitleBtns = config => {
    const { blockConfig, block } = this.props;
    const { actionMap = {}, dataSource: data } = this.props;
    const rst = getTitleBtnArray(blockConfig.action, false);
    const btnCfg = rst.map(action => {
      const cfg = { ...blockConfig.action[action] };
      cfg.key = action;
      return cfg;
    });
    return btnCfg.map(item =>
      config.columns.push({
        title: (
          <Icon
            type="plus-circle"
            theme="filled"
            className={styles.iconPlus}
            onClick={() => {
              if (actionMap[item.key]) {
                actionMap[item.key](blockConfig, block, data);
              } else {
                trigger(item.key, data);
              }
            }}
          />
        ),
        key: 'icon',
        fixed: 'right',
        width: 80,
        noDorg: true,
        render: (text, record, index) => (
          <span>{this.renderCellBtns(record, item.bindToTitle, index)}</span>
        ),
      })
    );
  };

  closeActionModal() {
    this.setState({ actionModal: '' });
  }

  renderHeader() {
    const { blockConfig, block, actionMap, dataSource } = this.props;
    return (
      <Col className={styles.title}>
        <Col className={styles.text}> {blockConfig.text} </Col>
        <Col className={styles.btns}>
          {' '}
          {renderHeaderBtns(blockConfig, block, actionMap, dataSource)}{' '}
        </Col>
      </Col>
    );
  }

  render() {
    const { dataSource, pagination, rowSelection, block, onCellChange } = this.props;
    return (
      <Col className={styles.ModTitle}>
        <Col> {this.renderHeader()} </Col>
        <Divider style={{ margin: 0 }} />
        <CommonTable
          dataSource={dataSource}
          pagination={pagination || false}
          onCellChange={onCellChange}
          rowSelection={rowSelection}
          tableKey={block}
          {...this.getblockConfig()}
        />
      </Col>
    );
  }
}

export default ActionPageTable;
