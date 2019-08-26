import React from 'react';
import { Modal } from 'antd';
import DragmModal from './Dragm';
import styles from './index.less';

const { info } = Modal;

export default function ModalRender(action, config, dataSource, afterOk,afterCancel) {
  const modal = info();
  const content = () => {
    let View = ''
    if (typeof config.view === 'string') {
      // 传一个路径过来
      // eslint-disable-next-line
      View = require(`@/pages/${config.view}`).default;
    } else {
      // 直接传一个组件过来
      View = config.view;
    }
    return (
      <div>
        <View action={action} config={config} data={dataSource} modal={modal} afterOk={afterOk} afterCancel={afterCancel} />
      </div>
    );
  };
  modal.update({
    title: config.isDrag ? <DragmModal title={config.text || '弹窗'} /> : <div>{config.text || '标题'}</div>,
    width: config.width || 520,
    content: content(),
    className: styles.view,
    okButtonProps: { className: 'hide' },
    cancelButtonProps: { className: 'hide' },
  });
}
