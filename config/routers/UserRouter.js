export default [
  {
    parent: '/user',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login', isMenu: true },
      { path: '/user/register', component: './User/Register', isMenu: true },
      { path: '/user/register-result', component: './User/RegisterResult', isMenu: true },
    ],
  },
];
