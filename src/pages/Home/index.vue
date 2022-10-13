<template>
  <div>
    <Type-nav/>
    <List-container/>
    <Today-recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="list in floorList" :key="list.id" :list = "list"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from "vuex"
export default {
  name:'Home',
  components:{ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
  created(){
     this.$store.dispatch('user/getUserInfo')
  },
  mounted(){
    this.$store.dispatch('home/getFloorList')
    this.$store.dispatch('home/productList')
  },
  computed:{
    ...mapState('home',['floorList'])
  }
}
</script>

<style>

</style>