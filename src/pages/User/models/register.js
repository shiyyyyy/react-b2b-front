import { Register } from '@/services/serverApi';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      if(response.user){
        let user = { ... response.user , status : 'ok'};
        yield put({
          type: 'registerHandle',
          payload: user,
        });
        //缓存当前用户
        yield put({
          type:'user/saveCurrentUser',
          payload:user
        })
      }

    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority(payload.authority);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
