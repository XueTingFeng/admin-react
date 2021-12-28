//包含应用中所有接口请求函数的模块
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

//const BASE = 'http://localhost:5000'
const BASE = ''
//登录
export function reqLogin(username,password){
    return ajax(`${BASE}/login`,{username,password},'POST')
}

export const reqAddUser = (user) => ajax('/login',user,'POST')

export const reqWheater = (city) => {
    return new Promise((resolve,reject) => {
        const key = 'b00613924c3e1bc1a6eea45a1f918126'
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?parameters&city=${city}&key=${key}`
        jsonp(url,{},(err,data) => {
            console.log(data)
        if(!err && data.status === "1"){
            const {city, weather} = data.lives[0]
            resolve({city, weather})
        }else{
            message.error('获取天气信息失败!')
        }
    })
    })
    
}