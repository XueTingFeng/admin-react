import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router';

import './login.css'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';
import storageUtil from '../../utils/storageUtil';


// 登录路由组件
export default class Login extends Component {

   onFinish = async(values) => {
    const {username,password} = values

      const res = await reqLogin(username,password)

      //保存user
      const user = res 
      memoryUtils.user = user
      storageUtil.saveUser(user)
  
      if(res.status === 0){
        message.success('登录成功')
        //跳转到管理界面(不需要回退到登录)
        this.props.history.replace('/')
      }else{
        message.error(res.msg)
      }
  };

  onFinishFailed = (err) => {
		console.log(err);
	};


  //自定义验证，对密码进行验证
  validatePwd = (rule, value) => {
    if(!value){
      return Promise.reject('密码必须输入')
    }else if(value.length<4){
      return Promise.reject('密码长度不能小于4位')
    }else if(value.length > 12){
      return Promise.reject('密码长度不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      return Promise.reject('密码必须是英文、数字或下划线组成')
    }else{
      return Promise.resolve('验证成功')
    }
  }
  
    render() {

      //如果已经登录，自动跳转管理界面
      const user = memoryUtils.user
      if(user && user._id){
        return <Redirect to='/'/>
      }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className="login-form" onFinish={this.onFinish}>
                        <Form.Item name="username" 
                        //声明式验证：直接使用别人定义好的验证规则进行验证
                        rules={[
                          {required:true,whitespace:true,message:'用户名必须输入'},
                          {min:4,message:'用户名至少4位'},
                          {max:12,message:'用户名最多12位'},
                          {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                        ]}>
                          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{color:'rgba(0,0,0,0.5)'}}/>
                        </Form.Item>
                        <Form.Item name="password" 
                        rules={[
                          {
                            validator: this.validatePwd
                          }
                        ]}>
                          <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            style={{color:'rgba(0,0,0,0.5)'}}
                            placeholder="Password"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                          </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
