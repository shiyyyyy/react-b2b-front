import React from 'react';
import {withRouter} from 'react-router-dom';
import { loadIfEmpty } from '../../util/request';
import { masking } from  '../../util/com';
import { AppConst } from '../../util/const';

class MyProduct extends React.Component{
    constructor(){
        super();

        this.state = {

        };

        this.mod = '我的产品';
        this.authType = AppConst.User;
    }

    componentDidMount() {
        loadIfEmpty(this);
    }

    render(){
        return(
            <div>
                {
                    this.state.loading && masking()
                }
                {
                    !this.state.loading &&
                    <div>123</div>
                }
            </div>
        )
    }

}

export default withRouter(MyProduct);