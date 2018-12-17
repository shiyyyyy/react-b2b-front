import Supplier_back from './Supplier-back';
import PersonalHomePage from './PersonalHomePage';

export default [
    {
        path: '/supplier-back/platform',
        exact: true,
        component: Supplier_back
    },
    {
        path: '/supplier-back/personalHomePage', 
        exact: true,
        component: PersonalHomePage
    }
];