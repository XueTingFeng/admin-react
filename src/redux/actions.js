//包含n个action creator函数的模块
//同步action: 对象 {type:'xxx',data:数据值}
//异步action: 函数 dispatch => {}
import { SET_HEADER_TITLE, RECEIVE_USER, SHOW_ERROR_MSG} from './action-types'

import { reqLogin } from '../api'
import storageUtils from '../utils/storageUtil'
//设置头部标题的同步action
export const setHeaderTitle = (headTitle) => ({type:SET_HEADER_TITLE,data:headTitle})

//接收用户信息的同步action
export const receiveUser = (user) => ({type:RECEIVE_USER,user})
//显示错误信息的同步action
export const showErrorMsg = (msg) => ({type:SHOW_ERROR_MSG,msg})
//登录的异步action
export const login = (username,password) => {
    return async dispatch => {
        //执行异步ajax请求
        const res = await reqLogin(username,password)
        //成功分发成功的同步action
        if(res.status === 0){
            const user = res.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            //失败分发失败的同步action
            const msg = res.msg
            dispatch(showErrorMsg(msg))
        }

    }
}