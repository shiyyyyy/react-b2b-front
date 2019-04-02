import { Register } from '@/services/serverApi';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { AppConst } from '@/utils/const';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call,put}) {
      const response = yield call(Register, payload);
      if(response.success){
        const user = { status : 'ok'};
        yield put({
          type: 'registerHandle',
          payload:user
        });
      }

    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority(AppConst.PUB_AUTHORITY);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
