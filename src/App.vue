<template>
  <div>
    <Header v-show="!isLogin"/>
    <router-view></router-view>
    <Footer v-show="isFooterShow"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{Header,Footer},
  computed:{
    isFooterShow(){
      return this.$route.meta.isFooterShow
    },
    isLogin(){
      return this.$route.meta.isLogin
    }
  },
}
</script>

<style>
  body{
  padding-right: 0px !important;
  overflow: hidden;
}
</style>