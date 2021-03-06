import Supplier from './routers/SupplierRouter';
import Personal from './routers/PersonalRouter';
import User from './routers/UserRouter';

import Exception from './routers/ExceptionRouter';
import Admin from './routers/AdminRouter';
import BusinessSetting from './routers/BusinessSettingRouter';
import Home from './routers/HomeRouter';
import Sale from './routers/SaleRouter';

const baseConfig = {
  '/user': { component: '../layouts/UserLayout', routes: [] },
  '/': { component: '../layouts/BasicLayout', routes: [] }
};

function init() {
  let subConfig = [];
  let routerConfig = { ...baseConfig };
  subConfig = [...Supplier, ...User, ...Admin, ...Personal,...BusinessSetting,...Home,...Sale];

  subConfig = [...subConfig, ...Exception];
  subConfig.forEach(sub => {
    if (sub.parent && routerConfig[sub.parent]) {
      routerConfig[sub.parent]['routes'] = [...routerConfig[sub.parent]['routes']
        , ...sub.routes];
    }
  })
  let config = [];
  Object.keys(routerConfig).map(pathkey => {
    let _config = {
      path: pathkey,
      component: routerConfig[pathkey].component,
      routes: routerConfig[pathkey].routes
    }
    config.push(_config);
  })
  return config;
}

const config = init();

export default config;




