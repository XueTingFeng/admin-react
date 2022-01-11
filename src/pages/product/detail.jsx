import React, { Component } from 'react'
import {
    Card,
    List
} from 'antd'
import { LeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import { BASE_IMG_URL } from '../../utils/constants';
import './product.css'
const Item = List.Item
/*
Product的详情子组件
*/
export default class Detail extends Component {
    render() {

        //读取携带过来的state数据
        const {name,desc,price,detail,imgs} = this.props.location.state

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
                        <span>联想 12244</span>
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
