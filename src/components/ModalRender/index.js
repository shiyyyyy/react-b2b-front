import React from 'react';
import { Modal } from 'antd';
import DragmModal from './Dragm';
import './index.less';

const { info } = Modal;

export default function ModalRender(action,config,dataSource,reload){
  const modal = info();
  const content = () => {
    
    // eslint-disable-next-line
    const View = require(`@/pages/${config.view}`).default;
    return (
      <div>
        <View 
          action={action}
          config={config}
          data={dataSource}
          modal={modal}
          reload={reload}
        />
      </div>
    );
  }
  modal.update({
    title: config.isDrag ? <DragmModal title={config.text || '弹窗'} /> : <div>标题</div>,
    content: content(),
    okButtonProps: { className: 'hide' },
    cancelButtonProps: { className: 'hide' },
  });
}
