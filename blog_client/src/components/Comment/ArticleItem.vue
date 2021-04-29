<template>
    <div class="article_item">
        <!-- 文章封面 -->
        <div class="left_part">
             <img :src="article.cover" alt="">
        </div>
        <!-- 内容部分 -->
        <div class="right_part">
            <div class="title">{{article.title}}</div>
            <div class="content">{{article.content}}</div>
            <div class="information">
                <div class="create_time">发表时间:{{article.create_time|dateFormat}}</div>
                <div class="infor_list">
                    <div class="infor_item el-icon-chat-dot-square">{{article.comment}}</div>
                    <div class="infor_item el-icon-view">{{article.view}}</div>
                    <div class="infor_item el-icon-thumb">{{article.like}}</div>
                    <div class="infor_item el-icon-star-off ">{{article.collection_num}}</div>
                </div>
            </div>
            <div class="tag_list">
             <el-tag effect="plain" v-for="item in article.tag" :key="item[`_id`]">{{item.name}}</el-tag>                     
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'ArticleItem',
    props:{
        article:{
            type:Object
        }
    },
    data(){
        return{
            date:Date.now()
        }
    }
}
</script>

<style scoped>
    .article_item{
        display: flex;
        width: 640px;
        height: 200px;
        padding:20px 0px;
        border-radius: 10px;
        box-shadow: 10px 10px 30px #eee;
        margin-top:20px;
    }
    .article_item:hover{
        box-shadow: 10px 10px 30px gray;
        transition: 0.6s;
        transform: translate(-5px,-5px);
        cursor: pointer;
    }
    .left_part{
        flex:3;
        padding:0 10px;
    }
    .right_part{
        flex:7;
        font-size: 8px;
        color:gray;
        padding:0 10px;
    }

    .right_part .title{
        font-size: 20px;
        font-weight: 700;
        color:black;

    }

    .right_part .title:hover{
        color:var(--all_theme);
        transition: 0.5s;
    }
     .right_part .content{
        padding-top:20px;
        padding-bottom: 40px;
        width: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;      
    }

    .right_part .information{
        display: flex;
        width: 100%;
    }
    .right_part .information .create_time{
        flex:3;
    }
    .right_part .information .infor_list{
        flex:2;
        display: flex;
    }
    .right_part .information .infor_list .infor_item
    {
        flex:1;
        
    }
    
    .left_part img{
        width: 100%;
        height: 160px;
        background-color: black;
        border-radius: 4px;
    }
    .right_part .tag_list{
        padding:10px 0;
        display: flex;
        width: 100%;
    }
    .el-tag{
       margin-right: 13px;
    }

</style>