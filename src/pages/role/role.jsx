import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    message
} from 'antd'

import {PAGE_SIZE} from '../../utils/constants'
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api'
import Modal from 'antd/lib/modal/Modal'
import { formatDate } from '../../utils/dateUtils'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtil'

export default class Role extends Component {

    constructor(props){
        super(props)

        this.auth = React.createRef()
        this.initColumn()
    }

    state = {
        roles:[],//所有角色的列表
        role: {},//选中的role
        loading:false,
        isShowAdd:false,
        isShowAuth:false
    }

    initColumn = () => {
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render: (create_time) => formatDate(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formatDate
            },
            {
                title:'授权人',
                dataIndex:'auth'
            },
        ]
    }

    getRoles = async () => {
        const res = await reqRoles()
        if(res.status === 0){
            const roles = res.data
            this.setState({roles})
        }
    }

    onRow = (role) => {
        return {
            onClick:() => {
                this.setState({role})
            },
            onChange:() => {
                this.setState({role})
            }
        }
    }

    //添加角色
    addRole = () => {
        //进行表单验证
        this.form.validateFields().then(async (values) => {

            //收集输入数据
            const {roleName} = values

            this.form.resetFields()

            //请求添加
            const res = await reqAddRole(roleName)

            //根据结果提示
            if(res.status === 0){
                message.success('添加角色成功')
                //this.getRoles()

                const role = res.data

                //const roles = this.state.roles
                // const roles = [...this.state.roles]
                // roles.push(role)
                // this.setState({roles})

                //更新roles状态：基于原本状态数据更新
                this.setState(state => ({
                    roles:[...state.roles,role],
                    isShowAdd:false
                }))
            }else{
                message.error('添加角色失败')
            }
        })
        
    }

    //更新角色
    updateRole = async () => {
        const role = this.state.role

        //获取最新的menus
        const menus = this.auth.current.getMenus()
        role.menus = menus

        //请求更新
        const res = await reqUpdateRole(role)

        if(res.status===0){
            message.success('设置角色成功')
            //this.getRoles()
            if(role._id === memoryUtils.user.role._id){
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户角色权限修改了,重新登录')
            }else{
                message.success('设置角色权限成功')
                this.setState({
                    roles:[...this.state.roles],
                    isShowAuth:false
                })
            }
            
        }
        
    }

    componentDidMount(){
        this.getRoles()
    }

    render() {
        const {roles, role, loading, isShowAdd, isShowAuth} = this.state
        const title = (
            <span>
                <Button type="primary" onClick={() => {this.setState({isShowAdd:true})}}>创建角色</Button>&nbsp;
                <Button type="primary" onClick={() => {this.setState({isShowAuth:true})}} disabled={!role._id}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                dataSource={roles} 
                columns={this.columns}
                rowKey='_id'
                bordered
                loading={loading}
                pagination={{defaultPageSize: PAGE_SIZE}}
                rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                onRow={this.onRow}
                >

                </Table>

                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {this.setState({isShowAdd:false})}}
                    destroyOnClose={true}
                >
                    <AddForm setForm={(form) => {this.form = form}}></AddForm>
                </Modal>


                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {this.setState({isShowAuth:false})}}
                    destroyOnClose={true}
                >
                    <AuthForm ref={this.auth} role={role} setForm={(form) => {this.form = form}}></AuthForm>
                </Modal>
            </Card>
        )
    }
}
