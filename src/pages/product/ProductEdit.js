import React from 'react';
import {Link, Route, withRouter,Redirect} from 'react-router-dom';
import { haveActionAuth,AppMeta} from '../../util/core';

class ProductEdit extends React.Component{
    constructor(){
        super();

        this.state = {

        };

        this.action = '产品编辑';//props.p.action;
        this.state.HaveAuth = true;
    }

    componentDidMount() {
        if(!AppMeta.mods){
            pubInit();
        }
        let cfg = {text:'测试'};//AppMeta.actions[this.action];
        this.text = cfg.text;
        this.setState({HaveAuth:haveActionAuth(this.action)});
    }

    afterload(){
        
    }

    submit(){

    }



    render(){
        return(
            <div>
                {
                    !this.state.HaveAuth && 
                        <Redirect to ='/login'/>
                }
                {
                    this.state.HaveAuth&&
                    <div></div>
                }
            </div>
        )
    }

}

export default withRouter(ProductEdit);