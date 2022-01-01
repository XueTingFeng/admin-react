import React, { Component } from 'react'
import propTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item = Form.Item

export default class UpdateForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        categoryName: propTypes.string,
        setForm: propTypes.func
    }

    componentDidMount(){
        this.props.setForm(this.formRef.current)
    }
    render() {
        const {categoryName} = this.props
        return (
            <div>
                <Form ref={this.formRef}>
                    <Item name='categoryName' initialValue={categoryName}>
                    <Input title='更新分类'  placeholder='请输入分类名称'></Input>
                    </Item>
                </Form>
            </div>
        )
    }
}
