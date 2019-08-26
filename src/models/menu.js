import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { queryMenu ,queryAction} from '@/utils/utils';

// according to server response to get menu 
function formatter(data,pathMap){

    const rst = [];

    Object.keys(data).forEach(key =>{
        const item = data[key];
        if(item.view && pathMap[item.view]){
          const result = {
              ...pathMap[item.view],
              name:item.text,
              locale:item.text,
              key
          };
          if(item.children){
            const children = formatter(item.children,pathMap);
            result.children = children;
          }
          delete result.routes;
          rst.push(result);
        }
    })

    return rst;
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * filter menuData
 */

const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }

  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .filter(item => item );
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

/**
 * 获取路由映射
 * @param {Object} routes 菜单配置
 */
const getRouterMap = routes => {
  const routerMap = {};

  const flattenData = data => {
    data.forEach(item => {
      if (item.routes) {
        flattenData(item.routes);
      }
      routerMap[item.path] = item;
    });
  };
  flattenData(routes);
  return routerMap;
};


export default {
  namespace: 'menu',

  state: {
    menuData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    *init({payload},{put}){
      const {menu:serverMenu,actionData={},routes={}} = payload;
      const routerMap = getRouterMap(routes);
      const menuData = filterMenuData(memoizeOneFormatter(serverMenu,routerMap));
      let breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      const actionBreadData = filterMenuData(memoizeOneFormatter(actionData,routerMap));
      const actionBreadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(actionBreadData);
      breadcrumbNameMap = {...breadcrumbNameMap,...actionBreadcrumbNameMap};
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap},
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
