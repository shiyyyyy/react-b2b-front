import {AppConst} from '@/utils/const';

function modifyProduct(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '修改跟团游';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '修改大交通';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '修改单订房';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '修改单签证';
        rst.data = {...ref};
    }
    return rst;
}   

function submitProduct(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '提交跟团游';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '提交大交通';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '提交单订房';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '提交单签证';
        rst.data = {...ref};
    }
    return rst;
}  

function cancelProduct(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '取消跟团游';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '取消大交通';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '取消单订房';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '取消单签证';
        rst.data = {...ref};
    }
    return rst;
}  

function copyProduct(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '复制跟团游';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '复制大交通';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '复制单订房';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '复制单签证';
        rst.data = {...ref};
    }
    return rst;
}  

function deleteProduct(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '删除跟团游';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '删除大交通';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '删除单订房';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '删除单签证';
        rst.data = {...ref};
    }
    return rst;
}


function newGroup(ref){
    const rst = {};
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_PACKAGETOUR){
        rst.action = '跟团游开团';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_TRAFFIC){
        rst.action = '大交通开团';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_ROOM_BOOKING){
        rst.action = '单订房开团';
        rst.data = {...ref};
    }
    // eslint-disable-next-line eqeqeq
    if(ref.type == AppConst.PRODUCT_VISA_BOOKING){
        rst.action = '单签证开团';
        rst.data = {...ref};
    }
    return rst;
}
const ActionMap={
    '修改产品':modifyProduct,
    '提交产品':submitProduct,
    '取消产品':cancelProduct,
    '复制产品':copyProduct,
    '删除产品':deleteProduct,
    '产品开团':newGroup
};



export default ActionMap;