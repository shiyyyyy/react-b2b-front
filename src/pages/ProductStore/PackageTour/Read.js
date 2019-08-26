import React from 'react';
import {
  Input,
  InputNumber,
  Radio,
  Row,
  Col,
  Select,
  Divider,
  Carousel,
  Button,
  Checkbox
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActionPageHoc from '@/components/ActionPageHoc';

import getEnum from '@/utils/enum';
import AppCore from '@/utils/core';
import { searchChange, renderButton } from '@/utils/utils';
import { loadPdf, prePage, nextPage, goTOPage } from '@/utils/pdf';


import styles from './index.less';

const { Option } = Select;
const RadioGroup = Radio.Group;
const selectCfg = {
  pd_kind_id: { text: '出境/国内', type: 'PdKind' },
  pd_tag_id: { text: '一级导航', type: 'PdTag' },
  pd_subtag_id: { text: '二级导航', type: 'PdSubTag', cascade: 'pd_tag_id' },
};

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

@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class PackageTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        产品信息: {},
        产品图片: [],
        产品标签: [{}, {}],
        游玩主题: [],
        pdfUrl: '',
      },
      pdfPageNum: 1,
    };
    this.pdfCt = '';
    this.canvas = '';
    this.actionMap = {...props.actionMap};
    this.init = this.init.bind(this);
  }

  init = ()=>{
    const { data } = this.state;
    if (data.pdfUrl) {
      loadPdf(`${AppCore.HOST}/${data.pdfUrl}`, this.canvas, 1000);
    }
  }

  renderEnumSelect = (cfg, field, data, index) => {
    const Enum = getEnum(cfg, data) || {};

    return (
      <Select
        disabled
        onChange={value => {
          this.changeProTag(value, field, index);
        }}
        showSearch
        optionFilterProp="children"
        className={styles.cellSelect}
        maxTagCount={10}
        maxTagTextLength={8}
        placeholder={cfg.text || ''}
        value={data[field]}
        key={`${field}/${index}`}
      >
        {Object.keys(Enum).map(key => (
          <Option key={key} value={key}>
            {Enum[key]}
          </Option>
        ))}
      </Select>
    );
  };

  renderProductTag = (item, index) => {
    return (
      <Col key={index}>
        {Object.keys(selectCfg).map(field =>
          this.renderEnumSelect(selectCfg[field], field, item, index)
        )}
      </Col>
    );
  };

  cancel = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.goBack());
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

  //  产品信息 Change
  changeProInfo(type, val) {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    data['产品信息'][type] = val;
    this.setState({ data });
  }

  //  产品标签 Change
  changeProTag(val, field, index) {
    // const { packagedata:{data} } = this.props;
    const { data } = this.state;
    data['产品标签'][index][field] = val;
    data['产品标签'][index] = searchChange(selectCfg, field, data['产品标签'][index]);
    this.setState({ data });
  }

  renderPdf() {
    return (
      <div
        ref={ref => {
          this.pdfCt = ref;
        }}
      >
        <canvas
          ref={ref => {
            this.canvas = ref;
          }}
        />
      </div>
    );
  }

  render() {
    const { location, actions } = this.props;
    const { data, pdfPageNum } = this.state;

    const noButton = (
      <div>
        <div className="text-center">没有行程PDF</div>
      </div>
    );

    const { action } = location.state;
    const config = actions[action];
    const map = {
      关闭: this.cancel,
    };
    return (
      <PageHeaderWrapper headerPage={renderButton(config, map)}>
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
                      disabled
                      placeholder="请输入产品名称"
                      value={data['产品信息'].pd_name || ''}
                      onChange={e => this.changeProInfo('pd_name', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 导航标签 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    导航标签
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    {data['产品标签'].map((item, index) => this.renderProductTag(item, index))}
                  </Col>
                </Col>
                {/* 往返城市 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    出发城市
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      disabled
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
                      disabled
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
                {/* 天数晚数 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    天数晚数
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <InputNumber
                      disabled
                      min={1}
                      max={999}
                      value={data['产品信息'].nights || 0}
                      onChange={val => this.changeProInfo('nights', val)}
                    />
                    &nbsp; 晚
                    <Divider type="vertical" />
                    <InputNumber
                      disabled
                      min={1}
                      max={999}
                      value={data['产品信息'].days || 0}
                      onChange={val => this.changeProInfo('days', val)}
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
                    <RadioGroup
                      disabled
                      onChange={e => this.changeProInfo('own_expense', e.target.value)}
                      value={data['产品信息'].own_expense}
                    >
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
                    <RadioGroup
                      disabled
                      onChange={e => this.changeProInfo('shopping', e.target.value)}
                      value={data['产品信息'].shopping}
                    >
                      {Object.keys({ 0: '无购物', 1: '有购物' }).map(key => (
                        <Radio value={key} key={key}>
                          {{ 0: '无购物', 1: '有购物' }[key]}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Col>
                </Col>
                {/* 游玩主题 */}
                <Col>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    游玩主题
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Checkbox.Group
                      disabled
                      style={{ width: '100%' }}
                      onChange={val => this.changeProInfo('theme', val)}
                      value={data['产品信息'].theme}
                    >
                      <Row>
                        {[
                          '海岛',
                          '蜜月',
                          '亲子',
                          '夕阳红',
                          '美容',
                          '研学',
                          '海岛1',
                          '蜜月1',
                          '亲子1',
                          '夕阳红1',
                          '美容1',
                          '研学1',
                          '海岛2',
                          '蜜月3',
                          '亲子4',
                          '夕阳红5',
                          '美容6',
                          '研学7',
                        ].map((key, index) => (
                          <Col xs={8} sm={6} md={6} lg={6} xl={4} key={index}>
                            <Checkbox value={key}>{key}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </Col>
                </Col>
              </Col>
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
                  disabled
                  placeholder="请输入产品特色"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.changeProInfo('feature', e.target.value)}
                  value={data['产品信息'].feature}
                />
              </Col>
            </Col>

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
                    <Col className={styles.schedulingTBtn} />
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
                    {data.pdfUrl ? this.renderPdf() : noButton}
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default PackageTour;
