import React from 'react';
import { connect } from 'dva';

import { Icon, Row, Col, Tabs, Carousel } from 'antd';
import Swiper from 'swiper/dist/js/swiper';

import AllProduct from './AllProduct';
import Discount from './Discount';
import Introduction from './Introduction';
import Employee from './Employee';
import styles from './Supplier.less';

const { TabPane } = Tabs;

/* eslint react/no-array-index-key: 0 */

class Supplier extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [
        'http://uploads.5068.com/allimg/151111/48-151111112Z8.jpg',
        'http://img.kutoo8.com/upload/image/34092560/1390442684896_960x540.jpg',
        'http://f0.topitme.com/0/6a/6c/11800178627706c6a0o.jpg',
        'http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/07/ChMkJ1bKyyOIEM-iAAoiMiNFwUcAALImgJO8skACiJK516.jpg',
        'http://uploads.5068.com/allimg/1802/78-1P211141141.jpg',
        'http://2t.5068.com/uploads/allimg/151024/48-151024111511-50.jpg',
        'http://img.bbs.wisenjoy.com/forum/201505/28/193924b37jm9t64hlkd6mp.jpg',
        'http://pic1.16pic.com/00/05/21/16pic_521052_b.jpg',
        'http://b.zol-img.com.cn/desk/bizhi/image/5/960x600/1410751686498.jpg',
        'http://images.ali213.net/picfile/pic/2013/04/09/927_hzw%20%282%29.jpg',
        'http://pic1.win4000.com/wallpaper/2018-09-18/5ba0a6c8b3571.jpg?down',
        'http://bangimg1.dahe.cn/forum/pw/Mon_1207/254_162850_a7cf02bc3731570.gif',
        'http://xbox360.tgbus.com/UploadFiles/201004/20100427142822574.jpg',
        'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201604/30/210143sw8cxrbffnxf6zyf.jpg',
      ],
      discount: [
        {
          path: 'http://pic1.16pic.com/00/07/65/16pic_765243_b.jpg',
          name: '东南亚4国连游',
          id: '1',
          origin: '29999',
          present: '28888',
        },
        {
          path: 'http://pic2.16pic.com/00/07/65/16pic_765577_b.jpg',
          name: '东南亚4国连游',
          id: '2',
          origin: '19999',
          present: '18888',
        },
        {
          path:
            'http://img9.cache.hxsd.com/hxsdmy/gallery/2013/01/88/66/36/04/08/134038560/134038560_9.jpg',
          name: '东南亚4国连游',
          id: '3',
          origin: '9999',
          present: '8888',
        },
        {
          path: 'http://pic1.win4000.com/wallpaper/8/58589052d4f01.jpg',
          name: '东南亚4国连游',
          id: '4',
          origin: '13899',
          present: '9999',
        },
        {
          path: 'http://uploads.5068.com/allimg/1712/151-1G20PU024.jpg',
          name: '东南亚4国连游',
          id: '5',
          origin: '24999',
          present: '20999',
        },
      ],
    };

    this.carouselRef = null;
    this.setCarouselRef = el => {
      this.carouselRef = el;
    };
  }

  componentDidMount() {
    console.log(this);
 
    // 下面注释是为了eslint不报错
    /* eslint-disable no-new */
    new Swiper('#Supplier-swiper', {
      loop: true, // 循环模式选项
      slidesPerView: 7,

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.Supplier-index-prev',
        prevEl: '.Supplier-index-next',
      },
      // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
      observer: true,
    });
  }

  // 轮播图控件
  prevImg() {
    console.log(this.carouselRef);
    if (this.carouselRef) this.carouselRef.prev();
  }

  nextImg() {
    if (this.carouselRef) this.carouselRef.next();
  }

  // tab切换
  TabsChange(key) {
    console.log(key);
    console.log(this);
  }

  // 个人首页 tab 样式
  index() {
    const { photos, discount } = this.state;
    return (
      <div className={styles.index}>
        {/* 首页推介 轮播图 */}
        <Row>
          <Carousel
            ref={this.setCarouselRef}
            autoplay
            autoplaySpeed={4000}
            draggable
            className={styles.carousel}
          >
            {photos.map((item, index) => (
              <div key={index}>
                <img src={item || '/img/Login-bg.jpg'} className="img-initial" alt="轮播图" />
              </div>
            ))}
          </Carousel>
          <div className={styles.modalCarouselPrev} onClick={e => this.prevImg(e)}>
            <Icon type="left-circle" theme="filled" />
          </div>
          <div className={styles.modalCarouselNext} onClick={e => this.nextImg(e)}>
            <Icon type="right-circle" theme="filled" />
          </div>
        </Row>
        {/* 热卖推介 */}
        <Row style={{ marginTop: '16px' }}>
          <div className={styles.title}>
            <span className={styles.titleLeft}>热卖推介</span>
            <span className={styles.titleRight}>
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.hot}>
            {/* 非轮播图版本的 照片墙 */}
            {/* {
                photos.map( (item,index) => (
                    <Col className={"index-photo-box " + (index > 3 ? 'hide' : '')} key={index}>
                        <img onClick={_=>this.setState({photoWallShow: true})}
                        src={item} className="index-photo-item img-size" />
                    </Col>
                ))
            } */}
            {/* 轮播图版本的 照片墙 */}
            <div className="swiper-container" style={{ width: '100%' }} id="Supplier-swiper">
              <div className="swiper-wrapper">
                {photos.map((item, index) => (
                  <div className={`swiper-slide ${styles.hot_item}`} key={index}>
                    <img
                      onClick={_ => this.setState({ photoWallShow: true })}
                      src={item}
                      className={`img-size ${styles.indexPhotoItem}`}
                      alt="轮播图"
                    />
                  </div>
                ))}
              </div>
              <div className={`swiper-button-prev ${styles.SupplierIndexPrev}`}>
                {' '}
                <Icon type="left-circle" theme="filled" />
              </div>
              <div className={`swiper-button-next ${styles.SupplierIndexNext}`}>
                {' '}
                <Icon type="right-circle" theme="filled" />
              </div>
            </div>
          </Col>
        </Row>
        {/* 尾货甩卖 */}
        <Row>
          <div className="index-title">
            <span className="index-title-left">挥泪专区</span>
            <span className="index-title-right">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.discount}>
            {discount.map((item, index) => (
              <Col
                className={`${styles.discountItem} ${index > 4 ? 'hide' : ''}`}
                key={item.id}
              >
                <Col className={styles.discountItemPhoto} key={item.id}>
                  <img
                    src={
                      item.url || 'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=450,600/sign=cec4fe7364d0f703e6e79dd83dca7d0b/7a899e510fb30f2406704467ce95d143ac4b03ef.jpg'
                    }
                    className="img-size"
                    alt="轮播图"
                  />
                </Col>
                <Col className={styles.discountItemProInfo}>
                  <Col span={16} className={styles.discountInfo}>
                    <div className={styles.discountName}>南非欧洲双周双洲尽情游</div>
                    <div className="">2018-08-08</div>
                  </Col>
                  <Col span={7} push={1} className="prici-discount">
                    <div className={styles.originPrice}>￥28888</div>
                    <div className={styles.discountPrice}>￥19999</div>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Row className={styles.Supplier}>
        {/* 内容 */}
        <Col className={styles.content}>
          {/* </Row> */}
          <Row>
            <Col>
              <Tabs defaultActiveKey="1" onChange={key => this.TabsChange(key)} className="text-center">
                <TabPane tab="店铺首页" key="1">
                  {/* <Route exact path="/Personal" component={index} /> */}
                  {this.index()}
                </TabPane>
                <TabPane tab="全部产品" key="2">
                  <AllProduct />
                  {/* <Route path="/Personal/Recommend" component={Recommend} /> */}
                </TabPane>
                <TabPane tab="尾货甩卖" key="3">
                  <Discount />
                  {/* <Route path="/Personal/History" component={History} /> */}
                </TabPane>
                <TabPane tab="企业简介" key="4">
                  <Introduction />
                  {/* <Route path="/Personal/QA" component={QA} /> */}
                </TabPane>
                <TabPane tab="金牌员工" key="5">
                  <Employee />
                  {/* <Route path="/Personal/LatestNews" component={LatestNews} /> */}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(({ setting }) => ({ setting }))(Supplier);
