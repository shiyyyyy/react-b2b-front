export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login'},
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' }
    ],
  },
  
  // app
  {
    path: '/ant-pro-test',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      { path: '/ant-pro-test', redirect: '/ant-pro-test/dashboard/analysis' },
      {
        path: '/ant-pro-test/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/ant-pro-test/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            mod:  '公开页面'
          },
          {
            
            path: '/ant-pro-test/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
            mod:  '公开页面'
          },
          {
            path: '/ant-pro-test/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
            mod : '公开页面'
          },
        ],
      },
      // forms
      {
        path:'/ant-pro-test/product',
        name:'list',
        icon:'table',
        routes:[
          // {
          //   path:'/product/list',
          //   name:'product_list',
          //   component:'./Product/ProductList',
          // },
          // {
          //   path:'/product/edit',
          //   name:'product_edit',
          //   component:'./Product/ProductPage'
          // },
          { path: '/ant-pro-test/product', redirect: '/ant-pro-test/product/list' },
          {
            path: '/ant-pro-test/product/list',
            name: 'searchtable',
            component: './Product/ProductList',
            mod: '公开页面'
          }
        ]
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/ant-pro-test/exception',
        routes: [
          // exception
          {
            path: '/ant-pro-test/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/ant-pro-test/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/ant-pro-test/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/ant-pro-test/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/ant-pro-test/account',
        routes: [
          {
            path: '/ant-pro-test/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/ant-pro-test/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/ant-pro-test/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/ant-pro-test/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/ant-pro-test/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/ant-pro-test/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/ant-pro-test/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/ant-pro-test/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/ant-pro-test/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/ant-pro-test/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/ant-pro-test/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
  // 供应商前台 supplier-front
  {
    path: '/supplier-front',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/supplier-front',
        name: '平台首页',
        component: './Supplier-Front/Supplier',
        public: 1,
      },
      {
        path: '/supplier-center',
        name: '供应商中心',
        // component: './Supplier-Front/Supplier',
        public: 1,
      },
      {
        path: '/distribution-center',
        name: '分销商中心',
        // component: './Supplier-Front/Supplier',
        public: 1,
      },
    ],
  },
];
