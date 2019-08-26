import React from 'react';
import { Input, InputNumber, Row, Col, Select, Carousel } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PictureList from '@/components/PictureList';
import getEnum from '@/utils/enum';
import AppCore from '@/utils/core';
import { renderButton } from '@/utils/utils';
import ActionPageTable from '@/components/Table/ActionPageTable';

import ActionPageHoc from '@/components/ActionPageHoc';

import styles from './index.less';

const { Option } = Select;

function renderImg(item) {
  let url = item;
  if (url.indexOf('http') !== 0 && AppCore.HOST) {
    url = `${AppCore.HOST}/${url}`;
  }
  return (
    <div key={item}>
      <img src={url || '/img/login-bg.png'} alt="产品图片" className="img-size" />
    </div>
  );
}

@connect(({ meta: { actions,blocks } }) => ({
  actions,
  blocks
}))
@ActionPageHoc
class BigTraffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        产品信息: {},
        产品图片: [],
        航班车次: [],
      },
    };
    this.actionMap = {...props.actionMap};

    this.updata = this.updata.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.addImg = this.addImg.bind(this);
  }

  // 新增或者替换图片
  updata(index, imageUrl) {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    let url = imageUrl;
    if (url.indexOf('http') !== 0 && AppCore.HOST) {
      url = `${AppCore.HOST}/${url}`;
    }
    data['产品图片'][index] = url;
    this.setState({ data });
  }

  // 删除图片
  deleteImg(index) {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    data['产品图片'].splice(index, 1);
    this.setState({ data });
  }

  // 新增图片(其实是新增上传框)
  addImg() {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    data['产品图片'].push('');
    this.setState({ data });
  }

  // 产品图片
  proPhotos() {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;

    const swiperCfg = {
      id: 'GroupTourAdd',
      loop: false,
      numSwiper: 3.5,
      // height: '260px',
      data: data['产品图片'],
      // 新增或者替换图片
      updata: this.updata,
      // 删除图片
      deleteImg: this.deleteImg,
      // 新增图片(图片上传框)
      addImg: this.addImg,
    };
    return <PictureList {...swiperCfg} uploadType="productPic" />;
  }

  //  产品信息 Change
  changeProInfo(type, val) {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    data['产品信息'][type] = val;
    this.setState({ data });
  }

  render() {
    const { location, actions, blocks } = this.props;
    const { data } = this.state;

    const { action } = location.state;
    const config = actions[action];
    return (
      <PageHeaderWrapper headerPage={renderButton(config, this.actionMap)}>
        <Row>
          <Col className={styles.add}>
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>产品信息</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              {/* 产品图片 */}
              <Col xs={24} sm={24} md={10} lg={10} className={styles.imgWrapper}>
                <Col className={styles.imgBox}>
                  <Carousel className={styles.Carousel}>
                    {data['产品图片'].map(item => renderImg(item))}
                  </Carousel>
                </Col>
              </Col>
              {/* 产品名称 */}
              <Col
                className={styles.content}
                xs={24}
                sm={24}
                md={14}
                lg={14}
                style={{ paddingLeft: '24px' }}
              >
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    产品名称
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入产品名称"
                      value={data['产品信息'].pd_name || ''}
                      onChange={e => this.changeProInfo('pd_name', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 票种类型 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    票种类型
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value={data['产品信息'].ticket_kind_id || ''}
                      onChange={val => this.changeProInfo('ticket_kind_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {Object.keys(getEnum('TicketKind') || {}).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('TicketKind')[item]}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Col>
                {/* 出抵城市 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    出抵城市
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value={data['产品信息'].dep_city_id || ''}
                      onChange={val => this.changeProInfo('dep_city_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {Object.keys(getEnum('City') || {}).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('City')[item]}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      showSearch
                      value={data['产品信息'].back_city_id || ''}
                      onChange={val => this.changeProInfo('back_city_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={10}
                    >
                      {Object.keys(getEnum('City') || {}).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('City')[item]}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Col>
                {/* 单程返程 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    单程返程
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value={data['产品信息'].kind_id || ''}
                      onChange={val => this.changeProInfo('kind_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {Object.keys(getEnum('TrafficKind') || {}).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('TrafficKind')[item]}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Col>
                {/* 往返天数 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    往返天数
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <InputNumber
                      min={0}
                      max={999}
                      value={data['产品信息'].days || 0}
                      onChange={val => this.changeProInfo('days', val)}
                    />
                    &nbsp; 天
                  </Col>
                </Col>
              </Col>
            </Col>

            {/* 产品图片 可编辑页特有 */}
            <Col className={styles.addMod}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>产品图片</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={styles.content}>{this.proPhotos()}</Col>
            </Col>

            {/* 航班车次 */}
            <ActionPageTable
              blockConfig={blocks['航班车次']}
              block='航班车次'
              dataSource={data['航班车次']}
              actionMap={this.actionMap}
              rowSelect={{width: 60, type: 'checkbox'}}
            />

            {/* 退改说明 */}
            <Col className={styles.addMod}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>退改说明</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={styles.content}>
                <Input.TextArea
                  placeholder="请输入退改说明"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.changeProInfo('change_explain', e.target.value)}
                  value={data['产品信息'].change_explain}
                />
              </Col>
            </Col>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default BigTraffic;
