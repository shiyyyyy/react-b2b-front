import React from 'react';
import { connect } from 'dva';

import AuthorizedSetting from '@/components/AuthorizedSetting';
import PageHeader from '@/components/PageHeader';

import HistoryTags from '@/components/HistoryTags';

const { ModItem } = AuthorizedSetting;

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
  };

  removeHistoryTags = (tag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'historyTags/remove',
      payload: tag,
    });
  }

  render() {
    const {
      authdata: { data },
      historyTags: { historyTags },
      location,
    } = this.props;
    console.log(this)
    return (
      <HistoryTags data={historyTags} removeHistoryTags={this.removeHistoryTags} location={location}>
        {<ModItem data={data} callback={this.changeAuth} />}
      </HistoryTags>
    );
  }
}

export default AuthEdit;
