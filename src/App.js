import React, { Component } from 'react';
import logo from './logo.svg';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import './App.css';
import { routes , Pubroutes} from './pages';
import { masking ,error} from './util/com';
import { userInit,pubInit} from './util/data';
import { trigger ,AppCore} from './util/core';
import { withRouter } from 'react-router-dom';
import { debug } from 'util';


class App extends Component {

	constructor(props){
        super(props);

        this.state = {
        	inited:false,
        };
    }

    componentDidMount() {
    	// if(localStorage[AppCore.APP_NAME]){
		// 	let user = JSON.parse(localStorage[AppCore.APP_NAME]);
		// 	trigger('本地存储加载用户',user);
		// 	pubInit().then(r=>{
		// 		userInit().then(_r=>{
		// 			trigger('更新路由',routes);
		// 			this.setState({inited:true});
		// 		},_e=>{
		// 			trigger('更新路由',Pubroutes);
		// 			this.setState({inited:true});
		// 			//error(_e);
		// 		})
		// 	},e=>{
		// 		error(e);
		// 	})
		// }else{
			pubInit().then(r=>{
				// trigger('更新路由', Pubroutes);
				trigger('更新路由', routes);
				this.setState({inited:true});
			},e=>{
				error(e);
			})
		// }
    }


    render() {
    	return (
	        <div className="App">
	          { 
	          	// this.state.inited &&
	          	renderRoutes(this.props.s.routes)
			  }
			  {/* {
	          	!this.state.inited && masking()
	          } */}
	        </div>
	    );
  }
}

export default withRouter(connect(s=>({s:s}))(App));
