import React from 'react';
import { Row, Col, Modal } from 'antd';

class ModalRender extends React.Component{
  constructor(props){
    super(props);
    this.state = { }
  }

  render(){
    return(
      <Row>
        <Col>
          <Modal {...this.props}>
            {this.props.children || '这是一个Modal'}
          </Modal>
        </Col>
      </Row>
    )
  }

}

export default ModalRender;
