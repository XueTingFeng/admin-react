import React, { Component } from 'react'
import{
    Card,
    Table,
    Button,
    
} from 'antd'

import {SendOutlined} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
export default class Category extends Component {
    render() {
        const dataSource = [
            {
                "_id":  "5e12b8bce31bb727e4b0e348",
                "parentId": "0",
                "name": "家用电器",
                "__v": 0
              },{
                "_id": "5e130e60e31bb727e4b0e34b",
                "parentId": "0",
                "name": "手机",
                "__v": 0
              },{
                "_id": "5e130ec7e31bb727e4b0e34c",
                "parentId": "0",
                "name": "洗衣机",
                "__v": 0
              },
          ];
          
          const columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width: 300,
              render: () => (
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      <LinkButton>查看子分类</LinkButton>
                  </span>
              )
            },
          ];
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
                    dataSource={dataSource} 
                    columns={columns}
                    rowKey='_id'
                    bordered
                    >
                    
                    </Table>
                </Card>
            </div>
        )
    }
}
