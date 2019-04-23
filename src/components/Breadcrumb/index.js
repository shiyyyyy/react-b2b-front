import React from 'react';
import Link from 'umi/link';
import { Breadcrumb } from 'antd';

// 需要props传过来location和breadcrumbNameMap
function BreadcrumbRander(props) {
  const { location: { pathname }, breadcrumbNameMap } = props;
  // 正常获取breadcrumbArr
  const breadcrumbArr = () => {
    const breadcrumb = pathname.split('/').filter( i => i);
    return breadcrumb.map((item, index) => `/${breadcrumb.slice(0,index+1).join('/')}` )
  };
  // 如果是 admin 路由,则去掉/admin
  const breadcrumbArrTrue = () => {
    const arr = breadcrumbArr();
    let arrTrue = arr;
    if (arr[0] === '/admin') {
      arrTrue = arr.slice(1)
    }
    return arrTrue;
  }
  return (
    <Breadcrumb separator=">">
      {breadcrumbArrTrue().map(item => (
        <Breadcrumb.Item key={breadcrumbNameMap[item].name || ''}>
          <Link to={breadcrumbNameMap[item].path || ''}>
            {breadcrumbNameMap[item].name || ''}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadcrumbRander;