import { request } from './request';
import { AppCore ,trigger} from  './core';

export function buyerInit(){

}

export function sellerInit(){

}

export function pubInit(){
	if(!AppCore.PUB_HOST){
		return;
	}
	// request(AppCore.PUB_HOST+'/PublicApi/get_pub_data',undefined,{get:1}).then(
	// 	r=>{
	// 		trigger('更新公开数据',r.data);
	// 	}
	// );
}