/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';
let CURRENTMETA = 'NULL';
/**
 * use  authority or getAuthority
 */
const renderAuthorize = Authorized => (currentPathAuthority,currentMetaAuthority) => {
  if (currentPathAuthority) {
    if (typeof currentPathAuthority === 'function') {
      CURRENT = currentPathAuthority();
    }
    if (typeof currentPathAuthority === 'object') {
      CURRENT = currentPathAuthority;
    }
    if (
      Object.prototype.toString.call(currentPathAuthority) === '[object String]' ||
      Array.isArray(currentPathAuthority)
    ) {
      CURRENT = currentPathAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }
  if (currentMetaAuthority) {
    if (typeof currentMetaAuthority === 'function') {
      CURRENTMETA = currentMetaAuthority();
    }
    if (typeof currentMetaAuthority === 'object') {
      CURRENTMETA = currentMetaAuthority;
    }
    if (
      Object.prototype.toString.call(currentMetaAuthority) === '[object String]' ||
      Array.isArray(currentMetaAuthority)
    ) {
      CURRENTMETA = currentMetaAuthority;
    }
  } else {
    CURRENTMETA = 'NULL';
  }
  return Authorized;
};

export { CURRENT ,CURRENTMETA};
export default Authorized => renderAuthorize(Authorized);
