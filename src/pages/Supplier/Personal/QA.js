// 我的问答
import React from 'react';
import { Icon, Row, Col, Avatar, Tag, Radio, Pagination } from 'antd';

import styles from './QA.less';

const RadioGroup = Radio.Group;

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTag: 1, // 当前标签
      total: 666, // 评论总条数
      curPage: 1, // 当前第几页=
      openQAIndex: '', // 展开的是第几条问答
      QA: [
        { type: 1, Q: '', A: '' },
        { type: 2, Q: '', A: '' },
        { type: 1, Q: '', A: '' },
        { type: 2, Q: '', A: '' },
      ],
    };
  }

  // 标签样式
  tags_color = [
    'volcano',
    'geekblue',
    'magenta',
    'cyan',
    'red',
    'orange',
    'gold',
    'lime',
    'green',
    'blue',
    'geekblue',
    'purple',
  ];

  // 切换 评价标签
  tagChange = e => {
    console.log(e.target.value);
    this.setState({ curTag: e.target.value });
  };

  // 展开折叠
  openQA(index) {
    const { openQAIndex } = this.state;
    if (index === openQAIndex) {
      this.setState({ openQAIndex: '' });
      return;
    }
    this.setState({ openQAIndex: index });
  }

  // 切换不同 pages
  pageChange(page) {
    console.log(page);
    this.setState({ curPage: page });
  }

  render() {
    const { curTag, openQAIndex, total, curPage, QA } = this.state;
    return (
      <div className={styles.QA}>
        {/* 问答 */}
        <Row>
          <Col className={styles.content}>
            <div className="mod-title" style={{ justifyContent: 'start' }}>
              <span className="mod-text">我的问答</span>
              <span className="mod-more" style={{ marginLeft: '24px' }}>
                <RadioGroup onChange={this.tagChange} value={curTag}>
                  <Radio value={1} className={curTag === 1 ? 'evaluate-tag-item-active' : ''}>
                    全部问答(4396)
                  </Radio>
                  <Radio value={2} className={curTag === 2 ? 'evaluate-tag-item-active' : ''}>
                    发起提问(3600)
                  </Radio>
                  <Radio value={3} className={curTag === 3 ? 'evaluate-tag-item-active' : ''}>
                    参与解答(796)
                  </Radio>
                  <Radio value={4} className={curTag === 4 ? 'evaluate-tag-item-active' : ''}>
                    中标采纳(2864)
                  </Radio>
                </RadioGroup>
              </span>
            </div>
            {QA.map((item, index) => (
              <Col className={styles.itemBox} key={index}>
                <Col span={2}>
                  <Avatar
                    src={
                      item.avatar
                        ? '/img/avatar1.png'
                        : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    size={64}
                  />
                </Col>
                <Col span={22} style={{ textAlign: 'left' }}>
                  <Col className="clear">
                    <Col span={18} className={styles.info}>
											<Col className={styles.comEmp}>北京神州国际旅行社有限责任公司-哈士奇</Col>
											<Col className={styles.type}>
                        <Tag color={this.tags_color[item.type]} className="m-0">
                          {item.type === 1 ? '问' : '答'}
                        </Tag>
                      </Col>
                    </Col>
										<Col span={6} className={styles.time}>
                      提问时间: 2018-08-24 20:32:54
                    </Col>
                  </Col>
                  <Col>
                    <Col className={styles.Q}>
                      请问泰国签证有几种类型?一般需要多久能下来?加急那?具体费用是多少?
                    </Col>
                    <Col span={21}>
											<Col className={(openQAIndex === index ? styles.AMainOpen : styles.AMainFold)}>
                        泰国签证是泰国作为一个主权国家对来自其他国家访问泰国的人士所核发的官网文件。除非该国已经与泰国签订了免签协议，否则必须到泰国驻外大使馆或领事馆办理签证后才能入境，目前泰国给予57个国家/地区的居民免签证待遇。
                        [1]
                        根据泰国相关法律规定，逾期在泰国停留的受到500泰铢/天，最高20000铢的罚款，最高10年禁止再入境
                      </Col>
                      <Col className={styles.open}>
                        <span onClick={_ => this.openQA(index)}>
                          <Icon
                            className={
                              openQAIndex === index ? styles.foldIcon : styles.openIcon
                            }
                            type="double-left"
                            theme="outlined"
                          />{' '}
                          &nbsp;
                          {openQAIndex === index ? '收起全部' : '展开全部'}
                        </span>
                      </Col>
                    </Col>
                    <Col span={3} className={styles.praise}>
											<Col className={styles.praiseIcon}>
                        <Icon
                          type={item.praise === 1 ? 'smile' : item.praise === 2 ? 'meh' : 'frown'}
                          theme="outlined"
                          className={
                            item.praise === 1
                              ? 'praise1'
                              : item.praise === 2
                              ? 'praise2'
                              : 'praise3'
                          }
                        />
                      </Col>
											<Col className={styles.praiseText}>
                        {item.praise === 1 ? '好评' : item.praise === 2 ? '中评' : '差评'}
                      </Col>
                    </Col>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
        {/* 分页 */}
        <Row>
          <Col className="history-pages">
            <Pagination
              defaultCurrent={curPage}
              total={total}
              onChange={page => this.pageChange(page)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default QA;
