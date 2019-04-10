import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';

import styles from './index.less';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      cfg: {
        btns: [
          { text: '部门管理', id: 1, click: this.departmentManage },
          { text: '新增员工', id: 2, click: this.addEmp },
        ],
        filter: [
          {
            active: '所属部门',
            children: ['所属部门', '所属中心'],
            change: this.changeFilter,
          },
        ],
        search: {
          active: '员工姓名',
          children: ['员工姓名', '员工ID', '员工性别'],
          change: this.changeSearch,
          click: this.clickSearch,
          refresh: this.refresh,
          reset: this.reset,
        },
      },
    };
  }

  // 部门管理按钮
  departmentManage = e => {
    console.log(this);
  };

  // 新增员工按钮
  addEmp = e => {
    console.log(this);
  };

  // filter更改
  changeFilter = val => {
    console.log(val);
  };

  // 点击搜索按钮
  clickSearch = e => {
    console.log(e);
  };

  // 更改searchSelect
  changeSearch = val => {
    console.log(val);
  };

  // refresh 刷新按钮
  refresh = () => {
    console.log('刷新');
  }

  // reset 重置按钮
  reset = () => {
    console.log('重置');
  }

  render() {
    const { cfg, data } = this.state;
    return (
      <Row>
        <Col>
          <HeaderSetting {...this.props} data={cfg}>
            <Row>
              <Col className={styles.Picture}>
                {data.map((item, index) => (
                  <Col className={styles.item} key={item.id}>
                    <Col className={styles.left}>
                      <img className={styles.img} src="/favicon.png" alt="产品图片" />
                    </Col>
                    <Col className={styles.right}>
                      <Col className={styles.rightL}>
                        <Col className={styles.company}>
                          北京凤凰假期国际旅行社有限责任公司 --- 环宇风情
                        </Col>
                        <Col>
                          <span className={styles.name}>图片区域：</span>
                          <span className={styles.gender}>超大轮播</span>
                          <span className={styles.mobile}>超大轮播</span>
                        </Col>
                        <Col className={styles.signature}>
                          个性签名：北京凤凰假期国际旅行社有限责任公司
                        </Col>
                      </Col>
                      <Col className={styles.rightR}>
                        <Col>
                          <span className={styles.Rtext}>所属部门：</span>
                          <span className={styles.Rtext}>营销中心</span>
                        </Col>
                        <Col>
                          <span className={styles.Rtext}>账号状态：</span>
                          {index % 2 === 1 ? 
                            (<span className={styles.Rtext} style={{color: '#00A36A'}}>启用</span>) 
                            : (<span className={styles.Rtext} style={{color: '#F43266'}}>停用</span>)
                          }
                        </Col>
                        <Col>
                          <Button size="small" onClick={_ => console.log(1)} className={styles.btns} type="danger">
                            删除
                          </Button>
                          <Button size="small" onClick={_ => console.log(1)} className={styles.btns}>
                            设置
                          </Button>
                          <Button size="small" onClick={_ => console.log(2)} className={styles.btns}>
                            修改
                          </Button>
                          <Button size="small" onClick={_ => console.log(3)} className={styles.btns}>
                            启停
                          </Button>
                        </Col>
                      </Col>
                    </Col>
                  </Col>
                ))}
              </Col>
            </Row>
          </HeaderSetting>
        </Col>
      </Row>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(Account);
