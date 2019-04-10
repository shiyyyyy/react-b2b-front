import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthorizedSetting from '@/components/AuthorizedSetting';
import {Button} from 'antd';
import { routerRedux } from 'dva/router';

const { ModItem } = AuthorizedSetting;

function renderAction(actions){
    return (
      <div>
        {
          Object.keys(actions).map((key)=>(
            <Button key={key} onClick={()=>(actions[key].onClick)()}>
              <span>{actions[key].text}</span>
            </Button>
          ))}
      </div>);
}


@connect(({ authdata, loading, historyTags }) => ({
  authdata,
  loading: loading.models.authdata,
  historyTags,
}))
class AuthEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const param = location.state;
    dispatch({
      type: 'authdata/load',
      payload: { id: param.id },
    });
  }

  changeAuth = auth => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authdata/changeAuth',
      payload: auth,
    });
  }

  submit = () =>{
    const { dispatch ,authdata:{data},location} = this.props;
    data.id = location.state.id;
    dispatch({
       type:'authdata/submit',
       payload:data
    })
  }

  cancel = () =>{
    const {dispatch} = this.props;

    dispatch(routerRedux.goBack());
  }

  render() {
    const {
      authdata: { data },
    } = this.props;
    const actions  = {
      submit:{text:'提交',onClick:this.submit},
      cancel:{text:'取消',onClick:this.cancel}
    };
    return (
      <PageHeaderWrapper title='编辑权限' action={renderAction(actions)}>
        <ModItem data={data} callback={this.changeAuth} />
      </PageHeaderWrapper>
    );
  }
}

export default AuthEdit;
