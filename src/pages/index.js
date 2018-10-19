import LoginRoute from './login/route';
import PersonalRoute from './personal/route';
import SupplierRoute from './supplier/route';
import Home from './home/route';

export const routes = [
	...LoginRoute,
	...PersonalRoute,
	...SupplierRoute,
	...Home
];