import {reqGetSearchList, reqGetItemList} from '@/api'
export default {
  namespaced:true,
  actions:{
    async getSearchList({commit},params){
      const result = await reqGetSearchList(params)
      if(result.code == 200){
        commit('REQGETSEARCHLIST',result.data)
      }
    }
  },
  mutations:{
    REQGETSEARCHLIST(state,data){
      state.searchList = data
    }
  },
  state:{
    searchList:{}
  },
  getters:{
    attrsList(state){
      return state.searchList.attrsList
    },
    goodsList(state){
      return state.searchList.goodsList
    },
    trademarkList(state){
      return state.searchList.trademarkList
    }
  }
}