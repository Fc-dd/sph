import axios from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from "@/store"
// console.log(nprogress)
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(config => {
    // 在发请求之前做什么
    let userToken = store.state.user.userToken
    if(userToken){
    config.headers.token = userToken
    }else if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    nprogress.start()
    return config
}, error => {
    // 对请求错误做什么
    return Promise.reject(error)
})

// 添加响应拦截器
requests.interceptors.response.use(response => {
    // 2xx 范围内的状态码触发该函数
    // 可以对响应数据做点什么
    nprogress.done()
    return response.data
}, error => {
    // 超出2XX的状态码触发该函数
    // 对响应错误做点什么
    return Promise.reject(error)
})
export default requests