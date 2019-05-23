import { routerRedux } from 'dva/router';
import { post} from '@/utils/utils';

async function reqLogin(params){
  return post('/UserLogin/login',params);
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
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if(response.success && response.user){
        // 缓存当前用户
        yield put({
          type:'user/saveCurrentUser',
          payload:response.user
        })

        yield put(routerRedux.replace('/'));
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
