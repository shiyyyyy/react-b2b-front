import getEnum from './enum';

export default function colDisplay(v,cfg,row) {
    const e = getEnum(cfg,row,null);
    if(e[v]){
        return e[v];
    }
    return v;
}