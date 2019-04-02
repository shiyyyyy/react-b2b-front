import React from 'react';
import { Row, Col, Pagination, Breadcrumb, Icon, Input, Button, Divider, Select } from 'antd';
import Link from 'umi/link';

import styles from './index.less';

const { Option } = Select;
const { Search } = Input;

class HeaderSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>&lt;Prev</a>;
    }
    if (type === 'next') {
      return <a>Next&gt;</a>;
    }
    return originalElement;
  };

  handleFilter = (value, option) => {
    console.log(value);
    console.log(option);
  };

  breadcrumbArr() {
    const {
      location: { pathname },
    } = this.props;
    const breadcrumb = pathname
      .split('/')
      .map((item, index, arr) => {
        let bread = '';
        if (item) {
          for (let i = 1, len = index; i <= len; i++) {
            bread = `${bread}/${arr[i]}`;
          }
        }
        return bread;
      })
      .filter(item => item);
    return breadcrumb;
  }

  render() {
    const {
      breadcrumbNameMap,
      children,
      data: { btns, filter, search },
    } = this.props;
    return (
      <Row>
        <Col className={styles.HeaderSetting}>
          {/* 分页和面包屑 */}
          <Col className={[styles.pages, 'clear'].join(' ')}>
            <Col span={12}>
              <Breadcrumb separator=">">
                {this.breadcrumbArr().map(item => (
                  <Breadcrumb.Item key={breadcrumbNameMap[item].name}>
                    <Link to={breadcrumbNameMap[item].path}>
                      {breadcrumbNameMap[item].name}
                    </Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </Col>
            <Col span={12} className="text-right">
              <Pagination
                size="small"
                itemRender={this.itemRender}
                total={500}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
              />
            </Col>
          </Col>
          <Divider style={{ background: '#DEE4EA', margin: '0' }} />
          {/* 操作按钮 */}
          {btns && (
            <Col className={[styles.btns, 'clear'].join(' ')}>
              <Icon type="bars" className={styles.icon} />
              {btns.map(item => (
                <Button
                  key={item.id}
                  ghost
                  icon={item.icon || ''}
                  size="small"
                  type="primary"
                  onClick={_ => (item.click ? item.click(222) : false)}
                  disabled={!item.click}
                >
                  {item.text || ''}
                </Button>
              ))}
            </Col>
          )}
          <Divider style={{ background: '#EDF1F5', margin: '0' }} />
          {/* 过滤和搜索 */}
          <Col className={[styles.filetSearch, 'clear'].join(' ')}>
            <Col span={12} className={styles.filter}>
              {filter &&
                filter.map((item, index) => (
                  <Select
                    key={index}
                    defaultValue={item.active || ''}
                    style={{ width: 110, marginRight: 12 }}
                    onChange={val => (item.change ? item.change(val) : false)}
                  >
                    {item.children &&
                      item.children.map(cell => <Option key={cell} value={cell}>{cell}</Option>)}
                  </Select>
                ))}
            </Col>
            {/*  */}
            {search && (
              <Col span={12} className={styles.search}>
                <Select
                  defaultValue={search.active || ''}
                  style={{ width: 106, marginRight: 6 }}
                  onChange={val => (search.change ? search.change(val) : false)}
                >
                  {search.children &&
                    search.children.map(cell => <Option key={cell} value={cell}>{cell}</Option>)}
                </Select>
                <Search
                  style={{ width: 208, marginRight: 16 }}
                  placeholder={`请输入${search.active}`}
                  onSearch={value => search.click(value)}
                  enterButton
                />
                <Icon style={{ marginLeft: '16px', color: '#18AB78' }} type="sync" />
                <Icon style={{ marginLeft: '16px', color: '#F54977' }} type="close-circle" />
              </Col>
            )}
          </Col>
          {/* children */}
          {children || null}
        </Col>
      </Row>
    );
  }
}

export default HeaderSetting;
