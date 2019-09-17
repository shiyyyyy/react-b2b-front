import React from 'react';
import { Input, InputNumber, Radio, Row, Col, Divider, Carousel, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import PictureList from '@/components/PictureList';
import getEnum from '@/utils/enum';
import AppCore from '@/utils/core';
import { loadPdf, prePage, nextPage, goTOPage } from '@/utils/pdf';

import styles from './index.less';

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
const RadioGroup = Radio.Group;
const selectCfg = {
  pd_direction: { type: 'PdDirection' },
  primary_nav: { type: 'PrimaryNav' },
  secondary_nav: { type: 'SecondaryNav' },
};

class Detail extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pdfPageNum: 1,
      pdfLoading: false,
      readOnly: true,
    };
    this.pdfCt = '';
    this.canvas = '';
    this.init = this.init.bind(this);
  }

  componentDidMount(){
    this.init()
  }

  init = () => {
    const { data } = this.props;
    if (data['产品信息'].attach) {
      this.setState({ pdfLoading: true }, () => {
        loadPdf(`${AppCore.HOST}/${data['产品信息'].attach}`, this.canvas, 1000);
      });
    }
  };

  renderTag = (cfg, field, data) => {
    const Enum = getEnum(cfg, data) || {};

    return (
      <Col className={styles.cellSelect} xs={24} sm={4} md={2} lg={2}>
        {Enum[data[field]]}
      </Col>
    );
  };

  renderProductTag = () => {
    const { data } = this.props;
    return (
      <Col>
        {Object.keys(selectCfg).map(field =>
          this.renderTag(selectCfg[field], field, data['产品信息'])
        )}
      </Col>
    );
  };

  renderPassBycity = () => {
    const { data } = this.props;
    data['途径城市'] = data['途径城市'] || [];
    const Enum = getEnum('City');

    return <span>{data['途径城市'].map(item => Enum[item])}</span>;
  };

  renderProductTheme = () => {
    const { data } = this.props;
    const Enum = getEnum('PdTheme');
    data['产品标签'] = data['产品标签'] || [];
    return <span>{data['产品标签'].map(item => Enum[item])}</span>;
  };

  goToPDFPage = nums => {
    const pages = goTOPage(nums);
    this.setState({ pdfPageNum: pages });
  };

  minusPage = () => {
    const pages = prePage();
    this.setState({ pdfPageNum: pages });
  };

  addPage = () => {
    const pages = nextPage();
    this.setState({ pdfPageNum: pages });
  };

  // 产品图片
  proPhotos() {
    const { data } = this.props;
    const { readOnly } = this.state;
    const swiperCfg = {
      id: 'GroupTourAdd',
      loop: false,
      numSwiper: 3.5,
      // height: '260px',
      data: data['产品图片'],
      readOnly,
    };
    return <PictureList {...swiperCfg} uploadType="productPic" />;
  }

  renderPdf() {
    return (
      <div
        ref={ref => {
          this.pdfCt = ref;
        }}
        style={{ width: '100%' }}
      >
        <canvas
          ref={ref => {
            this.canvas = ref;
          }}
          style={{ width: '100%' }}
        />
      </div>
    );
  }

  render() {
    const { pdfPageNum, pdfLoading, readOnly } = this.state;
    const { data } = this.props;

    const loadingCom = pdfLoading ? (
      <div>
        <Icon type="loading" />
      </div>
    ) : null;

    return (
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
            {/* 产品信息 */}
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
                    readOnly={readOnly}
                  />
                </Col>
              </Col>
              {/* 途径地区 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  途径地区
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  {this.renderPassBycity()}
                </Col>
              </Col>
              {/* 导航标签 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  导航标签
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  {this.renderProductTag()}
                </Col>
              </Col>
              {/* 往返城市 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  出发城市
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  <span>{getEnum('City')[data['产品信息'].dep_city_id]}</span>
                  <span>{getEnum('City')[data['产品信息'].back_city_id]}</span>
                </Col>
              </Col>
              {/* 天数晚数 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  天数晚数
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  <InputNumber
                    min={1}
                    max={999}
                    value={data['产品信息'].nights || 0}
                    readOnly={readOnly}
                  />
                  &nbsp; 晚
                  <Divider type="vertical" />
                  <InputNumber
                    min={1}
                    max={999}
                    value={data['产品信息'].days || 0}
                    readOnly={readOnly}
                  />
                  &nbsp; 天
                </Col>
              </Col>
              {/* 自费情况 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  自费情况
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  <RadioGroup readOnly={readOnly} value={data['产品信息'].own_expense}>
                    {Object.keys({ 0: '无自费', 1: '有自费' }).map(key => (
                      <Radio value={key} key={key}>
                        {{ 0: '无自费', 1: '有自费' }[key]}
                      </Radio>
                    ))}
                  </RadioGroup>
                </Col>
              </Col>
              {/* 购物情况 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  购物情况
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  <RadioGroup readOnly={readOnly} value={data['产品信息'].shopping}>
                    {Object.keys({ 0: '无购物', 1: '有购物' }).map(key => (
                      <Radio value={key} key={key}>
                        {{ 0: '无购物', 1: '有购物' }[key]}
                      </Radio>
                    ))}
                  </RadioGroup>
                </Col>
              </Col>
              {/* 游玩主题 */}
              <Col className={[styles.cell, 'clear'].join(' ')}>
                <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  特色标签
                </Col>
                <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                  {this.renderProductTheme()}
                </Col>
              </Col>
            </Col>
          </Col>

          {/* 产品图片 */}
          <Col className={styles.addMod}>
            <Col className={styles.title}>
              <Col className={styles.titleL}>
                <Col className={styles.text}>产品图片</Col>
                <Col className={styles.btns} />
              </Col>
            </Col>
            <Col className={styles.content}>{this.proPhotos()}</Col>
          </Col>

          {/* 产品特色 */}
          <Col className={styles.addMod}>
            <Col className={styles.title}>
              <Col className={styles.titleL}>
                <Col className={styles.text}>产品特色</Col>
                <Col className={styles.btns} />
              </Col>
            </Col>
            <Col className={styles.content}>
              <Input.TextArea
                autosize={{ minRows: 4, maxRows: 8 }}
                value={data['产品信息'].feature}
                readOnly={readOnly}
              />
            </Col>
          </Col>

          {/* 产品行程 */}
          <Col className={styles.addMod}>
            <Col className={styles.title}>
              <Col className={styles.titleL}>
                <Col className={styles.text}>产品行程</Col>
                <Col className={styles.btns} />
              </Col>
            </Col>
            <Col className={styles.content}>
              <Col className={styles.scheduling}>
                <Col className={styles.schedulingT}>
                  <Col className={styles.schedulingTBtn}>
                    <Button shape="circle" icon="upload" />
                    <Button shape="circle" icon="delete" />
                  </Col>
                  <Col className={styles.schedulingTPageNum}>
                    <Button
                      shape="circle"
                      icon="minus"
                      disabled={pdfPageNum <= 1}
                      onClick={() => this.minusPage()}
                    />
                    <Button shape="circle" icon="plus" onClick={() => this.addPage()} />
                  </Col>
                </Col>
                <Col className={styles.schedulingContent}>
                  {data['产品信息'].attach ? this.renderPdf() : loadingCom}
                </Col>
              </Col>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Detail;
