import { readMod } from '@/utils/utils';

export default {
    namespace: 'authlist',

    state:{
        data:[],
        total:0
    },

    effects:{
        *fetch({payload}, { call, put }) {
          try{
            const {mod= ''} = payload;
            const response = yield call(readMod,mod,payload);

            if(response.success && response.data){
              yield put({
                type:'save',
                payload:{data:response.data?response.data:[],total:response.total?response.total:0}
              });
            }
          }catch(err){
            // do something
          }
        },
    },

    reducers:{
        save(state, action) {
          return {
            ...state,
            ...action.payload
          };
        },
    }

}