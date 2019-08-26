import getEnum from './enum';

export default function colDisplay(v,cfg,row) {
    switch (cfg.type) {
        case 'date':
        case 'number':
        case 'time':
        case 'ArrayEdit':
          return v;
        default:
            break;
    }
    const e = getEnum(cfg,row,null);
    if(e && (e[v]||e[Number(v)])){
        return (e[v]||e[Number(v)]);
    }
    return '';
}