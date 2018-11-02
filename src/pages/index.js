import LoginRoute from './login/route';
import PersonalRoute from './personal/route';
import HomeRoute from './home/route';
import ProductRoute from './product/route';
import SysRoute from './sys/route';
import NoMatch from './NoMatch';

export const routes = [
	...LoginRoute,
	...PersonalRoute,
	...HomeRoute,
	...ProductRoute,
	...SysRoute,
	{
		component:NoMatch
	}
];

export const Pubroutes = [
	...LoginRoute,
	...HomeRoute,
	{
		component:NoMatch
	}
];
