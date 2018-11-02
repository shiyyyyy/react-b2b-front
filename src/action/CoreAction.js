
export default {
  '更新公开数据': (pub) => {
    return {type:'更新公开数据',pub:pub};
  },
  '更新用户': (user) => {
    return {type:'更新用户',user:user};
  },
  '本地存储加载用户':(user)=>{
  	return {type:'本地存储加载用户',user:user};
  },
  '更新路由':(routes)=>{
  	return {type:'更新路由',routes:routes};
  }
};