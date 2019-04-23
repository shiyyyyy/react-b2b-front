export default [
  {
    parent: '/admin',
    routes: [
      { path: '/admin', redirect: '/admin/index' },
      {
        path: '/admin/index',
        name: '首页',
        icon: 'home',
        isMenu: true,
        component: './Admin',

        // routes: [
        //   { path: '/admin', redirect: '/admin/index' },
        //   {
        //     path: '/admin/index',
        //     name: 'admin',
        //     component: './Admin',
        //   },
        // ],
      },
      {
        path: '/admin/administration',
        name: '行政管理',
        icon: 'home',
        isMenu: true,
        routes: [
          { path: '/admin/administration', redirect: '/admin/administration/company' },
          {
            path: '/admin/administration/company',
            name: '公司设置',
            isMenu: true,
            component: './Admin/Administration/Company',
          },
          {
            path: '/admin/administration/department',
            name: '部门设置',
            isMenu: true,
            component: './Admin/Administration/Department',
          },
          {
            path: '/admin/administration/employee',
            name: '员工设置',
            isMenu: true,
            component: './Admin/Administration/Employee',
          },
          {
            path: '/admin/administration/purview',
            name: '权限设置',
            isMenu: true,
            component: './Admin/Administration/Purview',
          },
        ],
      },
      {
        path: '/admin/member',
        name: '会员管理',
        icon: 'home',
        isMenu: true,
        routes: [
          { path: '/admin/member', redirect: '/admin/member/register' },
          {
            path: '/admin/member/register',
            name: '注册审核',
            isMenu: true,
            component: './Admin/Member/Register',
          },
          {
            path: '/admin/member/company',
            name: '公司管理',
            isMenu: true,
            component: './Admin/Member/Company',
          },
          {
            path: '/admin/member/department',
            name: '部门管理',
            isMenu: true,
            component: './Admin/Member/Department',
          },
          {
            path: '/admin/member/account',
            name: '账号管理',
            isMenu: true,
            component: './Admin/Member/Account',
          },
        ],
      },
      {
        path: '/admin/product',
        name: '产品管理',
        icon: 'home',
        isMenu: true,
        routes: [
          { path: '/admin/product', redirect: '/admin/Product/examine' },
          {
            path: '/admin/product/examine',
            name: '产品审核',
            isMenu: true,
            component: './Admin/Product/Examine',
          },
          {
            path: '/admin/product/maintain',
            name: '产品维护',
            isMenu: true,
            component: './Admin/Product/Maintain',
          },
        ],
      },
    ],
  },
];
