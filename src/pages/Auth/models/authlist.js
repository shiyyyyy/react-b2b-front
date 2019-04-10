import { readMod } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'authlist',

    state:{
        data:[],
        total:0
    },

    effects:{
        *fetch({payload}, { call, put }) {
          try{
            const response = yield call(readMod,'权限管理',payload);
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
        *edit({payload},{put}){
            yield put(
                routerRedux.push({
                pathname:'/auth/edit',
                state:{ ... payload}
            }))
        }
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