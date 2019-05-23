import io from 'socket.io-client';
import {post} from './utils';
import msgPush from './msg';

let signal;

export function signalClear() {
    if(signal){
        signal.disconnect();
        signal = null;
    }
}


export async function signalInit(){

    signalClear();

    const r = await post('/sys/Signal/init');

    const {url,user,token} = r.data;
    signal = io(url, {
      transports:['websocket'],
      timeout:5000,
      query: {_m:'3',_u:user,_t:token}
    });

    signal.on('error', e => {
        if(e === 'EXPIRE'){
            signalInit().catch();
        }else{
            signal.connect();
        }
    });

    signal.on('reconnecting', attemptNumber => {
        console.log(`[signal] reconnecting ${attemptNumber}`);
    });

    signal.on('disconnect', e => {
        console.log(`[signal] reconnecting ${e}`);
    });

    signal.on('connect', () => {
        console.log(`[signal] connect ${signal.id}`);
    });


    // //-----------------------msg---------------------------
    signal.on('msg', (msg) => {
        msgPush(msg);
    });

}