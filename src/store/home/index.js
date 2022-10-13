import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"

export default {
    namespaced:true,
    actions: {
        async productList({commit}){
           const result = await reqCategoryList()
           if(result.code == 200){
            commit('GETPRODUCTLIST',result.data)
           }
        },
        async getBannerList({commit}){
            const result = await reqGetBannerList()
            if(result.code == 200){
                // console.log(result)
                commit('GETBANNERLIST',result.data)
            }
        },
        async getFloorList({commit}){
            const result =  await reqGetFloorList()
            if(result.code == 200){
                commit('GETFLOORLIST',result.data)
            }
        }
    },
    mutations: {
        GETPRODUCTLIST(state,data){
            state.productList = data
        },
        GETBANNERLIST(state,data){
            state.bannerList = data
        },
        GETFLOORLIST(state,data){
            state.floorList = data
        }
    },
    state: {
        productList:[],
        bannerList:[],
        floorList:[]
    },
    getters: {}
}