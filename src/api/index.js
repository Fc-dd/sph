// API进行统一管理
import requests from "./request"
import mocks from "./mockAjax"

// 三级联动接口 /api/product/getBaseCategoryList get
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// banner图片接口
export const reqGetBannerList = () => mocks.get('/banner')

// floor数据接口
export const reqGetFloorList = () => mocks.get('/floor')

// search接口
export const reqGetSearchList = (params)=>requests({
  method:'post',
  url:'/list',
  data:params
})

// detail接口
export const reqGetItemList = (skuId)=>requests(`/item/${skuId}`)

// 添加购物车接口
export const reqAddCart = (skuId,skuNum) => requests({
  method:'post',
  url:`/cart/addToCart/${ skuId }/${ skuNum }`
})

// 购物车列表接口
export const reqGetShopCarList = ()=>requests.get('/cart/cartList')

// 7.添加到购物车(对已有物品进行数量改动)
export const reqChangeSkuNum = (skuId,skuNum) =>requests({
  method:'post',
  url:`/cart/addToCart/${ skuId }/${ skuNum }`
})

// 切换商品选中状态
export const reqChangeIsChecked = (skuId,isChecked)=>requests({
  method:'get',
  url:`/cart/checkCart/${skuId}/${isChecked}`
})

// 删除购物车中的商品
export const reqDeleteCartSku = (skuId)=>requests({method:'delete',url:`/cart/deleteCart/${skuId}`})

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests(`/user/passport/sendCode/${phone}`)

// 用户注册
export const reqUserRegister = (data)=>requests({method:'post',url:'/user/passport/register',data:data})

// 用户登录
export const reqUserLogin = (data)=>requests({url:'user/passport/login',method:'post',data:data})
// export const reqUserLogin = (data)=>mocks({url:'/login',method:'post',da})

// 用户信息
export const reqGetUserInfo = ()=>requests('/user/passport/auth/getUserInfo')

// 退出登录
export const reqLogOut = ()=>requests('/user/passport/logout')

// 获取订单交易信息
export const reqGetTrade = ()=>requests('/order/auth/trade')

// 提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({method:'post',url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data})

// 获取订单支付信息
export const reqPayment = (orderID)=>requests(`/payment/weixin/createNative/${orderID}`)

// 获取订单支付状态
export const reqQueryPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 订单中心
export const reqMyOrderList = (page, limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})