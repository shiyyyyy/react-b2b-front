import React from 'react';
import { Col, Button, Form } from 'antd';

import styles from './index.less';

class ModalFormBtn extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {};

  //   this.submit = this.submit.bind(this);
  //   this.cancel = this.cancel.bind(this);
  // }

  submit = e => {
    e.preventDefault();
    const { submit } = this.props;
    if (submit) {
      submit();
    }
  };

  cancel = e => {
    e.preventDefault();
    const { cancel } = this.props;
    if (cancel) {
      cancel();
    }
  };

  render() {
    return (
      <Col className={styles.footerBtnBox}>
        <Form.Item key="cancel" className={styles.footerBtn}>
          <Button
            type="primary"
            onClick={e => {
              this.cancel(e);
            }}
          >
            取消
          </Button>
        </Form.Item>
        <Form.Item key="submit" className={styles.footerBtn}>
          <Button
            type="primary"
            onClick={e => {
              this.submit(e);
            }}
          >
            确定
          </Button>
        </Form.Item>
      </Col>
    );
  }
}

export default ModalFormBtn;
