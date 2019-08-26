import React from 'react';

import ModalTable from '@/components/Table/ModalTable';
import ModalFormBtn from '@/components/ModalFormBtn';
import { submit, readAction, getGobalState, AddDataUidCell } from '@/utils/utils';

const Seed = require('short-id');

/* eslint react/no-multi-comp:0 */
class Edit extends React.Component {
  constructor(props) {
    super(props);
    const { data: ref } = this.props;
    this.actionMap = { ...props.actionMap };

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
        const rst = AddDataUidCell(Seed,res.data);
        this.setState({ data: rst || [], loading: false });
      });
    }
  }

  submit = () => {
    const { action,data:ref ,modal,afterOk} = this.props;
    const { data } = this.state;
    const rst = {
      ...data,
      'main_group_id':ref.main_group_id
    };
    submit(action, rst).then(
      ()=>{
        modal.destroy();
        if(afterOk){
          afterOk();
        }
      }
    );
  };

  cancel = () => {
    const { modal, afterCancel } = this.props;
    modal.destroy();
    if (afterCancel) {
      afterCancel();
    }
  };

  onCellChange = (val, index, cellKey) => {
    const { data } = this.state;
    data['跟团游数据维护'][index][cellKey].text = val;
    this.setState({ data });
  };

  render() {
    const { loading, data } = this.state;
    const { blocks = {} } = getGobalState('meta');
    return (
      <React.Fragment>
        {!loading && (
          <ModalTable
            blockConfig={blocks['跟团游数据维护']}
            block="跟团游数据维护"
            dataSource={data['跟团游数据维护'] || []}
            actionMap={this.actionMap}
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
