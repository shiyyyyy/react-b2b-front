import { AppConst } from '@/utils/const';
import { setAuthority } from '@/utils/authority';
import routes from '../../config/router.config';
import { AppCore } from  '@/utils/core';

function pathMap(_routes,map){
    const maps = map
    _routes.forEach(ele => {
        if(ele.path){
            maps[ele.path] = ele;
        }
        if(ele.routes){
            pathMap(ele.routes, maps);
        }
    });
}

function addParentNode(_routes, parent) {
    _routes.forEach(ele => {
        const eles = ele;
        if (parent) {
            if (eles.path !== parent)
                eles.parent = parent;
        }
        if (eles.routes) {
            addParentNode(eles.routes, eles.path);
        }
        return eles;
    });
    return _routes;
};

function pubInit() {
    return new Promise((rs, rj) => {
        const pathMapObj = {};
        pathMap(addParentNode(routes), pathMapObj);
        const newOptions = {
            method: 'POST',
            body: JSON.stringify({ routes: pathMapObj })
        };
        fetch(AppCore.HOST+'/api/Pub/get_pub_init', newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    rj(r);
                    return;
                }
                const currentAuthority = AppConst.PUB_AUTHORITY;
                // set authority
                setAuthority(currentAuthority);
                const { paths } = r.data;
                rs(paths);
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
        fetch(AppCore.HOST+'/PublicApi/get_b2b_init', newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    pubInit().then(re => rs(re), e => rj(e));
                    return;
                }
                // init
                const currentAuthority = r.data.authority || AppConst.PUB_AUTHORITY;
                // set authority
                setAuthority(currentAuthority);
                const { paths } = r.data;
                rs(paths);
            }, e => {
                rj(e);
            }
        ).catch(e => {
            rj(e);
        });
    });
}

export function routesInit(){
    const pathMapObj = {};
    pathMap(addParentNode(routes),pathMapObj);

    let user = {};
    try{
        if(localStorage[AppConst.APP_NAME]){
            user = JSON.parse(localStorage[AppConst.APP_NAME]);
        }
        const sid = user.sid?user.sid:'';

        const newOptions = {
            method:'POST'
        };
        newOptions.body = {routes:pathMapObj};

        if(sid !== ''){
            newOptions.body.sid = sid;
        }
        newOptions.body = JSON.stringify(newOptions.body);

        return userInit(newOptions);
    }catch(e){
        return userInit(newOptions); 
    }
}
