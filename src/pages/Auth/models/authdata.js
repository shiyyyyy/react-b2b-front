import { get } from '@/utils/utils';

function query(params){
  return get('/org/Auth/read_modify',params);
}

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
            const response = yield call(query,payload);
            yield put({
                type:'save',
                payload:{...response.data}
            });
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