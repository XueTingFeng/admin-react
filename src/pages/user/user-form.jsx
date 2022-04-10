import React, { PureComponent } from 'react'
import {Form,Input} from 'antd'

const Item = Form.Item

export default class UserForm extends PureComponent {

    getFormValues = () => {
        return this.form.getFieldsValue()
    }


    render() {

        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        }

        return (
            <div>
                <Form ref={n => this.form = n}>

                    <Item 
                    {...formItemLayout}
                    name='userName' 
                    initialValue={''}
                    label='用户名:'
                    rules={[
                        {required:true,message:'用户名必须输入'}
                    ]}
                    >
                    <Input placeholder='请输入用户名'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='password' 
                    initialValue={''}
                    label='密码:'
                    rules={[
                        {required:true,message:'密码必须输入'}
                    ]}
                    >
                    <Input placeholder='请输入密码'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='phone' 
                    initialValue={''}
                    label='手机号:'
                    >
                    <Input placeholder='请输入手机号'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='email' 
                    initialValue={''}
                    label='邮箱:'
                    >
                    <Input placeholder='请输入邮箱'></Input>
                    </Item>

                    <Item 
                    {...formItemLayout}
                    name='roleId' 
                    initialValue={''}
                    label='角色:'
                    >
                    <Input placeholder='请输入角色'></Input>
                    </Item>

                </Form>
            </div>
        )
    }
}
