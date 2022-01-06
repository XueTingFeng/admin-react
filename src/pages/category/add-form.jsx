import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        setForm: PropTypes.func.isRequired,//用来传递form对象的函数
        categorys: PropTypes.array.isRequired,//一级分类的数组
        parentId: PropTypes.string.isRequired,//父分类的id
    }

    onFinish = () => {

    }

    componentDidMount(){
        this.props.setForm(this.formRef.current)
    }

    render() {
        const {categorys,parentId} = this.props
        return (
            <div>
                <Form onFinish={this.onFinish} ref={this.formRef}>
                    <Item name='parentId' initialValue={parentId}>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                        categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                    </Item>

                    <Item 
                    name='categoryName' 
                    initialValue={''}
                    rules={[
                        {required:true,message:'分类名称必须输入'}
                    ]}
                    >
                    <Input placeholder='请输入分类名称'></Input>
                    </Item>
                </Form>
            </div>
        )
    }
}
