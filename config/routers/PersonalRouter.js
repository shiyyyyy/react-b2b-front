export default [
  {
    parent: '/',
    routes: [
      {
        path: '/personal',
        //name: '2',
        icon: 'home',
        isMenu: true,
        routes: [
          { path: '/personal', redirect: '/personal/index' },
          {
            path: '/personal/index',
            name: '1',
            component: './Supplier/Personal/index',
            isMenu: true,          },
        ],
      },
    ],
  },
];