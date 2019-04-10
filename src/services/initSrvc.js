import { AppConst } from '@/utils/const';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import routes from '../../config/router.config';
import { AppCore ,AppMeta } from  '@/utils/core';

function MetaInit(meta){
    Object.assign(AppMeta,meta);
}

function pubInit() {
    return new Promise((rs, rj) => {
        const newOptions = {
            method: 'POST'
        };
        const url = `${AppCore.HOST}/api/Pub/get_pub_init`;

        fetch(url, newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    rj(r);
                    return;
                }

                const { mods,actions } = r.data;

                MetaInit({mods,actions});

                const currentAuthority = r.data.authority || [];
                // set authority
                setAuthority(currentAuthority);
                reloadAuthorized();

                rs(routes);
            }, e => {
                rj(e);
            }
        ).catch(e => {
            rj(e);
        })
    });
}

export function userInit(newOptions) {
    return new Promise((rs, rj) => {
        const url = `${AppCore.HOST}/PublicApi/get_b2b_init`;

        fetch(url, newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    pubInit().then(re => rs(re), e => rj(e));
                    return;
                }
                // init
                const {mods,actions} = r.data;
                MetaInit({mods,actions});
                const currentAuthority = r.data.authority || [];
                // set authority
                setAuthority(currentAuthority);
                reloadAuthorized();
                rs(routes);
            }, e => {
                rj(e);
            }
        ).catch(e => {
            rj(e);
        });
    });
}

export function Init(){
    let user = {};
    const newOptions = {
        method:'POST'
    };
    newOptions.body = {};
    try{
        if(localStorage[AppConst.APP_NAME]){
            user = JSON.parse(localStorage[AppConst.APP_NAME]);
        }
        const sid = user.sid?user.sid:'';

        if(sid !== ''){
            newOptions.body.sid = sid;
        }
        newOptions.body = JSON.stringify(newOptions.body);

        return userInit(newOptions);
    }catch(e){
        return userInit(newOptions); 
    }
}
