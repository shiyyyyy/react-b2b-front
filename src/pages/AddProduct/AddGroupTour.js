import React from 'react';
import { Row, Col, Input, Upload, Icon, Button, message } from 'antd';

import styles from './AddGroupTour.less';
import { debug } from 'util';

const { Dragger } = Upload;

export default class AddGroupTour extends React.Component {
  strokeCfg = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
  };

  constructor(props) {
    super(props);
    this.state = {
      pro: {
        title: '',
        detailed: '',
        stroke: {},
      },
    };
    this.proTitle = this.proTitle.bind(this);
    this.proDetailed = this.proDetailed.bind(this);
    this.strokeChange = this.strokeChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  proTitle(e) {
    console.log(e);
    console.log(e.target.value);
    const { pro } = this.state;
    pro.title = e.target.value;
    this.setState({ pro });
  }

  proDetailed(e) {
    console.log(e);
    console.log(e.target.value);
    const { pro } = this.state;
    pro.detailed = e.target.value;
    this.setState({ pro });
  }

  strokeChange(info) {
    console.log(info);
    console.log(this);
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { pro } = this.state;
      pro.stroke = info;
      this.setState({pro})
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  submit() {
    console.log(this.state);
  }

  render() {
    console.log(this.props);
    return (
      <Row>
        <Col className={[styles.mod, 'clear'].join(' ')}>
          <Col className={styles.title}>新增产品</Col>
          <Col span={24} className={styles.block}>
            <Col xs={24} sm={4} md={3} lg={2} xl={2} className={styles.proTitle}>
              产品标题：
            </Col>
            <Col xs={24} sm={10} md={8} lg={6} xl={6}>
              <Input
                placeholder="请输入产品标题"
                onChange={this.proTitle}
                value={this.state.pro.title || ''}
              />
            </Col>
          </Col>
          <Col span={24} className={styles.block}>
            <Col xs={24} sm={4} md={3} lg={2} xl={2} className={styles.proTitle}>
              产品详情：
            </Col>
            <Col xs={24} sm={10} md={8} lg={6} xl={6}>
              <Input.TextArea
                placeholder="请输入产品标题"
                onChange={this.proDetailed}
                value={this.state.pro.detailed || ''}
              />
            </Col>
          </Col>
          <Col span={24} className={styles.block}>
            <Col xs={24} sm={4} md={3} lg={2} xl={2} className={styles.proTitle}>
              产品详情：
            </Col>
            <Col xs={24} sm={12} md={10} lg={10} xl={10}>
              <Dragger {...this.strokeCfg} onChange={this.strokeChange}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                <p className="ant-upload-hint">支持单个或批量上传</p>
              </Dragger>
            </Col>
          </Col>
          <Col span={24}>
            <Col xs={{ offset: 4 }} sm={{ offset: 4 }} md={{ offset: 3 }} lg={{ offset: 2 }}>
              <Button onClick={this.submit} type="primary">
                提交
              </Button>
            </Col>
          </Col>
        </Col>
      </Row>
    );
  }
}
