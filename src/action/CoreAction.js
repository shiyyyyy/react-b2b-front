
export default {
  '更新公开数据': (pub) => {
    return {type:'更新公开数据',pub:pub};
  },
  '更新用户': (user) => {
    return {type:'更新用户',user:user};
  }
};