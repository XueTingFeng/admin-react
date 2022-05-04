import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import LinkButton from '../link-button/index'
import {reqWheater,reqIp} from '../../api/index'
import menuList from '../../config/menuList'
import {formatDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtil from '../../utils/storageUtil'
import './index.css'
class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()),
        city: '',
        weather: ''
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formatDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

     getWeather = async() =>{
        const res = await reqIp()
        const {city, weather} = await reqWheater(res)
        this.setState({
            city,
            weather
        })
    }

    getTitle = () => {
        const path = this.props.location.pathname

        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            content: '确定退出吗？',
            onOk:() => {
                console.log('ok')

                storageUtil.removeUser()
                memoryUtils.user = {}

                this.props.history.replace('/login')
            },
            onCancel(){

            }
        })
    }

    componentDidMount(){
        this.getWeather()
        this.getTime()
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render() {
        const {currentTime,city,weather} = this.state
        const username = memoryUtils.user.data.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        
                        <span>{city}</span>

                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
