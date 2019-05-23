import React from 'react';
import { Icon, Row, Col, Input, Upload, message } from 'antd';
import Swiper from 'swiper';

import styles from './index.less';

const { Dragger } = Upload;

class UpdataList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { id, loop, numSwiper } = this.props;
    new Swiper(`#${id}`, {
      loop: loop, // 循环模式选项
      slidesPerView: numSwiper,

      // 如果需要前进后退按钮
      navigation: {
        nextEl: `#${id}prevCtrl`,
        prevEl: `#${id}nextCtrl`,
      },
      // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
      observer: true,
    });
    // let that = this
    // let SwiperEl = document.getElementById(`${this.props.id}`);
    // this.slider = Array.from(SwiperEl.children[0].children);
    // this.slider.forEach(item => {
    //     item.addEventListener('click', function () {
    //         (that.clickSwiper.bind(this, that))()
    //     })
    // })
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info, index) => {
    const { updata } = this.props;
    if (info.fileList.length > 1) {
      info.fileList = info.fileList[info.fileList.length - 1];
    }
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        updata(index, imageUrl);
        this.setState({
          loading: false,
        });
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
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

  // clickSwiper (循环swiper的时候,用这个,不是循环的不用)
  // clickSwiper(that) {
  //     // this 是 当前标签元素,that是组件
  //     console.log(this)
  //     console.log(that)
  // }

  clickImg(item, index) {
    console.log(item);
    console.log(index);
  }

  // delete photos
  deletePhotos(item) {
    console.log(item);
  }

  // 图片描述(备注)
  photoComment(val, index) {
    console.log(val);
    console.log(index);
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
                <div className={[styles.item, ' swiper-slide'].join(' ')} key={index} id={item}>
                  <div className={styles['item-top']}>
                    <div className="text-center">{index + 1}</div>
                    <div>
                      <Icon type="minus-circle" onClick={_ => deleteImg(index)} />
                    </div>
                  </div>
                  <div className={styles['item-content']}>
                    <div className={styles['item-content-imgBox']}>
                      <Dragger
                        name="CarouselImg"
                        multiple={false}
                        className={styles.previewUploader}
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                        onChange={info => this.handleChange(info, index)}
                        onRemove={this.removeFile}
                      >
                        {item ? <img src={item} alt="图片" className=" img-size" /> : uploadButton}
                      </Dragger>
                    </div>
                  </div>
                  <div className={styles['item-btm']}>
                    <Input
                      placeholder="请输入图片文字描述"
                      onChange={e => this.photoComment(e.target.value, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
          {/* + */}
          <Col span={3} className={styles['add-btn']}>
            <Icon type="plus" className={styles['add-btn-icon']} onClick={_ => addImg()} />
          </Col>
          <div
            className={[styles['next'], 'swiper-button-next ProductPictures-next'].join(' ')}
            id={id + 'nextCtrl'}
          >
            {' '}
            <Icon type="right-circle" theme="filled" />
          </div>
          <div
            className={[styles['prev'], 'swiper-button-prev ProductPictures-prev'].join(' ')}
            id={id + 'prevCtrl'}
          >
            {' '}
            <Icon type="left-circle" theme="filled" />
          </div>
        </Col>
      </Row>
    );
  }
}

export default UpdataList;
