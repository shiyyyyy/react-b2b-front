import {queryMeta} from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'meta',

  state: {
    mods: {},
    actions:{},
    blocks:{}
  },

  effects: {
    *init({payload}, { put }) {
      const {meta={}} = payload;
      const {meta_authority = [],path_authority = [],pem_filters = {},mods={},actions={},blocks={} } = meta;// eslint-disable-line
      setAuthority(meta_authority,path_authority,pem_filters);// eslint-disable-line
      reloadAuthorized();
      yield put({
        type: 'save',
        payload: {mods,
                  actions,
                  blocks
                },
      });
    }
  },

  reducers: {
    save(state, action) {
        const {mods,actions,blocks} = action.payload;
        return {
          ...state,
          mods,
          actions,
          blocks
        }
    },
  },
};
