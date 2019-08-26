import React from 'react';
import { routerRedux } from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


class Maintain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, location} = this.props;
    const param = location.state;
    dispatch({
      type: 'authdata/load',
      payload: { id: param.id },
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

    return (
      <PageHeaderWrapper />
    );
  }
}

export default Maintain;
