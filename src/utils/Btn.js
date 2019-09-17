// 权限
import Authorized from '@/utils/Authorized';

const { checkMeta } = Authorized;


export function getHeaderBtnArray(actions,useAuth){
    let rst = [];
    if(!actions){
      return rst
    }
    rst = [...Object.keys(actions)];
    rst = rst
      .map(action => {
        const cfg = actions[action];
        if ((cfg.bind && cfg.bind === 'row') || cfg.bindToCell || cfg.bindToTitle) {
          return null;
        }
        if (useAuth && !checkMeta(action)) {
          return null;
        }
        return action;
      })
      .filter(action => action);

    return rst;
}


export function getTitleBtnArray(actions,useAuth){
  let rst = [];
  if(!actions){
    return rst
  }
  rst = [...Object.keys(actions)];

  rst = rst
    .map(action => {
      const cfg = actions[action];
      if (!cfg.bindToTitle) {
        return null;
      }
      if (useAuth && !checkMeta(action)) {
        return null;
      }
      return action;
    })
    .filter(action => action);

  return rst;
}

export function getCellBtnArray(data,actions,useAuth,bindToTile){
  let rst = [];
  if(!actions){
    return rst;
  }
  rst = [...Object.keys(actions)];
  
  rst = rst
  .map(action => {
    const cfg = actions[action];
    if (cfg.bind || cfg.bindToTitle) {
      return null;
    }
    if(!cfg.bind && !cfg.bindToTitle && !cfg.bindToCell){
      return null
    }
    if(cfg.bindToCell && cfg.bindToCell !== bindToTile){
      return null;
    }
    if (useAuth && !checkMeta(action)) {
      return null;
    }
    if (actions[action].show) {
      const flag = Object.keys(actions[action].show)
        .map(item => {
          if (actions[action].show[item].indexOf(data[item]) === -1) {
            return false;
          }
          return true;
        })
        .find(item => item === false);
      if (flag) return null;
    }
    return action;
  })
  .filter(action => action);

  return rst;
};

export function getRowBtnArray(data,actions,useAuth){
    let rst = [];
    if(!actions){
      return rst;
    }
    rst = [...Object.keys(actions)];
    rst = rst
    .map(action => {
      const cfg = actions[action];
      if (!cfg.bind && cfg.bind !== 'row' ) {
        return null;
      }
      if (cfg.bindToCell && cfg.bindToTitle) {
        return null;
      }
      if (useAuth && !checkMeta(action)) {
        return null;
      }
      if (actions[action].show) {
        const flag = Object.keys(actions[action].show)
          .map(item => {
            if (actions[action].show[item].indexOf(data[item]) === -1) {
              return false;
            }
            return true;
          })
          .find(item => item === false);
          
        if (flag===false) return null;
      }
      return action;
    })
    .filter(action => action);

    return rst;
};

// 数据过滤 减少getRowBtnArray 调用次数
export function btnShowFilter(dataSource,actions){
  if(!Array.isArray(dataSource) || !dataSource[0]){
    return [];
  }
  const rst = [];
  rst.push(dataSource[0]);
  if(!actions){
    return [];
  }
  
  const show = new Set();
  Object.keys(actions).forEach(key=>{
    if(actions[key].show){
      Object.keys(actions[key].show).forEach((v)=>{
        show.add(v);
      })
    }
  })
  const filter = {};
  show.forEach((k)=>{
    filter[k] = [];
  })
  let flag = false;
  dataSource.forEach((data)=>{
    flag = false;
    show.forEach((k)=>{
      if(!filter[k].includes(data[k])){
        filter[k].push(data[k]);
        flag = true;
      }
    })
    if(flag){
      rst.push(data);
      flag = false;
    }
  })

  return rst;
}