import {queryEnum} from '@/utils/utils';

export default {
  namespace: 'enum',

  state: {
    State:{0:'停用',1:'启用'},
    Gender:{0:'男',1:'女'},
    front_enum:''
  },

  effects: {
    *update({payload}, { call, put ,select}) {
      
      const ver =  yield select(state => state.enum.ver);

      if(payload.ver && payload.ver !== ver){
        const data = yield call(queryEnum,payload.ver);
        yield put({
          type: 'save',
          payload: data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
        front_enum:action.payload.ver
      };
    },
    setFrontEnum(state,action){
      return {
        ...state,
        front_enum:action.payload.ver
      }
    }
  },
};
