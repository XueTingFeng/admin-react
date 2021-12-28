//发送异步ajax请求的函数模块

import { message } from 'antd'
import axios from 'axios'

export default function ajax(url,data={},method='GET'){

    return new Promise((resolve,reject) => {
        let promise
        //执行异步ajax请求
        if(method === 'GET'){ //发送get请求
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }

        //如果成功，调用resolve
        promise.then(res => {
            resolve(res.data)
            //如果失败，不调用reject,而是提示异常信息
        }).catch(e => {
            message.error("请求出错:" + e.message)
        })   
    })

}