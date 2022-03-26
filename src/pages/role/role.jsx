import React, { Component } from 'react'
import {
    Card,
    Button,
    Table
} from 'antd'

import {PAGE_SIZE} from '../../utils/constants'
import { reqRoles } from '../../api'

export default class Role extends Component {

    constructor(props){
        super(props)

        this.initColumn()
    }

    state = {
        roles:[],//所有角色的列表
        role: {},//选中的role
        loading:false
    }

    initColumn = () => {
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'授权时间',
                dataIndex:'auth_time'
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

    componentDidMount(){
        this.getRoles()
    }

    render() {
        const {roles, role, loading} = this.state
        const title = (
            <span>
                <Button type="primary">创建角色</Button>&nbsp;
                <Button type="primary" disabled={!role._id}>设置角色权限</Button>
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
            </Card>
        )
    }
}
