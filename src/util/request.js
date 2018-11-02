import {AppCore,AppMeta,trigger,goTo,goBack,get_mod_cfg,get_action_cfg,haveModAuth,haveActionAuth} from './core';
import { error } from './com';
import { Enum } from './enum';
import { AppConst } from './const';
import nprogress from 'nprogress';
import { userInit ,pubInit} from './data';

const loadDelay = 300;

export function request(url, body, cfg) {
    cfg = cfg || {};
    body = body || {};
    if (url.indexOf('http') !== 0) {
        if (!AppCore.HOST) { 
            return new Promise(_ => {});
        }
        url = AppCore.HOST + url;
    }



    if (AppCore.sid) {
        body.sid = AppCore.sid;
    }

    return new Promise((rs, rj) => {
        let req;
        if(cfg.get){
            req = fetch(url, {method:'GET'});
        }else{
            req = fetch(url, {
                method:'POST',
                body: JSON.stringify(body),
            });
        }
        req.then(
            r => r.text()
        ).then(
            r => {
                try {
                    r = JSON.parse(r);
                } catch (e) {
                    error(r);
                    return;
                }
                if (!r.success) {
                    if (r.message == -1) {
                        trigger('更新用户', {});
                        goTo('/login');
                        return;
                    }

                    let err = {message:r.message};
                    if(cfg.rj){
                        err.onOk = rj;
                    }
                    error(err);
                    return;
                }
                //r.enum && Enum.ver && updateEnum(r.enum);
                //r.user_enum && update_user_enum();
                rs(r);
                return cfg.wait;
            },
            e => {
                let err = {message:'网络连接失败'};
                if(cfg.rj){
                    err.onOk = rj;
                }
                error(err);
            }
        ).then(
            wait => {
                //!wait && store.getState().progress && trigger('取消等待');
            }
        );
    });
}

export function encUrl(p) {
    if (!p) {
        return '';
    }
    return Object.keys(p).filter(k=>p[k]!==undefined&&p[k]!=='')
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(p[k]))
        .join('&');
}

export function loadIfEmpty(view, done) {
    if (view.state.loading || view.state.filled) {
        return;
    }
    reload(view, done); 
}

export function reload(view, done) {
    view.setState({ loading: true });
    nprogress.start();
    setTimeout(_ => _reload(view, done), loadDelay);
}

export function get_req_data(cfg, data) {
    if (!cfg) {
        return data;
    }

    if (typeof(cfg) === 'string') {
        return data[cfg];
    }
    let rst = {};

    Object.keys(cfg).forEach(function(k) {
        let item = cfg[k];
        if (item.indexOf('.') > 0) {

            let fd = item.split(' '); 
            let flt = item.split('|');

            if (fd.length > 1) {
                fd[fd.length - 1] = fd[fd.length - 1].split('|')[0];
            } else {
                fd = [flt[0]];
            }
            if (flt.length > 1) {
                flt = flt[1];
            } else {
                flt = undefined;
            }
            let blk = fd[0].split('.')[0]; 
            fd[0] = fd[0].split('.')[1];

            let pk; 
            if (fd.length > 1) {
                pk = data[blk].map(function(_item) {
                    let d = {};
                    fd.forEach(function(f) {
                        d[f] = _item[f];
                    });
                    return d;
                });
            } else {
                pk = data[blk].map(i => i[fd[0]]);
            }

            if (flt) {
                switch (flt) {
                    case 'first':
                        rst[k] = data[blk][0][fd[0]];
                        break;
                    default:
                        data[blk].forEach(function(_item) {
                            if (_item[flt]) {
                                rst[k] = _item[fd[0]];
                            }
                        });
                        break;
                }
            } else {
                if ( !isNaN( parseInt(k) ) ) { 
                    rst[blk] = pk;
                } else { 
                    rst[k] = pk;
                }
            }
        } else {

            if ( !isNaN( parseInt(k) ) ) { 
                rst[item] = data[item];
            } else {
                rst[k] = data[item];
            }
        }
    });

    return rst;
}

function get_read_param(action, cfg, data) {
    var param = { action: action, front_enum: Enum.ver };

    if (cfg.mod) {
        param.mod = cfg.mod;
    }
    if (data && data.search) {
        Object.assign(param, data.search);
    }

    if (cfg.read.data) {
        Object.assign(param, get_req_data(cfg.read.data, data));
    }
    return param;
}

function _reload(view, done) {
    let url;
    let limit = view.limit || 100;
    let lang = 0;
    if (view.url) {
        url = view.url+ '?' + encUrl({...view.state.search, limit: limit, front_enum: Enum.ver,lang:lang});
    } else if (view.mod) {
        let cfg = get_mod_cfg(view.mod);
        if(!cfg){
            return ;
        }
        url = cfg.read.url + '?' + encUrl({...view.state.search, limit: limit, mod: view.mod, front_enum: Enum.ver,lang:lang});
    } else if (view.action) {
        let cfg = AppMeta.actions[view.action];
        if(!cfg){
            return ;
        }
        let param = get_read_param(view.action, cfg, view.ref_data);
        url = cfg.read.url + '?' + encUrl(param);
    } else {
        return;
    }
    request(url,undefined,{rj:1}).then(
        r => {
            view.setState({ filled: true, loading: false, data: r.data }, done);
            nprogress.done();
        },
        e =>{
            goBack();
            nprogress.done();
        }
    )
}