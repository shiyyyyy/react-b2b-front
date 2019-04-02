export default [
  {
    parent: '/',
    routes: [
      {
        path: '/personal',
        //name: '2',
        icon: 'home',
        routes: [
          { path: '/personal', redirect: '/personal/index' },
          {
            path: '/personal/index',
            name: '1',
            component: './Supplier/Personal/index',
            mod: '公开页面',
          },
        ],
      },
    ],
  },
];