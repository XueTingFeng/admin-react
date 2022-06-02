
import React, { useState } from 'react'
import { Card,Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default function Bar() {

    const [sales , setSales] = useState([ 5, 20, 36, 10, 10, 20 ])
    const [stores , setStores] = useState([6, 20, 36, 10, 10, 20])
    const getOption = (sales,stores) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },{
                name: '库存',
                type: 'bar',
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
