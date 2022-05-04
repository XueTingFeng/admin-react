//根据老的state和action返回新的state的函数

import { combineReducers } from 'redux'

import storageUtils from '../utils/storageUtil'
//管理头部标题的reducer
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action){
    switch(action.type){
        default:
            return state
    }
}

const initUser = storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})