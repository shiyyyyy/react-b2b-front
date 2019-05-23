import { queryUser } from '@/utils/utils';
import { AppConst } from '@/utils/const';

import {clearAuthority} from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';

function initUser(){
  let user = {};
  try{
    if(localStorage[AppConst.APP_NAME]){
      user = JSON.parse(localStorage[AppConst.APP_NAME]);
    }
    return user;
  }catch(e){
    return user;
  }
}

export default {
  namespace: 'user',

  state: {
    currentUser: initUser(),
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUser);
      if(response && response.user){
        yield put({
          type: 'saveCurrentUser',
          payload: response.user,
        });
      }
    },
    *clear(_,{put}){
      clearAuthority();
      reloadAuthorized();
      yield put({
        type:'saveCurrentUser',
        payload:{}
      });
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      // 持久化
      localStorage[AppConst.APP_NAME] = JSON.stringify(action.payload || {});

      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
