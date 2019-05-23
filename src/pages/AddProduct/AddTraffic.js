import React from 'react';
import { Row, Col, Input, Upload, Icon } from 'antd';

import styles from './AddGroupTour.less';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class AddGroupTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col className={styles.proTitle}>
          <Col xs={24} sm={8} md={6} lg={4} xl={2}>
            产品标题：
          </Col>
          <Col xs={24} sm={8} md={6} lg={6} xl={6}>
            <Input placeholder="请输入产品标题" />
          </Col>
        </Col>
        <Col className={styles.proTitle}>
          <Col xs={24} sm={8} md={6} lg={4} xl={2}>
            产品详情：
          </Col>
          <Col xs={24} sm={8} md={6} lg={6} xl={6}>
            <Input.TextArea placeholder="请输入产品标题" />
          </Col>
        </Col>
        <Col className={styles.proTitle}>
          <Col xs={24} sm={8} md={6} lg={4} xl={2}>
            产品详情：
          </Col>
          <Col xs={24} sm={8} md={6} lg={6} xl={6}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或批量上传</p>
            </Dragger>
            ,
          </Col>
        </Col>
      </Row>
    );
  }
}
