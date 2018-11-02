import {AppCore} from '../util/core';
import {userInit} from '../util/data'


export const pub = (state = {}, action) => {
  switch (action.type) {
    case '更新公开数据':
      return action.pub;
    default:
      return state
  }
}

export const user = (state = {}, action) => {
  switch (action.type) {
    case '更新用户':
    case '本地存储加载用户':
      AppCore.sid = action.user.sid;

      if(state.sid != action.user.sid){
        if(action.type == '更新用户'){
          localStorage[AppCore.APP_NAME] = JSON.stringify(action.user);
        }
      }
      return action.user;
    default:
      return state;
  }
}

export const routes = (state = [], action) => {
  switch (action.type) {
    case '更新路由':
      return action.routes;
    default:
      return state;
  }
}

