<template>
    <div>
       <h1>取经文章详情(分享页面)</h1>
    </div>    
</template>

<script>   
    export default {
      name : "learnDetailShare" ,
      data () {
          return {}
      } ,
      created() {
          //接受url的queryString参数示范
          console.log("文章id为：" + this.$route.query.id) ;
      }
    }
</script>

<style lang="less">
    
</style>
