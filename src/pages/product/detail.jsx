import React, { Component } from 'react'
import {
    Card,
    List
} from 'antd'
import { LeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import { BASE_IMG_URL } from '../../utils/constants';
import { reqCategory } from '../../api';
import './product.css'
const Item = List.Item
/*
Product的详情子组件
*/
export default class Detail extends Component {

    state = {
        cName1: '',
        cName2: ''
    }

    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state
        if(pCategoryId === '0'){
            const res = await reqCategory(categoryId)
            const cName1 = res.data.name
            this.setState({cName1})
        }else{
                //通过多个await方式发多个请求:后面的请求是在前一个请求发送之后才发送
            // const res1 = await reqCategory(pCategoryId)
            // const res2 = await reqCategory(categoryId)
            // const cName1 = res1.data.name
            // const cName2 = res2.data.name

            //一次发送多个请求，只有都成功了才正常处理
            
            const res = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])

            const cName1 = res[0].data.name
            const cName2 = res[1].data.name
            this.setState({cName1,cName2})
        }
    }

    render() {

        //读取携带过来的state数据
        const {name,desc,price,detail,imgs} = this.props.location.state
        const {cName1,cName2} = this.state

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <LeftOutlined style={{marginRight:15,fontSize: 20}}/>
                </LinkButton>
            
            <span>商品详情</span>
            </span>
        )
                   
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item style={{display:'block'}}>
                        <span className='left'>商品名称:</span>
                        <span>{name}</span>
                    </Item>

                    <Item style={{display:'block'}}>
                        <span className='left'>商品描述:</span>
                        <span>{desc}</span>
                    </Item>

                    <Item style={{display:'block'}}>
                        <span className='left'>商品价格:</span>
                        <span>{price}</span>
                    </Item>

                    <Item style={{display:'block'}}>
                        <span className='left'>所属分类:</span>
                        <span>{cName1} {cName2 ? '-->' + cName2 : ''}</span>
                    </Item>

                    <Item style={{display:'block'}}>
                        <span className='left'>商品图片:</span>
                        <span>
                            {imgs.map(img => (
                                <img key={img} src={BASE_IMG_URL + img} alt="img" className='product-img'/>
                            ))}
                        </span>
                    </Item>

                    <Item style={{display:'block'}}>
                        <span className='left'>商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}></span>
                    </Item>
                    
                </List>
            </Card>
        )
    }
}
