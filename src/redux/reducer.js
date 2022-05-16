//根据老的state和action返回新的state的函数

import { combineReducers } from 'redux'
import { SET_HEADER_TITLE, RECEIVE_USER, SHOW_ERROR_MSG } from './action-types'

import storageUtils from '../utils/storageUtil'

//管理头部标题的reducer
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action){
    switch(action.type){
        case SET_HEADER_TITLE:
            document.title =`管理后台-${action.data}`
            return action.data
        default:
            return state
    }
}

const initUser = storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const msg = action.msg
            return {...state, msg}
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})