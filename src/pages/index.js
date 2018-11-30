import LoginRoute from './login/route';
import PersonalRoute from './personal/route';
import HomeRoute from './home/route';
import ProductRoute from './product/route';
import SupplierRoute from './supplier/route';
import RetailRoute from './retail/route';
import NoMatch from './NoMatch';

export const routes = [
	...LoginRoute,
	...PersonalRoute,
	...HomeRoute,
	...ProductRoute,
	...SupplierRoute,
	...RetailRoute,
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
