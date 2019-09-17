import {Modal} from 'antd';


export default {
  namespace: 'global',

  state: {
    routeRecord:'',
  },

  effects: {
    *routeChange({payload},{put,select}){
      const routeRecord = yield select(state => state.global.routeRecord);
      if(routeRecord !== '' && routeRecord !== payload){
        Modal.destroyAll();
      }
      yield put({
        type:'changeRouteRecord',
        payload
      })
    },
  },

  reducers: {
    setLoadedStatus(state, { payload }) {
      return {
        ...state,
        loadedAllNotices: payload,
      };
    },
    changeRouteRecord(state,{payload}){
      return {
        ...state,
        routeRecord:payload
      };
    },
  },

  subscriptions: {
    // setup({ history}) {
    //   // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //   return history.listen(({ pathname, search }) => {
    //     if (typeof window.ga !== 'undefined') {
    //       window.ga('send', 'pageview', pathname + search);
    //     }
    //   });
    // },
    watch({history,dispatch}){
      return history.listen(({pathname})=>{
        dispatch({type:'routeChange',payload:pathname});
      })
    }
  },
};
