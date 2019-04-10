export default [
  {
    parent: '/',
    routes: [
      { path: '/', redirect: '/supplier/index' },
      {
        path: '/supplier',
        name: '首页',
        icon: 'home',
        isMenu: true,
        routes: [
          { path: '/supplier', redirect: '/supplier/index' },
          {
            path: '/supplier/index',
            // name: 'home',
            component: './Supplier/index',
          },
        ],
      },
      {
        path: '/store',
        name: '店铺管理',
        icon: 'shop',
        isMenu: true,
        routes: [
          { path: '/store', redirect: '/store/picture' },
          {
            path: '/store/picture',
            name: '图片管理',
            component: './Supplier/Store/Picture',
            isMenu: true,
          },
          {
            path: '/store/hot',
            name: '热卖设置',
            component: './Supplier/Store/Hot',
            isMenu: true,
          },
          {
            path: '/store/tailCargo',
            name: '尾货设置',
            component: './Supplier/Store/TailCargo',
            isMenu: true,
          },
          {
            path: '/store/account',
            name: '账号管理',
            component: './Supplier/Store/Account',
            isMenu: true,
          },
          {
            path: '/store/preview',
            name: '店铺预览',
            component: './Supplier/Store/Preview',
            isMenu: true,
          },
        ],
      },
      {
        path: '/proGroup',
        name: '产品团期',
        icon: 'skin',
        isMenu: true,
        routes: [
          { path: '/proGroup', redirect: '/proGroup/groupTour' },
          {
            path: '/proGroup/groupTour',
            name: '跟团游',
            component: './Supplier/ProGroup/GroupTour',
            isMenu: true,
          },
          {
            path: '/proGroup/traffic',
            name: '大交通',
            component: './Supplier/ProGroup/Traffic',
            isMenu: true,
          },
          {
            path: '/proGroup/visa',
            name: '单签证',
            component: './Supplier/ProGroup/Visa',
            isMenu: true,
          },
        ],
      },
      {
        path: '/transaction',
        name: '产品团期',
        icon: 'skin',
        isMenu: true,
        routes: [
          { path: '/transaction', redirect: '/transaction/holding' },
          {
            path: '/transaction/holding',
            name: '占位管理',
            component: './Supplier/Transaction/Holding',
            isMenu: true,
          },
          {
            path: '/transaction/realSign',
            name: '实报管理',
            component: './Supplier/Transaction/RealSign',
            isMenu: true,
          },
          {
            path: '/transaction/change',
            name: '变更管理',
            component: './Supplier/Transaction/Change',
            isMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/transaction/change/costHistory',
                name: '历史记录(费用明细)',
                component: './Supplier/Transaction/Change/CostHistory',
                isMenu: true,
              },
              {
                path: '/transaction/change/listHistory',
                name: '历史记录(名单列表)',
                component: './Supplier/Transaction/Change/ListHistory',
                isMenu: true,
              },
            ],
          },
          {
            path: '/transaction/reconcile',
            name: '对账管理',
            component: './Supplier/Transaction/Reconcile',
            isMenu: true,
          },
        ],
      },
    ],
  },
];
