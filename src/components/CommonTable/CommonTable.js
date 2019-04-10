import React from 'react';
import {Table} from 'antd';
import { Resizable } from 'react-resizable';
import styles from './CommonTable.less';

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class CommonTable extends React.Component {
  tableComponents = {
    header: {
      cell: ResizeableTitle,
    },
  };

  constructor(props) {
    super(props);
    const { columns } = props;

    this.state = {
      columns: [...columns],
      selectedRows:[]
    };
  }

  onRow(record){
    return {
      onClick:()=>{
         const { selectedRows } = this.state;
         const rows = [...selectedRows];
         if(rows.indexOf(record)!==-1){
           const i = rows.indexOf(record);
           rows.splice(i,1);
         }else{
            rows.push(record);
         }
         this.setState({selectedRows:rows});

         const { onRowClick } = this.props;

         if(onRowClick && typeof onRowClick === 'function' ){
            onRowClick();
         }
      }
    }
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  RowClass(record){
    const {selectedRows:rows} = this.state;
    if(rows.indexOf(record)!==-1){
      return styles.textRed
    }
    return styles.textBlue;
  }

  render() {
    const { dataSource = [],loading=true,rowKey = 'key',columns:preColumns,...rest} =this.props;
    const {columns} = this.state;
    const tabcols = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Table
        rowKey={rowKey}
        bordered
        components={this.tableComponents}
        columns={tabcols}
        dataSource={dataSource}
        loading={loading}
        rowClassName={(record)=>this.RowClass(record)}
        onRow={(record)=>this.onRow(record)}
        className={styles.resizable}
        {...rest}
      />
    );
  }
};

export default CommonTable;