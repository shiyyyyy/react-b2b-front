import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import stateTransfer from '../state';
import {actions} from '../action';
import createHistory from 'history/createBrowserHistory';
import { Enum } from './enum';
import { request } from './request';

export const History = createHistory();

export const AppMeta = {};

export const AppCore = {
    APP_NAME: 'TY_B2B',
    HOST: 'http://localhost/b2b-back'
};
const middleware = [thunk];

//全局数据池
export const store = createStore(
    stateTransfer, //
    undefined,
    applyMiddleware(...middleware)
);

export function trigger(action, ...args) {
    store.dispatch(actions[action](...args));
}

export function goTo(pathname,state){
    History.push({
        pathname:pathname,
        state:state||{}
    });
}

export function goBack() {
    return History.goBack();
}

export function get_mod_cfg(mod) {
    if (AppMeta.mods[mod].read) {
        return AppMeta.mods[mod];
    }

    let cfg;
    
    for (var lv1 in AppMeta.menu) {
        for (var lv2 in AppMeta.menu[lv1]) {
            if (lv2 === mod) {
                cfg = AppMeta.menu[lv1][lv2];
                break;
            }
        }
        if (cfg) {
            break;
        }
    }
    return cfg;
}

export function haveModAuth(mod){  
    if(AppMeta.mods){
        let cfg = AppMeta.mods[mod];
        if(cfg.public == 1 ){
            return true;
        }
    }
    for (var lv1 in AppMeta.menu) {
        for (var lv2 in AppMeta.menu[lv1]) {
            if (lv2 === mod) {
                return true;
            }
        }
    }
    return false;
}

export function haveActionAuth(action,mod){
    if(!AppMeta.menu){
        return true;
    }
    let cfg;
    for (var lv1 in AppMeta.menu) {
        for (var lv2 in AppMeta.menu[lv1]) {
            if (lv2 === mod) {
                cfg = AppMeta.menu[lv1][lv2];
                break;
            }
        }
        if(cfg){
            break;
        }
    }
    if(!cfg || !cfg.action){
        return false;
    }
    if(cfg.action[action]){
        return true;
    }
    return false;
}

