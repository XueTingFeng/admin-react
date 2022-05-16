import React, { Component } from 'react'
import { Link , withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import { Menu } from 'antd';

import logo from '../../assets/images/logo.png'
import './index.css'
import menuList from '../../config/menuList';
import { setHeaderTitle } from '../../redux/actions';

const { SubMenu } = Menu;
//左侧导航组件
class LeftNav extends Component {

  //判断当前用户对item是否有权限
  hasAuth = (item) => {
    const {key,isPublic} = item
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    if(username==='admin' || isPublic || menus.indexOf(key) !== -1){
      return true
    }else if(item.children){
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false
  }

  //根据menu的数据生成对应的标签数组
  getMenuNodes = (menuList)=> {
    const path = this.props.location.pathname
		return menuList.map((item) => {

      //如果当前用户有item权限,才需要显示对应的菜单项
      if(this.hasAuth(item)){
        if (!item.children) {
          //判断item是否是当前对应的item
          if(item.key===path || path.indexOf(item.key) === 0){
            //更新状态
            this.props.setHeaderTitle(item.title)
          }

          return (
              <Menu.Item key={item.key}>
              <Link onClick={() => this.props.setHeaderTitle(item.title)} to={item.key}>{item.title}</Link>
              </Menu.Item>
          );
        } else {
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if(cItem){
            this.openKey = item.key
          }
          
          return (
            <SubMenu key={item.key} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
    return null
		});
	};

  componentDidMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }
    render() {
      let path = this.props.location.pathname
      if(path.indexOf('/product') === 0){ //当前是商品界面或商品子路由界面
        path = '/product'
      }
        return (
            <div>
                <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
                </div>

                <div>

                    <Menu
                      mode="inline"
                      theme="dark"
                      selectedKeys={[path]}
                      defaultOpenKeys={[this.openKey]}
                    >
                      {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
                        <Link to='/home'>
                        首页
                        </Link>
                      </Menu.Item>

                      <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="/category">
                          <Link to='/category'>
                          品类管理
                          </Link>
                          </Menu.Item>
                        <Menu.Item key="/product">
                          <Link to='/product'>
                          商品管理
                          </Link>
                          </Menu.Item>
                      </SubMenu>

                      <Menu.Item key="/user" icon={<PieChartOutlined />}>
                        <Link to='/user'>
                        用户管理
                        </Link>
                      </Menu.Item>

                      <Menu.Item key="/role" icon={<PieChartOutlined />}>
                        <Link to='/role'>
                        角色管理
                        </Link>
                      </Menu.Item> */}

                      {this.getMenuNodes(menuList)}
                    </Menu>    
                </div>

            </div>  
        )
    }
}

export default connect(
  state => ({user:state.user}),
  {
    setHeaderTitle
  }
)(withRouter(LeftNav)) 

