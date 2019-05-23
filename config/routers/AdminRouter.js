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
                component: './Office/Auth/AuthList',
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
                component: './Office/Company/CompanyList',
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
                component: './Office/Department/DepartmentList',
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
                component: './Office/Employee/EmployeeList',
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
                component: './Member/Company/CompanyList',
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
                component: './Member/Company/CompanyList',
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
                component: './Member/Company/CompanyList',
              }
            ]
          },
        ]
      },
      {
        name :'产品管理',
        icon:'sitemap',
        path:'/product',
        routes:[
          {
            path: '/product/productCheck',
            name: '产品审核',
            routes:[
              {
                path: '/product/productCheck',
                redirect: '/product/productCheck/list',
              },
              {
                path: '/product/productCheck/list',
                name: '产品审核',
                component: './Common/List',
              },
              {
                path: '/product/productCheck/check',
                name: '审核',
                component: './Product/ProductCheck/Check',
              }
            ]
          },
          {
            path: '/product/productMaintain',
            name: '产品维护',
            routes:[
              {
                path: '/product/productMaintain',
                redirect: '/product/productMaintain/list',
              },
              {
                path: '/product/productMaintain/list',
                name: '产品维护列表',
                component: './Product/ProductMaintain/List',
              },
              {
                path:'/product/productMaintain/maintain',
                name:'维护',
                component:'./Product/ProductMaintain/Maintain'
              }
            ]
          }
        ]
      },
    ],
  }
];