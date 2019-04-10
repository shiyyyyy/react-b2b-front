import { stringify } from 'qs';
import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';
import { AppMeta,AppCore } from '@/utils/core';
import { get,post,getReadParam,getReqData} from '@/utils/utils';

export async function queryProducts() {
  return request('/api/products');
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/Register/register_supplier', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// -----------------以上antd------------------------
export async function readMod(mod,params = {} ){
  const authority = getAuthority();

  if(!AppMeta.mods){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }
  if(!mod || !authority.includes(mod)){
    return new Promise((rs,rj)=>
      {
        const error = new Error(401);
        rj(error);
      });
  }
  if(!AppMeta.mods[mod]){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }

  const cfg = AppMeta.mods[mod];
  cfg.mod = mod;

  return get(cfg.read.url,getReadParam(cfg,params));
}

export async function readAction(action,params = {}){
  const authority = getAuthority();
  if(!AppMeta.actions){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }
  if(!action || !authority.includes(action)){
    return new Promise((rs,rj)=>{
      const error = new Error(401);
      rj(error);
    });
  }
  if(!AppMeta.actions[action]){
    return new Promise((rs)=>{
      rs({success:true,data:[]})
    });
  }
  const cfg = AppMeta.actions[action];
  cfg.action = action;

  return get(cfg.read.url,getReadParam(cfg,params));
}

export async function submit(action, data) {
    const cfg = AppMeta.actions[action];

    return post(cfg.submit.url, getReqData(cfg.submit.data, data))
}

export async function queryEnum(ver) {
    let enumVer = ver;
    if(!enumVer){
        enumVer =new Date().getTime();
    }
    const url = `${AppCore.HOST}/files/${AppCore.TENANT}/cache/Enum.js?ver=${enumVer}`;
    return request(url,{method:'get'});
}