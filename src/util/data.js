import { AppCore ,trigger,AppMeta } from  './core';
import { error } from './com';

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
	                rs(r);
				},e=>{
					rj(e);
				}
    	);
    });
}