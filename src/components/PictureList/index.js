import React from 'react';
import { Icon, Row, Col, Upload, message } from 'antd';
import Swiper from 'swiper';

import styles from './index.less';
import {upload} from '@/utils/request';

const { Dragger } = Upload;

class PictureList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { id, loop, numSwiper } = this.props;
    new Swiper(`#${id}`, {
      loop, // 循环模式选项
      slidesPerView: numSwiper,

      // 如果需要前进后退按钮
      navigation: {
        nextEl: `#${id}prevCtrl`,
        prevEl: `#${id}nextCtrl`,
      },
      observer: true,
    });
  }

  handleChange = (info, index) => {
    const { updata } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      updata(index,info.file.url);
      this.setState({
        loading: false,
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  handleCustomRequest = ({ file },index) => {
    const {uploadType='productPdf'} = this.props;
    const formData = new FormData();
    formData.append('file', file);
    upload(formData,uploadType).then(res=>{
      if(res.success&&res.save_path){
        const fileinfo = {file:{status:'done',url:res.save_path}}
        this.handleChange(fileinfo,index);
      }else{
        this.handleChange({file:{status:'error',name:file.name}},index);
      }
    },()=>{
      this.handleChange({file:{status:'error',name:file.name}},index);
    })
  };

  beforeUpload(file) {
    console.log(this);
    const isSuffixType = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isSuffixType) {
      message.error('格式不对, 请上传JPG或者PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('图片最大不能超过3MB!');
    }
    return isSuffixType && isLt2M;
  }

  render() {
    const { data, deleteImg, addImg, id } = this.props;
    const { loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Row>
        <Col className={[styles.UpdataList, 'clear'].join(' ')}>
          {/* 产品图片 */}
          <Col span={21} className="swiper-container" id={id}>
            <div className="swiper-wrapper">
              {// 最少3个,但是会有问题
              // (data.length > 0
              // ? data
              // : data.concat(new Array(3 - [data].length).fill(''))
              // )
              (data.length > 0 ? data : ['']).map((item, index) => (
                <div className={[styles.item, ' swiper-slide'].join(' ')} key={item} id={item}>
                  <div className={styles['item-top']}>
                    <div className="text-center">{index + 1}</div>
                    <div>
                      <Icon type="minus-circle" onClick={() => deleteImg(index)} />
                    </div>
                  </div>
                  <div className={styles['item-content']}>
                    <div className={styles['item-content-imgBox']}>
                      <Dragger
                        name="CarouselImg"
                        multiple={false}
                        className={styles.previewUploader}
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                        onChange={info => this.handleChange(info, index)}
                        onRemove={this.removeFile}
                        customRequest={({ file })=>this.handleCustomRequest({ file },index)}
                      >
                        {item ? <img src={item} alt="图片" className=" img-size" /> : uploadButton}
                      </Dragger>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          {/* + */}
          <Col span={3} className={styles['add-btn']}>
            <Icon type="plus" className={styles['add-btn-icon']} onClick={() => addImg()} />
          </Col>
          <div
            className={[styles.next, 'swiper-button-next ProductPictures-next'].join(' ')}
            id={`${id}nextCtrl`}
          >
            {' '}
            <Icon type="right-circle" theme="filled" />
          </div>
          <div
            className={[styles.prev, 'swiper-button-prev ProductPictures-prev'].join(' ')}
            id={`${id}prevCtrl`}
          >
            {' '}
            <Icon type="left-circle" theme="filled" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default PictureList;
