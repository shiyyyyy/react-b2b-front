import {init} from '@/utils/utils';

export default {
  namespace: 'init',

  state: {
  },

  effects: {
    *Init({payload}, { call, put }) {
      const {routes} = payload;
      const response = yield call(init);
      if(response.data){
        const {menu={},actionData={},meta={}} = response.data;
        yield put({
          type: 'menu/init',
          payload: {menu,actionData,routes},
        });
        yield put({
          type: 'meta/init',
          payload:{meta}
        })
      }

      return true;

    },
  },

  reducers: {
  },
};
