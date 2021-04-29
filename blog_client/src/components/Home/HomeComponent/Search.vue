<template>
    <div class="search_page">
        <div class="title">
            搜索结果
        </div>
        <div class="article_list">
        <article-item v-for="item in searchList" :key="item[`_id`]"
        :article="item"
        @click.native="toDetail(item._id)"></article-item>
        </div>
        
    </div>
</template>

<script>
import ArticleItem from '../../Comment/ArticleItem'
export default {
     components:{
         ArticleItem
     },
     data(){
         return{
             //搜索结果列表
             searchList:[]
         }
     },
     created() {
         this.getResult();
     },
     methods: {
         //获取搜索结果
         async getResult()
         {
             console.log(this.$route.params.detail);
             let res=await this.request('post',`article/searchDetail`,
             {
                 detail:this.$route.params.detail
             });
            this.searchList=res.data.articles;
         },
        toDetail(index)
        {
            console.log(index);
            this.$router.push('/home/article/'+index);
        }
         
     },
     watch:{
         $route(from,to)
         {
              this.getResult();
         }
     }
}
</script>

<style scoped>
     .title{
        width: 100%;
        font-weight: 700;
        font-size:30px;
        color:gray;
        text-indent: 1em;
        border-bottom:1px solid var(--all_theme);
        height: 60px;
        line-height: 60px;
    }
</style>