import React from 'react';
import styles from './DrawerItem.less';

const DrawerItem = props => {
  const { children, className } = props;
  return (
    <div className={`${styles.DrawerItem} ${className}`}>
      {children || ''}
    </div>
  );
};

export default DrawerItem;