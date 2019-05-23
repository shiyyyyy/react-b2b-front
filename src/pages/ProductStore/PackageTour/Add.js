import React from 'react';
import {
  Input,
  InputNumber,
  Icon,
  Radio,
  Button,
  Row,
  Col,
  Select,
  Divider,
  Upload,
  message,
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UpdataList from '@/components/UpdataList';

import styles from './index.less';

const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(({ packagedata, loading, meta: { actions } }) => ({
  packagedata,
  loading: loading.models.packagedata,
  actions,
}))

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { "订单管理" : {}},
      PDFpage: 1,
      PDFloading: false,
      PDFdata: '',
    };

    this.selectFilter = this.selectFilter.bind(this);
    this.updata = this.updata.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.addImg = this.addImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit = () => {
    const {
      dispatch,
      packagedata: { data },
      location,
    } = this.props;
    data.id = location.state.id;
    dispatch({
      type: 'packagedata/submit',
      payload: data,
    });
  };

  cancel = () => {
    const { dispatch } = this.props;

    dispatch(routerRedux.goBack());
  };

  //  input Change
  changeInput(type, val) {
    console.log(type);
    console.log(val);
    let { data } = this.state;
    data['订单管理'][type] = val;
    this.setState({ data });
  }

  // selectFilter
  selectFilter(inputVal, option) {
    console.log(inputVal);
    console.log(option);
  }

  onkeydown = (id, e) => {
    console.log(e);
    console.log(id);
  };

  // 新增或者替换图片
  updata(index, imageUrl) {
    const { data } = this.state;
    data.proImgs[index] = imageUrl;
    this.setState({ data });
  }

  // 删除图片
  deleteImg(index) {
    console.log(this);
    let { data } = this.state;
    data.proImgs.splice(index, 1);
    this.setState({ data });
  }

  // 新增图片(其实是新增上传框)
  addImg() {
    const { data } = this.state;
    data.proImgs.push('');
    this.setState({ data });
  }

  proPhotos() {
    const {
      data: { proImgs = [] },
    } = this.state;
    const swiperCfg = {
      id: 'GroupTourAdd',
      loop: false,
      numSwiper: 3.5,
      // height: '260px',
      data: proImgs,
      // 新增或者替换图片
      updata: this.updata,
      // 删除图片
      deleteImg: this.deleteImg,
      // 新增图片(图片上传框)
      addImg: this.addImg,
    };
    return <UpdataList {...swiperCfg} />;
  }

  // 产品特色 更爱 (textarea)
  textAearChange(val) {
    console.log(val);
  }

  // PDF +- 页  更改 && 跳转
  minusPage() {
    let { PDFpage: page } = this.state;
    page <= 1 ? page : --page;
    this.setState({ PDFpage: page });
  }

  plusPage() {
    let { PDFpage: page } = this.state;
    page >= 13 ? page : ++page;
    this.setState({ PDFpage: page });
  }

  chengePage(val) {
    const page = parseInt(val);
    console.log(page);
    this.setState({ PDFpage: page });
  }

  goToPDFPage(val) {
    console.log(val);
    console.log(this);
  }

  // PDF 事件
  getBase64(img, callback) {
    console.log(this);
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('请上传PDF格式文件!');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('PDF文件最大20M!');
    }
    return isPDF && isLt20M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ PDFloading: true });
      return;
    }
    console.log(this);
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          PDFdata: imageUrl,
          PDFloading: false,
        })
      );
    }
  };

  render() {
    const { PDFpage, PDFdata, PDFloading, data } = this.state;
    const uploadButton = (
      <div>
        <Icon type={PDFloading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper>
        <Row>
          <Col className={styles.add}>
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>订单管理</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              {/* 产品图片 */}
              <Col xs={24} sm={24} md={10} lg={10}  className={styles.imgWrapper}>
                <Col className={styles.imgBox}>
                  <img src="/img/login-bg.png" />
                </Col>
              </Col>
              {/* 产品名称 */}
              <Col className={styles.content} xs={24} sm={24} md={14} lg={14} style={{paddingLeft: '24px'}}>
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    产品名称
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入产品名称"
                      value={data['订单管理']['proName'] || ''}
                      onChange={e => this.changeInput('proName', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 导航标签 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    导航标签
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value="1"
                      onChange={val => this.changeInput('type', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={6}
                    >
                      <Option value="1">跟团游</Option>
                    </Select>
                    <Select
                      showSearch
                      value={data['订单管理']['tag'] || ''}
                      onChange={val => this.changeInput('tag', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      showSearch
                      value={data['订单管理']['subTag'] || ''}
                      onChange={val => this.changeInput('subTag', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={10}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  {/* <Col
                    className={styles.cellInput2}
                    xs={{ span: 24, offset: 0 }}
                    sm={{ span: 20, offset: 3 }}
                    md={{ span: 20, offset: 3 }}
                    lg={{ span: 20, offset: 3 }}
                  >
                    <Select
                      showSearch
                      value={1}
                      onChange={val => this.changeInput('type', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={6}
                    >
                      <Option value="跟团游">跟团游</Option>
                    </Select>
                    <Select
                      showSearch
                      value={data['订单管理']['tag'] || ''}
                      onChange={val => this.changeInput('tag', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      showSearch
                      value={data['订单管理']['subTag'] || ''}
                      onChange={val => this.changeInput('subTag', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={10}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Col> */}
                </Col>
                {/* 往返城市 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    出发城市
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value={data['订单管理']['depCity'] || ''}
                      onChange={val => this.changeInput('depCity', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      showSearch
                      value={data['订单管理']['backCity'] || ''}
                      onChange={val => this.changeInput('backCity', val)}
                      filterOption={this.selectFilter}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={10}
                    >
                      {[1, 2, 3, 4, 5].map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Col>
                {/* 往返交通 */}
                {/* <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    往返交通
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={14} md={14} lg={14}>
                    <Input
                      placeholder="请输入往返交通"
                      value={data['订单管理']['triffic'] || ''}
                      onChange={e => this.changeInput('triffic', e.target.value)}
                    />
                  </Col>
                </Col> */}
                {/* 住宿标准 */}
                {/* <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    住宿标准
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={14} md={14} lg={14}>
                    <Input
                      placeholder="请输入住宿标准"
                      value={data['订单管理']['accommodation'] || ''}
                      onChange={e => this.changeInput('accommodation', e.target.value)}
                    />
                  </Col>
                </Col> */}
                {/* 用餐标准 */}
                {/* <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    用餐标准
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={14} md={14} lg={14}>
                    <Input
                      placeholder="请输入用餐标准"
                      value={data['订单管理']['diningStandards'] || ''}
                      onChange={e => this.changeInput('diningStandards', e.target.value)}
                    />
                  </Col>
                </Col> */}
                {/* 天数晚数 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    天数晚数
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <InputNumber
                      min={1}
                      max={999}
                      value={data['订单管理']['nights'] || 0}
                      onChange={val => this.changeInput('nights', val)}
                    />
                    &nbsp; 晚
                    <Divider type="vertical" />
                    <InputNumber
                      min={1}
                      max={999}
                      value={data['订单管理']['days'] || 0}
                      onChange={val => this.changeInput('days', val)}
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
                      onChange={e => this.changeInput('ownExpense', e.target.value)}
                      value={data['订单管理']['ownExpense']}
                    >
                      {['有自费', '无自费'].map(item => (
                        <Radio value={item} key={item}>
                          {item}
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
                      onChange={e => this.changeInput('shopping', e.target.value)}
                      value={data['订单管理']['shopping']}
                    >
                      {['有自费', '无自费'].map(item => (
                        <Radio value={item} key={item}>
                          {item}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Col>
                </Col>
              </Col>
            </Col>

            {/* 产品图片 */}
            <Col className={styles.addMod}>
              <Col className={styles.addTitle}>产品图片</Col>
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
                  placeholder="请输入产品特色"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.textAearChange(e.target.value)}
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
                        disabled={PDFpage <= 1}
                        onClick={_ => this.minusPage()}
                      />
                      <Input
                        value={PDFpage}
                        className={styles.schedulingTPageNumInput}
                        onChange={e => this.chengePage(e.target.value)}
                        onBlur={e => this.goToPDFPage(e.target.value)}
                        onPressEnter={e => this.goToPDFPage(e.target.value)}
                      />
                      <Button
                        shape="circle"
                        icon="plus"
                        disabled={PDFpage >= 13}
                        onClick={_ => this.plusPage()}
                      />
                    </Col>
                  </Col>
                  <Col className={styles.schedulingContent}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                    >
                      {PDFdata ? <img src={PDFdata} alt="avatar" /> : uploadButton}
                    </Upload>
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

export default Add;
