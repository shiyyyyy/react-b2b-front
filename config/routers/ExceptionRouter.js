export default [
  {
    parent: '/',
    routes: [
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        redirect: '/exception/403',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          }
        ],
      },
      {
        component: '404',
      },
    ],
  }
];