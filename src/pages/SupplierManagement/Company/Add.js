import React from 'react';
import {
  Input,
  Col,
  Upload,
  Icon,
  message,
  Button
} from 'antd';
import { connect } from 'dva';

import { renderButton } from '@/utils/utils';
import {upload} from '@/utils/request';
import getEnum from '@/utils/enum';
import AppCore from  '@/utils/core';

import FastSelect from '@/components/FastSelect';


import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActionPageHoc from '@/components/ActionPageHoc';


import styles from './index.less';

/* eslint react/no-multi-comp:0 */

function renderImg(item){
  let url = item
  if(url.indexOf('http') !== 0 && AppCore.HOST){
    url = `${AppCore.HOST}/${url}`
  }
  return (
    <img src={url} alt="avatar" style={{ width: '100%',height:'200px' }} />
  );
}

function renderUploadButton(loading){
  return (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
}


@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stampLoading:false,
      yyzzLoading:false,
      jyLoading:false,
      zrxLoading:false,
      data: {
        供应商信息: {
        },
        业务联系人:[],
        stamp: '',
        营业执照: '',
        经营许可证: '',
        旅行社责任险: '',
      },
      curType: '',
      p1: '',
      p2: '',
      p3: '',
      p4: ''
    };
    this.actionMap = { ...props.actionMap };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
    this.addYWCon = this.addYWCon.bind(this);
  }

  addYWCon = ()=>{
    const {data} = this.state;
    data['业务联系人'].push({});
    this.setState({data}); 
  }

  handleChange = (info, type) => {
    this.setState({curType: type})
    if (info.file.status === 'uploading') {
      if(type === 'stamp'){
        this.setState({ stampLoading: true });
      }
      if(type === '营业执照'){
        this.setState({ yyzzLoading: true });
      }
      if(type === '经营许可证'){
        this.setState({ jyLoading: true });
      }
      if(type === '旅行社责任险'){
        this.setState({ zrxLoading: true });
      }
      return;
    }
    if (info.file.status === 'done') {
        const {data} = this.state
        data[type] = info.file.url;
        if(type === 'stamp'){
          this.setState({ data,stampLoading: false });
        }
        if(type === '营业执照'){
          this.setState({ data,yyzzLoading: false });
        }
        if(type === '经营许可证'){
          this.setState({ data,jyLoading: false });
        }
        if(type === '旅行社责任险'){
          this.setState({ data,zrxLoading: false });
        }
    }
  };

  handleUpload = ({ file },field) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return ;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return ;
    }
    const {uploadType='erpSup'} = this.props;
    const formData = new FormData();
    formData.append('file', file);
    upload(formData,uploadType).then(res=>{
      if(res.success&&res.save_path){
        const fileinfo = {file:{status:'done',url:res.save_path}}
        this.handleChange(fileinfo,field);
      }else{
        this.handleChange({file:{status:'error',name:file.name}},field);
      }
    },()=>{
      this.handleChange({file:{status:'error',name:file.name}},field);
    })
  };

  changeInfo = (val, field) => {
    const { data } = this.state;
    data['供应商信息'][field] = val;
    this.setState({ data });
  }

  changeYwContact = (val,field ,index) =>{
    const {data} = this.state;
    data['业务联系人'][index][field] = val;
    this.setState({data}); 
  }

  render() {
    const {location, actions } = this.props;
    const { data,
            stampLoading ,
            yyzzLoading,
            jyLoading,
            zrxLoading} = this.state;
    const { curType, p1, p2, p3, p4 } = this.state;
    const { action } = location.state;
    const config = actions[action];

    return (
      <PageHeaderWrapper headerPage={renderButton(config, this.actionMap)}>
        <Col className={[styles.Add, 'clear'].join(' ')}>
          <Col span={24} className="clear">
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>基础信息</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={[styles.content, 'clear'].join(' ')}>
                <Col xs={24} sm={24} md={5} lg={5}>
                  <Col className={styles.imgWrapper}>
                    <Col className={styles.imgBox}>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={this.handleChange}
                        customRequest={({ file }) => this.handleUpload({ file },'stamp')}
                      >
                        {data.stamp ?renderImg(data.stamp): renderUploadButton(stampLoading)}
                      </Upload>
                    </Col>
                  </Col>
                </Col>
                <Col xs={24} sm={24} md={19} lg={19} style={{ paddingLeft: '12px' }}>
                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      商家类型
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <FastSelect
                        showSearch
                        value={data['供应商信息'].type || "1"}
                        onChange={val => this.changeInfo(val,'type')}
                        className={styles.cellSelect}
                        maxTagCount={10}
                        maxTagTextLength={8}
                        options={getEnum('SuppType')}
                        readOnly
                      />
                    </Col>
                  </Col>
                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      所在城市
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <FastSelect
                        showSearch
                        value={data['供应商信息'].city_id || ''}
                        onChange={val => this.changeInfo(val,'city_id')}
                        className={styles.cellSelect}
                        maxTagCount={10}
                        maxTagTextLength={8}
                        options={getEnum('City')}
                      />
                    </Col>
                  </Col>
                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      商家编号
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <div style={{padding: '0 11px', lineHeight: '32px', height: '32px'}}>{data['供应商信息'].id || ''}</div>
                    </Col>
                  </Col>
                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      公司全称
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <Input
                        placeholder="请输入公司全称"
                        value={data['供应商信息'].full_name || ''}
                        onChange={e => this.changeInfo(e.target.value, 'full_name')}
                      />
                    </Col>
                  </Col>
                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      品牌名称
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <Input
                        placeholder="请输入品牌名称"
                        value={data['供应商信息'].brand || ''}
                        onChange={e => this.changeInfo(e.target.value, 'brand')}
                      />
                    </Col>
                  </Col>

                  <Col span={8} className={[styles.cell, 'clear'].join(' ')}>
                    <Col className={styles.cellLabel} span={24}>
                      办公地址
                    </Col>
                    <Col className={styles.cellInput} span={24}>
                      <Input
                        placeholder="请输入办公地址"
                        value={data['供应商信息'].addr || ''}
                        onChange={e => this.changeInfo(e.target.value, 'addr')}
                      />
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>

          <Col span={24} className="clear">
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>证照信息</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={[styles.content, 'clear'].join(' ')}>
                <Col span={8}>
                  <Col className={styles.imgTitle}>营业执照</Col>
                  <Col style={{ padding: '0 8px' }}>
                    <Col className={styles.imgWrapper}>
                      <Col className={styles.imgBox}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          onChange={this.handleChange}
                          customRequest={({ file }) => this.handleUpload({ file },'营业执照')}
                        >
                          {data['营业执照'] ?renderImg(data['营业执照']): renderUploadButton(yyzzLoading)}
                        </Upload>
                      </Col>
                    </Col>
                  </Col>
                </Col>
                <Col span={8}>
                  <Col className={styles.imgTitle}>经营许可证</Col>
                  <Col style={{ padding: '0 8px' }}>
                    <Col className={styles.imgWrapper}>
                      <Col className={styles.imgBox}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          onChange={this.handleChange}
                          customRequest={({ file }) => this.handleUpload({ file },'经营许可证')}
                        >
                          {data['经营许可证'] ?renderImg(data['经营许可证']): renderUploadButton(jyLoading)}
                        </Upload>
                      </Col>
                    </Col>
                  </Col>
                </Col>
                <Col span={8}>
                  <Col className={styles.imgTitle}>旅行社责任险</Col>
                  <Col style={{ padding: '0 8px' }}>
                    <Col className={styles.imgWrapper}>
                      <Col className={styles.imgBox}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          onChange={this.handleChange}
                          customRequest={({ file }) => this.handleUpload({ file },'旅行社责任险')}
                        >
                          {data['旅行社责任险'] ?renderImg(data['旅行社责任险']): renderUploadButton(zrxLoading)}
                        </Upload>
                      </Col>
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>

          {/* ===== 业务联系人 ===== */}
          <Col span={24} className="clear">
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>业务联系人</Col>
                  <Col className={styles.btns}>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.addYWCon()
                      }}
                    >
                      添加
                    </Button>
                  </Col>
                </Col>
              </Col>
              <Col className={styles.content}>
                <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} span={24}>
                    姓名
                  </Col>
                </Col>
                <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} span={24}>
                    性别
                  </Col>
                </Col>
                <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} span={24}>
                    座机
                  </Col>
                </Col>
                <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                  <Col className={styles.cellLabel} span={24}>
                    手机
                  </Col>
                </Col>
              </Col>
              {
                data['业务联系人'].map((item,index)=>(
                  <Col key={`业务联系人${index}`} className={styles.content}>
                    <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                      <Input
                        placeholder="请输入姓名"
                        value={item.name || ''}
                        onChange={e => this.changeYwContact(e.target.value, 'name',index)}
                      />
                    </Col>
                    <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                      <FastSelect
                        showSearch
                        value={item.gender}
                        onChange={val => this.changeYwContact(val,'gender', index)}
                        className={styles.cellSelect}
                        maxTagCount={10}
                        maxTagTextLength={8}
                        options={getEnum('Gender')}
                      />
                    </Col>
                    <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                      <Input
                        placeholder="请输入座机"
                        value={item.phone || ''}
                        onChange={e => this.changeYwContact(e.target.value, 'phone',index)}
                      />
                    </Col>
                    <Col span={6} className={[styles.cell, 'clear'].join(' ')}>
                      <Input
                        placeholder="请输入手机"
                        value={item.mobile || ''}
                        onChange={e => this.changeYwContact(e.target.value, 'mobile',index)}
                      />
                    </Col>
                  </Col>
                ))
              }
            </Col>
          </Col>

          {/* ===== 备注信息 ===== */}
          <Col span={24} className="clear">
            <Col className={[styles.addMod, 'clear'].join(' ')}>
              <Col className={styles.title}>
                <Col className={styles.titleL}>
                  <Col className={styles.text}>备注信息</Col>
                  <Col className={styles.btns} />
                </Col>
              </Col>
              <Col className={styles.content}>
                <Input.TextArea
                  value={data['供应商信息'].comment || ''}
                  placeholder="请输入备注"
                  autosize={{ minRows: 4, maxRows: 8 }}
                  onChange={e => this.changeInfo(e.target.value, 'comment')}
                />
              </Col>
            </Col>
          </Col>
        </Col>
      </PageHeaderWrapper>
    );
  }
}

export default Add;
