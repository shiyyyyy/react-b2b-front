import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { addAuthForRoutes, post } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { routesInit } from '@/services/initSrvc';

async function login(params) {
  return post('/Session/login', params);
}

export default {
  namespace: 'authorizedSetting',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.success && response.user) {
        if (response.user.authority) {
          setAuthority(response.user.authority);
        }
        // 缓存当前用户
        yield put({
          type: 'user/saveCurrentUser',
          payload: response.user,
        });

        reloadAuthorized();
        const pemRoutes = yield call(routesInit);

        addAuthForRoutes(pemRoutes);
        yield put(routerRedux.replace('/supplier-front'));
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
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
