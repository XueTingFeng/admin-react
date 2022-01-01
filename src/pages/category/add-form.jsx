import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {

    onFinish = () => {

    }
    render() {
        return (
            <div>
                <Form onFinish={this.onFinish}>
                    <Item name='parentId'>
                    <Select defaultValue='0'>
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>图书</Option>
                    </Select>
                    </Item>

                    <Item name='categoryName'>
                    <Input defaultValue='' placeholder='请输入分类名称'></Input>
                    </Item>
                </Form>
            </div>
        )
    }
}
