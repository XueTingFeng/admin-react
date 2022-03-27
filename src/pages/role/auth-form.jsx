import React, { Component } from 'react'
import {Form,Input,Tree} from 'antd'
import PropTypes from 'prop-types'

import menuList from '../../config/menuList'

const Item = Form.Item

export default class AuthForm extends Component {

    static propTypes = {
        role: PropTypes.object
    }

    constructor(props){
        super(props)

        const {menus} = this.props.role
        this.state = {
            checkedKeys:menus
        }
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({checkedKeys})
      };

    //为父组件提供menus
    getMenus = () => this.state.checkedKeys

    render() {

        const {checkedKeys} = this.state
        const {role} = this.props

        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        }

        

        return (
            <div>
                <Form>

                    <Item 
                    {...formItemLayout}
                    label='角色名称'
                    >
                    <Input value={role.name} disabled></Input>
                    </Item>

                </Form>

                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    treeData={menuList}
                    onCheck={this.onCheck}
                >
                </Tree>
            </div>
        )
    }
}
