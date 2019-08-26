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
            path: '/business/ProductNav',
            name: '导航字典',
            routes:[
              {
                path: '/business/ProductNav',
                redirect: '/business/ProductNav/list',
              },
              {
                path: '/business/ProductNav/list',
                name: '导航字典',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/PackagetourNav',
            name: '跟团游导航',
            routes:[
              {
                path: '/business/PackagetourNav',
                redirect: '/business/PackagetourNav/list',
              },
              {
                path: '/business/PackagetourNav/list',
                name: '跟团游导航',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/IndependentTravelNav',
            name: '自由行字典',
            routes:[
              {
                path: '/business/IndependentTravelNav',
                redirect: '/business/IndependentTravelNav/list',
              },
              {
                path: '/business/IndependentTravelNav/list',
                name: '自由行字典',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/DestinationNav',
            name: '目的地导航',
            routes:[
              {
                path: '/business/DestinationNav',
                redirect: '/business/DestinationNav/list',
              },
              {
                path: '/business/DestinationNav/list',
                name: '目的地导航',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/VisaNav',
            name: '单签证导航',
            routes:[
              {
                path: '/business/VisaNav',
                redirect: '/business/VisaNav/list',
              },
              {
                path: '/business/VisaNav/list',
                name: '单签证导航',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/ProductTheme',
            name: '特色标签',
            routes:[
              {
                path: '/business/ProductTheme',
                redirect: '/business/ProductTheme/list',
              },
              {
                path: '/business/ProductTheme/list',
                name: '特色标签',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/business/City',
            name: '城市设置',
            routes:[
              {
                path: '/business/City',
                redirect: '/business/City/list',
              },
              {
                path: '/business/City/list',
                name: '城市设置',
                component: './Common/List',
              }
            ]
          },
        ]
      },
    ],
  }
];