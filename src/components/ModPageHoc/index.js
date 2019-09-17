import React from 'react';
import { Spin } from 'antd';
import { AddArrayUid, readMod } from '@/utils/utils';
import ErrorBoundary from '@/components/ErrorBoundary';
import NoMatch from '@/pages/Exception/NoMatch';

const Seed = require('short-id');

export default function ModPageHoc(WrappedComponent) {
  return class ModPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
      this.WrappedRef = React.createRef();
      this.reload = this.reload.bind(this);
    }

    componentDidMount() {
      const {
        location: { pathname },
        breadcrumbNameMap,
      } = this.props;
      const { key } = breadcrumbNameMap[pathname];
      const params = { start: 0, limit: 20 };
      params.mod = key;
      readMod(key, params).then(r => {
        if (this.WrappedRef.current) {
          const wrappedCom = this.WrappedRef.current;
          const rst = { ...r };
          if (rst.data) {
            rst.data = AddArrayUid(Seed, r.data);
          }
          wrappedCom.setState({ ...rst, loading: false }, () => this.setState({ loading: false }));
        }
      });
    }

    reload = cond => {
      this.setState({ loading: true });
      if (this.WrappedRef.current) {
        const wrappedCom = this.WrappedRef.current;
        const { currentPage, pageSize, search } = wrappedCom.state;
        const {
          location: { pathname },
          breadcrumbNameMap,
        } = wrappedCom.props;
        const { key } = breadcrumbNameMap[pathname];
        const params = { ...cond, ...search, start: pageSize * (currentPage - 1), limit: pageSize };
        params.mod = key;
        readMod(key, params).then(r => {
          if (this.WrappedRef.current) {
            const rst = { ...r };
            if (rst.data) {
              rst.data = AddArrayUid(Seed, r.data);
            }
            wrappedCom.setState({ ...rst, loading: false }, () =>
              this.setState({ loading: false })
            );
          }
        }).catch(e=> this.setState({loading:false}));
      }
    };

    render() {
      const { loading } = this.state;
      return (
        <ErrorBoundary> 
          <div>
            <div className={[loading ? '' : 'hide', 'Spin-box'].join(' ')}>
              <Spin tip="Loading..." />
            </div>
            <WrappedComponent ref={this.WrappedRef} reload={this.reload} {...this.props} />
          </div>
        </ErrorBoundary>
      );
    }
  };
}
