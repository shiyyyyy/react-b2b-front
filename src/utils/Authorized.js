import RenderAuthorized from '@/components/Authorized';
import { getPathAuthority,getMetaAuthority } from './authority';

let Authorized = RenderAuthorized(getPathAuthority(),getMetaAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getPathAuthority(),getMetaAuthority());
};

export { reloadAuthorized };
export default Authorized;
