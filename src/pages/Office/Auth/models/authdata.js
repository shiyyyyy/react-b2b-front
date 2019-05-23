import { readAction ,submit} from '@/utils/utils';
import { routerRedux } from 'dva/router';


export default {
    namespace: 'authdata',

    state:{
        data:{
            menu:[],
            auth:{}
        },
        action:'',
        ref:{}
    },

    effects:{
        *init({payload},{put,call}){
            const {action='',...ref} = payload;
            const response = yield call(readAction,action,payload);
            yield put({
                type:'save',
                payload:{data:response.data,action,ref}
            })
        },
        *submit(_,{put,call,select}){
            const data =  yield select(state => state.authdata.data);
            const action = yield select(state=> state.authdata.action);

            yield call(submit,action,data);
            yield put(routerRedux.goBack());
        }
    },

    reducers:{
        save(state, action) {
          return {
            ...state,
            ...action.payload,
          };
        },
        changeAuth(state,action){
            const s = { ... state,data:{menu:state.data.menu,auth:{...state.data.auth,...action.payload}}};
            return s
        }
    }

}