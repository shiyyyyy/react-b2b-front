import React from 'react';

import BlocksModal from '@/components/BlocksModal';
import {submit,readAction,getGobalState} from '@/utils/utils';
/* eslint react/no-multi-comp:0 */
class Pricing extends React.Component {
  constructor(props) {
    super(props);
    const {data:ref} = this.props;
    this.state = {
      data:{...ref},
      loading:true
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { action,config={},data:ref } = this.props;
    if(config.read){
      readAction(action,ref).then(res=>{
        this.setState({data:res.data||{},loading:false})
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

  render() {
    const {modal} = this.props;
    const {loading,data} = this.state;
    const {blocks={}} = getGobalState('meta');
    const blkconfig = {};
    const { config } = this.props;
    config.block.forEach((key)=>{
      blkconfig[key] = blocks[key];
        data[key] = data[key] || [{}];
    })
    return (
      <React.Fragment>
        {
          !loading && 
            <BlocksModal
              config={{blocks:blkconfig}}
              data={data}
              afterOk={this.submit}
              modal={modal}
            />
        }
      </React.Fragment>
    );
  }
}

export default Pricing;
