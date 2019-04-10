export function getAuthority() {
  let authority ;
  if(window.g_auth){
     authority = [...window.g_auth];
  }
  return authority || [];
}

export function setAuthority(authority) {
  const Authority = typeof authority === 'string' ? [authority] : authority;

  window.g_auth = Authority;
}
