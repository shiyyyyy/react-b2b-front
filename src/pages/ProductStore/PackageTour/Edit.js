import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

@connect(({packagedata, loading, meta:{actions}}) => ({
  packagedata,
  loading: loading.models.packagedata,
  actions
}))
class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = () =>{
    const { dispatch ,packagedata:{data},location} = this.props;
    data.id = location.state.id;
    dispatch({
       type:'packagedata/submit',
       payload:data
    })
  }

  cancel = () =>{
    const {dispatch} = this.props;

    dispatch(routerRedux.goBack());
  }

  render() {

    return (
      <PageHeaderWrapper />
    );
  }
}

export default Edit;
