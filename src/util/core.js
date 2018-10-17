import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import stateTransfer from '../state';
import {actions} from '../action';
import createHistory from 'history/createBrowserHistory';

export const History = createHistory();

export const AppMeta = {};

export const AppCore = {
    APP_NAME: 'TY_B2B',
    PUB_HOST: 'http://localhost/b2b-back',
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