import { get } from '@/utils/utils';
import { routerRedux } from 'dva/router';

function query(params){
  return get('/org/Auth/read',params);
}

export default {
    namespace: 'authlist',

    state:{
        data:[],
        total:0
    },

    effects:{
        *load({payload},{put,call}){
            const response = yield call(query,payload);
            yield put({
                type:'save',
                payload:{data:response.data,total:response.total}
            });
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