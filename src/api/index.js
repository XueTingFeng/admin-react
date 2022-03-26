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

//注册
export const reqAddUser = (user) => ajax('/login',user,'POST')

//高德天气接口,通过jsonp()进行跨域
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

//获取一级/二级分类
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')
//获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})
//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})
//更新商品的状态
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST')
//搜索商品分页列表 searchType搜索的类型 productName,productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(BASE + '/manage/product/search',
{pageNum,pageSize,[searchType]:searchName})
//删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')
//添加商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + "/manage/product/" + (product.id?'update' : 'add'),product,'POST')
//修改商品
//export const reqUpdateProduct = (product) => ajax(BASE + "manage/product/update",product,'POST')

//获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')