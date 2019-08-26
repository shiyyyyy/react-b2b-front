import React from 'react';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
import ModalRender from '@/components/ModalRender';
import RowModal from '@/components/Table/RowModal';

import {readAction,submit,AddDataUid} from '@/utils/utils';

const Seed = require('short-id');

export default function ActionPageHoc(WrappedComponent) {
  return class ActionPage extends React.Component {
    constructor(props) {
      super(props);
      this.WrappedRef = React.createRef();
    }

    componentDidMount() {
      const {location,actions } = this.props;
      const {action=''} = location.state;
      const cfg = actions[action];
      readAction(action,location.state).then(res=>{
        if(res.success && res.data){
          if (this.WrappedRef.current) {
            const wrappedCom = this.WrappedRef.current;
            const { data } = wrappedCom.state;
            let rst = {...res.data};
            if(cfg.block){
              rst = AddDataUid(cfg.block,Seed,rst);
            }
            wrappedCom.setState(() => ({
              data:{...data,...rst} 
            }),()=>{
              if(wrappedCom.init && typeof wrappedCom.init === 'function'){
                wrappedCom.init();
              }
            })
          }
        }
      });
    }

    addRow = (config, storeId) => {
      const afterAdd = row => {
        if (this.WrappedRef.current) {
          const wrappedCom = this.WrappedRef.current;
          const { data } = wrappedCom.state;
          data[storeId].push({...row,hashKey:row.hashKey||Seed.generate()});
          wrappedCom.setState({ data });
        }
      };
      ModalRender({}, { view: RowModal, text: '添加行', ...config }, {}, afterAdd);
    };

    editRow = (config, storeId, row) => {
      const afterEdit = rst => {
        if (this.WrappedRef.current) {
          const wrappedCom = this.WrappedRef.current;
          const { data } = wrappedCom.state;
          const index = data[storeId].findIndex((value)=>value.hashKey === rst.hashKey);
          data[storeId].splice(index, 1, rst);
          wrappedCom.setState({ data });
        }
      };
      ModalRender({}, { view: RowModal, text: '修改行', ...config }, row, afterEdit);
    };

    deleteRow = (config, storeId, row) => {
      if (this.WrappedRef.current) {
        const wrappedCom = this.WrappedRef.current;
        const { data } = wrappedCom.state;
        const index = data[storeId].findIndex((value)=>value.hashKey === row.hashKey);
        data[storeId].splice(index, 1);
        wrappedCom.setState({ data });
      }
    };

    submit = () => {
      const { location } = this.props;
      const {action=''} = location.state;

      if (this.WrappedRef.current) {
        const wrappedCom = this.WrappedRef.current;
        const { data } = wrappedCom.state;
        const { dispatch } = wrappedCom.props;
        submit(action,data).then(
          ()=>{
            dispatch(routerRedux.goBack());
          }
        );
      }
    };

    cancel = () => {
      const { dispatch } = this.props;
      dispatch(routerRedux.goBack());
    };

    rowSelChange = (Keys,Rows,block) =>{
      if(this.WrappedRef.current){
        const wrappedCom = this.WrappedRef.current;
        const {selectedRows,selectedRowKeys} = wrappedCom.state;
        selectedRowKeys[block] = Keys;
        selectedRows[block] = Rows;
        wrappedCom.setState({selectedRows,selectedRowKeys});
      }
    }

    render() {
      const actionMap = {
        添加行: this.addRow,
        编辑行: this.editRow,
        删除行: this.deleteRow,
        提交: this.submit,
        关闭: this.cancel,
      };
      return <WrappedComponent ref={this.WrappedRef} actionMap={actionMap} rowSelChange={this.rowSelChange} {...this.props} />;
    }
  };
}
