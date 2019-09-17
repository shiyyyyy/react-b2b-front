import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { AppConst } from '@/utils/const';

@connect(({ user: { currentUser } }) => ({
  currentUser,
}))
class Redirects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: '',
    };
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    if (!currentUser.type) {
      dispatch({
        type: 'login/changeLoginStatus',
        payload: {
          status: false,
        },
      });
    }
    switch (currentUser.type) {
      case AppConst.USER_EMP:
        this.setState({ redirectUrl: '/Home/Admin' });
        break;
      case AppConst.USER_SUP:
        this.setState({ redirectUrl: '/Home/Supplier' });
        break;
      case AppConst.USER_RET:
        this.setState({ redirectUrl: '/Home/Supplier' });
        break;
      // 未知类型
      default:
        dispatch({
          type: 'login/changeLoginStatus',
          payload: {
            status: false,
          },
        });
        break;
    }
  }

  redirectToHome() {
    const { redirectUrl } = this.state;
    const {dispatch} = this.props;
    dispatch(
        routerRedux.push({
            pathname:redirectUrl
        })
    )
    // <Redirect to={{ pathname: redirectUrl }} />;
  }

  render() {
    return (
      <div>
        <p>您访问的页面出错</p>
        <button onClick={this.redirectToHome}>返回首页</button>
      </div>
    );
  }
}

export default Redirects;
