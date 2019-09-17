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

import styles from './index.less';

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

  groupInfo = (data) => {
    return (
      <Col className={[styles.childrenMod, 'clear'].join(' ')}>
        <Col className={styles.ModTitle}>基础信息</Col>
        <Col className={styles.ModContent}>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>订单类型: 同业</Col>
            <Col span={4}>订单编号: D013123</Col>
            <Col span={7}>提交时间: 9102-08-23 16:30:43</Col>
            <Col span={9}>报名人: 门管中心-十里河门市部-张三 13909923821</Col>
          </Col>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>订单人数: 4人</Col>
            <Col span={4}>订单状态: 占位已确认</Col>
            <Col span={7}>实报通过: 9102-08-23 16:30:43</Col>
            <Col span={9}>确认人: 寰宇风情-欧洲部-李四 139029389283</Col>
          </Col>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>
              游客名单: <Button size="small">查看</Button>
            </Col>
            <Col span={4}>变更状态: 无变更</Col>
            <Col span={7}>变更通过: 9102-08-23 16:30:43</Col>
            <Col span={9}>接单人: 营销中心-出境事业部-王五 187283092921</Col>
          </Col>
        </Col>
      </Col>
    );
  }

  baseInfo = (data) => {
    return (
      <Col className={[styles.childrenMod, 'clear'].join(' ')}>
        <Col className={styles.ModTitle}>基础信息</Col>
        <Col className={styles.ModContent}>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>订单类型: 同业</Col>
            <Col span={4}>订单编号: D013123</Col>
            <Col span={7}>提交时间: 9102-08-23 16:30:43</Col>
            <Col span={9}>报名人: 门管中心-十里河门市部-张三 13909923821</Col>
          </Col>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>订单人数: 4人</Col>
            <Col span={4}>订单状态: 占位已确认</Col>
            <Col span={7}>实报通过: 9102-08-23 16:30:43</Col>
            <Col span={9}>确认人: 寰宇风情-欧洲部-李四 139029389283</Col>
          </Col>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>
              游客名单: <Button size="small">查看</Button>
            </Col>
            <Col span={4}>变更状态: 无变更</Col>
            <Col span={7}>变更通过: 9102-08-23 16:30:43</Col>
            <Col span={9}>接单人: 营销中心-出境事业部-王五 187283092921</Col>
          </Col>
        </Col>
      </Col>
    );
  }

  nzInfo = (data) => {
    return (
      <Col className={[styles.childrenMod, 'clear'].join(' ')}>
        <Col className={styles.ModTitle}>应转明细</Col>
        <Col className={styles.ModContent}>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={6}>转入对: 营销中心-出境部-张三</Col>
            <Col span={6}>应转金额: 2950.00</Col>
            <Col span={6}>已转金额: 2950.00</Col>
            <Col span={6}>未转金额: 2950.00</Col>
          </Col>
        </Col>
      </Col>
    );
  }

  commentInfo = (data) =>{
    return (
      <Col className={[styles.childrenMod, 'clear'].join(' ')}>
        <Col className={styles.ModTitle}>订单备注</Col>
        <Col className={styles.ModContent}>
          <Col className={[styles.ModCell, 'clear'].join(' ')}>
            <Col span={4}>备注人: 张三 </Col>
            <Col span={6}>备注时间: 2019-09-21 13：21：23</Col>
            <Col span={14} className="text-overflow">
              备注内容: 啊实打实的是范德萨发的分割房豪华
            </Col>
          </Col>
        </Col>
      </Col>
    );
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
          {this.groupInfo(data)}
        </Row>
        <Row>
          {/* 基础信息 */}
          {this.baseInfo(data)}
        </Row>
        <Row>
          {/* 内转应收 */}
          {this.nzInfo(data)}
        </Row>
        <Row>
          {/* 订单备注 */}
          {this.commentInfo(data)}
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
