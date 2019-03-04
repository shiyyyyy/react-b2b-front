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
          },
          {
            
            path: '/ant-pro-test/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/ant-pro-test/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/ant-pro-test/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/ant-pro-test/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/ant-pro-test/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/ant-pro-test/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/ant-pro-test/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/ant-pro-test/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/ant-pro-test/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/ant-pro-test/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/ant-pro-test/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/ant-pro-test/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/ant-pro-test/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/ant-pro-test/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/ant-pro-test/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/ant-pro-test/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/ant-pro-test/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/ant-pro-test/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/ant-pro-test/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/ant-pro-test/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/ant-pro-test/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/ant-pro-test/profile/basic/:id',
            name: 'basic',
            hideInMenu: true,
            component: './Profile/BasicProfile',
          },
          {
            path: '/ant-pro-test/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/ant-pro-test/result',
        routes: [
          // result
          {
            path: '/ant-pro-test/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/ant-pro-test/result/fail', name: 'fail', component: './Result/Error' },
        ],
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
      },
      {
        path: '/supplier-center',
        name: '供应商中心',
        // component: './Supplier-Front/Supplier',
      },
      {
        path: '/distribution-center',
        name: '分销商中心',
        // component: './Supplier-Front/Supplier',
      },
    ],
  },
];
