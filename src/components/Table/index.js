import React from 'react';
import { Table, Form } from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GridContext from './GridContext';
import Cell from './Cell';
import TitleCell from './TitleCell';
import HeaderTitleCol from './HeaderTitleCol';
import { lastWidth } from './TableUtil';
import styles from './index.less';
import display from '@/utils/display';

const defaultRow = ({ ...props }) => {
  return <tr {...props} />;
};

const defaultComponents = {
  header: {
    cell: TitleCell,
  },
  body: {
    cell: Cell,
    row: defaultRow,
  },
};

const cellRender = (record, rowIndex, col, cellChange) => {
  const rst = {
    record,
    rowIndex,
    cellChange,
    editable: col.editable,
    dataIndex: col.dataIndex,
    title: col.title,
    type: col.type || null,
    rq: col.rq,
    edit_path:col.edit_path,
    render: () => <span>{record[col.dataIndex]}</span>,
  };
  if (col.render) {
    rst.render = () => col.render(col.title, record, rowIndex);
  } else if (col.type) {
    rst.render = () => <span>{display(record[col.dataIndex], col, record)}</span>;
  }
  return rst;
};

const mapColPropsToColumn = (cols, cellChange, handleResize, moveCol) => {
  const columns = cols.map((col, index) => {
    if (col.cellType) {
      return {
        ...col,
      };
    }
    if (!col.editable) {
      if (col.key === 'action') {
        return {
          ...col,
        };
      }
      if (col.noDorg) {
        return {
          ...col,
          onCell: (record, rowIndex) => cellRender(record, rowIndex, col, cellChange),
        };
      }
      return {
        ...col,
        title: <HeaderTitleCol title={col.title} index={index} />,
        onHeaderCell: column => {
          return {
            width: column.width,
            onResize: handleResize(index),
            index,
            moveCol,
          };
        },
        onCell: (record, rowIndex) => cellRender(record, rowIndex, col, cellChange),
      };
    }
    return {
      ...col,
      title: <HeaderTitleCol title={col.title} index={index} />,
      onCell: (record, rowIndex) => cellRender(record, rowIndex, col, cellChange),
      onHeaderCell: column => ({
        width: column.width,
        onResize: handleResize(index),
        index,
        moveCol,
      }),
    };
  });
  return columns;
};

class Grid extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    rowSelection: PropTypes.object,
    loading: PropTypes.bool,
    components: PropTypes.object,
    scroll: PropTypes.object,
    tableKey: PropTypes.string,
    onCellChange: PropTypes.func,
  };

  static defaultProps = {
    columns: [],
    data: [],
    rowSelection: null,
    loading: false,
    components: defaultComponents,
    scroll: {
      x: true,
      y: null,
    },
    tableKey: '',
    onCellChange: () => {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { columns, dataSource } = nextProps;
    const updataColumns = columns.map(item => {
      if (prevState.columns.length) {
        return prevState.columns.find(column => column.dataIndex === item.dataIndex);
      }
      return false;
    });

    if (updataColumns.includes(false)) {
      return {
        columns,
        dataSource,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns || [],
      resizeble: {
        index: 0,
        size: {},
      },
    };
    this.handleResize = this.handleResize.bind(this);
    this.moveCol = this.moveCol.bind(this);
  }

  scrollChange = (index, size) => {
    const { columns } = this.state;
    const { rowSelection } = this.props;
    columns[index].width = size.width;
    const LastWidth = lastWidth();
    const minWidth = this.table.clientWidth - LastWidth - (rowSelection ? rowSelection.width || 60 : 0)
    const otherWidth = columns.map(item => item.width).reduce((total, cur) => total + cur);
    // if(otherWidth < minWidth){
      const moreWidth = minWidth - otherWidth
      const len = columns.length - 2
      const Average = moreWidth / len
      for(let i = 0; i >= len; i+=1){
        columns[i].width += Average
      }
    // }
    const allWidth = otherWidth + LastWidth + (rowSelection ? rowSelection.width || 60 : 0);
    const scroll = {
      // 最后一个columns是没有宽度的,所以多给点
      x: allWidth,
      Y: null,
    };
    return scroll;
  };

  handleResize = index => (e, { size }) => {
    e.stopPropagation();
    e.preventDefault();
    // this.setState(({ columns }) => {
    //   const nextColumns = [...columns];
    //   nextColumns[index] = {
    //     ...nextColumns[index],
    //     width: size.width,
    //   };
    //   return { columns: nextColumns, resizeble: { index, size } };
    // });
    this.setState({ resizeble: { index, size } })
  };

  moveCol = (dragIndex, hoverIndex) => {
    const { state } = this;
    const { columns } = this.state;
    const dragCol = columns[dragIndex];
    this.setState(
      update(state, {
        columns: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCol]],
        },
      })
    );
  };

  CellChange = (value, rowIndex, dataIndex) => {
    const { onCellChange, tableKey } = this.props;
    if (onCellChange) {
      onCellChange(value, tableKey, rowIndex, dataIndex);
    }
  };

  render() {
    const { form, scroll } = this.props;
    const {
      columns,
      resizeble: { index, size },
    } = this.state;
    let scrollTable = '';
    if (size && size.width) {
      scrollTable = this.scrollChange(index, size);
    }
    const cols = mapColPropsToColumn(columns, this.CellChange, this.handleResize, this.moveCol);
    return (
      <GridContext.Provider value={form}>
        <div
          ref={node => {
            this.table = node;
          }}
        >
          <Table
            {...this.props}
            scroll={scrollTable || scroll}
            columns={cols}
            className={styles.TableStyle}
          />
        </div>
      </GridContext.Provider>
    );
  }
}
const GridRender = DragDropContext(HTML5Backend)(Form.create()(Grid));
export default GridRender;
