import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception500 = () => (
  <Exception
    type="页面出错"
    title={<div>页面出错</div>}
    // desc={formatMessage({ id: 'app.exception.description.500' })}
    desc='页面仿佛出了点问题'
    linkElement={Link}
    // backText={formatMessage({ id: 'app.exception.back' })}
    backText='返回首页'
  />
);

export default Exception500;
