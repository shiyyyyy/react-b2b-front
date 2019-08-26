import { Register } from '@/services/serverApi';
import { reloadAuthorized } from '@/utils/Authorized';


export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call,put}) {
      const response = yield call(Register, payload);
      if(response.success && response.user){
        // 缓存当前用户
        yield put({
          type:'user/saveCurrentUser',
          payload:response.user
        })
        yield put({
          type: 'registerHandle',
          payload:{status : 'ok'}
        });
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
