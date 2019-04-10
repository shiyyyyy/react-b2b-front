// 尾货甩卖
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Icon,
  Row,
  Col,
  Pagination,
  Checkbox,
  DatePicker,
  InputNumber,
  Input,
  Select,
  Button,
} from 'antd';
import ProType from '@/components/ProType';
import ProModal from '@/components/ProModal';
// import { SupplierFilter } from '../../util/com';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

import styles from './AllProduct.less';

const InputGroup = Input.Group;
const { Option } = Select;

const { GroupTour, Traffic, Visa } = ProType;
const { GroupTourActive, TrafficActive, VisaActive } = ProModal;

class AllProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      total: 998,
      groupType: 1,
      depDate: moment(),
      backDate: moment().add(7, 'days'),
      data: {
        dep_city: {
          title: '出发城市',
          data: {
            1: '北京',
            2: '天津',
            3: '上海',
            4: '深圳',
            5: '广州',
            6: '哈尔滨',
            7: '成都',
            8: '厦门',
          },
        },
        level_one: {
          title: '一级标签',
          data: {
            1: '北美',
            2: '南美',
            3: '欧洲',
            4: '东南亚',
            5: '非洲',
            6: '大洋洲',
            7: '南北极',
            8: '国内',
            9: '日韩朝鲜',
            10: '全球游轮',
            11: '全球签证',
            12: '月球登陆',
            13: '太空美景',
            14: '太阳系环游',
          },
        },
        // level_two:{
        //     title: '二级标签',
        //     data: { 1: { 1: '美国', 2: '加拿大' }, 2: { 1: '里约热内卢', 2: '秘鲁' }, 3: { 1: '英国', 2: '德国', 3: '法国', 4: '意大利' }, 4: { 1: '越南', 2: '缅甸', 3: '泰国' }, 5: { 1: '南非', 2: '肯尼亚' }, 6: { 1: '澳大利亚', 2: '新西兰' }, 7: { 1: '北极极昼之旅', 2: '南极企鹅之旅' }, 8: { 1: '东北游', 2: '长城游' }, 9: { 1: '韩国', 2: "朝鲜", 3: '日本' }, 10: { 1: '太平洋邮轮', 2: '大西洋邮轮' }, 11: { 1: '日本签证', 2: '印尼签证' }, },
        // },
        theme: {
          title: '游玩主题',
          data: {
            1: '亲子',
            2: '蜜月',
            3: '夕阳红',
            4: '探险',
            5: '美容',
            6: '体验',
            7: '自驾',
            8: 'SPA',
            9: '游学',
          },
        },
        travel_date: {
          title: '出行月份',
          data: {
            1: '一月',
            2: '二月',
            3: '三月',
            4: '四月',
            5: '五月',
            6: '六月',
            7: '七月',
            8: '八月',
            9: '九月',
            10: '十月',
            11: '十一月',
            12: '十二月',
            13: '十三月',
            14: '星期八',
          },
        },
      },

      filter: {
        // cur_city: '',
        // cur_one: '',
        // cur_two: '',
        // cur_theme: '',
        // cur_travel_date: '',
        dep_city: [],
        level_one: [],
        theme: [],
        travel_date: [],
      },
      search: {
        // 搜索项
        dep_date: '',
        back_date: '',
        min_price: 0,
        max_price: 0,
        supplier: '',
      },
    };
  }

  componentDidMount() {
    Object.keys(this.state.data).map(item => {
      this[item] = document.getElementById(item);
    });
    console.log(this);
    this.judgeMore();
  }

  // filter search
  setFilter(key, val) {
    console.log(this);
    const { filter } = this.state;
    filter[key] = val;
    if (key === 'cur_one') {
      filter.cur_two = '';
    }
    const NewFilter = filter;
    this.setState({ filter: NewFilter });
  }

  setCheckbox(e, item, key) {
    const { filter } = this.state;
    // 想办法关联起来(选项true和fales=>当前选中)
    if (filter[item].indexOf(key) !== -1) {
      filter[item].splice(filter[item].indexOf(key), 1);
    } else {
      filter[item].push(key);
    }
    const NewFilter = filter;
    this.setState({ filter: NewFilter });
  }

  setAllCheckbox(item) {
    const { filter, data } = this.state;
    if (Object.keys(data[item].data).length === filter[item].length) {
      filter[item] = [];
    } else {
      filter[item] = [];
      filter[item] = filter[item].concat(Object.keys(data[item].data));
    }
    const NewFilter = filter;
    this.setState({ filter: NewFilter });
  }

  SupplierFilterFunc() {
    const that = this;
    const { data, filter } = this.state;

    const info = {
      data: data,
      filter: filter,
      cb(item, key) {
        let filter = that.state.filter;
        filter[item] = key;
        that.setState({ filter: filter });
        console.log(that);
      },
    };
    // return <SupplierFilter info={info} />;
  }

  // more filter
  moreFilter(item) {
    const dom = ReactDOM.findDOMNode(this[item]);
    console.log(this);
    debugger;
    if (dom.offsetHeight > 40) {
      dom.style.height = '40px';
      dom.style.overflow = 'hidden';
      this.setState({ [item + 'Text']: '展开' });
    } else {
      dom.style.height = 'auto';
      dom.style.overflow = 'auto';
      this.setState({ [item + 'Text']: '收起' });
    }
  }

  //  取消 您已选择
  closeSelect(key) {
    const { filter } = this.state;
    filter[key] = [];
    const NewFilter = filter;
    this.setState({ filter: NewFilter });
  }

  // 搜索项 事件
  setDepDate(date, dateString) {
    console.log(`depDate: ` + dateString);
    const { search } = this.state;
    this.setState({ depDdate: date, search: { ...search, dap_date: dateString } });
  }

  setBackDate(date, dateString) {
    console.log(`backDate: ` + dateString);
    const { search } = this.state;
    this.setState({ backDate: date, search: { ...search, back_date: dateString } });
  }

  setPrice(key, price) {
    console.log(key + ':' + price);
    const { search } = this.state;
    search[key] = price;
    const NewSearch = search;
    this.setState({ search: NewSearch });
  }

  selectType = (value, option) => {
    console.log(value);
    console.log(option);
  };

  // 如果 高度大于40 则隐藏并显示 more
  judgeMore() {
    const { data } = this.state;

    Object.keys(data).map(item => {
      let dom = ReactDOM.findDOMNode(this[item]);
      if (dom.offsetHeight > 40) {
        dom.style.height = '40px';
        dom.style.overflow = 'hidden';
        this.setState({ [item + 'More']: true });
      }
    });
  }

  // 切换不同 pages
  pageChange(page) {
    console.log(page);
    const NewPage = page;
    this.setState({ page: NewPage });
  }

  render() {
    const { data, filter, search, total, page, depDate, backDate, groupType } = this.state;
    return (
      <div className={styles.AllProduct}>
        {/*  */}
        <Row>
          {/* 团-类型 */}
          <Col span={24} className={styles.headerType}>
            <Col
              className={`${styles.headerTypeItem} ${
                groupType === 1 ? styles.activeHeaderTypeItem : ''
                }`}
              onClick={_ => this.setState({ groupType: 1 })}
            >
              常规参团
            </Col>
            <Col
              className={`${styles.headerTypeItem} ${
                groupType === 2 ? styles.activeHeaderTypeItem : ''
                }`}
              onClick={_ => this.setState({ groupType: 2 })}
            >
              当地参团
            </Col>
            <Col
              className={`${styles.headerTypeItem} ${
                groupType === 3 ? styles.activeHeaderTypeItem : ''
                }`}
              onClick={_ => this.setState({ groupType: 3 })}
            >
              团票散卖
            </Col>
            <Col
              className={`${styles.headerTypeItem} ${
                groupType === 4 ? styles.activeHeaderTypeItem : ''
                }`}
              onClick={_ => this.setState({ groupType: 4 })}
            >
              团房散卖
            </Col>
            <Col
              className={`${styles.headerTypeItem} ${
                groupType === 5 ? styles.activeHeaderTypeItem : ''
                }`}
              onClick={_ => this.setState({ groupType: 5 })}
            >
              签证代办
            </Col>
          </Col>
        </Row>
        <Row>
          {/* 抽象 filter 单选 */}
          {/* {this.state.data && this.SupplierFilterFunc()} */}

          <Col className={styles.filter}>
            {/* 抽象-多选 */}
            {data &&
              Object.keys(data).map(item => (
                <Row style={{ borderBottom: '1px #d9d9d9 dashed' }} key={item}>
                  <Col className={styles.filterItem}>
                    <Col xs={4} sm={3} md={3} lg={2} xl={2} className={styles.filterTitle}>
                      {data[item].title}:
                    </Col>
                    <Col
                      xs={16}
                      sm={18}
                      md={18}
                      lg={20}
                      xl={20}
                      className={styles.filterMain}
                      id={[item]}
                      ref={ref => {
                        this[item] = ref;
                      }}
                    >
                      <Checkbox
                        checked={filter[item].length === Object.keys(data[item].data).length}
                        onChange={this.setAllCheckbox.bind(this, item)}
                        style={{ marginLeft: '8px' }}
                      >
                        不限
                      </Checkbox>
                      {Object.keys(data[item].data).map(key => (
                        <Checkbox
                          key={key}
                          checked={filter[item].indexOf(key - 0) !== -1}
                          onChange={e => this.setCheckbox(e, item, key - 0)}
                        >
                          {data[item].data[key]}
                        </Checkbox>
                      ))}
                    </Col>
                    {this.state[item + 'More'] && (
                      <Col
                        xs={4}
                        sm={3}
                        md={3}
                        lg={2}
                        xl={2}
                        className={`${styles.filterMain} ${
                          this.state[item + 'More'] ? '' : 'hide'
                        }`}
                        onClick={_ => this.moreFilter(item)}
                      >
                        {this.state[item + 'Text'] || '展开'}
                        <Icon
                          type={this.state[item + 'Text'] === '收起' ? 'up' : 'down'}
                          theme="outlined"
                        />
                      </Col>
                    )}
                  </Col>
                </Row>
              ))}
            <Col className={styles.filterItem}>
              <Col xs={4} sm={3} md={3} lg={2} xl={2} className={styles.filterTitle}>
                您已选择:
              </Col>
              <Col xs={20} sm={21} md={21} lg={22} xl={22} className={styles.filterMain}>
                {Object.keys(filter).map(key => (
                  <div
                    key={key}
                    className={filter[key].length === 0 ? 'hide' : styles.filterUserSelect}
                  >
                    <span style={{ marginRight: '8px' }}>
                      {filter[key].map((itemText, index) => {
                        if (index + 1 === filter[key].length) {
                          return data[key].data[itemText];
                        }
                        return `${data[key].data[itemText]} 、`;
                      })}
                    </span>
                    <Icon
                      type="close-circle"
                      theme="outlined"
                      className={styles.filterUserSelectClose}
                      onClick={_ => this.closeSelect(key)}
                    />
                  </div>
                ))}
              </Col>
            </Col>
          </Col>

          {/* 搜索项 */}
          <Col span={24}>
            {/* <Col span={2} className={styles.filterTitle}>其他条件:</Col> */}
            <Col className={styles.filterMain}>
              <Col
                xs={23}
                sm={12}
                md={12}
                lg={8}
                className={styles.filterMainBlock}
                style={{ marginRight: '12px', marginLeft: '16px' }}
              >
                <DatePicker
                  defaultValue={depDate}
                  placeholder="出团日起"
                  onChange={this.setDepDate.bind(this)}
                />
                <span> &nbsp;~&nbsp; </span>
                <DatePicker
                  defaultValue={backDate || ''}
                  placeholder="出团日止"
                  onChange={this.setBackDate.bind(this)}
                />
              </Col>
              <Col xs={24} sm={11} md={11} lg={6} className={styles.filterMainBlock}>
                {/* <Input placeholder="最低价格" prefix={<Icon type="property-safety" theme="outlined"
                                    style={{color: 'rgba(0,0,0,.25)', fontSize: '16px'}} />}
                                    onChange={this.setPrice.bind(this, 'min_price')} /> */}
                <InputNumber
                  style={{ width: '45%' }}
                  defaultValue={search.min_price}
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                  onChange={this.setPrice.bind(this, 'min_price')}
                />
                <span> &nbsp;~&nbsp; </span>
                {/* <Input placeholder="最高价格" prefix={<Icon type="property-safety" theme="outlined"
                                    style={{color: 'rgba(0,0,0,.25)', fontSize: '16px'}} />}
                                    onChange={this.setPrice.bind(this, 'max_price')} />  */}
                <InputNumber
                  style={{ width: '45%' }}
                  defaultValue={search.max_price}
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                  onChange={this.setPrice.bind(this, 'max_price')}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} className={styles.filterMainBlock}>
                {/* <Input placeholder="供应商名称" onChange={this.setSupplier.bind(this)} /> */}
                <InputGroup compact>
                  <Select
                    defaultValue="supplier_name"
                    onChange={this.selectType}
                    style={{ width: '120px' }}
                  >
                    <Option value="supplier_name">供应商名称</Option>
                    <Option value="pro_name">产品名称</Option>
                    <Option value="order_num">订单号</Option>
                  </Select>
                  {/* <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" /> */}
                </InputGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={3}>
                <Button type="primary" icon="search" onClick={_ => this.search()}>
                  搜索
                </Button>
              </Col>
            </Col>
          </Col>
        </Row>

        {/* 产品列表 */}
        <Row>
          <Col>
            {[1,2,3,4,5,6,,7,8,9,0].map((item, index) => {
              return index % 3 === 0 ? (
                <GroupTour key={item.id}>
                  <GroupTourActive />
                </GroupTour>
              ) : index % 3 === 1 ? (
                <Traffic key={item.id}>
                  <TrafficActive />
                </Traffic>
              ) : (
                    <Visa key={item.id}>
                      <VisaActive />
                    </Visa>
                  );
            })}
          </Col>
        </Row>

        {/* 分页 */}
        <Row>
          <Col className={styles.historyPages}>
            <Pagination
              defaultCurrent={page}
              total={total}
              onChange={pages => this.pageChange(pages)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AllProduct;
