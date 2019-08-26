import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuthorizedSetting from '@/components/AuthorizedSetting';
import ActionPageHoc from '@/components/ActionPageHoc';

import { renderButton } from '@/utils/utils';

const { ModItem } = AuthorizedSetting;

@connect(({ meta: { actions } }) => ({
  actions,
}))
@ActionPageHoc
class AuthEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        menu: [],
        auth: {},
      },
    };
    this.changeAuth = this.changeAuth.bind(this);
    this.actionMap = {...props.actionMap};
  }

  changeAuth = auth => {
    const { data } = this.state;
    this.setState({ data: { ...data, auth } });
  };

  cancel = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.goBack());
  };

  render() {
    const { location, actions } = this.props;

    const { data } = this.state;

    const { action } = location.state;
    const config = actions[action];

    return (
      <PageHeaderWrapper
        title={config.text || ''}
        headerPage={renderButton(config, this.actionMap)}
      >
        <ModItem data={data} callback={this.changeAuth} />
      </PageHeaderWrapper>
    );
  }
}

export default AuthEdit;
