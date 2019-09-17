import {AppConst} from '@/utils/const';

function modifyGroupPrice(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.GROUP_PACKAGETOUR){
        rst.action = '跟团游团期调价';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.GROUP_TRAFFIC){
        rst.action = '大交通团期调价';
        rst.data = {...ref};
    }
    return rst;
}

function modifyGroup(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.GROUP_PACKAGETOUR){
        rst.action = '修改跟团游团期';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.GROUP_TRAFFIC){
        rst.action = '修改大交通团期';
        rst.data = {...ref};
    }
    return rst;
}

const ActionMap={
    '班期调价':modifyGroupPrice,
    '修改班期':modifyGroup,
};



export default ActionMap;