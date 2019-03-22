export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('b2b-authority') : str;
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['GUEST'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('b2b-authority', JSON.stringify(proAuthority));
}
