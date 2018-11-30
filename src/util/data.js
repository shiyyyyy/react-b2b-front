import { AppCore ,trigger,AppMeta } from  './core';
import { error } from './com';
import { routes,Pubroutes } from '../pages';

export function userInit(){
	if(!AppCore.HOST){
		return new Promise((rs) => {rs({})});
	}
    return new Promise((rs, rj) => {
    	fetch(AppCore.HOST+'/PublicApi/get_user_init', {method:'POST',body:JSON.stringify({sid:AppCore.sid||''})}).then(
    		r=>r.text()
    		).then(r=>{
                try {
                    r = JSON.parse(r);
                } catch (e) {
                    error(r);
                    return;
                }
                if (!r.success) {
                    if (r.message == -1) {
                        trigger('更新用户', {});
                        rj(r);
                        return;
                    }

                    let err = {message:r.message};
                    err.onOk = rj;
                    error(err);
                    return;
                }
                metaInit(r.data);
                routeInit(r.data);
                rs(r);
			},e=>{
				rj(e);
			}
    	);
    });
}

function metaInit(meta) {
	Object.assign(AppMeta,meta);
}


//meta中包含path信息 只有与path相匹配的路由会被render
//不在权限中的路由不可访问
function routeInit(meta){
    let paths = meta['path'] || [];
    let rs = [];
   	// routes.map((item,key)=>{
   	// 	if(paths.indexOf(item['path'])!==-1){
   	// 		rs.push(item);
   	// 	}
   	// });
   	// rs = [...rs,...Pubroutes];
   	rs = [...routes];
   	trigger('更新路由',rs);
}

export function pubInit(){
	if(!AppCore.HOST){
		return new Promise(_ => {});
	}
    return new Promise((rs, rj) => {
    	fetch(AppCore.HOST+'/pub/Init/get_pub_init', {method:'GET'}).then(
    		r => r.text()
    		).then(
	    		r=>{
	                try {
	                    r = JSON.parse(r);
	                } catch (e) {
	                    error(r);
	                    return;
	                }
	                if (!r.success) {
	                    let err = {message:r.message};
	                    err.onOk = rj;
	                    error(err);
	                    return;
	                }
	                metaInit(r.data);
	                routeInit(r.data);
	                rs(r);
				},e=>{
					rj(e);
				}
    	);
    });
}