import React, { Component } from 'react'
import {Redirect , Route , Switch} from 'react-router-dom'
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav/index'
import Header from '../../components/header'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import { connect } from 'react-redux';

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    
    render() {
        const user = this.props.user

        if(!user || !user._id){
            return <Redirect to='/login'/>
        }

        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/home'/>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Route component={Home}></Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#cccccc'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {}
)(Admin)

