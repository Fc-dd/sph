import {reqGetItemList,reqAddCart} from '@/api'
import getUUID from '@/utils/uuid_token'
export default{
  namespaced:true,
  actions:{
    async getItemList({commit},skuId){
      const result =  await reqGetItemList(skuId)
      if(result.code == 200){
        commit('GETITEMLIST',result.data)
      }
    },
    async addShopCart({commit},data){
      const result = await reqAddCart(data.skuId,data.skuNum)
      if(result.code = 200){
        return new Promise((resolve,reject)=>{
          resolve('成功')
        })
      }else {
        return new Promise((resolve,reject)=>{
          reject('失败')
        })
      }
    }
  },
  mutations:{
    GETITEMLIST(state,data){
      state.itemList = data
    },
    CHANGECHECKED(state,id){
      state.itemList.spuSaleAttrList.forEach(attr => {
        if(attr.id == id.fatherId){
          attr.spuSaleAttrValueList.forEach(val=>{
            val.isChecked = '0'
          })
        } 
      });
      state.itemList.spuSaleAttrList.forEach(attr => {
        if(attr.id == id.fatherId){
          attr.spuSaleAttrValueList.forEach(val=>{
            if(val.id == id.sonId){
              val.isChecked = '1'
            }
          })
        }
      });
    },
    CHANGEISDEFAULT(state,id){
      state.itemList.skuInfo.skuImageList.forEach(item=>{
        item.isDefault = '0'
      })
      state.itemList.skuInfo.skuImageList.some(item=>{
        if(item.id == id)
        item.isDefault = '1'
      })
    }
  },
  state:{
    itemList:{},
    uuid_token: getUUID()
  },
  getters:{
    categoryView(state){
      return state.itemList.categoryView || {}
    },
    skuInfo(state){
      return state.itemList.skuInfo || {}
    },
    spuSaleAttrList(state){
      return state.itemList.spuSaleAttrList || []
    },
    skuImageList(state){
      return state.itemList.skuInfo.skuImageList || []
    }
  }
}