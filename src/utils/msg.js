import React from 'react';
import { Button, notification } from 'antd';
import {trigger} from './utils';

const openActionNotification = (msg,buttonType,buttonSize) => {
  const key = `open${Date.now()}`;
  const click = () =>{
    trigger(msg.extra.action,null,null,msg.extra.assoc,null);
    notification.close(key);
  }
  const btn = (
    <Button type={buttonType} size={buttonSize} onClick={() => click()}>
      Confirm
    </Button>
  );
  notification.open({
      message: msg.title,
      description:
        msg.title,
      btn,
      key
  });
};


const openNotification = (msg) => {
  const key = `open${Date.now()}`;
  notification.open({
      message: msg.title,
      description:
      msg.title,
      key
  });
};


export default function msgPush(msg,size,type){
    const buttonType = type||"primary";
    const buttonSize = size||"small";
    if(msg.extra && msg.extra.action && msg.extra.assoc){
      openActionNotification(msg,buttonType,buttonSize);
      return ;
    }
    openNotification(msg);
}

