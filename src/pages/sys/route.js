import Update from './Update';
import AuthList from './AuthPage';
import AuthEdit from './AuthEditPage';

export default [
	{
		path:'/backUpdate',
		component:Update
	},{
		path:'/authList',
		component:AuthList
	},{
		path:'/authEdit',
		component:AuthEdit
	}
];