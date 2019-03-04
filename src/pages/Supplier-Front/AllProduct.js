// 全部产品
import React from 'react';

import {
  Icon,
  Row,
  Col,
  Button,
  DatePicker,
  Select,
  Input,
  InputNumber,
  Pagination,
} from 'antd';
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

import styles from './AllProduct.less';

// import '../../css/AllProduct.css';

moment.locale('zh-cn');

const InputGroup = Input.Group;
const { Option } = Select;

class AllProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      total: 998,
      dep_date: moment(),
      back_date: moment().add(7, 'days'),
      dep_city: {
        1: '北京',
        2: '天津',
        3: '上海',
        4: '深圳',
        5: '广州',
        6: '哈尔滨',
        7: '成都',
        8: '厦门',
      },
      level_one: {
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
      },
      level_two: {
        1: { 1: '美国', 2: '加拿大' },
        2: { 1: '里约热内卢', 2: '秘鲁' },
        3: { 1: '英国', 2: '德国', 3: '法国', 4: '意大利' },
        4: { 1: '越南', 2: '缅甸', 3: '泰国' },
        5: { 1: '南非', 2: '肯尼亚' },
        6: { 1: '澳大利亚', 2: '新西兰' },
        7: { 1: '北极极昼之旅', 2: '南极企鹅之旅' },
        8: { 1: '东北游', 2: '长城游' },
        9: { 1: '韩国', 2: '朝鲜', 3: '日本' },
        10: { 1: '太平洋邮轮', 2: '大西洋邮轮' },
        11: { 1: '日本签证', 2: '印尼签证' },
      },
      theme: {
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
      search: {
        cur_city: '',
        cur_one: '',
        cur_two: '',
        cur_theme: '',
        cur_dap_date: '',
        cur_back_date: '',
        min_price: '',
        max_price: '',
        supplier: '',
      },
      data: {
        recommend: [
          { id: '1', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '2', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '3', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
          { id: '4', group: [{ id: '0' }, { id: '1' }, { id: '2' }] },
        ],
      },
    };

    console.log(this)
  }

  // 设置 search 里的发搜索条件
  setSearch(key, val) {
    const { search } = this.state;
    search[key] = val;
    if (key === 'cur_one') {
      search.cur_two = '';
    }
    const NewSearch = search
    this.setState({ search: NewSearch });
  }

  setDepDate(date, dateString) {
    const { search } = this.state;
    this.setState({ dep_date: date, search: { ...search, cur_dap_date: dateString } });
  }

  setBackDate(date, dateString) {
    const { search } = this.state;
    this.setState({ back_date: date, search: { ...search, cur_back_date: dateString } });
  }
  
  setPrice(key, price) {
    const { search } = this.state;
    search[key] = price;
    const NewSearch = search
    this.setState({ search: NewSearch });
  }

  setSupplier(e) {
    const { search } = this.state;
    search.supplier = e.target.value;
    const NewSearch = search
    this.setState({ search: NewSearch });
  }

  closeSelect(key) {
    const { search } = this.state;
    search[key] = '';
    console.log(key);
    console.log(search);
    const NewSearch = search
    console.log(NewSearch);
    this.setState({ search: NewSearch });
  }

  search() {
    console.log(this);
  }

  // userSelectModel(key) {
  //   const { search } = this.state;
  //   if (search[key] === '') return;
  //   let keysMenu;
  //   switch (key) {
  //     case 'cur_city':
  //       console.log('city');
  //       keysMenu = 'dep_city';
  //       break;
  //     case 'cur_one':
  //       console.log('one');
  //       keysMenu = 'level_one';
  //       break;
  //     case 'cur_two':
  //       keysMenu = 'level_two';
  //       console.log(search.cur_one, search[key]);
  //       break;
  //     case 'cur_theme':
  //       console.log('theme');
  //       keysMenu = 'theme';
  //       break;
  //     default:
  //       console.log('default');
  //       break;
  //   }
  //   if (keysMenu === 'level_two'){
  //     return (
  //       <div
  //         key={key}
  //         className={search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect'}
  //       >
  //         <span style={{ marginRight: '8px' }}>
  //           {this.state.level_two[search.cur_one][search.cur_two]}
  //         </span>
  //         <Icon
  //           type="close-circle"
  //           theme="outlined"
  //           className="AllProduct-filter-userSelect-close"
  //           onClick={_ => this.closeSelect(key)}
  //         />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div
  //         key={key}
  //         className={search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect'}
  //       >
  //         <span style={{ marginRight: '8px' }}>{this.state[keysMenu][search[key]]}</span>
  //         <Icon
  //           type="close-circle"
  //           theme="outlined"
  //           className="AllProduct-filter-userSelect-close"
  //           onClick={_ => this.closeSelect(key)}
  //         />
  //       </div>
  //     );
  //   }
  // }
  // 展开折叠

  openEva(index) {
    const { openEvaIndex } = this.state;
    if (index === openEvaIndex) {
      this.setState({ open_eva_index: '' });
      return;
    }
    this.setState({ open_eva_index: index });
  }

  // 切换不同 pages
  pageChange(page) {
    console.log(page);
    const NewPage = page
    this.setState({ page: NewPage });
  }

  render() {
    const { data, group_type, dep_city, search, level_one, level_two, theme, dep_date, back_date, cur_pro_id, page, total } = this.state;
    return (
      <div className={styles.AllProduct}>
        {/* 团-类型 */}
        <Row>
          <Col className={styles.headerType}>
            <Col
              className={
                `${styles.headerTypeItem} ${(group_type === 1 ? styles.activeHeaderTypeItem : '')}`
              }
              onClick={_ => this.setState({ group_type: 1 })}
            >
              常规参团
            </Col>
            <Col
              className={
                `${styles.headerTypeItem} ${(group_type === 2 ? styles.activeHeaderTypeItem : '')}`
              }
              onClick={_ => this.setState({ group_type: 2 })}
            >
              当地参团
            </Col>
            <Col
              className={
                `${styles.headerTypeItem} ${(group_type === 3 ? styles.activeHeaderTypeItem : '')}`
              }
              onClick={_ => this.setState({ group_type: 3 })}
            >
              团票散卖
            </Col>
            <Col
              className={
                `${styles.headerTypeItem} ${(group_type === 4 ? styles.activeHeaderTypeItem : '')}`
              }
              onClick={_ => this.setState({ group_type: 4 })}
            >
              团房散卖
            </Col>
            <Col
              className={
                `${styles.headerTypeItem} ${(group_type === 5 ? styles.activeHeaderTypeItem : '')}`
              }
              onClick={_ => this.setState({ group_type: 5 })}
            >
              签证代办
            </Col>
          </Col>
        </Row>
        {/* filter */}
        <Row>
          <Col className={styles.filter}>
            <Col className={styles.filterItem}>
              <Col span={2} className={styles.filterTitle}>
                出发城市:
              </Col>
              <Col span={22} className={styles.filterMain}>
                {Object.keys(dep_city).map(key => (
                  <Col
                    className={
                      `${styles.filterMainItem} ${(search.cur_city === key ? styles.activeFilterMainItem : '')}`
                    }
                    onClick={_ => this.setSearch('cur_city', key)}
                    key={key}
                  >
                    {dep_city[key]}
                  </Col>
                ))}
              </Col>
            </Col>
            <Col className={styles.filterItem}>
              <Col span={2} className={styles.filterTitle}>
                一级导航:
              </Col>
              <Col span={22} className={styles.filterMain}>
                {Object.keys(level_one).map(key => (
                  <Col
                    className={
                      `${styles.filterMainItem} ${(search.cur_one === key ? styles.activeFilterMainItem : '')}`
                    }
                    onClick={_ => this.setSearch('cur_one', key)}
                    key={key}
                  >
                    {level_one[key]}
                  </Col>
                ))}
              </Col>
            </Col>
            {search.cur_one && (
              <Col className={styles.filterItem}>
                <Col span={2} className={styles.filterTitle}>
                  二级导航:
                </Col>
                <Col span={22} className={styles.filterMain}>
                  {search.cur_one &&
                    Object.keys(level_two[search.cur_one]).map(key => (
                      <Col
                        className={
                          `${styles.filterMainItem} ${(search.cur_two === key ? styles.activeFilterMainItem : '')}`
                        }
                        onClick={_ => this.setSearch('cur_two', key)}
                        key={key}
                      >
                        {level_two[search.cur_one][key]}
                      </Col>
                    ))}
                </Col>
              </Col>
            )}

            <Col className={styles.filterItem}>
              <Col span={2} className={styles.filterTitle}>
                游玩主题:
              </Col>
              <Col span={22} className={styles.filterMain}>
                {Object.keys(theme).map(key => (
                  <Col
                    className={
                      `${styles.filterMainItem} ${(search.cur_theme === key ? styles.activeFilterMainItem : '')}`
                    }
                    onClick={_ => this.setSearch('cur_theme', key)}
                    key={key}
                  >
                    {theme[key]}
                  </Col>
                ))}
              </Col>
            </Col>

            <Col className={styles.filterItem}>
              <Col span={2} className={styles.filterTitle}>
                您已选择:
              </Col>
              <Col span={22} className={styles.filterMain}>
                {/* {Object.keys(this.state.search).map(key => this.userSelectModel(key))} */}
                {/* {Object.keys(this.state.search).map(key =>
                                    <div key={key}
                                    className={(this.state.search[key] === '' ? 'hide' : 'AllProduct-filter-userSelect')}>
                                        <span style={{marginRight: '8px'}}>{this.state.search[key]}</span>
                                        <Icon type="close-circle" theme="outlined" className="AllProduct-filter-userSelect-close"
                                        onClick={_ => this.closeSelect(key)} />
                                    </div>
                                )} */}
              </Col>
            </Col>

            <Col className={styles.filterItem}>
              {/* <Col span={2} className={styles.filterTitle}>其他条件:</Col> */}
              <Col className={styles.filterMain}>
                <Col
                  span={8}
                  className={styles.filterMainBlock}
                  style={{ marginRight: '12px', marginLeft: '16px' }}
                >
                  <DatePicker
                    defaultValue={dep_date}
                    placeholder="出团日起"
                    onChange={this.setDepDate.bind(this)}
                  />
                  <span> &nbsp;~&nbsp; </span>
                  <DatePicker
                    defaultValue={back_date || ''}
                    placeholder="出团日止"
                    onChange={this.setBackDate.bind(this)}
                  />
                </Col>
                <Col span={6} className={styles.filterMainBlock}>
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
                <Col span={6} className={styles.filterMainBlock}>
                  {/* <Input placeholder="供应商名称" onChange={this.setSupplier.bind(this)} /> */}
                  <InputGroup compact>
                    <Select defaultValue="supplier_name">
                      <Option value="supplier_name">供应商名称</Option>
                      <Option value="pro_name">产品名称</Option>
                      <Option value="order_num">订单号</Option>
                    </Select>
                    <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
                  </InputGroup>
                </Col>
                <Col span={3}>
                  <Button type="primary" icon="search" onClick={_ => this.search()}>
                    搜索
                  </Button>
                </Col>
              </Col>
            </Col>
          </Col>
        </Row>

        {/* 产品推介 */}
        <Row className={styles.proRecommend}>
          <div className={styles.title}>
            <span className={styles.titleLeft}>主推产品</span>
            <span className={styles.titleRight}>
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.proInfo}>
            {data.recommend.map((item) => (
              <Col className={styles.proInfoItem} key={item.id}>
                <Col className={styles.top}>
                  <Col span={3} className={styles.proImgBox}>
                    <img
                      src='http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg'
                      className={styles.proImg}
                      alt="打折商品"
                    />
                    <span className={styles.proImgText}>产品编号: P0-4396</span>
                  </Col>
                  <Col span={21} style={{ paddingLeft: '20px' }}>
                    <Col className={styles.proRTop}>
                      <span className={styles.proName}>
                        超值无忧泰一地,体验泰国风情超值无忧泰一地,体验泰国风情
                      </span>
                      <span className={styles.proTag1}>跟团游</span>
                      <span className={styles.proTag2}>蜜月游</span>
                    </Col>
                    <Col className={styles.proRCenter}>
                      <Col span={10} className={styles.proRCenterLeft}>
                        <div>
                          分类标签: <span>东南亚-泰一地</span>
                        </div>
                        <div>
                          供应商: <span>广西桂林甲天下之旅</span>
                        </div>
                        <div className="text-overflow">
                          最近班期:{' '}
                          <span>
                            2018-09-08、2018-12-12、2018-11-11、2018-12-21、2018-12-12、2018-11-11
                          </span>
                        </div>
                      </Col>
                      <Col span={14} className={styles.proRCenterRight}>
                        <Col style={{ display: 'flex' }}>
                          <Col span={8}>
                            同行价:
                            <span
                              className="imp-text cursor"
                              onClick={_ => console.log('跳转登录页')}
                            >
                              登录可查
                            </span>
                          </Col>
                          <Col span={8}>
                            在售团期: <span className="imp-text">76</span>个
                          </Col>
                          <Col span={8}>
                            产品评分: <span className="imp-text">9.6</span>分
                          </Col>
                        </Col>
                        <Col style={{ display: 'flex' }}>
                          <Col span={8}>
                            销售价: <span className="imp-text">￥29998</span>/人起
                          </Col>
                          <Col span={8}>
                            访问次数: <span className="imp-text">32685</span>次
                          </Col>
                        </Col>
                      </Col>
                    </Col>
                    <Col className={styles.proRBtm}>
                      <Col span={20} className={styles.proRBtmLeft}>
                        <div>北京出发</div>
                        <div>5晚6天</div>
                        <div>飞机来回</div>
                        <div>无自费</div>
                        <div>无购物</div>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="primary"
                          icon={cur_pro_id === item.id ? 'caret-up' : 'caret-down'}
                          size="small"
                          ghost
                          onClick={_ => this.checkDetail(item.id)}
                        >
                          查看详情
                        </Button>
                      </Col>
                    </Col>
                  </Col>
                </Col>

                <Col
                  className={`${styles.btn} ${(cur_pro_id === item.id ? '' : 'hide')}`}
                >
                  <Col className={styles.proGroupListBox}>
                    <Col span={24} className={styles.proGroupTitle}>
                      <Col span={4}>团号</Col>
                      <Col span={3}>出团日期</Col>
                      <Col span={3}>回团日期</Col>
                      <Col span={3}>同行价</Col>
                      <Col span={3}>销售价</Col>
                      <Col span={3}>利润</Col>
                      <Col span={3}>总位</Col>
                      <Col span={2}>剩余</Col>
                    </Col>
                    {item.group.map(list => (
                      <Col className={styles.proGroupList} key={list.id}>
                        <Col className={styles.proGroupListMain}>
                          <Col span={4}>RNG-60E-HZ-SM-S8</Col>
                          <Col span={3}>2018-08-12</Col>
                          <Col span={3}>2018-08-20</Col>
                          <Col span={3}>￥24000</Col>
                          <Col span={3}>￥28888</Col>
                          <Col span={3}>￥4888</Col>
                          <Col span={3}>100</Col>
                          <Col span={2}>20</Col>
                        </Col>
                        <Col className={styles.proGroupListBtn}>
                          <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                            查看
                          </Button>
                          <Button type="primary" size="small" ghost style={{ marginRight: '16px' }}>
                            下载
                          </Button>
                          <Button type="primary" size="small" ghost>
                            占位
                          </Button>
                        </Col>
                      </Col>
                    ))}
                  </Col>
                </Col>
              </Col>
            ))}
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
