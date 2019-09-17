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
        // eslint-disable-next-line camelcase
        const {type,edit_path} = cfg;
        rest  = e[type] || {};
        // eslint-disable-next-line camelcase
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
                let navKind = '';
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
                        case 'PrimaryNav':
                        case 'SecondaryNav':
                        case 'PackagetourNav':
                            cascadeSet = e.NavPdDirection;
                            break;
                        case 'PackagetourSecondaryNav':
                            if(e.PackagetourNavMap){
                                let matchArr= [];
                                if(Array.isArray(target)){
                                    target.forEach((item)=>{
                                        if(e.PackagetourNavMap[item]){
                                            matchArr = [...matchArr,...e.PackagetourNavMap[item]];
                                        }
                                    })
                                }else if(e.PackagetourNavMap[target]){
                                    matchArr = [...matchArr,...e.PackagetourNavMap[target]];
                                }

                                matchArr.forEach((k)=>{
                                    if(rest[k]){
                                        result[k] = rest[k];
                                    }
                                })
                            }
                            break;
                        case 'MutilPrimaryNav':
                            navKind = row[cfg.cascade2];
                            cascadeSet = e.NavPdDirection;
                            switch(navKind){
                                case '1':
                                    rest = e.PackagetourNav;
                                    break;
                                case '5':
                                    rest = e.IndependentTravelNav;
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case 'MutilSecondaryNav':
                            navKind = row[cfg.cascade2];
                            switch(navKind){
                                case '1':
                                    rest = e.PackagetourSecondaryNav;
                                    if(e.PackagetourNavMap){
                                        let matchArr= [];
                                        if(Array.isArray(target)){
                                            target.forEach((item)=>{
                                                if(e.PackagetourNavMap[item]){
                                                    matchArr = [...matchArr,...e.PackagetourNavMap[item]];
                                                }
                                            })
                                        }else if(e.PackagetourNavMap[target]){
                                            matchArr = [...matchArr,...e.PackagetourNavMap[target]];
                                        }
        
                                        matchArr.forEach((k)=>{
                                            if(rest[k]){
                                                result[k] = rest[k];
                                            }
                                        })
                                    }
                                    break;
                                case '5':
                                        rest = e.IndependentTravelSecondaryNav;
                                        if(e.IndependentTravelNavMap){
                                            let matchArr= [];
                                            if(Array.isArray(target)){
                                                target.forEach((item)=>{
                                                    if(e.IndependentTravelNavMap[item]){
                                                        matchArr = [...matchArr,...e.IndependentTravelNavMap[item]];
                                                    }
                                                })
                                            }else if(e.IndependentTravelNavMap[target]){
                                                matchArr = [...matchArr,...e.IndependentTravelNavMap[target]];
                                            }
            
                                            matchArr.forEach((k)=>{
                                                if(rest[k]){
                                                    result[k] = rest[k];
                                                }
                                            })
                                        }
                                        break;
                                default:
                                    break;
                            }
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