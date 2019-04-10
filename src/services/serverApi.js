import request from '@/utils/request';

export async function queryActivities() {
  return request('/product/Product/read',{
    method:'POST'
  })
}

export async function Register(params) {
  return request('/api/Register/register_user', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params){
  return request('/Session/login',{
    method:'POST',
    body:params
  });
}

export async function queryCurrent(){
  return request('/PublicApi/get_current',{
    method:'POST'
  });
}
