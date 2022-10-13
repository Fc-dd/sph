import {
  reqGetShopCarList,
  reqChangeSkuNum,
  reqChangeIsChecked,
  reqDeleteCartSku,
} from '@/api'
export default {
  namespaced: true,
  actions: {
    async getCartList({ commit }) {
      const result = await reqGetShopCarList()
      if (result.code == 200) {
        commit('GETCARTLIST', result.data)
      }
    },
    async changeSkuNum(context, data) {
      const result = await reqChangeSkuNum(data.skuId, data.skuNum)
    },
    async changeIsChecked({ commit }, data) {
      const result = await reqChangeIsChecked(data.skuId, data.isChecked)
    },
    changeAllChecked({state}, isChecked) {
      let promiseAll = []
      state.cartList[0].cartInfoList.forEach((item) => {
        const result =  reqChangeIsChecked(item.skuId, isChecked)
        promiseAll.push(result)
      })
      return Promise.all(promiseAll)
    },
    async deleteCartSku(context, skuId) {
      const result = await reqDeleteCartSku(skuId).then(
        (value) => {
          context.dispatch('getCartList')
        },
        (error) => {
          console.log(error)
        },
      )
    },
    async deleteSelectedSku(context) {
      context.state.cartList[0].cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          context.dispatch('deleteCartSku', item.skuId)
        }
      })
    },
  },
  mutations: {
    GETCARTLIST(state, data) {
      state.cartList = data
    },
  },
  state: {
    cartList: [],
  },
  getters: {
    cartListSon(state) {
      return state.cartList[0] || {}
    },
  },
}
