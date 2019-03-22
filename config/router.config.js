export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            mod: '公开页面',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
            mod: '公开页面',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
            mod: '公开页面',
          },
        ],
      },
      // forms
      {
        path: '/product',
        name: 'product',
        icon: 'table',
        routes: [
          { path: '/product', redirect: '/product/list' },
          {
            path: '/product/list',
            name: 'list',
            component: './Product/ProductList',
            mod: '公开页面',
          },
        ],
      },
      {
        name: 'auth',
        icon: 'sitemap',
        path: '/auth',
        routes: [
          { path: '/auth', redirect: '/auth/list' },
          {
            path: '/auth/list',
            name: 'list',
            component: './Auth/AuthList',
            // mod: '权限管理',
            mod: '公开页面',
          },
          {
            path: '/auth/edit',
            name: 'edit',
            component: './Auth/AuthEdit',
            action: '编辑权限',
          },
        ],
      },
      // exception
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
            mod: '公开页面',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
            mod: '公开页面',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
            mod: '公开页面',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
            mod: '公开页面',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
                mod: '公开页面',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
                mod: '公开页面',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
                mod: '公开页面',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
                mod: '公开页面',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      // {
      //   component: '404',
      // },
      // 供应商前台 supplier-front
      {
        path: '/supplier-front',
        // component: '../layouts/BasicLayout',
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
    ],
  },
  
];
