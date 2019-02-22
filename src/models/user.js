import { query as queryUsers, queryCurrent } from '@/services/user';
import { AppConst } from '@/utils/const';

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
    list: [],
    currentUser: initUser(),
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      //持久化
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
