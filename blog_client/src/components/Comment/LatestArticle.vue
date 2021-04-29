<template>
    <div class="latest_article">
          <div class="title">最热文章</div>
          <div class="article_list">
            <div class="article-item" v-for="item in articleList" :key="item._id"
            @click="toDetail(item._id)">
                 **{{item.title}}
            </div>
          </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           // 文章列表
           articleList:[]
        }
    },
    methods:{
        async getArticleData(){
            let result=await this.request('get',`article/all?page=1&pageSize=5`,null);
            console.log(result.data);
            if(result.data.status==200)
            {    
                        
                 this.articleList=result.data.list;
                 console.log(this.articleList);
            }
            else
            console.log('获取失败');
        },
        toDetail(id)
        {
                this.$router.replace(`/home/article/${id}`);
                this.$emit('toNewArticle',{id});
        }
    },
    created() {
        this.getArticleData();
    },
}
</script>

<style scoped>
    .latest_article{
        margin-top:30px;
        width: 320px;
        height: 300px;
        border-radius: 20px;
        box-shadow: 7px 7px 25px rgb(228, 228, 228);
    }
    .latest_article:hover{
        box-shadow: 7px 7px 25px gray;
        transform: translate(-4px,-4px);
        transition: 0.6s;
    }
    .title{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size:20px;
        color:var(--all_theme);
        text-align: center;
        border-bottom: 1px solid var(--all_theme);
    }
    .article-item{
        font-size:15px;
        color:gray;
        height: 50px;
        line-height: 50px;
        text-indent: 1.5em;
        white-space: nowrap;
        text-overflow:ellipsis;    
        overflow: hidden;
    }
    .article-item:hover{
        color:var(--all_theme);
        transition: 0.6s;
        cursor: pointer;

    }
</style>