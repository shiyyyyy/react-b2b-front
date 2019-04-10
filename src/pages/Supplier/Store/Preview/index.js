import React from 'react';
import { connect } from 'dva';
import { Icon, Row, Col, Tabs, Carousel } from 'antd';
// import Swiper from 'swiper/dist/js/swiper';
import BreadcrumbRender from '@/components/Breadcrumb'; 
import LeavingMsg from '@/components/LeavingMsg'; 
import AccessRecord from '@/components/AccessRecord'; 

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
      message: [
        {
          company: '北京青年旅行社有限公司',
          department: '信息部',
          employee: '计胜',
          time: '2018-08-08 12:53:24',
          zan: '996',
          qa: '4396',
          content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`,
        },
        {
          company: '北京青年旅行社有限公司',
          department: '信息部',
          employee: '计胜',
          time: '2018-08-08 12:53:24',
          zan: '996',
          qa: '4396',
          content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`,
        },
        {
          company: '北京青年旅行社有限公司',
          department: '信息部',
          employee: '计胜',
          time: '2018-08-08 12:53:24',
          zan: '996',
          qa: '4396',
          content: `夜曲 - 周杰伦
,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情,啊 乌云开始遮蔽 夜色不干净,公园里 葬礼的回音 在漫天飞行,送你的 白色玫瑰,在纯黑的环境凋零,乌鸦在树枝上诡异的很安静,静静听 我黑色的大衣,想温暖你 日渐冰冷的回忆,走过的 走过的 生命,啊 四周弥漫雾气,我在空旷的墓地,老去后还爱你,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名,在月光下弹琴,对你心跳的感应,还是如此温热亲近,怀念你那鲜红的唇印,那些断翅的蜻蜓 散落在这森林,而我的眼睛 没有丝毫同情,失去你 泪水混浊不清,失去你 我连笑容都有阴影,风在长满青苔的屋顶,嘲笑我的伤心,像一口没有水的枯井,我用凄美的字型,描绘后悔莫及的那爱情,为你弹奏萧邦的夜曲,纪念我死去的爱情,跟夜风一样的声音,心碎的很好听,手在键盘敲很轻,我给的思念很小心,你埋葬的地方叫幽冥,为你弹奏萧邦的夜曲,纪念我死去的爱情,而我为你隐姓埋名 在月光下弹琴,对你心跳的感应 还是如此温热亲近,怀念你那鲜红的唇印,一群嗜血的蚂蚁 被腐肉所吸引,我面无表情 看孤独的风景,失去你 爱恨开始分明,失去你 还有什么事好关心,当鸽子不再象征和平,我终于被提醒,广场上喂食的是秃鹰,我用漂亮的押韵,形容被掠夺一空的爱情`,
        },
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
      visitingRecords: [
        { time: '2018-08-07', name: '我落泪', avatar: '' },
        { time: '2018-08-07', name: '情绪零碎', avatar: '' },
        { time: '2018-08-07', name: '地上断了翅的蝶', avatar: '' },
        { time: '2018-08-07', name: '张三', avatar: '' },
        { time: '2018-08-07', name: '李四', avatar: '' },
        { time: '2018-08-07', name: '王二麻子', avatar: '' },
        { time: '2018-08-07', name: '小淘气', avatar: '' },
        { time: '2018-08-07', name: '满地的落叶', avatar: '' },
        { time: '2018-08-07', name: '凋谢', avatar: '' },
        { time: '2018-08-07', name: '我不想再写', avatar: '' },
        { time: '2018-08-07', name: '随手撕下这一页', avatar: '' },
        { time: '2018-08-07', name: '把诗折叠', avatar: '' },
        { time: '2018-08-07', name: '分手在季风这个季节', avatar: '' },
      ],
    };

    this.carouselRef = null;
    this.setCarouselRef = el => {
      this.carouselRef = el;
    };
  }

  componentDidMount() {}

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

  // 店铺首页
  index() {
    const { photos, discount, message, visitingRecords } = this.state;
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
          <div className="mod-title">
            <span className="mod-text">热卖推介</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={[styles.hot, 'clear'].join(' ')}>
            {discount.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index} className={styles.hotItem}>
                <Col className={styles.autoBox}>
                  <Col className={styles.hotImgBox}>
                    <img src={item.path} alt="hot" />
                  </Col>
                </Col>

                <Col className={styles.hotMain}>
                  <Col className={styles.name}>曼谷芭提雅5晚6天豪华游曼谷芭…</Col>
                  <Col className="clear">
                    <Col span={14}>团期：2017-09-09</Col>
                    <Col span={10} className={styles.info}>
                      库存：<span>2</span>
                    </Col>
                  </Col>
                  <Col className={[styles.price, 'clear'].join(' ')}>
                    <Col className={styles.left}>￥1280</Col>
                    <Col className={styles.right}>￥2980</Col>
                  </Col>
                </Col>
              </Col>
            ))}
          </Col>
        </Row>
        {/* 尾货甩卖 */}
        <Row>
          <div className="mod-title">
            <span className="mod-text">同行留言</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.Msg}>
            {message.map((item, index) => (
              <Col className={`${index >= 3 ? 'hide' : ''}`} key={index}>
                <LeavingMsg item={item} />
              </Col>
            ))}
          </Col>
        </Row>
        {/* 到访记录 */}
        <Row>
          <div className="mod-title">
            <span className="mod-text">到访记录</span>
            <span className="mod-more">
              更多
              <Icon type="right" />
            </span>
          </div>
          <Col className={styles.record}>
            {visitingRecords.map((item, index) => (
              <Col
                key={index}
                className={index >= 10 ? 'hide' : ''}
                // style={{ width: `calc(100% * 1/10)` }}
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={2}
              >
                {/* 上面的1/10就是一行显示10个,应该和index >= 10相同,占满一行,多出隐藏 */}
                <AccessRecord item={item} />
              </Col>
            ))}
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { location, breadcrumbNameMap } = this.props;
    return (
      <Row className={styles.Supplier}>
        <Col className={styles.breadcrumb}>
          <BreadcrumbRender location={location} breadcrumbNameMap={breadcrumbNameMap} />
        </Col>
        {/* 内容 */}
        <Col className={styles.content}>
          {/* </Row> */}
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="1"
                onChange={key => this.TabsChange(key)}
                className="text-center"
              >
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

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(Supplier);
