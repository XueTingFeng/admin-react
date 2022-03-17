import React, { Component } from 'react'
import { Link , withRouter} from 'react-router-dom'

import { Menu } from 'antd';

import logo from '../../assets/images/logo.png'
import './index.css'
import menuList from '../../config/menuList';

const { SubMenu } = Menu;
//左侧导航组件
class LeftNav extends Component {

  //根据menu的数据生成对应的标签数组
  getMenuNodes = (menuList)=> {
    const path = this.props.location.pathname
		return menuList.map((item) => {
			if (!item.children) {
				return (
            <Menu.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
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

export default withRouter(LeftNav)

