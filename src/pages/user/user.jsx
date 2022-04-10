import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import { formatDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import UserForm from './user-form'
import { reqUsers, reqDeleteUser } from '../../api'

export default class User extends Component {

    ModalForm = React.createRef()

    state = {
        users: [],//所有的用户列表,
        roles: [],//所有角色的列表
        isShow: false,//是否显示添加用户的对话框
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => formatDate(create_time)
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton type='link' onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton type='link' onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    //根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
    initRolesNames = (roles) => {
        const rolesNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        this.roleNames = rolesNames
    }

    getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
            this.initRolesNames(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功')
                    this.getUsers()
                }
            }
        })
    }

    addOrUpdateUser = () => {
        const values = this.ModalForm.current.getFormValues()
        console.log(values)
       
    }

    componentDidMount() {  
        this.initColumns()
        this.getUsers()
    }

    render() {

        const { users, isShow, } = this.state

        const title = (
            <Button type='primary' 
            onClick={() => this.setState({isShow: true})}>
                创建用户
            </Button>
        )

        return (
            <div>
                <Card title={title}>
                <Table
                dataSource={users} 
                columns={this.columns}
                rowKey='_id'
                bordered
                pagination={{defaultPageSize: PAGE_SIZE}}
                >
                </Table>

                <Modal
                    title="添加用户"
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {this.setState({isShowAdd:false})}}
                    okButtonProps={{htmlType: 'submit',form: 'userForm'}}
                >
                    <UserForm ref={this.ModalForm}></UserForm>
                </Modal>
                </Card>
            </div>
        )
    }
}
