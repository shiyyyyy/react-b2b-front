import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthorizedSetting from '@/components/AuthorizedSetting';
import router from 'umi/router';
import {renderButton} from '@/utils/utils';

const { ModItem } = AuthorizedSetting;

@connect(({authdata, loading, meta:{actions}}) => ({
  authdata,
  loading: loading.models.authdata,
  actions
}))
class AuthEdit extends React.Component {
  componentDidMount() {
    const { dispatch, location} = this.props;
    dispatch({
      type: 'authdata/init',
      payload: location.state 
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
    const { dispatch } = this.props;
    dispatch({
       type:'authdata/submit'
    });
  }

  cancel = () =>{
    router.goBack();
  }

  render() {
    const {
      authdata: { data },
      location,
      actions
    } = this.props;
    const {action} = location.state;
    const config = actions[action];


    const map = {
      '提交':this.submit,
      '关闭':this.cancel
    };

    return (
      <PageHeaderWrapper title={config.text || ''} button={renderButton(config,map)}>
        <ModItem data={data} callback={this.changeAuth} />
      </PageHeaderWrapper>
    );
  }
}

export default AuthEdit;
