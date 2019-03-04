import { AppConst } from '@/utils/const';
import { setAuthority } from '@/utils/authority';
import routes from '../../config/router.config';
import {addParentNode} from '@/utils/utils';

function pathMap(route,map){
    const maps = map
    route.forEach(ele => {
        if(ele.path){
            maps[ele.path] = ele;
        }
        if(ele.routes){
            pathMap(ele.route, maps);
        }
    });
}

function pubInit() {
    return new Promise((rs, rj) => {
        let path_map = {};
        pathMap(addParentNode(routes), path_map);
        let newOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ routes: path_map })
        };
        fetch('/server/api/Pub/get_pub_init', newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    rj(e);
                    return;
                }
                let currentAuthority = AppConst.PUB_AUTHORITY;
                //set authority
                setAuthority(currentAuthority);
                let paths = r.data.paths;
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
        fetch('/server/PublicApi/get_b2b_init', newOptions).then(
            r => r.json()
        ).then(
            r => {
                if (!r.success) {
                    pubInit().then(r => rs(r), e => rj(e));
                    return;
                }
                //init
                let currentAuthority = r.data.authority || AppConst.PUB_AUTHORITY;
                //set authority
                setAuthority(currentAuthority);
                let paths = r.data.paths;
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
    let path_map = {};
    pathMap(addParentNode(routes),path_map);

    const newOptions = {
        method:'POST',
        headers:{
            Accept: 'application/json',
           'Content-Type': 'application/json; charset=utf-8',
        },
        body:JSON.stringify({routes:path_map})
    };

    let token = '';
    let user = {};
    try{
        if(localStorage[AppConst.APP_NAME]){
            user = JSON.parse(localStorage[AppConst.APP_NAME]);
        }
        token = user.sid?user.sid:'';
        if(token !== ''){
            newOptions.headers = {
              'authorization':token,
              ...newOptions.headers
            }
        }
        return userInit(newOptions);
    }catch(e){
        return userInit(newOptions); 
    }
}

