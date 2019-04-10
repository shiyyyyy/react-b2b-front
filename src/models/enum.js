import {queryEnum} from '@/services/api';

export default {
  namespace: 'enum',

  state: {
    data: {},
  },

  effects: {
    *update(_, { call, put }) {
      const response = yield call(queryEnum);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      const {data:e} = state;
      const res = {...e,...action.payload};
      return {
        ...state,
        data:res
      };
    },
  },
};
