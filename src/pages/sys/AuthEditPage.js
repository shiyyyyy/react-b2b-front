import React from 'react';
import {withRouter,Redirect} from 'react-router-dom';
import { AppCore ,haveActionAuth,AppMeta,} from '../../util/core';
import { loadIfEmpty } from '../../util/request';
import { AppConst } from '../../util/const';
import { masking } from '../../util/com'; 
import {Row, Col } from 'antd';

class  Menu extends React.Component{
  constructor(props){
      super(props);
      this.state ={
      show:false
      } 
  }

  render(){
    return (<div >
      <a onClick = {_ => {this.setState({show:!this.state.show})}}><i className = {this.state.show?'red':'blue'}>{this.props.name}</i></a>
    </div>)
  }
}

class AuthEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };

        this.authType = AppConst.User;
        this.action = this.props.location.state.action ||{};
        this.ref_data = this.props.location.state.data || {};
    }

    componentDidMount() {
        loadIfEmpty(this);
    }

    EditAuth(id){
        console.log(id);
    }

    render(){
        return(
            <div>
                {
                    // this.state.loading && masking()
                }
                {
                 
                    this.state.data && 
                    <div>
                        {
                          Object.keys(this.state.data.menu).map((key) =>
                            <Menu key = {key} name = {key}/>
                            )
                        }
                    </div>
                }
            </div>
        )
    }

}

export default withRouter(AuthEditPage);