import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
// import pathToRegexp from 'path-to-regexp';
import { Modal } from 'antd';

import request from './request';



export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

//
export function getGobalState(name){
    /* eslint no-underscore-dangle: ["error", { "allow": ["_store"] }] */
    const state = window.g_app._store.getState();
    let ret = {};
    if(state[name]){
        ret = state[name];
    }
    return ret;
}

// function ergodicRoutes(routes, authKey, authority) {
//   routes.forEach(element => {
//     const ele = element;
//     if (ele.path === authKey) {
//       if (!ele.authority) ele.authority = [];
//       Object.assign(ele.authority, authority || []);
//     } else if (ele.routes) {
//       ergodicRoutes(ele.routes, authKey, authority);
//     }
//     return ele;
//   });
// }

// export function addAuthForRoutes(authRoutes) {
//   const routes = [];
//   Object.assign(routes,window.g_routes);
//   Object.keys(authRoutes).map(authKey =>{
//       return ergodicRoutes(routes, authKey, authRoutes[authKey])
//     }
//   );
//   window.g_auth_config = routes;
// }

// export function getRouteAuthority(pathname){
//     const routes = window.g_auth_config.slice(); // clone
//     let authorities;

//     while (routes.length > 0) {
//       const route = routes.shift();
//       if (route.path && pathToRegexp(route.path).test(pathname)) {
//           if (route.authority) {
//             authorities = route.authority;
//           }
//           break;
//       }
//       if (route.routes) {
//           route.routes.forEach(r => routes.push(r));
//       }
//     }

//     return authorities;
//   };

export function error(p) {
    const m = {
        content: p.message || p,
        title: p.title 
    };
    if(p.onOk){
        m.onOk = p.onOk;
    }
    return Modal.error(m);
}

export function encUrl(p) {
    if (!p) {
        return '';
    }

    return Object.keys(p).filter(k=>p[k]!==undefined&&p[k]!=='')
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(p[k])}`)
        .join('&');
}

export function getReqData(cfg, data) {
    if (!cfg) {
        return data;
    }

    if (typeof(cfg) === 'string') {
        return data[cfg];
    }
    const rst = {};
    Object.keys(cfg).forEach((k)=> {
        const item = cfg[k];


        if (item.indexOf('.') > 0) {

            let fd = item.split(' '); 
            let flt = item.split('|'); 

            if (fd.length > 1) {
                fd[fd.length - 1] = fd[fd.length - 1].split('|')[0];// eslint-disable-line
            } else {
                fd = [flt[0]];
            }
            if (flt.length > 1) {
                flt = flt[1];// eslint-disable-line
            } else {
                flt = undefined;
            }
            const blk = fd[0].split('.')[0]; 
            fd[0] = fd[0].split('.')[1];// eslint-disable-line

            let pk; 
            if (fd.length > 1) {
                pk = data[blk].map((_item) => {
                    const d = {};
                    fd.forEach((f) => {
                        d[f] = _item[f];
                    });
                    return d;
                });
            } else {
                pk = data[blk].map(i => i[fd[0]]);
            }

            if (flt) { 
                switch (flt) {
                    case 'first':
                        rst[k] = data[blk][0][fd[0]];
                        break;
                    default:
                        data[blk].forEach((_item) =>{
                            if (_item[flt]) {
                                rst[k] = _item[fd[0]];
                            }
                        });
                        break;
                }
            } else if(!Number.isNaN(Math.trunc(k))){
                rst[blk] = pk;
            }else { 
                rst[k] = pk;
            }
        } else if ( !Number.isNaN( Math.trunc(k) ) ){
            rst[item] = data[item];
        }else { 
            rst[k] = data[item];
        }
    });

    return rst;
}

export function getReadParam(cfg, data) {
    const param = {};

    // if(){
    //   param['front_enum'] = ver;
    // }
    if(cfg.action){
      param.action = cfg.action;
    }
    if (cfg.mod) {
      param.mod = cfg.mod;
    }
    if (data && data.search) {
        Object.assign(param, data.search);
    }

    if (cfg.read.data) {
        Object.assign(param, getReqData(cfg.read.data, data));
    }
    return param;
}



export async function get(url,params){
    const option = {
      method: 'POST'
    };
    const newUrl = `${url}?${encUrl(params)}`;

    return request(newUrl,option);
}

export async function post(url,data){
    const option = {
      method: 'POST',
      body: {
        ...data,
      },
    };
    return request(url,option);
}

export function getEnum(type){
  const Enum = getGobalState('enum').data[type];
  return Enum;
}