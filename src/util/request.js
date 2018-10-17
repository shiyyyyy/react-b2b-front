import {AppCore,trigger,History} from './core';

export function request(url, body, cfg) {
    cfg = cfg || {};
    body = body || {};
    if (url.indexOf('http') !== 0) {
        if (!AppCore.HOST) { //需要更新买卖方定位host

            return new Promise(_ => {});
        }
        url = AppCore.HOST + url;
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
                    console.log(r);
                    //error(r);
                    return;
                }
                if (!r.success) {
                    if (r.message == -1) {
                        trigger('更新用户', {});
                        History.push('/login');
                        return;
                    }
                    cfg.rj && rj();
                    return;
                }
                //r.enum && Enum.ver && updateEnum(r.enum);
                //r.user_enum && update_user_enum();
                rs(r);
                return cfg.wait;
            },
            e => {
                console.log('网络连接失败');
                // log(e);
                // error('网络连接失败');
            }
        ).then(
            wait => {
                console.log(wait);
                //!wait && store.getState().progress && trigger('取消等待');
            }
        );
    });
}