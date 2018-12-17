import React from 'react';

import {withRouter,Redirect} from 'react-router-dom';

export default class NoMatch extends React.Component{
    render(){
        return(
            <Redirect to = '/supplier-back' />
        )
    }
}