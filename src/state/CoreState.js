import {AppCore} from '../util/core';
import {buyerInit ,sellerInit} from '../util/data'


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
      if(state.id != action.user.id){
        if(action.user.id){
          if(action.user.isBuyer){
            buyerInit();
          }else if(action.user.isSeller){
            sellerInit();
          }
        }
      }
      return action.user;
    default:
      return state;
  }
}
