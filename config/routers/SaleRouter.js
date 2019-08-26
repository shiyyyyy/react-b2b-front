export default [
    {
      parent: '/',
      routes: [
        {
          name: '订单管理',
          icon: 'sitemap',
          path: '/Sale',
          routes: [
            {
              path: '/Sale/Placeholder',
              name: '占位管理',
              routes: [
                {
                  path: '/Sale/Placeholder',
                  redirect: '/Sale/Placeholder/List',
                },
                {
                  path: '/Sale/Placeholder/List',
                  name: '跟团游列表',
                  component: './Sale/Placeholder/List',
                },
              ],
            },
            {
              path: '/Sale/Order',
              name: '实报管理',
              routes: [
                {
                  path: '/Sale/Order',
                  redirect: '/Sale/Order/List',
                },
                {
                  path: '/Sale/Order/List',
                  name: '跟团游列表',
                  component: './Sale/Order/List',
                },
              ],
            },
            {
              path: '/Sale/OrderChange',
              name: '订单变更',
              routes: [
                {
                  path: '/Sale/OrderChange',
                  redirect: '/Sale/OrderChange/List',
                },
                {
                  path: '/Sale/OrderChange/List',
                  name: '跟团游列表',
                  component: './Sale/OrderChange/List',
                },
              ],
            },
            {
              path: '/Sale/AccountCheck',
              name: '对账管理',
              routes: [
                {
                  path: '/Sale/AccountCheck',
                  redirect: '/Sale/AccountCheck/List',
                },
                {
                  path: '/Sale/AccountCheck/List',
                  name: '跟团游列表',
                  component: './Sale/AccountCheck/List',
                },
              ],
            },
          ],
        },
      ],
    },
  ];