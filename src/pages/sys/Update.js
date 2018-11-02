import React from 'react';
import {withRouter,Redirect} from 'react-router-dom';
import { loadIfEmpty } from '../../util/request';

class Update extends React.Component{
    constructor(){
        super();
        this.url = '/PublicApi/refresh';
        this.state = {};
    }

    componentDidMount() {
        loadIfEmpty(this);
    }

    render(){
        return(
            <div>
                {
                    <div>
                        done
                    </div>
                }
            </div>
        )
    }

}

export default withRouter(Update);