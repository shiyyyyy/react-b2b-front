import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
// import pathToRegexp from 'path-to-regexp';
import { Modal ,Button,message} from 'antd';
import { routerRedux } from 'dva/router';
import {getLocale} from 'umi/locale';

import request from './request';
import AppCore from './core';
import ModalRender from '@/components/ModalRender';

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
  return false;
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

export function getReadParam(serach,cfg, data) {
    const param = {...serach};
    if(cfg){
      Object.assign(param,getReqData(cfg,data));
    }

    return param;
}



export async function get(url,data){
    const option = {
      method: 'POST'
    };
    const e = getGobalState('enum');
    let newUrl = url;
    const params = { ... data } ; 

    if(e.front_enum && e.front_enum !== ''){
      params.front_enum = e.front_enum;
    }
    if(encUrl(params)!== ''){
      newUrl = `${newUrl}?${encUrl(params)}`;
    }

    return request(newUrl,option);
}

export async function post(url,data,rjCfg){
    const option = {
      method: 'POST',
      body: {
        ...data,
      },
    };
    let nUrl = url;
    const e = getGobalState('enum');
    if(e.front_enum && e.front_enum !== '' ){
      nUrl = `${nUrl}\?front_enum=${e.front_enum}`;
    }

    return request(nUrl,option,rjCfg);
}


export async function readMod(mod,params = {} ){
  const {mods} = getGobalState('meta');
  if(!mods){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }
  if(!mods[mod]){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }

  const cfg = mods[mod];
  
  const serach = {...params,mod}
  return get(cfg.read.url,getReadParam(serach));
}

export async function readAction(action,data = {}){
  const {actions} = getGobalState('meta');

  if(!actions){
    return new Promise((rs)=>{
      rs({success:true,data:{}})
    });
  }
  if(!actions[action]){
    return new Promise((rs)=>{
      rs({success:true,data:{}})
    });
  }
  const cfg = actions[action];
  const serach = {action}
  if(!cfg.read){
    return new Promise((rs)=>{
      rs({success:true,data:{}})
    });
  }
  return get(cfg.read.url,getReadParam(serach,cfg.read.data,data));
}

export async function submit(action, data,rjCfg) {
    const {actions} = getGobalState('meta');
    const cfg = actions[action];
    return post(cfg.submit.url, getReqData(cfg.submit.data, data),rjCfg).then((r)=>{
      if(cfg.view &&cfg.view !=='submit'){
        message.success(r.message);
      }
      return r;
    },(e)=>{
      return e;
    })
}

export async function queryEnum(ver) {
    let enumVer = ver;
    if(!enumVer){
        enumVer =new Date().getTime();
    }
    const url = `${AppCore.HOST}/files/${AppCore.TENANT}/cache/Enum.js?ver=${enumVer}`;
    return request(url ,{
      method: 'GET'
    });
}

export async function init(){
  let url = `${AppCore.HOST}/api/Pub/init`;


  const user = getGobalState('user').currentUser;

  const sid = user.sid ? user.sid :'';
  const option = {lang:getLocale()};
  if(sid!==''){
    url = `${AppCore.HOST}/PublicApi/init`;
  }
  return post(url,option);
}

export async function queryUser(){
  return post('/PublicApi/get_current', {});
}

export function renderButton(cfg,actionMap){
    const {action} = cfg;
    return (
      <div>
        {
          Object.keys(action).map((key)=>(
            <Button key={key} onClick={()=>(actionMap[key]) && (actionMap[key])()}>
              <span>{action[key].text}</span>
            </Button>
          ))}
      </div>);
}

/**
 * trigger
 * @param {object} action action
 * @param {object} cfg 具体配置
 * @param {object} ref 初始数据
 * @param {function} rs success 回调
 * @param {function} rj reject 回调
 */
export function trigger(action,ref,rs,rj){
  const cfg = getGobalState('meta').actions[action] || null;
  if(!cfg){
    window.g_app._store.dispatch(
      routerRedux.push({
        pathname:'/exception/403'
      })
    );

  }else if(cfg.view){
    if(cfg.modal){
      ModalRender(action,{text: action,isDrag: true, ...cfg},ref,rs,rj);
    }else if(cfg.view === 'submit'){
      submit(action,ref).then(
        r=>{
          message.success(r.message);
          if(rs){
            rs(r);
          }
        },e=>{
          if(rj){
            rj(e)
          }
        });
    }else{
      window.g_app._store.dispatch(
        routerRedux.push({
          pathname: cfg.view,
          state:{action,...ref}
        })
      );
    }
  }
}

export function searchChange(cfg,field,data){
    const result = {...data};
    const clearCascade = (checkField) =>{
      let nField = null;
      Object.keys(cfg).forEach((key)=>{
        if(!nField && cfg[key].cascade && cfg[key].cascade === checkField){
          nField = key;
          delete result[key];
        }
      })
      return nField;
    }
    let cField = clearCascade(field);
    while(cField){
      cField = clearCascade(cField);
    }
    return result;
}

export function initBlocksData(blocks){
  const data ={};
  blocks.forEach((block)=>{
    data[block] = []
  });
  return data;
}

export function blocksPageStateInit(blocks,blocksCfg){
  const data = {};
  blocks.forEach((block)=>{
    data[block] = []
  });
  const sel = {};
  const selKeys = {};
  blocks.forEach((block)=>{
    sel[block] = {};
    if(blocksCfg[block] && blocksCfg[block].rowSelection){
      sel[block] = [];
      selKeys[block] = [];
    }
  });

  return {
    data,
    selectedRows:sel,
    selectedRowKeys:selKeys
  };
}

export function AddArrayUid(uidSeed,data){
  return data.map((item)=>(
    {...item,hashKey:(item.hashKey || uidSeed.generate())}
  ))
}

export function AddDataUid(storeids,uidSeed,data){
  if(typeof data === 'object'){
    const rst = {...data};
    storeids.forEach((storeid)=>{
      if(rst[storeid] && Array.isArray(rst[storeid])){
        rst[storeid] =  AddArrayUid(uidSeed,rst[storeid]);
      }
    });
    return rst;
  }
  return data;
}

export function AddDataUidCell(uidSeed,data){
  const dataKey = Object.keys(data)
  const rst = {}
  dataKey.forEach(item => {
    rst[item] = data[item]
    if(data[item]  && Array.isArray(data[item] )){
      rst[item]  =  AddArrayUid(uidSeed,data[item] );
    }
  })
  return rst
}