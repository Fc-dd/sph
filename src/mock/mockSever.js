import Mock from 'mockjs'
import banner from './banner'
import floor from './floor'
import login from './login'

// mock数据 第一个参数 请求路径 第二个参数 数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/login",{code:200,data:login})
