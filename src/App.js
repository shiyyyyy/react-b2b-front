import { Init } from '@/services/initSrvc';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = {};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

export function patchRoutes(routes) {
  Object.keys(authRoutes).map(authKey =>
    ergodicRoutes(routes, authKey, authRoutes[authKey])
  );
  window.g_routes = routes;
}

export function render(oldRender) {
  Init().then(
    ret => {
      authRoutes = ret;
      oldRender();
      /* eslint no-underscore-dangle: ["error", { "allow": ["_store"] }] */
      window.g_app._store.dispatch({
        type:'enum/update'
      });
    },
    ()=>{
      oldRender();
    }
  );

}