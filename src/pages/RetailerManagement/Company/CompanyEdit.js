import React, { PureComponent } from 'react';
import { Row, Col, Upload, Icon, message,Form } from 'antd';
import ModalForm from '@/components/ModalForm';
import ModalFormBtn from '@/components/ModalFormBtn';
import { submit } from '@/utils/utils';
/* eslint react/no-multi-comp:0 */

import styles from './index.less';

// 上传logo事件
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPGorPNG) {
    message.error('您只能上传JPG或者PNG格式图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片最大支持2MB!');
  }
  return isJPGorPNG && isLt2M;
}

@Form.create()
class CompanyEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      logo:''
    };
  }

  submit = () => {
    const { action = '', modal, afterOk ,data:ref,form} = this.props;
    const {logo} = this.state;
    const data = form.getFieldsValue();

    const rst = {...ref,...data,logo};

    submit(action, rst).then(
      () => {
        modal.destroy();
        if (afterOk) {
          afterOk();
        }
      }
    );
  };

  cancel = () => {
    const { modal ,afterCancel} = this.props;
    modal.destroy();
    if(afterCancel){
      afterCancel()
    }
  };

  // 上传logo事件
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          logo:imageUrl,
          loading: false,
        });
      });
    }
  };

  render() {
    const { config = {}, data = {} ,form} = this.props;
    const { loading, logo  } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Row>
        <Col>
          <Col span={8} className={styles.logo}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {logo ? <img src={logo} alt="logo" className="img-size" /> : uploadButton}
            </Upload>
            <Col className={styles.logoText}>公司Logo</Col>
          </Col>
          <Col span={16}>
            <ModalForm config={config} data={data} form={form} />
          </Col>
          <Col span={24}>
            <ModalFormBtn
              submit={() => {
                this.submit();
              }}
              cancel={() => {
                this.cancel();
              }}
            />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default CompanyEdit;
