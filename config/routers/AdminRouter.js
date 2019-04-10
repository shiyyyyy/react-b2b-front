export default [
  {
    parent: '/adm',
    routes: [
      {
        name: 'auth',
        icon: 'sitemap',
        path: '/auth',
        isMenu: true,
        routes: [
          { path: '/auth', redirect: '/auth/list' },
          {
            path: '/auth/list',
            name: 'list',
            component: './Auth/AuthList',
          },
          {
            path: '/auth/edit',
            name: 'edit',
            component: './Auth/AuthEdit',
          },
        ],
      },
    ],
  },
];