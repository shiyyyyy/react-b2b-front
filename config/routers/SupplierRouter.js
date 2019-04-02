export default [
  {
    parent: '/',
    routes: [
      {
        path: '/supplier',
        name: '首页',
        icon: 'home',
        routes: [
          { path: '/supplier', redirect: '/supplier/index' },
          {
            path: '/supplier/index',
            name: 'home',
            component: './Supplier/index',
            mod: '公开页面',
          },
        ],
      },
      {
        path: '/store',
        name: '店铺管理',
        icon: 'shop',
        routes: [
          { path: '/store', redirect: '/store/picture' },
          {
            path: '/store/picture',
            name: '图片管理',
            component: './Supplier/Store/Picture',
            mod: '公开页面',
          },
          {
            path: '/store/hot',
            name: '热卖设置',
            component: './Supplier/Store/Hot',
            mod: '公开页面',
          },
          {
            path: '/store/account',
            name: '账号管理',
            component: './Supplier/Store/Account',
            mod: '公开页面',
          },
        ],
      },
    ],
  },
];