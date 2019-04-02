export default [
  {
    parent: '/',
    routes: [
      {
        name :'auth',
        icon:'sitemap',
        path:'/auth',
        routes:[
          {path:'/auth',redirect:'/auth/list'},
          {
            path:'/auth/list',
            name:'list',
            component:'./Auth/AuthList',
            mod:'权限管理'
          },
          {
            path:'/auth/edit',
            name:'edit',
            component:'./Auth/AuthEdit',
            action:'编辑权限'
          }
        ]
      },
    ],
  }
];