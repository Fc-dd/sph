<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="getPageNo(pageNo-1)">上一页</button>
    <button @click="getPageNo(1)" v-if="startAndend.start>=2" :class="{active:pageNo==1}">1</button>
    <button v-show="startAndend.start>=3">···</button>

    <button v-for="(page,index) in startAndend.end" :key="index" v-show="page>= startAndend.start" @click="getPageNo(page)" :class="{active:pageNo==page}">{{page}}</button>
    
    <button v-show="startAndend.end < totalPage-1 || startAndend.end == totalPage-1">···</button>
    <button v-if="startAndend.end<totalPage && startAndend.end !== totalPage-1" @click="getPageNo(totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="totalPage == pageNo" @click="getPageNo(pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    // pageNo：当前页  pageSize：每一页展示多少条  total：总数 continues：分页连续页码个数
    computed:{
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      startAndend(){
        const {pageNo,continues,totalPage} = this
        let start = 0
        let end = 0
        // 不正常的情况 当总页数没有连续页码多
        if(totalPage<continues){
          start = 1
          end = totalPage
        }else{
          start = pageNo - parseInt(continues/2)
          end = pageNo + parseInt(continues/2)
          if(start<1){
            start = 1
            end = continues
          }
          if(end>totalPage){
            start = totalPage - continues +1
            end = totalPage
          }
        }
        return {start,end}
      }
    },
    methods:{
      getPageNo(pageNo){
        this.$emit('getPageNo',pageNo)
      },
      // currentPage(pageNo){
        
      // }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>