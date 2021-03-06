import React from 'react';
import {
  Input,
  Radio,
  Row,
  Col,
  Select,
  Carousel,
  Upload,
  Button,
  Icon,
  message
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActionPageHoc from '@/components/ActionPageHoc';
import PictureList from '@/components/PictureList';


import getEnum from '@/utils/enum';
import AppCore from  '@/utils/core';
import {searchChange,renderButton} from '@/utils/utils';
import {upload} from '@/utils/request';
import {loadPdf,prePage,nextPage,goTOPage} from '@/utils/pdf';

import styles from './index.less';

const { Option } = Select;
const RadioGroup = Radio.Group;
const selectCfg = {
  pd_kind_id:{'text':'出境/国内','type':'PdKind'},
  pd_tag_id:{'text':'一级导航','type':'PdTag'},
  pd_subtag_id:{'text':'二级导航','type':'PdSubTag','cascade':'pd_tag_id'}
};

function renderImg(item){
  let url = item
  if(url.indexOf('http') !== 0 && AppCore.HOST){
    url = `${AppCore.HOST}/${url}`
  }
  return (
    <div key={item}>
      <img src={url || "/img/login-bg.png"} alt="产品图片" className="img-size" />
    </div>
  );
}

@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class VisaBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
          '产品信息':{},
          '产品图片':[],
          pdfUrl:''
      },
      pdfPageNum: 1,
      pdfLoading:false
    }
    this.pdfCt = '';
    this.canvas = '';
    this.actionMap = {...props.actionMap};
    this.init = this.init.bind(this);
    this.updata = this.updata.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.addImg = this.addImg.bind(this);
    this.handlePdfUpload = this.handlePdfUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  init = ()=>{
    const {data} = this.state;
    if(data.pdfUrl){
      this.setState({pdfLoading:true},()=>{
        loadPdf(
          `${AppCore.HOST}/${data.pdfUrl}`,
          this.canvas,
          1000
        )
      })
    }
  }

  renderEnumSelect = (cfg,field,data,index) =>{
      const Enum = getEnum(cfg,data)||{};

      return (
        <Select 
          onChange={(value)=>{this.changeProTag(value,field,index)}}
          showSearch
          optionFilterProp='children'
          className={styles.cellSelect}
          maxTagCount={10}
          maxTagTextLength={8}
          placeholder={cfg.text || ''}
          value={data[field]}
          key={`${field}/${index}`}
        >
          {
            Object.keys(Enum).map( key =>
              <Option key={key} value={key}>{Enum[key]}</Option>
            )
          }
        </Select>
      );
  }

  renderProductTag = (item, index) => {
    return (
      <Col key={index}>
        {
            Object.keys(selectCfg).map((field) =>
              this.renderEnumSelect(selectCfg[field], field,item,index)
            )      
        }
      </Col>
    );
  };

  // pdf
  handleChange = (info) => {
    const { data } = this.state;
    if (info.file.status === 'uploading') {
      this.setState({ pdfLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      data.pdfUrl = info.file.pdfUrl;
      this.setState({
        pdfLoading: false,
        data
      },()=>loadPdf(
        `${AppCore.HOST}/${info.file.pdfUrl}`,
        this.canvas,
        1000
      ));
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  handlePdfUpload = ({ file }) => {
    const {uploadType='productPdf'} = this.props;
    const formData = new FormData();
    formData.append('file', file);
    upload(formData,uploadType).then(res=>{
      if(res.success&&res.save_path){
        const fileinfo = {file:{status:'done',pdfUrl:res.save_path}}
        this.handleChange(fileinfo);
      }else{
        this.handleChange({file:{status:'error',name:file.name}});
      }
    },()=>{
      this.handleChange({file:{status:'error',name:file.name}});
    })
  };

  goToPDFPage =(nums) =>{
    const pages = goTOPage(nums);
    this.setState({pdfPageNum:pages});
  }

  minusPage = ()=>{
    const pages = prePage();
    this.setState({pdfPageNum:pages});
  }

  addPage = ()=>{
    const pages = nextPage();
    this.setState({pdfPageNum:pages});
  }

  // 新增或者替换图片
  updata(index, imageUrl) {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state;
    let url = imageUrl;
    if(url.indexOf('http') !== 0 && AppCore.HOST){
      url = `${AppCore.HOST}/${url}`
    }
    data['产品图片'][index] = url;
    this.setState({ data });
  }

  // 删除图片
  deleteImg(index) {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state;
    data['产品图片'].splice(index, 1);
    this.setState({ data });
  }

  // 新增图片(其实是新增上传框)
  addImg() {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state;
    data['产品图片'].push('');
    this.setState({ data });
  }

  // 产品图片
  proPhotos() {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state;

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
    return <PictureList {...swiperCfg} uploadType='productPic' />;
  }

  //  产品信息 Change
  changeProInfo(type, val) {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state;
    data['产品信息'][type] = val;
    this.setState({ data });
  }

  //  产品标签 Change
  changeProTag(val, field, index) {
    // const { packagedata:{data} } = this.props;
    const {data} = this.state ;
    data['产品标签'][index][field] = val;
    data['产品标签'][index] = searchChange(selectCfg,field,data['产品标签'][index]);
    this.setState({ data });
  }

  renderPdf(){
    return (
      <div ref={(ref) => { this.pdfCt = ref }}>
        <canvas ref={(ref)=> {this.canvas = ref}} />
      </div>
    );
  }

  render() {
    const {location,actions} = this.props;
    const {data,pdfPageNum,pdfLoading} = this.state;

    const uploadButton = (
      <div>
        <Icon type={pdfLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const {action} = location.state;
    const config = actions[action];

    return (
      <PageHeaderWrapper headerPage={renderButton(config,this.actionMap)}>
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
                    {data['产品图片'].map(item => (
                      renderImg(item)
                    ))}
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
                {/* 搜索标签 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                  途径国家
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Select
                      showSearch
                      value={data['产品信息'].country_id || ''}
                      onChange={val => this.changeProInfo('country_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={8}
                    >
                      {Object.keys(getEnum('Country') || {}).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('Country')[item]}
                        </Option>
                      ))}
                    </Select>
                    签证类型
                    <Select
                      showSearch
                      value={data['产品信息'].kind_id || ''}
                      onChange={val => this.changeProInfo('kind_id', val)}
                      className={styles.cellSelect}
                      maxTagCount={10}
                      maxTagTextLength={10}
                    >
                      {Object.keys(getEnum('VisaKind') || {} ).map(item => (
                        <Option value={item} key={item}>
                          {getEnum('VisaKind')[item]}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Col>
                {/* 办理时长 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    办理时长
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入办理时长"
                      value={data['产品信息'].handing_time || ''}
                      onChange={e => this.changeProInfo('handing_time', e.target.value)}
                    />
                    <span> 个工作日(指定送进使馆到出签所需要的时间) </span>
                  </Col>
                </Col>
                {/* 有效期限 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    有效期限
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入有效期限"
                      value={data['产品信息'].period_of_validity || ''}
                      onChange={e => this.changeProInfo('period_of_validity', e.target.value)}
                    />
                    <span> (指签证有效期时间范围) </span>
                  </Col>
                </Col>
                {/* 可用次数 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    可用次数
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入可用次数"
                      value={data['产品信息'].usable_times || ''}
                      onChange={e => this.changeProInfo('usable_times', e.target.value)}
                    />
                    <span> (指是否可以在有效期内反复使用，多次出入境) </span>
                  </Col>
                </Col>
                {/* 面签情况 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    面签情况
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <RadioGroup
                      onChange={e => this.changeProInfo('is_face', e.target.value)}
                      value={data['产品信息'].is_face}
                    >
                      {Object.keys({1:'是',2:'否',3:'抽查'}).map(key => (
                        <Radio value={key} key={key}>
                          {{1:'是',2:'否',3:'抽查'}[key]}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </Col>
                </Col>
                {/* 销签情况 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    是否销签
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <RadioGroup
                      onChange={e => this.changeProInfo('is_destroy', e.target.value)}
                      value={data['产品信息'].is_destroy}
                    >
                      {Object.keys({1:'是',2:'否',3:'抽查'}).map(key => (
                        <Radio value={key} key={key}>
                          {{1:'是',2:'否',3:'抽查'}[key]}
                        </Radio>
                      ))}
                    </RadioGroup>
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
            {/* 提醒说明 */}
            <Col className={styles.addMod}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>提醒说明</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={styles.content}>
                <Input.TextArea
                  placeholder="请输入提醒说明"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.changeProInfo('comment', e.target.value)}
                  value={data['产品信息'].comment}
                />
              </Col>
            </Col>
            {/* 产品行程 */}
            <Col className={styles.addMod}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>所需资料</Col>
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
                      <Button
                        shape="circle"
                        icon="plus"
                        onClick={() => this.addPage()}
                      />
                    </Col>
                  </Col>
                  <Col className={styles.schedulingContent}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={this.handleChange}
                      customRequest={({ file })=>this.handlePdfUpload({ file })}
                    >
                      {data.pdfUrl ? this.renderPdf() : uploadButton}
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

export default VisaBooking;
