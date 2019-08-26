export default [
  {
    parent: '/',
    routes: [
      {
        path: '/supplier',
        name: '首页',
        icon: 'home',
        isMenu: true,
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
        name: '产品团期',
        icon: 'sitemap',
        path: '/ProductStore',
        routes: [
          {
            path: '/ProductStore/PackageTour',
            name: '跟团游',
            routes: [
              {
                path: '/ProductStore/PackageTour',
                redirect: '/ProductStore/PackageTour/List',
              },
              {
                path: '/ProductStore/PackageTour/List',
                name: '跟团游列表',
                component: './ProductStore/PackageTour/List',
              },
              {
                path: '/ProductStore/PackageTour/Add',
                name: '新增跟团游',
                component: './ProductStore/PackageTour',
              },
              {
                path: '/ProductStore/PackageTour/Edit',
                name: '修改跟团游',
                component: './ProductStore/PackageTour',
              },
              {
                path: '/ProductStore/PackageTour/Read',
                name: '跟团游详情',
                component: './ProductStore/PackageTour/Read',
              },
              {
                path: '/ProductStore/PackageTour/AddGroup',
                name: '跟团游开团',
                component: './ProductStore/PackageTour/AddGroup',
              },
            ],
          },
          {
            path: '/ProductStore/BigTraffic',
            name: '大交通',
            routes: [
              {
                path: '/ProductStore/BigTraffic',
                redirect: '/ProductStore/BigTraffic/List',
              },
              {
                path: '/ProductStore/BigTraffic/List',
                name: '大交通列表',
                component: './ProductStore/BigTraffic/List',
              },
              {
                path: '/ProductStore/BigTraffic/Add',
                name: '新增大交通',
                component: './ProductStore/BigTraffic',
              },
              {
                path: '/ProductStore/BigTraffic/Edit',
                name: '修改大交通',
                component: './ProductStore/BigTraffic',
              },
              {
                path: '/ProductStore/BigTraffic/AddGroup',
                name: '大交通开团',
                component: './ProductStore/BigTraffic/AddGroup',
              },
            ],
          },
          {
            path: '/ProductStore/RoomBooking',
            name: '单订房',
            routes: [
              {
                path: '/ProductStore/RoomBooking',
                redirect: '/ProductStore/RoomBooking/List',
              },
              {
                path: '/ProductStore/RoomBooking/List',
                name: '单订房列表',
                component: './ProductStore/RoomBooking/List',
              },
              {
                path: '/ProductStore/RoomBooking/Add',
                name: '新增单订房',
                component: './ProductStore/RoomBooking',
              },
              {
                path: '/ProductStore/RoomBooking/Edit',
                name: '修改单订房',
                component: './ProductStore/RoomBooking',
              },
              {
                path: '/ProductStore/RoomBooking/AddGroup',
                name: '单订房开团',
                component: './ProductStore/RoomBooking/AddGroup',
              },
            ],
          },
          {
            path: '/ProductStore/VisaBooking',
            name: '单签证',
            routes: [
              {
                path: '/ProductStore/VisaBooking',
                redirect: '/ProductStore/VisaBooking/List',
              },
              {
                path: '/ProductStore/VisaBooking/List',
                name: '单签证列表',
                component: './ProductStore/VisaBooking/List',
              },
              {
                path: '/ProductStore/VisaBooking/Add',
                name: '新增单签证',
                component: './ProductStore/VisaBooking',
              },
              {
                path: '/ProductStore/VisaBooking/Edit',
                name: '修改单签证',
                component: './ProductStore/VisaBooking',
              },
              {
                path: '/ProductStore/VisaBooking/AddGroup',
                name: '单签证开团',
                component: './ProductStore/VisaBooking/AddGroup',
              },
            ],
          },
        ],
      },
      {
        name: '团期维护',
        icon: 'sitemap',
        path: '/Group',
        routes: [
          {
            path: '/Group/PackageTourGroup',
            name: '跟团游团期',
            routes: [
              {
                path: '/Group/PackageTourGroup',
                redirect: '/Group/PackageTourGroup/List',
              },
              {
                path: '/Group/PackageTourGroup/List',
                name: '跟团游团期列表',
                component: './Common/List',
              }
            ],
          },
          {
            path: '/Group/BigTraffic',
            name: '大交通团期',
            routes: [
              {
                path: '/Group/BigTraffic',
                redirect: '/Group/BigTraffic/List',
              },
              {
                path: '/Group/BigTraffic/List',
                name: '大交通团期列表',
                component: './Common/List',
              }
            ],
          },
          {
            path: '/Group/RoomBooking',
            name: '单订房团期',
            routes: [
              {
                path: '/Group/RoomBooking',
                redirect: '/Group/RoomBooking/List',
              },
              {
                path: '/Group/RoomBooking/List',
                name: '单订房团期列表',
                component: './Common/List',
              }
            ],
          },
          {
            path: '/Group/VisaBooking',
            name: '单签证团期',
            routes: [
              {
                path: '/Group/VisaBooking',
                redirect: '/Group/VisaBooking/List',
              },
              {
                path: '/Group/VisaBooking/List',
                name: '单签证列表',
                component: './Common/List',
              }
            ],
          },
        ],
      },
    ],
  },
];