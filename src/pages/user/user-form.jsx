import React, { PureComponent } from 'react'
import {Form,Input,Select} from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class UserForm extends PureComponent {

    getFormValues = () => {
        return this.form.getFieldsValue()
    }

    render() {

        const { roles, } = this.props
        const user = this.props.user || {}

        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        }

        return (
            <div>
                <Form ref={n => this.form = n}>

                    <Item 
                    {...formItemLayout}
                    name='username' 
                    initialValue={user.username}
                    label='用户名:'
                    rules={[
                        {required:true,message:'用户名必须输入'}
                    ]}
                    >
                    <Input placeholder='请输入用户名'></Input>
                    </Item>

                    {
                        user._id ? null :
                        <Item 
                            {...formItemLayout}
                            name='password' 
                            initialValue={user.password}
                            label='密码:'
                            rules={[
                                {required:true,message:'密码必须输入'}
                            ]}
                            >
                            <Input type="password" placeholder='请输入密码'></Input>
                        </Item>
                    }
                    

                    <Item 
                    {...formItemLayout}
                    name='phone' 
                    initialValue={user.phone}
                    label='手机号:'
                    >
                    <Input placeholder='请输入手机号'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='email' 
                    initialValue={user.email}
                    label='邮箱:'
                    >
                    <Input placeholder='请输入邮箱'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='roleId' 
                    initialValue={user.role}
                    label='角色:'
                    rules={[
                        {required:true,message:'角色必须输入'}
                    ]}
                    >
                    <Select placeholder='请选择角色'>
                        {
                            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                        }
                    </Select>
                    </Item>

                </Form>
            </div>
        )
    }
}
