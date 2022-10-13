import {reqGetTrade} from '@/api'
export default{
    namespaced:true,
    actions:{
        async getTradeInfo({commit}){
           let result = await reqGetTrade()
           if(result.code == 200){
            commit('GETTRADEINFO',result.data)
           }
        },
    },
    mutations:{
        GETTRADEINFO(state,data){
            state.tradeInfo = data
        },
        CHANGEADDRESS(state,id){
            state.tradeInfo.userAddressList.forEach(item=>item.isDefault = 0)
            state.tradeInfo.userAddressList.some(item=>{
                if(item.id == id){
                    item.isDefault = 2
                }
            })
        },
        SETORDERID(state,data){
            state.orderId = data
        }
    },
    getters:{
        detailArrayList(state){
            return state.tradeInfo.detailArrayList || []
        },
        userAddressList(state){
            return state.tradeInfo.userAddressList || []
        },
        totalAmount(state){
            return state.tradeInfo.totalAmount || ''
        },
    },
    state:{
        tradeInfo:[],
        orderId:''
    }
}