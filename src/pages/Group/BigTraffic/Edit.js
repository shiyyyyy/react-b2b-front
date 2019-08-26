import React from 'react';

import ActionPageTable from '@/components/Table/ActionPageTable';
import {submit,readAction,getGobalState} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
class Edit extends React.Component {
  constructor(props) {
    super(props);
    const {data:ref} = this.props;
    this.state = {
      data:{...ref},
      loading:true
    };
    this.submit = this.submit.bind(this);
    this.onCellChange=this.onCellChange.bind(this);
}

  componentDidMount() {
    const { action,config={},data:ref } = this.props;
    if(config.read){
      readAction(action,ref).then(res=>{
        this.setState({data:res.data||[],loading:false})
      });
    }
  }

  submit = (formData) => {
    const {action} = this.props;
    const {data} = this.state;
    const rst = {
        ...formData,
        main_group_id:data['跟团游价格调整'][0].main_group_id
    }
    submit(action,rst);
  };

  onCellChange = ()=>{

  }

  render() {
    const {loading,data} = this.state;
    const {blocks={}} = getGobalState('meta');
    return (
      <React.Fragment>
        {
          !loading && 
            <ActionPageTable
              blockConfig={blocks['大交通数据维护']}
              block='大交通数据维护'
              dataSource={data['大交通数据维护'] || []}
              onCellChange={this.onCellChange}
            />
        }
      </React.Fragment>
    );
  }
}

export default Edit;
