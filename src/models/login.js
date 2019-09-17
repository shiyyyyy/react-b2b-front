import { routerRedux } from 'dva/router';
import { post} from '@/utils/utils';
import { AppConst } from '@/utils/const';

async function reqLogin(params){
  return post('/UserLogin/login',params,{rj:1}).then(r=>{
    return r
  },j=>{
    return j
  });
}

async function reqLogout(){
  return post('/UserLogout/logout');
}

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(reqLogin, payload);
      if(response.success){
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        if(response.user){
          // 缓存当前用户
          yield put({
            type:'user/saveCurrentUser',
            payload:response.user
          })
          const { user } = response;
          switch(user.type){
            case AppConst.USER_EMP:
              yield put(routerRedux.replace('/Home/Admin'));
              break;
            case AppConst.USER_SUP:
              yield put(routerRedux.replace('/Home/Supplier'));
              break;
            case AppConst.USER_RET:
              yield put(routerRedux.replace('/Home/Retailer'));
              break;
            default:
              break;
          }
        }
      }
    },

    *logout(_, { put,call }) {
      try{
        yield call(reqLogout);
      }catch{
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false
          },
        });
        yield put({
          type:'user/clear'
        })
      }
    },


  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
