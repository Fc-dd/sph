import {reqGetCode,reqUserRegister,reqUserLogin,reqLogOut,reqGetUserInfo} from "@/api"
import { setToken,getToken,setUserName, getUserName } from "@/utils/user_token"
export default {
    namespaced:true,
    actions:{
        async getCode({commit},phone){
            let result = await reqGetCode(phone)
            if(result.code == 200){
                commit('GETCODE',result.data)
            }
        },
        async userRegister(context,data){
            // data = JSON.stringify(data)
            let result = await reqUserRegister(data)
            if(result.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error(`${result.code,result.message}`))
            }
        },
        async userLogin({commit,dispatch},data){
            let result = await reqUserLogin(data)
            if(result.code == 200){
                commit('GETUSERTOKEN',result.data.token)
                if(!getToken()){
                    setToken(result.data.token)
                }
                return 'ok'
            }else{
                return Promise.reject(new Error(`${result.code,result.message}`))
            }
        },
        async logout(context){
            let result = await reqLogOut()
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject(new Error('reject'))
            }
        },
        async getUserInfo({commit}){
            let result = await reqGetUserInfo()
            if(result.code == 200){
                commit('GETUSERINFO',result.data.name)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        GETUSERTOKEN(state,userToken){
            state.userToken = userToken
        },
        GETUSERINFO(state,userName){
            state.userName = userName
        },
        CLEARTOKEN(state){
            localStorage.removeItem('USERTOKEN')
            localStorage.removeItem('USERNAME')
            state.userToken = ''
            state.userName = ''
        }
    },
    state:{
        code:'',
        userName:'',
        userToken:getToken()
    },
    getters:{}
}