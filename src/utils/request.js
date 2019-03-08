import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro,getGobalState} from './utils';
import { AppCore } from  './core';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response=> {
  // mock
  if(response.success === undefined){
    return response;
  }
  //
  if(response.success === true){
    return response;
  }
  let error ;
  if(response.message === -1){
    error = new Error('未登录');
    error.name = -1;
    error.response = response;
    error.message = '未登录';
    throw error;
  }
  const errortext = response.message || codeMessage[response.status];
  error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  error.message = errortext;
  throw error;
}

// const cachedSave = (response, hashcode) => {
//   /**
//    * Clone a response data and store it in sessionStorage
//    * Does not support data other than json, Cache only json
//    */
//   const contentType = response.headers.get('Content-Type');
//   if (contentType && contentType.match(/application\/json/i)) {
//     // All data is saved as text
//     response
//       .clone()
//       .text()
//       .then(content => {
//         sessionStorage.setItem(hashcode, content);
//         sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
//       });
//   }
//   return response;
// };

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    ...option,
  };
  // if(MOCK === 'none'){
  if (url.indexOf('http') !== 0 && AppCore.HOST) {
      url = AppCore.HOST + url;
  }
  //}

  // 不再携带cookie
  // const defaultOptions = {
  //   credentials: 'include',
  // };
  const newOptions = {...options };
  
  
  const user = getGobalState('user');
  const sid = user.currentUser ? (user.currentUser.sid?user.currentUser.sid:''): '';

  if(newOptions.method === 'POST'){
    newOptions.body = newOptions.body || {};
    if(sid !==''){
      newOptions.body.sid = sid;
    } 
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return new Promise((rs, rj) => {
    fetch(url, newOptions)
    .then(response => {
      return response.json();
    })
    .then(checkStatus)
    .then(response => {
        rs(response);
    },error=>{
      // 未登录
      if(error.name ===-1){
        window.g_app._store.dispatch({
          type:'login/logout'
        });
        return;
      }
      notification.error({
        message: '请求错误',
        description: error.message,
      });
      rj(error);
    })
  });
}