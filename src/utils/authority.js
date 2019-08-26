export function getPathAuthority() {
    let authority ;
    if(window.g_path_authority){
        authority = [...window.g_path_authority];
    }
    return authority || [];
}

export function getMetaAuthority(){
    let authority ; 
    if(window.g_meta_authority){
        authority = [...window.g_meta_authority];
    }
    return authority || [];
}

export function getPemAuthority(){
    let authority;
    if(window.g_pem_authority){
        authority = {...window.g_pem_authority};
    }
    return authority || {};
}

export function setAuthority(metaAuthority,pathAuthority,pemFilters) {

    const MetaAuthority = typeof metaAuthority === 'string' ? [metaAuthority] : metaAuthority;
    const PathAuthority = typeof pathAuthority === 'string' ? [pathAuthority] :pathAuthority;

    let PemFilters = {};
    if(typeof pemFilters === 'string'){
        PemFilters[pemFilters] = pemFilters;
    }else{
        PemFilters = { ... pemFilters} ; 
    }

    window.g_meta_authority = MetaAuthority;
    window.g_path_authority = PathAuthority;
    window.g_pem_authority = PemFilters;
}


export function clearAuthority(){
    window.g_meta_authority = [];
    window.g_path_authority = [];
    window.g_pem_authority = {};
}
