<template>
    <div>
       <h1>取经文章详情(内嵌页面)</h1>
    </div>    
</template>

<script>   
    export default {
      name : "learnDetailHybrid" ,
      data () {
          return {}
      } ,
      created() {
          //接受路由参数示范
          console.log("文章id为：" + this.$route.params.id) ;
      }
    }
</script>

<style lang="less" scoped>
    
</style>
