import * as React from 'react';
export interface IExceptionProps {
  type?: '403' | '404' | '500' | '页面出错';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | React.ComponentType;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

export default class Exception extends React.Component<IExceptionProps, any> {}
