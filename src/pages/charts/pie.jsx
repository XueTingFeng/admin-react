
import React, { useState } from 'react'
import { Card,Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default function Pie() {

    const [sales , setSales] = useState([ 5, 20])
    const [stores , setStores] = useState([6, 20])
    const getOption = (sales,stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            series: [{
                name: '销量',
                type: 'pie',
                data: sales
            },{
                name: '库存',
                type: 'pie',
                data: stores
            }]
        }
    }

    const update = () => {
        setSales(sales.map(sale => sale + 1))
        setStores(stores.map(store => store - 1))
    }
   
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={update}>更新</Button>
                </Card>

                <Card title='柱状图一'>
                    <ReactEcharts option={getOption(sales,stores)} style={{width:'800px'}}/>
                </Card>
            </div>
        )
}

