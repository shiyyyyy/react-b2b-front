import React from 'react';
import {AddArrayUid,readMod} from '@/utils/utils';

const Seed = require('short-id');

export default function ModPageHoc(WrappedComponent){
    return class ModPage extends React.Component{
        constructor(props){
            super(props);
            this.WrappedRef = React.createRef();
            this.reload = this.reload.bind(this);
        }

        componentDidMount() {
            this.reload(); 
        }

        reload = cond => {
            if(this.WrappedRef.current){
                const wrappedCom = this.WrappedRef.current;
                const { currentPage , pageSize} = wrappedCom.state;
                const {
                    location: { pathname },
                    breadcrumbNameMap
                } = wrappedCom.props;
                const {key} = breadcrumbNameMap[pathname];
                const params = {...cond,start:pageSize * (currentPage-1),limit:pageSize};
                params.mod = key;
                readMod(key,params).then(r=>{
                    const rst = {...r};
                    if(rst.data){
                        rst.data = AddArrayUid(Seed,r.data);
                    }
                    wrappedCom.setState({...rst,loading:false})
                })
            }
        };

        render(){
            return (
              <WrappedComponent 
                ref={this.WrappedRef}
                reload={this.reload} 
                {...this.props} 
              />
            )
        }
    }
}
