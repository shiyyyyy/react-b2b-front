import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';

import Personal from '../Personal';
import Supplier from '../Supplier';

const { Header, Content, Footer } = Layout;

class index extends React.Component{


    render(){
        return(
            <div>
                <Route exact path="/Personal" component={Personal}>
                    {/* <Route exact path="/Personal/index" component={Personal} />
                    <Route exact path="/Personal/History" component={History} />
                    <Route exact path="/Personal/LatestNews" component={LatestNews} />
                    <Route exact path="/Personal/QA" component={QA} />
                    <Route exact path="/Personal/Recommend" component={Recommend} /> */}
                </Route>
                <Route path="/Supplier" component={Supplier}>
                    {/* <Route exact path="/Personal/index" component={Supplier} />
                    <Route exact path="/Personal/AllProduct" component={AllProduct} />
                    <Route exact path="/Personal/Discount" component={Discount} />
                    <Route exact path="/Personal/Employee" component={Employee} />
                    <Route exact path="/Personal/Introduction" component={Introduction} /> */}
                </Route>
            </div>
        )
    }
}
    
export default withRouter(index);