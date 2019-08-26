import React from 'react';
import { Button } from 'antd';
import { trigger } from '@/utils/utils';
import { getHeaderBtnArray, getRowBtnArray, btnShowFilter } from '@/utils/Btn';

export function renderHeaderBtns(config, tabKey, actionMap, data) {
  const rst = getHeaderBtnArray(config.action, false);

  const btnCfg = rst.map(action => {
    const cfg = { ...config.action[action] };
    cfg.key = action;
    return cfg;
  });

  return btnCfg.map(item => (
    <div key={item.key} className="dib" style={{ marginLeft: 8 }}>
      <Button
        icon={item.icon || ''}
        type={item.type || 'primary'}
        size={item.size || 'small'}
        onClick={() => {
          if (actionMap && actionMap[item.key]) {
            actionMap[item.key](config, tabKey, data);
          } else {
            trigger(item.key, data);
          }
        }}
      >
        {item.text || ''}
      </Button>
    </div>
  ));
}

export function actionColWidth(config, dataSource) {
  let width = 0;
  const needToCalc = btnShowFilter(dataSource, config.action);
  needToCalc.forEach(data => {
    const rst = getRowBtnArray(data, config.action, false);
    const btnCfg = rst.map(action => {
      const cfg = { ...config.action[action] };
      cfg.key = action;
      return cfg;
    });
    if (btnCfg.length) {
      const rWidth = btnCfg
        .map((action, i) => {
          return action.text.length * 16 + 2 + 30 + (i === 0 ? 0 : 8);
        })
        .reduce((total, cur) => total + cur);
      if (rWidth > width) {
        width = rWidth;
      }
    }
  });
  return width + 16 + 2;
}

function lastWidthFun() {
  let lastWidth = 80;
  return function(width) {
    if (width) {
      lastWidth = width;
    }
    return lastWidth;
  };
}

export const lastWidth = lastWidthFun();

export function cellColWidth(text, field, len, index, dataSource) {
  function width() {
    let maxLen = 0;
    const curCellArr = dataSource.map(item => item[field] || '');
    curCellArr.forEach(item => {
      const itemLen = item.length;
      if (itemLen > maxLen) {
        maxLen = itemLen;
      }
    });
    if (maxLen) {
      if (maxLen > text.length) {
        return maxLen * 15 + 20 + 1 + 32 >= 300 ? 300 : maxLen * 15 + 20 + 1 + 32;
      }
    }
    return text.length * 15 + 20 + 1 + 32;
  }
  // 如果是最后一个columns就不给他宽度,因为action使用了fixed,给了宽度会出现表格不相连的bug.
  // 保留最后一列的宽度, 加到scroll里面,但是最后一列不设宽度
  if (len - 1 === index) {
    lastWidth(width());
    return null;
  }
  return width();
}

export function getTableConfig(cfg, rowSelection, tabKey, dataSource, ro) {
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
      // 设置 column 排序
      col.sorter = (a, b) => (a[v] > b[v] ? 1 : -1);

      if (colCfg.type) {
        col.type = colCfg.type;
      }
      if (colCfg.edit_path){
        col.edit_path = colCfg.edit_path;
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
  //     x: allWidth + 80 + (config.rowSelection ? config.rowSelection.width || 60 : 0),
  //     Y: null,
  //   };
  // }
  return config;
}
