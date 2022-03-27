import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

export default class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,//用来传递form对象的函数
    }

    formRef = React.createRef()

    componentDidMount(){
        this.props.setForm(this.formRef.current)
    }

    render() {

        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15}
        }

        return (
            <div>
                <Form ref={this.formRef}>

                    <Item 
                    {...formItemLayout}
                    name='roleName' 
                    initialValue={''}
                    label='角色名称:'
                    rules={[
                        {required:true,message:'角色名必须输入'}
                    ]}
                    >
                    <Input placeholder='请输入角色名称'></Input>
                    </Item>

                </Form>
            </div>
        )
    }
}
