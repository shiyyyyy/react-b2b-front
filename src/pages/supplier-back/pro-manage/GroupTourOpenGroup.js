
import React from 'react';
import { Layout, Menu, Icon, Row, Col, Input, Avatar, Breadcrumb, Table, Popconfirm, Divider, Upload, message, Form, Tag, Button, Tabs, Radio, Rate, Carousel, DatePicker, Checkbox, Select, InputNumber, Pagination, Tooltip, Badge, Dropdown } from 'antd';
import { Resizable } from 'react-resizable';

import { LoadingHoc, TableRender, TableFilter, G2Interval } from '../../../util/common';
import moment from 'moment';
import { debug } from 'util';

const Option = Select.Option;

class GroupTourOpenGroup extends React.Component {
    state = {
        loading: false,
        columns: [{
            title: 'Date',
            dataIndex: 'date',
            width: 200,
            className: 'editable-cell',            
            fixed: 'left',
            sorter: (a, b) => moment(a.date).isBefore(b.date),
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            width: 200,
            className: 'editable-cell',            
            editable: true,
            sorter: (a, b) => a.amount - b.amount,
        }, {
            title: 'Type',
            dataIndex: 'type',
            width: 200,
            className: 'editable-cell',            
        }, {
            title: 'Note',
            dataIndex: 'note',
            width: 200,
            className: 'editable-cell',            
        }, {
            title: 'Action',
            width: 200,
            className: 'editable-cell',            
            key: 'action',
            render: () => (
                <a href="javascript:;">Delete</a>
            ),
        },{
            title: '时间',
            dataIndex: 'sj',
            width: 200,
            className: 'editable-cell',  
            type: 'date',          
        }, {
            title: '数量',
            dataIndex: 'sl',
            width: 200,
            className: 'editable-cell', 
            type: 'number',          
        }, {
            title: '类型',
            dataIndex: 'lx',
            width: 200,
            className: 'editable-cell',        
            type: 'select',          
        }, {
            title: '备注',
            dataIndex: 'bz',
            className: 'editable-cell',  
            type: 'text',          
        }, {
            title: '操作',
            width: 100,
            className: 'editable-cell',            
            key: 'cz',
            fixed: 'right',
            render: () => (
                <a href="www.baidu.com">百度</a>
            ),
        }],

        data : [{
            key: 0,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
            selection: {
                disabled: true
            }
        }, {
            key: 1,
            date: '2018-03-11',
            amount: 243,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
        }, {
            key: 2,
            date: '2018-04-11',
            amount: 98,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
        },{
            key: 3,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
            selection: {
                disabled: true
            }
        },{
            key: 4,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
            selection: {
                disabled: true
            }
        },{
            key: 5,
            date: '2018-02-11',
            amount: 120,
            type: 'income',
            note: 'transfer',
            sj: 10000,
            sl: 10000,
            lx: 10000,
            bz: 10000,
            cz: 10000,
            selection: {
                disabled: true
            }
        },]
    };


    TableFilterRender(){
        const param = {
            data: this.state.data,
            columns: this.state.columns
        }
        return(
            <TableFilter view={this} param={param} />
        )
    }


    TableRender(){
        // 是否可选择 (单/多)以及选择配置
        const rowSelection = {
            // 单选多选 (radio/checkbox(默认))
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: (record.selection && record.selection.disabled === true),
            }),
        };
        // Table 配置
        let param = {
            data: this.state.data,
            columns: this.state.columns,
            scroll: {
                x: 1900,
                y: 300
            },
            rowSelection: { rowSelection },
            rowClassName: () => ('editable-row')
        }
        return (
            <TableRender param={param} view={this} />
        )
    }

    G2IntervalRender(){
        let param = {
            id: 'open',
            forceFit: true,
            width: 500,
            height: 400,
            
        }
        return(
            <G2Interval param={param} />
        )
    }

    render() {
        return (
            <Row>
                <Col>
                    {this.TableFilterRender()}
                </Col>
                <Col>
                    {this.TableRender()}
                </Col>
                <Col>
                    {this.G2IntervalRender()}
                </Col>
            </Row>
            
        );
    }
}


export default LoadingHoc(GroupTourOpenGroup);


