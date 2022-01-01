import React, { Component } from 'react'
import{
    Card,
    Table,
    Button,
    message,  
    Modal  
} from 'antd'

import {SendOutlined} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index'
export default class Category extends Component {

  constructor(props){
    super(props)

    this.initColumns()
    
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
            <span>
                <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                {this.state.parentId === '0' ?
                <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> :
                ''
              }
            </span>
        )
      },
    ];
  }

  state = {
    categorys:[],//一级分类列表
    subCategorys: [],//二级分类列表
    loading: false,//是否正在获取数据中
    parentId: '0',//当前需要显示的分类列表的parentId
    parentName: '',//当前需要显示的分类列表父列表的分类名称
    showStatus: 0,//标识确认框是否显示，0：都不显示 1：显示添加 2：显示更新
  }

  getCategorys = async() => {
    //发请求前显示loading
    this.setState({loading:true})
    //发送异步ajax请求，获取数据
    const {parentId} = this.state
     const res = await reqCategorys(parentId)
     this.setState({loading:false})
     if(res.status === 0){
      const categorys = res.data
      if(parentId === '0'){
        //更新一级分类状态
        this.setState({categorys})
      }else{
        //更新二级分类状态
        this.setState({subCategorys:categorys})
      }     
     }else{
       message.error('获取分类列表失败!')
     }
  }

  showSubCategorys = (category) => {
    //更新状态
    this.setState({
      parentId:category._id,
      parentName:category.name
    },() => {//在状态更新且重新render()后执行
      //获取二级分类列表
      this.getCategorys()
    }) 
  }

  //显示一级列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //响应点击取消:隐藏确认框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus:0
    })
  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  //添加分类
  addCategory = () => {
    console.log('addCate')
  }

  showUpdate = (category) => {
    //保存分类对象
    this.category = category || {}//如果没有，指定空对象
    this.setState({
      showStatus: 2
    })
  }

  //更新分类
  updateCategory = async() => {
    this.form.validateFields().then(async(values) => {
      //隐藏确定框
      this.setState({
        showStatus: 0
      })

      const categoryId = this.category._id
      const {categoryName} = values

      //清除输入数据
      this.form.resetFields()

      //发请求更新分类
      const res = await reqUpdateCategory({categoryId,categoryName})
      if(res.status === 0){
        //重新显示列表
        this.getCategorys()
      }
      })

  }


  //执行异步任务:发送异步ajax请求
  componentDidMount(){
    this.getCategorys()
  }

    render() {
        //
        const {categorys,loading,parentId,subCategorys,parentName,showStatus} = this.state
        const category = this.category
        //card的标题
        const title = parentId === '0' ? '一级分类列表' : (
          <span> 
            <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
            <SendOutlined />
            <span>{parentName}</span>
          </span>
        )
        //card的右侧
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <SendOutlined />
                添加
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                    dataSource={parentId === '0' ? categorys : subCategorys} 
                    columns={this.columns}
                    rowKey='_id'
                    bordered
                    loading={loading}
                    pagination={{defaultPageSize: 5,showQuickJumper: true}}
                    >
                    
                    </Table>

                    <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >

                      <AddForm/>

                    </Modal>
                    
                    <Modal
                    visible={showStatus === 2}
                    title="更新分类"
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    destroyOnClose={true} 
                    >
                      <UpdateForm categoryName={category?.name} setForm={(form) => {this.form = form}}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
