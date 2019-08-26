import React from 'react';
import { Spin } from 'antd';

import styles from './index.less';

function LoadingHoc(WrappedComponent, loading) {
  if (loading === true) {
    return (
      <div className={styles['Spin-box']}>
        <Spin />
      </div>
    );
  }
  return <WrappedComponent {...WrappedComponent.props} />;
}

export default LoadingHoc;