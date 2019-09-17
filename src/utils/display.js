import getEnum from './enum';

export default function colDisplay(v,cfg,row) {
    const rst = [];
    if(!v) return '';

    switch (cfg.type) {
        case 'date':
        case 'number':
        case 'time':
        case 'ArrayEdit':
            return v;
        case 'Specify':
            v.forEach((i)=>{
                rst.push(getEnum('EmpAccount')[i]);
            })
            return rst.join(',');
        case 'ErpSuppId':
            return v?'ES0'+v:v;
        default:
            break;
    }
    const e = getEnum(cfg,row,null);
    if(e && (e[v]||e[Number(v)])){
        return (e[v]||e[Number(v)]);
    }
    return '';
}