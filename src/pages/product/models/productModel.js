import { get } from '@/utils/utils';
import { routerRedux } from 'dva/router';

function queryProduct(params){
  return get('/product/Product/read',params);
}

export default {
  namespace: 'product',

  state: {
    data: {
      list: [],
      total: 0,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryProduct, payload);
      yield put({
        type: 'save',
        payload: {list:response.data,total:response.total},
      });
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(queryProduct, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *edit({payload},{put}){
      yield put(routerRedux.push({
        pathname:'/product/edit',
        state:payload
      }));
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
