import React from 'react';

import ModalTable from '@/components/Table/ModalTable';
import ModalFormBtn from '@/components/ModalFormBtn';
import { submit, readAction, getGobalState } from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { data: ref } = this.props;
    this.state = {
      data: { ...ref },
      loading: true,
    };
    this.submit = this.submit.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
  }

  componentDidMount() {
    const { action, config = {}, data: ref } = this.props;
    if (config.read) {
      readAction(action, ref).then(res => {
        this.setState({ data: res.data || [], loading: false });
      });
    }
  }

  submit = formData => {
    const { action } = this.props;
    const { data } = this.state;
    const rst = {
      ...formData,
      group_id: data['跟团游价格调整'][0].group_id,
    };
    submit(action, rst);
  };

  cancel = () => {
    const { modal, afterCancel } = this.props;
    modal.destroy();
    if (afterCancel) {
      afterCancel();
    }
  };

  onCellChange = () => {};

  render() {
    const { loading, data } = this.state;
    const { blocks = {} } = getGobalState('meta');
    const datas = [
      {
        field: { type: 'text', text: '出团日期' },
        old_value: { type: 'date', text: '2019-08-08' },
        value: { type: 'date', text: '2019-12-12' },
      },
      {
        field: { type: 'text', text: '总位' },
        old_value: { type: 'number', text: '100' },
        value: { type: 'number', text: '120' },
      },
      {
        field: { type: 'text', text: '出发时间' },
        old_value: { type: 'time', text: '15:00' },
        value: { type: 'time', text: '20:00' },
      },
      {
        field: { type: 'text', text: '出团日期' },
        old_value: { type: 'date', text: '2019-08-08' },
        value: { type: 'date', text: '2019-12-12' },
      },
    ];
    return (
      <React.Fragment>
        {!loading && (
          <ModalTable
            blockConfig={blocks['跟团游数据维护']}
            block="跟团游数据维护"
            dataSource={datas || []}
            onCellChange={this.onCellChange}
          />
        )}
        <ModalFormBtn
          submit={values => {
            this.submit(values);
          }}
          cancel={() => {
            this.cancel();
          }}
        />
      </React.Fragment>
    );
  }
}

export default Edit;
