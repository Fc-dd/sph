// 配置路由
import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from '@/store'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// NavigationDuplicated 解决办法
let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}


Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      // 路由重定向
      path:'/',
      redirect:'/home'
    },
    {
      path:'/paysuccess',
      component:PaySuccess,
      meta:{
        isAuth:true,
        title:'支付成功'
      },
    },
    {
      path:'/center',
      component:Center,
      children:[
        {
          path:'/',
          component:MyOrder,
          meta:{
            isAuth:true,
            title:'订单'
          }
        },
        {
          path:'myorder',
          component:MyOrder,
          meta:{
            isAuth:true,
            title:'我的订单'
          }
        },
        {
          path:'groupOrder',
          component:GroupOrder,
          meta:{
            isAuth:true,
            title:'团购订单'
          }
        }
      ]
    },
    {
      path:'/pay',
      component:Pay,
      meta:{
        isAuth:true,
        title:'支付'
      },
      // 路由独享守卫
      beforeEnter:(to,from,next)=>{
        if(from.path == '/trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path:'/trade',
      component:Trade,
      meta:{
        isAuth:true,
        title:'提交订单'
      },
      // 路由独享守卫
      beforeEnter:(to,from,next)=>{
        if(from.path == '/shopcart' || from.path == 'trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path:'/shopcart',
      component:ShopCart,
      meta:{
        title:'购物车'
      }
    }
    ,
    {
      path:'/addcartsuccess/:skuNum?',
      component:AddCartSuccess,
      title:'添加商品'
    }
    ,
    {
      path:'/home',
      component:Home,
      meta:{
        isFooterShow:true,
        isHeader:true,
        title:'尚品汇'
      }
    },
    {
      path:'/login',
      component:Login,
      meta:{
        isLogin:true,
        title:'登录'
      }
    },
    {
      path:'/register',
      component:Register,
      meta:{
        isLogin:true,
        title:'注册'
      }
    },
    {
      path:'/search/:keyword?',
      component:Search,
      name:'search',
      props($route){ return{keyword:$route.query.keyword}},
      meta:{
        isFooterShow:true,
        isHeader:true,
        title:'搜索'
      }
    },
    {
      path:'/detail/:skuId?',
      component:Detail,
      name:'detail',
      meta:{
        isFooterShow:true,
        title:'商品详情'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})
 router.beforeEach(async (to,from,next)=>{
  // console.log()
  let token = store.state.user.userToken
  if(token){
    // 用户有token
    if(to.path == '/login'){
      next('/home')
    }else{
      // 有token去的不是登录页面
      // 判断用户的用户信息还在不在 不在的话派发userInfo请求 请求成功放行 失败说明token失效跳到login
      // if(from.path == 'trade' && store.state.user.userName){
      if(store.state.user.userName){
        next()
      }else{
        try {
        await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          console.log(error.message)
          store.commit('user/CLEARTOKEN')
          next('/login')
        }
      }
    }
  }else{
    // 用户没有登录
    if(to.meta.isAuth){
     next('/login?redirect='+to.path)
    }else{
      next()
    }
  } 

})
router.afterEach((to,from)=>{
  document.title = to.meta.title || '尚品汇'
})

export default router