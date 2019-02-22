import { queryProducts } from '@/services/api';
import { debug } from 'util';

export default {
  namespace: 'newPage',

  state: {
    data: [],
    newpage: false
  },

  effects: {
    *fetchFakePro({ payload }, { call, put }) {
        const response = yield call(queryProducts);
        yield put({
          type: 'show',
          payload: response,
        });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
