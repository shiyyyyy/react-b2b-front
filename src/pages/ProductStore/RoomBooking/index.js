import React from 'react';
import {
  Input,
  Row,
  Col,
  Select,
  Carousel,
} from 'antd';

import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PictureList from '@/components/PictureList';
import getEnum from '@/utils/enum';
import AppCore from  '@/utils/core';
import {renderButton} from '@/utils/utils';
import ActionPageTable from '@/components/Table/ActionPageTable';
import ModalRender from '@/components/ModalRender';
import RowModal from '@/components/Table/RowModal'; 
import ActionPageHoc from '@/components/ActionPageHoc';
import styles from './index.less';

const { Option } = Select;

const selectCfg = {
  country_id:{'text':'所在国家','type':'Country'},
  city_id:{'text':'所在城市','type':'City'},
  star_level:{'text':'酒店星级','type':'StarLevel'}
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

@connect(({ meta: { actions ,blocks} }) => ({
  actions,
  blocks
}))
@ActionPageHoc
class RoomBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
          '产品信息':{},
          '产品图片':[],
          '房型管理':[],
          '特色标签':[]
      },
    }

    this.actionMap = {...props.actionMap};
    this.updata = this.updata.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.addImg = this.addImg.bind(this);
  }

  renderEnumSelect = (cfg,field,data) =>{
      const Enum = getEnum(cfg,data)||{};

      return (
        <Select 
          onChange={(value)=>{this.changeProInfo(field,value)}}
          showSearch
          optionFilterProp='children'
          className={styles.cellSelect}
          maxTagCount={10}
          maxTagTextLength={8}
          placeholder={cfg.text || ''}
          value={data[field]}
          key={field}
        >
          {
            Object.keys(Enum).map( key =>
              <Option key={key} value={key}>{Enum[key]}</Option>
            )
          }
        </Select>
      );
  }

  renderCityStar = () => {
    const {data} = this.state;
    return (
      <Col>
        {
            Object.keys(selectCfg).map((field) =>
              this.renderEnumSelect(selectCfg[field],field,data['产品信息'],null)
            )      
        }
      </Col>
    );
  };

  changeProTheme = (value) =>{
    const {data} = this.state;
    data['特色标签'] = [...value];
    this.setState({data});
  }

  renderProductTheme = () =>{
    const {data} = this.state;
    const Enum = getEnum('PdTheme');

    return (
      <Col>
        <Select 
          style={{minWidth: '200px'}}
          onChange={(value)=>{this.changeProTheme(value)}}
          showSearch
          optionFilterProp='children'
          mode='multiple'
          placeholder='特色标签'
          value={data['特色标签']}
        >
          {
            Object.keys(Enum).map( key =>
              <Option key={key} value={key}>{Enum[key]}</Option>
            )
          }
        </Select>
      </Col>
    )
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

  render() {
    const {location,actions,blocks} = this.props;
    const {data} = this.state;

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
                    酒店名称
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入酒店名称"
                      value={data['产品信息'].hotel_name || ''}
                      onChange={e => this.changeProInfo('hotel_name', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 城市星级 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    城市星级
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    {
                      this.renderCityStar()
                    }
                  </Col>
                </Col>
                {/* 酒店地址 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    酒店地址
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入酒店地址"
                      value={data['产品信息'].address || ''}
                      onChange={e => this.changeProInfo('address', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 酒店网址 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    酒店网址
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入酒店网址"
                      value={data['产品信息'].website || ''}
                      onChange={e => this.changeProInfo('website', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 酒店电话 */}
                <Col className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    酒店电话
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    <Input
                      placeholder="请输入酒店电话"
                      value={data['产品信息'].hotel_phone || ''}
                      onChange={e => this.changeProInfo('hotel_phone', e.target.value)}
                    />
                  </Col>
                </Col>
                {/* 特色主题 */}
                <Col>
                  <Col className={styles.cellLabel} xs={24} sm={3} md={3} lg={3}>
                    特色主题
                  </Col>
                  <Col className={styles.cellInput} xs={24} sm={20} md={20} lg={20}>
                    {
                      this.renderProductTheme()
                    }
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

            {/* 房型管理 */}
            <ActionPageTable
              block='房型管理'
              blockConfig={blocks['房型管理']}
              actionConfig={actions}
              dataSource={data['房型管理']}
              actionMap={this.actionMap}
            />
            {/* 酒店特色 */}
            <Col className={styles.addMod}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>酒店特色</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={styles.content}>
                <Input.TextArea
                  placeholder="请输入酒店特色"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.changeProInfo('feature', e.target.value)}
                  value={data['产品信息'].feature}
                />
              </Col>
            </Col>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default RoomBooking;
