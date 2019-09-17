import React from 'react';
import {
  Input,
  Row,
  Col,
  Button,
  Modal
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActionPageHoc from '@/components/ActionPageHoc';

import getEnum from '@/utils/enum';
import { renderButton,submit } from '@/utils/utils';
import styles from './PackageTour/index.less';
import PackageTourDetail from './PackageTour/detail';

@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class PackageTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        产品信息: {},
        产品图片: [],
        产品标签: [],
        // 游玩主题: [],
        途径城市: [],
        审批备注: [],
        // pdfUrl: '',
      },
      passModal:false,
      rejectModal: false,
    };
    this.actionMap = {...props.actionMap};
  }

  renderFlow = (history) => {
    return (
      <Col className={[styles.Approve, 'clear'].join(' ')}>
        <Col className={styles.title}>
          <Col className={styles.titleL}>
            <Col className={styles.text}>审批备注</Col>
          </Col>
        </Col>
        <Col className={styles.content}>
          {history.map((item) => (
            <Col xs={24} sm={24} md={24} lg={24} style={{lineHeight: '36px'}}>
              <Col xs={12} sm={12} md={6} lg={6}>操作人:{ getEnum({type:'SupplierAccount'})[item.account_id] }</Col>
              <Col xs={12} sm={12} md={6} lg={6}>审批意见:{ getEnum({type:'Opinion'})[item.opinion] }</Col>
              <Col xs={12} sm={12} md={6} lg={6}>时间:{ item.create_at }</Col>
              <Col span={24}>备注:{ item.comment }</Col>
            </Col>
          )
          )}
          <Col>
            <Input.TextArea
              placeholder="请输入审批备注"
              autosize={{ minRows: 4, maxRows: 8 }}
              onChange={e => this.changeComment('comment', e.target.value)}
            />
          </Col>
          <Col className={styles.footerBtn}>
            <Button onClick={() => this.pass()} style={{marginRight: '16px'}}>通过</Button>
            <Button onClick={() => this.reject()}>拒绝</Button>
          </Col>
        </Col>
      </Col>
    );
  };

  pass = () =>{
    this.setState({passModal:true});
  }


  reject = () => {
    this.setState({rejectModal:true});
  }

  passModalOk = () => {
    this.setState({passModal:false});
    const { location } = this.props;
    const {action=''} = location.state;
    const { data } = this.state;
    const { dispatch } = this.props;
    submit(action,{
    flow_id:data['产品信息'].flow_id
    ,opinion:1,comment:data.comment}).then(
      ()=>{
        dispatch(routerRedux.goBack());
      }
    );
  }

  passModalCancel = () =>{
    this.setState({passModal:false});
  }

  rejectModalOk = () => {
    this.setState({rejectModal:false});
    const { location } = this.props;
    const {action=''} = location.state;
    const { data } = this.state;
    const { dispatch } = this.props;
    submit(action,{flow_id:data['产品信息'].flow_id,opinion:2,comment:data.comment}).then(
      ()=>{
        dispatch(routerRedux.goBack());
      }
    );
  }

  rejectModalCancel = () =>{
    this.setState({rejectModal:false});
  }

  //  审批备注
  changeComment = (type, val)=> {
    const { data } = this.state;
    data.comment = val;
    this.setState({ data });
  }

  pdInfo = (data) => {
    if(data['产品信息'].type === '1'){
      return (
        <PackageTourDetail data={data} />
      );
    }
    return null;
  }

  render() {
    const { 
      location
      ,actions 
    } = this.props;
    const { data ,passModal,rejectModal} = this.state;

    const { action } = location.state;
    const config = actions[action];

    return (
      <PageHeaderWrapper headerPage={renderButton(config, this.actionMap)}>
        <Row>
          {this.pdInfo(data)}
        </Row>
        <Row style={{background: '#fff'}}>
          <Col className={styles.addMod}>
            { this.renderFlow(data['审批备注']) }
          </Col>
        </Row>
        <Modal
          title='审批通过'
          visible={passModal}
          onOk={this.passModalOk}
          onCancel={this.passModalCancel}
        >
          <p>请确认是否审批通过</p>
        </Modal>
        <Modal
          title='拒绝审批'
          visible={rejectModal}
          onOk={this.rejectModalOk}
          onCancel={this.rejectModalCancel}
        >
          <p>请确认是否拒绝审批</p>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default PackageTour;
