import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

// 表格拖拽
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import ResizeableTitle from './ResizeableTitle';
// 拖拽Row
// import { BodyRow } from './DragAndDrop';
// 非拖拽Row
import { EidtBodyRow } from './DragAndDrop';

import { EditableCell } from './EditableCell';

import styles from './CommonTable.less';

//   Table => 本体 =============
class TableRende extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
  };

  static defaultProps = {
    columns: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      columns: [],
    };

    this.TableChange = this.TableChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { columns } = nextProps;
    const updata = columns.map(item => {
      if (prevState.columns.length) {
        return prevState.columns.find(column => column['dataIndex'] === item['dataIndex']);
      }
      return false;
    });
    if (updata.includes(false)) {
      return {
        columns,
      };
    }
    return null;
  }

  //  ====  这里要求 父级页面的  数据源  名字叫做 dataSource ====
  handleSave = row => {
    console.log(row);
    const { dataSource: data, view } = this.props;
    const dataSource = [...data];
    const index = dataSource.findIndex(item => row.key === item.key);
    const item = dataSource[index];
    dataSource.splice(index, 1, {
      ...item,
      ...row,
    });
    view.setState({ data: dataSource });
  };

  //  ====  这里要求 父级页面的  列配置  名字叫做 columns ====
  handleResize = index => (e, { size }) => {
    e.stopPropagation();
    e.preventDefault();
    const { view } = this.props;
    view.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  // moveRow = (dragIndex, hoverIndex) => {
  //   const { dataSource: data } = this.state;
  //   const dragRow = data[dragIndex];

  //   this.setState(
  //     update(this.state, {
  //       dataSource: {
  //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
  //       },
  //     })
  //   );
  // };

  moveCol = (dragIndex, hoverIndex) => {
    const { columns } = this.state;
    const dragCol = columns[dragIndex];
    this.setState(
      update(this.state, {
        columns: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCol]],
        },
      })
    );
  };

  TableChange(pagination, filters, sorter, extra) {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  render() {
    // 数据源
    const { dataSource: data, page, loading } = this.props;
    // 筛选和排序
    // const { sortedInfo, filteredInfo } = this.state;
    // sortedInfo = sortedInfo || {};
    // filteredInfo = filteredInfo || {};
    // 固定的列 和 header
    const components = {
      header: {
        cell: ResizeableTitle,
        //    cell: DragableHeaderCol,
      },
      body: {
        //    row: EditableFormRow,
        row: EidtBodyRow,
        cell: EditableCell,
      },
    };
    // row 每一排的 className
    const RowClassName = this.props.rowClassName || '';
    // 需不需要滚动
    const scroll = this.props.scroll || {
      x: true,
      y: null,
    };
    // 需不需要 可选择(单radio/多checkbox)
    const rowSelection = this.props.rowSelection ? { ...this.props.rowSelection } : null;
    // 列配置
    const columns = this.state.columns.map((col, index) => {
      if (!col.editable) {
        return {
          ...col,
          onHeaderCell: column => {
            return {
              width: column.width,
              onResize: this.handleResize(index),
              index,
              moveCol: this.moveCol,
            };
          },
        };
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          type: col.type || null,
        }),
        onHeaderCell: column => ({
          width: column.width,
          onResize: this.handleResize(index),
          index,
          moveCol: this.moveCol,
        }),
      };
    });

    // page 配置函数
    // 分页配置
    const paginationCfg = (page) => {
      console.log(this)
      const pagination = {
        // position: 'top',
        // 是否可以改变 pageSize(为false的话,底下的显示条数列表没用)
        showSizeChanger: true,
        // 指定每页可以显示多少条
        pageSizeOptions: ['10', '20', '30', '50', '100', '200'],
      };
      if (page) {
        // 页数更改回调
        if(page.onChange){
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

    return (
      <Table
        bordered
        loading={loading}
        rowSelection={rowSelection}
        components={components}
        columns={columns}
        dataSource={data}
        scroll={scroll}
        rowClassName={RowClassName}
        pagination={paginationCfg(page)}
        onChange={this.TableChange}
        onRow={(record, index) => ({
          index,
          // moveRow: this.moveRow,
        })}
      />
    );
  }
}

const TableRender = DragDropContext(HTML5Backend)(TableRende);

export default TableRender;
