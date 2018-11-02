import Home from './Home';
import React from 'react';
//import NoMatch from '../NoMatch';
//import { Switch ,Route} from 'react-router-dom';
 
// const config = ({ match }) => (
// 	<Switch>
// 		<Route exact path={`${match.url}`} component={Home} />
// 		<Route path={`${match.url}/child`} component={Test} />
//     	<Route component={NoMatch} />
//   	</Switch>
// )
 

export default [
    {
        path: '/home',
        component: Home,
    }
];