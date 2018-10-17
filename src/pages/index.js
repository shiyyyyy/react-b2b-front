import LoginRoute from './login/route';
import PersonalRoute from './personal/route';

export const routes = [
	...LoginRoute,
	...PersonalRoute
];