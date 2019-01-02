import Supplier_back from './Supplier-back';

// 店铺管理
import ShopManage from './shop-manage/ShopManage';

// 产品管理
import ProManage from './pro-manage/ProManage';
import GroupTour from './pro-manage/GroupTour';
import GroupTourAdd from './pro-manage/GroupTourAdd';
import GroupTourOpenGroup from './pro-manage/GroupTourOpenGroup';

import GroupTicket from './pro-manage/GroupTicket';

export default [
    {
        path: '/supplier-back/platform',
        exact: true,
        component: Supplier_back
    },
    {
        path: '/supplier-back/shop-manage',
        exact: true,
        component: ShopManage
    },
    {
        path: '/supplier-back/pro-manage', 
        exact: true,
        component: ProManage
    },
    {
        path: '/supplier-back/pro-manage/group-tour',
        exact: true,
        component: GroupTour
    },
    {
        path: '/supplier-back/pro-manage/group-tour/add',
        component: GroupTourAdd
    },
    {
        path: '/supplier-back/pro-manage/group-tour/open',
        component: GroupTourOpenGroup
    },

    {
        path: '/supplier-back/pro-manage/group-ticket',
        component: GroupTicket
    },
];