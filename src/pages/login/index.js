import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Input ,Button } from 'antd';
import { trigger,goTo } from '../../util/core';
import { userInit } from '../../util/data';
import { request,encUrl } from '../../util/request';
import { routes} from '../index';
import '../../css/Login.css';

const { Header, Content, Footer } = Layout;

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            account:'',
            password:''
        }
        this.url = '/Session/login';
    }

    login(){
        request(this.url,this.state,{wait:1}).then(
          r => {
                trigger('更新用户',r.user);
                userInit().then(r=>{
                    trigger('更新路由',routes);
                    goTo('/home');
                },e=>{
                    console.log(e);
                })
                
            }
        );
    }


    render(){
        return(
            <Layout className="Login-layout">
                <Header className="Login-header">
                    <div className="Login-logo" />
                </Header>
                <Content className="Login-content">
                    <div className="login-box">
                        <div className="box-header">登录</div>
                        <div className="box-main">
                            <div className="input-box">
                                <label>用户名</label>
                                <Input onChange={e => this.setState({ account: e.target.value })}
                                type="text" className="user-name" placeholder="请输入用户名" />
                                <div className={"prompt "+(this.state.err==1?'':'hide')}>用户名错误!</div>
                            </div>
                            <div className="input-box">
                                <label>密 &nbsp; 码</label>
                                <Input onChange={e=>this.setState({ password: e.target.value })} 
                                type="password" className="password" placeholder="请输入密码" />
                                <div className={"prompt "+(this.state.err==2?'':'hide')}>用户密码错误!</div>
                            </div>
                        </div>
                        <Button onClick={_=>this.login()}
                        size="large" type="primary" className="submit" block>登录</Button>
                        <div className="login-prompt">
                            有问题请联系供应商!
                        </div>
                    </div>
                </Content>
                <Footer className="Login-footer">
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}


export default withRouter(Login);