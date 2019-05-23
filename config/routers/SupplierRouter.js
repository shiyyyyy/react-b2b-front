export default [
  {
    parent: '/',
    routes: [
      {
        path: '/supplier',
        name: '首页',
        icon: 'home',
        routes: [
          { path: '/supplier', redirect: '/supplier/index' },
          {
            path: '/supplier/index',
            name: 'home',
            component: './Supplier/index',
          },
        ],
      },
      {
        name :'产品团期',
        icon:'sitemap',
        path:'/productStore',
        routes:[
          {
            path: '/productStore/packageTour',
            name: '跟团游',
            routes:[
              {
                path: '/productStore/packageTour',
                redirect: '/productStore/packageTour/list',
              },
              {
                path: '/productStore/packageTour/list',
                name: '跟团游列表',
                component: './Common/List',
              },
              {
                path: '/productStore/packageTour/add',
                name: '新增跟团游',
                component: './ProductStore/PackageTour/Add',
              },
              {
                path: '/productStore/packageTour/edit',
                name:'修改跟团游',
                component:'./ProductStore/PackageTour/Edit'
              }
            ]
          },
        ]
      },
    ],
  },
];