import React from 'react';
import { Input, InputNumber, Radio, Icon, Row, Col, Select, Divider } from 'antd';

import Drawers from '@/components/Drawer';
import AuthorizedSetting from '@/components/AuthorizedSetting';

import {
  ProductPictures,
  ProductCharacteristic,
  ProductScheduling,
  TableBtn,
  TableRender,
} from '@/components/Common';
// 表哥拖拽
import update from 'immutability-helper';

import styles from './Introduction.less';

const { Option } = Select;
const RadioGroup = Radio.Group;
const { Drawer, DrawerItem } = Drawers;

class GroupTourAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 这个名字是固定的,改了会导致列修改失效
      data: [
        {
          key: '0',
          name: 'Edward King 0',
          age: 22,
          address: 'London, Park Lane no. 0',
          department_id: 1,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: 32,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '2',
          name: 'Edward King 1',
          age: 30,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '3',
          name: 'Edward King 1',
          age: 321,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '4',
          name: 'Edward King 1',
          age: 432,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '5',
          name: 'Edward King 1',
          age: 332,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
        {
          key: '6',
          name: 'Edward King 1',
          age: 23,
          address: 'London, Park Lane no. 1',
          department_id: 2,
          date: '2018-08-08',
          time: '2018-12-12 12:00:00',
        },
      ],

      // 这个名字是固定的,改了会导致 配置 修改失效
      columns: [
        {
          title: '名字',
          dataIndex: 'name',
          // fixed: 'left',
          width: 200,
          editable: true,
          className: 'editable-cell',
          type: 'text',
          onHeaderCell: column => {
            return {
              onClick: () => {
                console.log(column);
                console.log('clickCell');
              },
            };
          },
          onCell: (record, rowIndex) => {
            return {
              onClick: () => {
                console.log(record);
                console.log(rowIndex);
                console.log('clickCell');
              },
            };
          },
        },
        {
          title: '年龄',
          dataIndex: 'age',
          width: 200,
          editable: true,
          className: 'editable-cell',
          type: 'number',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: '地址',
          dataIndex: 'address',
          width: 200,
          className: 'editable-cell',
          onHeaderCell: column => {
            return {
              onClick: () => {
                console.log(column);
                console.log('clickCell');
              },
            };
          },
          onCell: (record, rowIndex) => {
            return {
              onClick: () => {
                console.log(record);
                console.log(rowIndex);
                console.log('clickCell');
              },
            };
          },
        },
        {
          title: '日期',
          dataIndex: 'date',
          width: 200,
          editable: true,
          className: 'editable-cell',
          type: 'date',
        },
        {
          title: '时间',
          dataIndex: 'time',
          width: 200,
          editable: true,
          className: 'editable-cell',
          type: 'time',
        },
        {
          title: '部门',
          dataIndex: 'department_id',
          // width: 200,
          editable: true,
          className: 'editable-cell',
          type: 'select',
        },
        {
          title: '操作',
          width: 200,
          // fixed: 'right',
          className: 'editable-cell',
          dataIndex: 'operation',
          render: (text, record) => <TableBtn record={record} />,
        },
      ],
      photos: [
        'http://uploads.5068.com/allimg/151111/48-151111112Z8.jpg',
        'http://img.kutoo8.com/upload/image/34092560/1390442684896_960x540.jpg',
        'http://f0.topitme.com/0/6a/6c/11800178627706c6a0o.jpg',
        'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/07/ChMkJ1bKyyOIEM-iAAoiMiNFwUcAALImgJO8skACiJK516.jpg',
        'http://uploads.5068.com/allimg/1802/78-1P211141141.jpg',
        'http://2t.5068.com/uploads/allimg/151024/48-151024111511-50.jpg',
        'http://b.zol-img.com.cn/desk/bizhi/image/5/960x600/1410751686498.jpg',
        'http://images.ali213.net/picfile/pic/2013/04/09/927_hzw%20%282%29.jpg',
        'http://pic1.win4000.com/wallpaper/2018-09-18/5ba0a6c8b3571.jpg?down',
        'http://bangimg1.dahe.cn/forum/pw/Mon_1207/254_162850_a7cf02bc3731570.gif',
        'http://xbox360.tgbus.com/UploadFiles/201004/20100427142822574.jpg',
        'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg',
      ],
    };
    console.log(this);
  }

  handleDelete = key => {
    this.setState(prevData => ({ data: prevData.filter(item => item.key !== key) }));
  };

  //  input Change
  changeInput(type, val) {
    console.log(type);
    console.log(val);
  }

  proPhotos() {
    const swiperCfg = {
      id: 'GroupTourAdd',
      loop: false,
      numSwiper: 3.5,
      height: '260px',
      data: this.state.photos,
    };
    return <ProductPictures view={this} swiperCfg={swiperCfg} />;
  }

  //  表格 渲染
  TableRender() {
    // 是否可选择 (单/多)以及选择配置
    // const rowSelection = {
    //   // 单选多选 (radio/checkbox(默认))
    //   type: 'checkbox',
    //   columnWidth: 20,
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: record => ({
    //     disabled: record.selection && record.selection.disabled === true,
    //   }),
    // };
    // 表格拖拽配置集
    const move = {
      moveRow: (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
          update(this.state, {
            data: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          })
        );
      },
      moveCol: (dragIndex, hoverIndex) => {
        const { columns } = this.state;
        const dragCol = columns[dragIndex];
        console.log(dragIndex, hoverIndex);
        console.log(columns);
        this.setState(
          update(this.state, {
            columns: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragCol]],
            },
          })
        );
      },
    };
    // Table 配置
    const { data } = this.state;
    const { columns } = this.state;
    const scroll = { y: 300, x: 1400 };
    const rowClassName = () => 'editable-row';
    return (
      <TableRender
        dataSource={data}
        columns={columns}
        scroll={scroll}
        // rowSelection={rowSelection}
        rowClassName={rowClassName}
        view={this}
        move={move}
      />
    );
  }

  render() {
    return (
      <Row>
        <Col span={21} offset={3} className={styles.add}>
          <Col className={styles.addMod}>
            <Col className={styles.addTitle}>订单管理</Col>
            <Col className={styles.addModContent}>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>产品名称</div>
                <div className={styles.addModContentCellInput}>
                  <Input
                    placeholder="请输入产品名称"
                    onChange={e => this.changeInput('input', e.target.value)}
                  />
                </div>
              </Col>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>导航标签</div>
                <div className={styles.addModContentCellInput}>
                  <Select defaultValue="1" onChange={val => this.changeInput('select', val)}>
                    {[1, 2, 3, 4, 5].map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                  <Select defaultValue="2" onChange={val => this.changeInput('select', val)}>
                    {[1, 2, 3, 4, 5].map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                  <Select defaultValue="3" onChange={val => this.changeInput('select', val)}>
                    {[1, 2, 3, 4, 5].map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>出发城市</div>
                <div className={styles.addModContentCellInput}>
                  <Select defaultValue="2" onChange={val => this.changeInput('select', val)}>
                    {[1, 2, 3, 4, 5].map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                  <Select defaultValue="3" onChange={val => this.changeInput('select', val)}>
                    {[1, 2, 3, 4, 5].map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>签证时长</div>
                <div className={styles.addModContentCellInput}>
                  <Input
                    placeholder="请输入产品名称"
                    style={{ width: '130px' }}
                    onChange={e => this.changeInput('input', e.target.value)}
                  />
                  <span className={styles.addModContentCellInputAfter}> &nbsp; 天 </span>
                  <span className={styles.addModContentCellInputPopup}>
                    &nbsp;&nbsp;(指定送进使馆到出签所需要的时间)
                  </span>
                </div>
              </Col>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>往返交通</div>
                <div className={styles.addModContentCellInput}>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={val => this.changeInput('inputNumber', val)}
                  />
                </div>
              </Col>
              <Col className={styles.addModContentCell}>
                <div className={styles.addModContentCellLabel}>自费情况</div>
                <div className={styles.addModContentCellInput}>
                  <RadioGroup onChange={e => this.changeInput('radio', e.target.value)} value={1}>
                    {[1, 2, 3].map(item => (
                      <Radio value={item} key={item}>
                        {item}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              </Col>
            </Col>
          </Col>

          <Col className={styles.addMod}>
            <Col className={styles.addTitle}>产品图片</Col>
            <Col className={styles.addModContent}>{this.proPhotos()}</Col>
          </Col>

          <Col className={styles.addMod}>
            <Col className={styles.addTitle}>产品特色</Col>
            <Col className={styles.addModContent}>
              <ProductCharacteristic />
            </Col>
          </Col>

          <Col className={styles.addMod}>
            <Col className={styles.addTitle}>产品行程</Col>
            <Col className={styles.addModContent}>
              <ProductScheduling />
            </Col>
          </Col>

          <Col className={styles.addMod}>
            <Col className={styles.addTitle}>自由表格</Col>
            <Col className={styles.addModContent}>{this.TableRender()}</Col>
          </Col>

          <Drawer className="text-left">
            <DrawerItem>11111</DrawerItem>
            <Divider style={{ margin: '6px 0' }} />
            <DrawerItem>
              <AuthorizedSetting.AuthorizedOverview />
            </DrawerItem>
          </Drawer>
        </Col>
      </Row>
    );
  }
}

export default GroupTourAdd;
