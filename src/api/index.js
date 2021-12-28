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
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data) => {
        if(!err && data.status === 'success'){
            const {dayPictureUrl, weather} = data.result[0].weather_data[0]
            resolve({dayPictureUrl, weather})
        }else{
            message.error('获取天气信息失败!')
        }
    })
    })
    
}