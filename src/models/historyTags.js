export default {
  namespace: 'historyTags',

  state: {
    historyTags: [],
  },

  effects: {},

  reducers: {
    add(state, action) {
      const { payload } = action;
      const { historyTags } = state;
      if (historyTags.find(item => item.path === payload.path)) {
        return {
          ...state
        }
      }
      historyTags.push(payload);
      return {
        ...state,
        historyTags,
      };
    },
    remove(state, action) {
      const { payload } = action;
      const { historyTags } = state;
      const curTags = historyTags.filter(item => item.path !== payload.path);
      return {
        ...state,
        historyTags: curTags,
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
