export default [
  {
    parent: '/',
    routes: [
      {
        name :'行政中心',
        icon:'sitemap',
        path:'/office',
        routes:[
          {
            path: '/office/auth',
            routes:[
              {
                path: '/office/auth',
                redirect: '/office/auth/list',
              },
              {
                path: '/office/auth/list',
                name: '权限管理',
                component: './Common/List',
              },
              {
                path:'/office/auth/edit',
                name:'编辑权限',
                component:'./Office/Auth/AuthEdit',
              },
            ]
          },
          {
            path: '/office/company',
            name: '公司管理',
            routes:[
              {
                path: '/office/company',
                redirect: '/office/company/list',
              },
              {
                path: '/office/company/list',
                name: '公司列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/office/department',
            name: '部门管理',
            routes:[
              {
                path: '/office/department',
                redirect: '/office/department/list',
              },
              {
                path: '/office/department/list',
                name: '部门列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/office/employee',
            name: '员工管理',
            routes:[
              {
                path: '/office/employee',
                redirect: '/office/employee/list',
              },
              {
                path: '/office/employee/list',
                name: '员工列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/office/announce',
            name: '公告管理',
            routes:[
              {
                path: '/office/announce',
                redirect: '/office/announce/list',
              },
              {
                path: '/office/announce/list',
                name: '公告列表',
                component: './Common/List',
              }
            ]
          },
        ]
      },
      {
        name :'会员中心',
        icon:'sitemap',
        path:'/member',
        routes:[
          {
            path: '/member/company',
            name: '公司管理',
            routes:[
              {
                path: '/member/company',
                redirect: '/member/company/list',
              },
              {
                path: '/member/company/list',
                name: '公司列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/member/department',
            name: '部门管理',
            routes:[
              {
                path: '/member/department',
                redirect: '/member/department/list',
              },
              {
                path: '/member/department/list',
                name: '部门列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/member/sales',
            name: '账号管理',
            routes:[
              {
                path: '/member/sales',
                redirect: '/member/sales/list',
              },
              {
                path: '/member/sales/list',
                name: '账号列表',
                component: './Common/List',
              }
            ]
          },
        ]
      },
      {
        name :'供应商管理',
        icon:'sitemap',
        path:'/SupplierManagement',
        routes:[
          {
            path: '/SupplierManagement/TbCompany',
            name: '提报供应商',
            routes:[
              {
                path: '/SupplierManagement/TbCompany',
                redirect: '/SupplierManagement/TbCompany/List',
              },
              {
                path: '/SupplierManagement/TbCompany/List',
                name: '供应商列表',
                component: './Common/List',
              },
              {
                path:'/SupplierManagement/TbCompany/Edit',
                name:'完善供应商',
                component:'./SupplierManagement/Company/Add'
              },
            ]
          },
          {
            path: '/SupplierManagement/XnCompany',
            name: '吸纳供应商',
            routes:[
              {
                path: '/SupplierManagement/XnCompany',
                redirect: '/SupplierManagement/XnCompany/List',
              },
              {
                path: '/SupplierManagement/XnCompany/List',
                name: '供应商列表',
                component: './Common/List',
              },
              {
                path:'/SupplierManagement/XnCompany/Approve',
                name:'审批吸纳',
                component:'./SupplierManagement/Company/Approve'
              },
              
            ]
          },
          {
            path: '/SupplierManagement/Company',
            name: '供应商管理',
            routes:[
              {
                path: '/SupplierManagement/Company',
                redirect: '/SupplierManagement/Company/List',
              },
              {
                path: '/SupplierManagement/Company/List',
                name: '公司列表',
                component: './Common/List',
              },
              {
                path:'/SupplierManagement/Company/Add',
                name:'新增供应商',
                component:'./SupplierManagement/Company/Add'
              },
              {
                path:'/SupplierManagement/Company/Edit',
                name:'修改供应商',
                component:'./SupplierManagement/Company/Add'
              },
              {
                path:'/SupplierManagement/Company/Maintain',
                name:'维护供应商',
                component:'./SupplierManagement/Company/Add'
              },
              {
                path:'/SupplierManagement/Company/Approve',
                name:'审批供应商',
                component:'./SupplierManagement/Company/Approve'
              }
            ]
          },
          
          {
            path: '/SupplierManagement/Department',
            name: '部门管理',
            routes:[
              {
                path: '/SupplierManagement/Department',
                redirect: '/SupplierManagement/Department/List',
              },
              {
                path: '/SupplierManagement/Department/List',
                name: '部门列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/SupplierManagement/Sales',
            name: '账号管理',
            routes:[
              {
                path: '/SupplierManagement/Sales',
                redirect: '/SupplierManagement/Sales/List',
              },
              {
                path: '/SupplierManagement/Sales/List',
                name: '账号列表',
                component: './Common/List',
              }
            ]
          },
        ]
      },
      {
        name :'零售商管理',
        icon:'sitemap',
        path:'/RetailerManagement',
        routes:[
          {
            path: '/RetailerManagement/Company',
            name: '零售商管理',
            routes:[
              {
                path: '/RetailerManagement/Company',
                redirect: '/RetailerManagement/Company/List',
              },
              {
                path: '/RetailerManagement/Company/List',
                name: '公司列表',
                component: './Common/List',
              },
            ]
          },
          {
            path: '/RetailerManagement/Department',
            name: '部门管理',
            routes:[
              {
                path: '/RetailerManagement/Department',
                redirect: '/RetailerManagement/Department/List',
              },
              {
                path: '/RetailerManagement/Department/List',
                name: '部门列表',
                component: './Common/List',
              }
            ]
          },
          {
            path: '/RetailerManagement/Sales',
            name: '账号管理',
            routes:[
              {
                path: '/RetailerManagement/Sales',
                redirect: '/RetailerManagement/Sales/List',
              },
              {
                path: '/RetailerManagement/Sales/List',
                name: '账号列表',
                component: './Common/List',
              }
            ]
          },
        ]
      },
      {
        name :'产品监管',
        icon:'sitemap',
        path:'/Product',
        routes:[
          {
            path: '/Product/productCheck',
            name: '产品审核',
            routes:[
              {
                path: '/Product/productCheck',
                redirect: '/product/productCheck/list',
              },
              {
                path: '/Product/productCheck/list',
                name: '产品审核',
                component: './ProductStore/Product/List',
              },
              {
                path: '/Product/productCheck/check',
                name: '审核',
                component: './ProductStore/ApproveAll',
              }
            ]
          },
          {
            path: '/Product/productMaintain',
            name: '产品维护',
            routes:[
              {
                path: '/Product/productMaintain',
                redirect: '/product/productMaintain/list',
              },
              {
                path: '/Product/productMaintain/list',
                name: '产品维护列表',
                component: './ProductStore/Product/List',
              },
            ]
          }
        ]
      },
      {
        name :'系统设置',
        icon:'sitemap',
        path:'/sys',
        routes:[
          {
            path: '/sys/flow',
            name: '审批流程',
            routes:[
              {
                path: '/sys/flow',
                redirect: '/sys/flow/list',
              },
              {
                path: '/sys/flow/list',
                name: '流程列表',
                component: './Sys/FlowList',
              },
              {
                path: '/sys/flow/modify',
                name:'修改权限',
                component:'./Sys/Modify'
              },
            ]
          },
          {
            path: '/sys/api',
            name: '接口管理',
            routes:[
              {
                path: '/sys/api',
                redirect: '/sys/api/list',
              },
              {
                path: '/sys/api/list',
                name: '供应商接口列表',
                component: './Common/List',
              },
            ]
          },
        ]
      },
    ],
  }
];