export default [
  {
    parent: '/',
    routes: [
      {
        name :'业务配置',
        icon:'sitemap',
        path:'/business',
        routes:[
          {
            path: '/business/productNav',
            name: '产品导航',
            routes:[
              {
                path: '/business/productNav',
                redirect: '/business/productNav/list',
              },
              {
                path: '/business/productNav/list',
                name: '产品导航',
                component: './Business/ProductNav/List',
              }
            ]
          },
          {
            path: '/business/productTag',
            name: '一级栏目',
            routes:[
              {
                path: '/business/productTag',
                redirect: '/business/productTag/list',
              },
              {
                path: '/business/productTag/list',
                name: '一级栏目列表',
                component: './Business/ProductTag/List',
              }
            ]
          },
          {
            path: '/business/productSubTag',
            name: '二级栏目',
            routes:[
              {
                path: '/business/productSubTag',
                redirect: '/business/productSubTag/list',
              },
              {
                path: '/business/productSubTag/list',
                name: '二级栏目列表',
                component: './Business/ProductSubTag/List',
              }
            ]
          },
          {
            path: '/business/productTheme',
            name: '主题设置',
            routes:[
              {
                path: '/business/productTheme',
                redirect: '/business/productTheme/list',
              },
              {
                path: '/business/productTheme/list',
                name: '主题设置列表',
                component: './Business/ProductTheme/List',
              }
            ]
          }
        ]
      },
    ],
  }
];