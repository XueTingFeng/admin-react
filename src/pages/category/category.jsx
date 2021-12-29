import React, { Component } from 'react'
import{
    Card,
    Table,
    Button,
    message,    
} from 'antd'

import {SendOutlined} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api/index'
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
                <LinkButton>修改分类</LinkButton>
                {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
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

  //执行异步任务:发送异步ajax请求
  componentDidMount(){
    this.getCategorys()
  }

    render() {
        //
        const {categorys,loading,parentId,subCategorys} = this.state
          
        //card的标题
        const title = '一级分类列表'
        //card的右侧
        const extra = (
            <Button type='primary'>
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
                </Card>
            </div>
        )
    }
}
