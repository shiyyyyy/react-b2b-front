import { readMod } from '@/utils/utils';

export default {
  namespace: 'notices',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      try{
        const response = yield call(readMod,'消息通知');
        if(response.success && response.data){
          const {data} = response;
          yield put({
            type:'save',
            payload:Array.isArray(data)?data:[]
          });
        }
      }catch(err){
        // do something
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
