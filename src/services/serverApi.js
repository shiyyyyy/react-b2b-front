import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryActivities() {
  return request('/server/product/Product/read',{
    method:'GET'
  })
}

export async function Register(params) {
  return request('/server/api/Register/register_supplier', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params){
  return request('/server/Session/login',{
    method:'POST',
    body:params
  });
}

export async function queryCurrent(){
  return request('/server/PublicApi/get_current',{
    method:'GET'
  });
}
