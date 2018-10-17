import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Input ,Button } from 'antd';

import '../../css/Login.css';

const { Header, Content, Footer } = Layout;

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            user_name: '',
            password: '',
            veri_code: '',
        }
    }

    submit(){
        console.log(this)
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
                                <Input onChange={e => this.setState({ user_name: e.target.value })}
                                type="text" className="user-name" placeholder="请输入用户名" />
                                <div className={"prompt "+(this.state.err==1?'':'hide')}>用户名错误!</div>
                            </div>
                            <div className="input-box">
                                <label>密 &nbsp; 码</label>
                                <Input onChange={e=>this.setState({ password: e.target.value })} 
                                type="password" className="password" placeholder="请输入密码" />
                                <div className={"prompt "+(this.state.err==2?'':'hide')}>用户密码错误!</div>
                            </div>
                            <div className="input-box">
                                <label>验证码</label>
                                <Input onChange={e => this.setState({ veri_code: e.target.value })}
                                type="text" className="veri-input" placeholder="请输入验证码" />
                                <img src="/img/veri.png" className="veri-code" />
                                <div className={"prompt "+(this.state.err==3?'':'hide')}>验证码错误!</div>
                            </div>
                        </div>
                        <Button onClick={_=>this.submit()}
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