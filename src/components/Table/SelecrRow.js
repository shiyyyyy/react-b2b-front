import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

import SelecrRowTable from './SelecrRowTable';
import ModHeaderBtnFilter from '@/components/ModHeaderBtnFilter';

import styles from './ListPage.less';

@Form.create()
class ListPage extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    modConfig: PropTypes.object,
    mod: PropTypes.string,
    reload: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    loading: false,
    modConfig: {},
    mod: '',
    reload: () => {},
  };

  render() {
    const { loading, dataSource, page, mod, rowSelection, modConfig, reload } = this.props;
    return (
      <div className={styles.tableList}>
        <ModHeaderBtnFilter modConfig={modConfig} reload={reload} />
        <div className={styles.tableStyle}>
          <SelecrRowTable
            rowSelection={rowSelection || null}
            loading={loading}
            dataSource={dataSource}
            page={page}
            mod={mod}
            modConfig={modConfig}
            reload={reload}
          />
        </div>
      </div>
    );
  }
}

export default ListPage;
