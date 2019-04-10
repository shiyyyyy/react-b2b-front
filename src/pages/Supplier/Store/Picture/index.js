import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import HeaderSetting from '@/components/HeaderSetting';

import styles from './index.less';

class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{id: 1}, {id: 2}, {id: 3}],
      cfg: {
        btns: [
          { text: '新增', id: 1, click: this.btt },
          { text: '修改', id: 2 },
          { text: '删除', id: 3, click: this.btt },
        ],
        filter: [
          { active: '1', children: ['1', '2', '3'], change: this.changeFilter },
          { active: '你', children: ['你', '我', '他'] },
        ],
        search: {
          active: '你好啊',
          children: ['我很好', '我还好', '你好啊'],
          change: this.changeSearch,
          click: this.clickSearch,
          refresh: this.refresh,
          reset: this.reset,
        },
      },
    };
  }

  changeFilter = val => {
    console.log(val);
  };

  clickSearch(e) {
    console.log(e);
  }

  changeSearch(val) {
    console.log(val);
  }

  btt(value) {
    console.log(value);
  }

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

    console.log(this);
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
                        <Col>
                          <span className={styles.Rtitle}>所在板块：</span>
                          <span className={styles.Rtext}>店铺首页</span>
                        </Col>
                        <Col>
                          <span className={styles.Rtitle}>图片区域：</span>
                          <span className={styles.Rtext}>超大轮播</span>
                        </Col>
                        {index % 2 === 1 ? (
                          <Col>
                            <span className={styles.Rtitle}>链接产品：</span>
                            <span className={styles.Rtext}>浓情金秋 法意瑞10天豪华观光</span>
                          </Col>
                        ) : (
                          <Col>
                            <span className={styles.Rtitle}>文字备注：</span>
                            <span className={styles.Rtext}>公司荣誉照片</span>
                          </Col>
                        )}
                      </Col>
                      <Col className={styles.rightR}>
                        <Col className={styles.Rtitle}>2018-11-23 16:55:21</Col>
                        <Col>
                          <span className={styles.Rtitle}>操作人：</span>
                          <span className={styles.Rtext}>李全蛋</span>
                        </Col>
                        <Col>
                          <Button size="small" onClick={_ =>console.log(1)} className={styles.btns}>
                            预览
                          </Button>
                          <Button size="small" onClick={_ =>console.log(2)} className={styles.btns}>
                            修改
                          </Button>
                          <Button size="small" onClick={_ =>console.log(3)} className={styles.btns} type="danger">
                            删除
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
}))(Picture);
