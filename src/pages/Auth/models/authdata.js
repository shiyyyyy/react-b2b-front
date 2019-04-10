import { readAction ,submit} from '@/services/api';
import { routerRedux } from 'dva/router';


export default {
    namespace: 'authdata',

    state:{
        data:{
            menu:[],
            auth:{}
        }
    },

    effects:{
        *load({payload},{put,call}){
            const response = yield call(readAction,'编辑权限',payload);
            yield put({
                type:'save',
                payload:{...response.data}
            });
        },
        *submit({payload},{put,call}){
            yield call(submit,'编辑权限',payload);
            yield put(routerRedux.goBack());
        }
    },

    reducers:{
        save(state, action) {
          return {
            ...state,
            data: action.payload,
          };
        },
        changeAuth(state,action){
            const s = { ... state};
            s.data.auth = {...s.data.auth,... action.payload};

            return {
                ...state,
                ...s
            } 
        }
    }

}