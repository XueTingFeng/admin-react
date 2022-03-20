import React, { Component } from 'react'
import {Form,Select,Input,Card,Cascader,Button} from 'antd'
import { LeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import PicturesWall from './picturesWall';
import { reqCategorys } from '../../api';

const Item = Form.Item
const {TextArea} = Input
/*
Product的子路由组件
*/
export default class AddUpdate extends Component {

    constructor(props){
        super(props)

        this.pw = React.createRef()
    }

    state = {
        options: [],
    }

    initOptions = async(categorys) => {
        //根据生成options
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
          }))

          //如果是一个二级分类商品的更新
          const {isUpdate} = this
          const {pCategoryId} = this.props.location.state || {}
          if(isUpdate && pCategoryId !== '0'){
              //获取对应的二级分类列表
              const subCategorys = await this.getCategorys(pCategoryId)
              //生成二级下拉列表options
              const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
              }))
              //找到对应的一级options对象
              const targetOption = options.find(option => option.value === pCategoryId)
              //关联到对应的一级options上
              targetOption.children = childOptions
          }
        
        //更新options状态
        this.setState({options})
    }

    //获取分类列表 一级/二级
    //async函数的返回值是一个promise对象,promise的结果值由async 的结果决定
    getCategorys = async(parentId) => {
        const res = await reqCategorys(parentId)
        if(res.status === 0){
            const categorys = res.data
            if(parentId === '0'){
                this.initOptions(categorys)
            }else{
                return categorys
            }
        }
    }

    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
    

        const subCategory = await this.getCategorys(targetOption.value)
        targetOption.loading = false
        if(subCategory && subCategory.length > 0){
            //生成二级列表的options
            const childOptions = subCategory.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true, // 不是叶子
            }))
            //关联到当前options上
            targetOption.children = childOptions
        }else{ //当前没有二级分类
            targetOption.isLeaf = true
        }
        

          this.setState({
            options:[...this.state.options]
          })
        
      };

    //表单数据收集
    onFinish = (values) => {

        const imgs = this.pw.current.getImgs()
        console.log(values,imgs)

    }

    //自定义验证
    vaildPrice = (rule,value) => {
        if(value*1 > 0){
            return Promise.resolve() 
        }else{
            return Promise.reject('价格必须大于0') 
        }
             
    }

    componentDidMount(){
        this.getCategorys('0')

        
        
    }

    render() {

        const product = this.props.location.state
        this.isUpdate = !!product
        const {name,desc,price,pCategoryId,categoryId,imgs} = this.props.location.state || {}

        const categoryids = []
        if(this.isUpdate){
            if(pCategoryId === '0'){
                categoryids.push(categoryId)
            }else{
                categoryids.push(pCategoryId)
                categoryids.push(categoryId)
            }
               
        }

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <LeftOutlined style={{marginRight:15,fontSize: 20}}/>
                </LinkButton>
            
            <span>{this.isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        //指定item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label的宽度
            wrapperCol: { span: 8 },
          };


        return (
            <div>
                <Card title={title}>
                    <Form {...formItemLayout} onFinish={this.onFinish}>
                        <Item label="商品名称" name='name' initialValue={name}
                        rules={[
                            {required:true,message:'必须输入商品名称'}
                        ]}>
                            <Input placeholder='请输入商品名称'></Input>
                        </Item>

                        <Item label="商品描述" name='desc' initialValue={desc}
                        rules={[
                            {required:true,message:'必须输入商品描述'}
                        ]}>
                            <TextArea placeholder='请输入商品描述' autoSize={{minRows:2,maxRows:6}}></TextArea>
                        </Item>

                        <Item label="商品价格" name='price' initialValue={price}
                        rules={[
                            {required:true,message:'必须输入商品价格'},
                            {validator:this.vaildPrice}
                        ]}>
                            <Input type='number' placeholder='请输入商品价格' addonAfter="元"></Input>
                        </Item>

                        <Item label="商品分类" name='categoryIds' initialValue={categoryids}>
                            <Cascader placeholder='请指定商品分类' options={this.state.options} loadData={this.loadData}>

                            </Cascader>
                        </Item>

                        <Item label="商品图片" name='pw'>
                            <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
                        </Item>

                        <Item label="商品详情">
                            <div>商品详情</div>
                        </Item>

                        <Item>
                            <Button type='primary' htmlType="submit">提交</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

//父组件调用子组件方法在父组件中通过ref得到子组件标签对象
