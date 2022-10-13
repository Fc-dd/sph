<template>
  <!-- 商品分类导航 -->
  <div class="type-nav" >
            <div class="container" v-if="this.$route.meta.isHeader">
                <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="!isSearch">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(p,index) in productList" :key="p.categoryId">
                            <h3 :class="{current: isCurrent == index}" @mouseenter="enterIndex(index)">
                                <a :data-category-name = "p.categoryName" :data-category1-id = "p.categoryId">{{ p.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display: isCurrent == index ? 'block' : 'none'}">
                                <div class="subitem">
                                    <dl class="fore" v-for="p2 in p.categoryChild" :key="p2.categoryId">
                                        <dt>
                                            <a :data-category-name = "p2.categoryName" :data-category2-id = "p2.categoryId">{{ p2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="p3 in p2.categoryChild" :key="p3.categoryID">
                                                <a :data-category-name = "p3.categoryName" :data-category3-id = "p3.categoryId">{{ p3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </transition>
                
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {throttle} from 'lodash'
export default {
  name:'TypeNav',
  data() {
    return {
        isCurrent:-1,
        isSearch:false
    }
  },
  methods: {
    // enterIndex(index) {
    //     this.isCurrent = index
    // },
    // 节流
    enterIndex:throttle(function(index){
        this.isCurrent = index
    },50),

    leaveIndex() {
        this.isCurrent = -1
        if(this.$route.path !== '/home'){
            this.isSearch = true
        }
    },
    enterShow(){
        if(this.$route.path !== '/home'){
            this.isSearch = false
        }
    },
    goSearch(event) {
        let {categoryName,category1Id,category2Id,category3Id} = event.target.dataset
        // console.log(categoryName,categoryId,category2Id,category3Id)
        // 判断是否是a标签
        if(categoryName){
            let location = {name:'search'}
            let query = {categoryName:categoryName}
            // 判断点击的是几级标题
            if(category1Id){
                query.category1Id = category1Id
            }else if(category2Id){
                query.category2Id = category2Id
            }else{
                query.category3Id = category3Id
            }
            location.query = query
            if(this.$route.params.keyword){
                location.params = this.$route.params
                this.$router.push(location)
                // console.log('you')
            }else{
                this.$router.push(location)
            }
        }
    },
  },
  computed:{
    // ...mapState('home',['productList'])
    ...mapState({
        productList:state=>state.home.productList
    }),
  },
  created() {
    // console.log(this.$route.path,this.isSearch)
    if(this.$route.path!== '/home'){
        this.isSearch = true
    }
  },
}
</script>

<style lang="less" scope>

    .current{
        background-color: skyblue;
    }
  .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 27.5px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                display: block;
                                width: 100%;
                                height: 100%;
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                }
            }
            .sort-enter{
                height: 0px;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .5s linear;
                overflow: hidden;
            }
        }
    }
</style>