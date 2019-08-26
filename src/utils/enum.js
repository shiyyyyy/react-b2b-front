import {getGobalState} from './utils';
import {getPemAuthority} from './authority';

export default function getEnum(cfg,row,pemField){
    const e = getGobalState('enum');
    if(typeof cfg === 'string'){
        return e[cfg];
    }
    let rest = {};
    if(typeof cfg === 'object'){
        if(!cfg.type){
            return {};
        }
        const {type,edit_path} = cfg;
        rest  = e[type];
        if(edit_path){
            return e[edit_path];
        }
        if(cfg.cascade){
            const target = row[cfg.cascade];

            if(cfg.cascaded){
                
                rest = rest[target] || {};

            }else{
                let cascadeSet = {};
                const result = {};
                if(cfg.cascade_type){
                    cascadeSet = e[cfg.cascade_type];
                }else{
                    switch(type){
                        case 'Employee':
                            cascadeSet = e.EmployeeDep;
                            break;
                        case 'Department':
                            cascadeSet = e.DepartmentDep;
                            break;
                        case 'SupplierSales':
                            cascadeSet = e.SupplierSalesDep;
                            break;
                        case 'SupplierDepartment':
                            cascadeSet = e.SupplierDepartmentDep;
                            break;
                        case 'RetailerSales':
                            cascadeSet = e.RetailerSalesDep;
                            break;
                        case 'RetailerDepartment':
                            cascadeSet = e.RetailerDepartmentDep;
                            break;
                        case 'PdSubTag':
                            cascadeSet = e.PdSubTagBelong;
                            break;
                        default:
                            break;             
                    }
                }

                if(cascadeSet){
                    Object.keys(cascadeSet).forEach((k)=>{
                        if(Array.isArray(target)){
                            if(target.includes(cascadeSet[k])){
                                if(rest[k]){
                                    result[k] = rest[k];
                                }
                            }
                        }else if(target === cascadeSet[k]){
                            if(rest[k]){
                                result[k] = rest[k];
                            }
                        }
                    })
                }

                rest = result;
            }
        }

        if(pemField){
            const mod = (row && row.mod) || cfg.mod;
            const pemFilters = getPemAuthority();
            const pem = pemFilters[mod];
            const user  = getGobalState('user');

            if(pem && pem[pemField]){
                const filter = pem[pemField];
                const result = {};
                if(filter[0] === -1){
                    let target ;
                    switch(type){
                        case 'Employee':
                            target = user.user_id;
                            break;
                        default:
                            break;
                    }
                    Object.keys(rest).forEach((k)=>{
                        if(k === target){
                            result[k] = rest[k];
                        }
                    })
                }else{
                    const restKeys = new Set(Object.keys(rest));
                    const targetKeys = new Set(filter);
                    const intersectionSet = new Set([...restKeys].filter(x => targetKeys.has(x)));


                    Object.keys(rest).forEach((k)=>{
                        if(intersectionSet.includes(k)){
                            result[k] = rest[k];
                        }
                    })
                }
                rest = result;
            }
        }
    }
    return rest;
}