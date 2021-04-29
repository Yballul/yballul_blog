<template>
    <div class="article_detail_item">
        <!-- 文章的分类，标签，点赞量等信息 -->
        <div class="information">
            <!-- 左侧是分类和标签信息 -->
            <div class="left_infor">
                <div class="cate" v-if="article.cate">{{article.cate.name}}></div>
                <div class="tag_list">
                   <el-tag effect="plain" class="tag_item" v-for="item in article.tag"
                   :key="item._id"
                   >{{item.name}}</el-tag>
                </div>          
            </div>
            <!-- 右侧是其他信息 -->
            <div class="right_infor">
                <div class="right_infor_item el-icon-chat-dot-square">{{article.comment}}</div>
                <div class="right_infor_item el-icon-view">{{article.view}}</div>
                <div class="right_infor_item el-icon-thumb can_change">{{article.like}}</div>
                <div class="right_infor_item el-icon-star-off can_change">{{article.collection_num}}</div>
            </div>
        </div>
        <!-- 文章标题 -->
        <div class="title">
             {{article.title}}
        </div>
        <!-- 发布时间 -->
        <div class="time">
           发布于{{article.create_time|dateFormat}}
        </div>
        <div class="main" v-html="article.content">
            {{article.content}}
        </div>
    </div>
</template>

<script>
export default {
     props:{
         //文章具体信息
         article:{
             type:Object
         }
     },
     created() {
         
     },
     data(){
         return{
             msg:'<h2>尼玛</h2>',
         }
     },
     methods: {
          
     }
    
}
</script>

<style scoped>
    .article_detail_item
    {
        width: 700px;
        padding:0px 20px;
        border-radius: 10px;
        box-shadow: 10px 10px 30px #eee; 
    }
    .information{
        display: flex;
        width: 100%;
        height: 50px;
        border-bottom:1px solid #eee;
        padding: 10px 10px;

    }
    .left_infor{
        flex:5;
        display: flex;
        height: 50px;
        color:gray;
    }
    .left_infor .cate
    {
        font-size: 23px;
    }
    .right_infor{
        flex:3;
        height: 50px;
        display: flex;
        padding-top: 10px;
    }
    .tag_item{
        margin-left: 10px;
    }
    .right_infor_item{
        color:gray;
        font-size:16px;
        margin-left: 10px;
        width: 25%;
    }

    .can_change:hover
    {
        color:var(--all_theme);
        cursor: pointer;
    }
    .title{
        height: 60px;
        line-height: 60px;
        padding: 0 7px;
        font-size: 27px;
        color:var(--all_theme);

    }
    .time{
        color: gray;
        font-size: 10px;
        text-indent: 10px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px dotted #eee;
    }
    .main{
        line-height: 30px;
        width: 100%;
        color:gray;
        padding:20px 10px;
    }
    .main img
    {
        width: 600px;
    }

</style>