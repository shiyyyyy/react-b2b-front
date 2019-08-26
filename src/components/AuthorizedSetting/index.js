import React, { Component } from 'react';

import AuthorizedSetItem from './AuthorizedSetItem';
import AuthorizedOverview from './AuthorizedOverview';

class AuthorizedSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
   
  }

  render() {
   
    return (
      <div>
        AuthorizedSetting
      </div>
    );
  }
}
AuthorizedSetting.ModItem = AuthorizedSetItem;
AuthorizedSetting.AuthorizedOverview = AuthorizedOverview;

export default AuthorizedSetting;
