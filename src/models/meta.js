import {queryMeta} from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'meta',

  state: {
    mods: {},
    actions:{}
  },

  effects: {
    *getMetaData(_, { call, put }) {
      const response = yield call(queryMeta);
      if(response.data){
        const {meta_authority = [],path_authority = [],pem_filters = {} } = response.data;// eslint-disable-line
        setAuthority(meta_authority,path_authority,pem_filters);// eslint-disable-line
        reloadAuthorized();
        yield put({
          type: 'save',
          payload: {mods:response.data.mods || [],actions:response.data.actions ||[]},
        });
      }

    },
  },

  reducers: {
    save(state, action) {
        const {mods,actions} = action.payload;
        return {
          ...state,
          mods,
          actions
        }
    },
  },
};
