import React from 'react';
import Link from 'umi/link';
import { Breadcrumb } from 'antd';

// 需要props传过来location和breadcrumbNameMap
function BreadcrumbRander(props) {
  const { location: { pathname }, breadcrumbNameMap } = props;
  console.log(pathname);
  console.log(breadcrumbNameMap);
  const breadcrumbArr = () => {
    const breadcrumb = pathname.split('/').filter( i => i);
    return breadcrumb.map((item, index) => `/${breadcrumb.slice(0,index+1).join('/')}` )
  };
  return (
    <Breadcrumb separator=">">
      {breadcrumbArr().map(item => (
        <Breadcrumb.Item key={breadcrumbNameMap[item].name || ''}>
          <Link to={breadcrumbNameMap[item].path || ''}>{breadcrumbNameMap[item].name || ''}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbRander;