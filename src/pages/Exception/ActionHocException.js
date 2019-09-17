import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'dva';
import { AppConst } from '@/utils/const';

@connect(({ user:{currentUser} }) => ({
  currentUser
}))
class ActionHocException extends React.Component{
    state = {
        redirectUrl:''
    }

    componentDidMount() {
        const { dispatch ,currentUser} = this.props;
        if(!currentUser.type){
            dispatch({
              type:'login/changeLoginStatus',
              payload:{
                status: false
              }
            })
        }
        switch(currentUser.type){
          case AppConst.USER_EMP:
            this.setState({redirectUrl:'/Home/Admin'});
            break;
          case AppConst.USER_SUP:
            this.setState({redirectUrl:'/Home/Supplier'});
            break;
          case AppConst.USER_RET:
            this.setState({redirectUrl:'/Home/Supplier'});
            break;
          // 未知类型
          default: 
            dispatch({
              type:'login/changeLoginStatus',
              payload:{
                status: false
              }
            })
            break;
        }
    }

    render() {
        const {redirectUrl} = this.state;

        return (
            redirectUrl !=='' && <Redirect to={{ pathname:  redirectUrl}} />
        );
    }
}

export default ActionHocException;