export default [
  {
    parent: '/',
    routes: [
      {
        path: '/Home/Admin',
        name: 'HomeAdmin',
        component: './Home/Admin',
      },
      {
        path: '/Home/Supplier',
        name: 'HomeSupplier',
        component: './Home/Supplier',
      },
      {
        path: '/Home/Retailer',
        name: 'HomeRetailer',
        component: './Home/Retailer',
      },
    ],
  }
];