import React, { Component } from 'react'
import{
Card,
Select,
Input,
Button,
Table,
message
}from 'antd'

import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import LinkButton from '../../components/link-button/index'
import {PAGE_SIZE} from '../../utils/constants'
const Option = Select.Option
/*
Product的默认子路由组件
*/
export default class Home extends Component {

    constructor(props){
        super(props)

        this.initColums()
    }

    state = {
        total:0,//商品总数
        products:[],//商品列表数组
        loading:false,//是否正在加载
        searchName:'',//搜索关键字
        searchType:'productName'//根据那个字段搜索
    }

    //初始化table的列的数组
    initColums = () => {
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render: (price) => '￥' + price//指定对应的属性，传入的是对应的属性值
            },
            {
                width: 100,
                title: '状态',
                //dataIndex: 'status',
                render: (product) => {
                    const {status,_id} = product
                    return(
                        <span>
                        <Button 
                            type='primary' 
                            onClick={() => this.updateStatus(_id,status === 1 ? 2 : 1)}
                        >
                            {status === 1 ? '下架' : '上架'}
                        </Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )                  
                }//指定对应的属性，传入的是对应的属性值
              },
              {
                title: '操作',
                render: (product) => {
                    return(
                        <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail',product)}>详情</LinkButton>
                        <LinkButton onClick={() => this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )                  
                }//指定对应的属性，传入的是对应的属性值
              },
          ];
    }

    //获取指定页码的数据列表展示
    getProducts = async(pageNum) => {
        this.pageNum = pageNum
        this.setState({loading:true})

        const {searchName,searchType} = this.state
        //如果关键字有值，进行搜索分页
        let res
        if(searchName){
            res = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
        }else{
            res = await reqProducts(pageNum,PAGE_SIZE)//一般分页
        }

        this.setState({loading:false})
        if(res.status === 0){
            //取出分页数据，更新状态，显示分页列表
            const {total,list} = res.data
            this.setState({
                total,
                products:list,
            })
        }
    }

    //更新指定商品的状态
    updateStatus = async(id,status) => {
        const res = await reqUpdateStatus(id,status)
        if(res.status === 0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }

    componentDidMount(){
        this.getProducts(1)
    }

    render() {
        const {products,total,loading,searchType,searchName} = this.state
        const title = (
           <span>
               <Select value={searchType} style={{width:'150px'}} onChange={value => this.setState({searchType:value})}>
                   <Option value='productName'>按名称搜索</Option>
                   <Option value='productDesc'>按描述搜索</Option>
               </Select>
               <Input 
               placeholder='关键字' 
               style={{width:'150px',margin:'0 15px'}} 
               value={searchName}
               onChange={e => this.setState({searchName:e.target.value})}
               ></Input>
               <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
           </span> 
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>添加商品</Button>
        )
                  
        return (
            <Card title={title} extra={extra}>
                <Table rowKey='_id' 
                bordered 
                loading={loading}
                pagination={{
                    current: this.pageNum,
                    defaultPageSize:PAGE_SIZE,
                    showQuickJumper:true,
                    total:total,
                    onChange:this.getProducts
                }} 
                dataSource={products} 
                columns={this.columns}/>
            </Card>
        )
    }
}
