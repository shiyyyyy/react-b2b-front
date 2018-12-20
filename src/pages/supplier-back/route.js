import Supplier_back from './Supplier-back';

// 店铺管理
import ShopManage from './shop-manage/ShopManage';

// 产品管理
import ProManage from './pro-manage/ProManage';
import GroupTour from './pro-manage/GroupTour';

import GroupTicket from './pro-manage/GroupTicket';

export default [
    {
        path: '/supplier-back/platform',
        exact: true,
        component: Supplier_back
    },
    {
        path: '/supplier-back/shop-manage/shop-manage',
        exact: true,
        component: ShopManage
    },
    {
        path: '/supplier-back/pro-manage', 
        component: ProManage,
        // routes: [
        //     {
        //         path: '/supplier-back/pro-manage/group-tour',
        //         component: GroupTour
        //     }
        // ]
    },
    {
        path: '/supplier-back/pro-manage/group-tour',
        component: GroupTour
    },
    {
        path: '/supplier-back/pro-manage/group-ticket',
        component: GroupTicket
    },
];