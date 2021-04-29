<template>
    <div class="comment_item">
        <!-- 顶部信息 -->
        <div class="top">
            <div class="comment_user_infor">
                <img :src="comment_item.user_id.avatar" alt="" class="avatar">
                <span class="username">{{comment_item.user_id.username}}</span>
            </div>
            <div class="comment_time">
                {{comment_item.create_time|dateFormat}}
            </div>
        </div>
        <!-- 评论主题内容 -->
        <div class="comment_main">
            <p>
                {{comment_item.content}}
            </p>        
        </div> 
        <!-- 评论相关信息 -->
        <div class="comment_infor">
            <div class="el-icon-thumb can_change" :style="ifLike">{{comment_item.like}}</div>
            <span class='reply can_change' @click="display=true">回复</span>
        </div>
         <transition name="el-zoom-in-top">
            <div class="reply_box" v-show="display">
                       <el-input
                       class='input_area'
                        type="textarea"
                        placeholder="请输入回复内容"
                        v-model="textarea"
                        maxlength="500"
                        show-word-limit
                        >
                        </el-input>
                        <div class="button_list">
                            <el-button type="danger" class="cancel_button" @click="display=false">取消</el-button>
                            <el-button type="primary" @click="replyComment()" >回复</el-button>  
                        </div>                                 
                    </div>
        </transition> 
        <!-- 评论相关回复   -->
         <div class="reply_list">
             <reply-item v-for="item in comment_item.replies" :key="item._id" :reply_item="item"
             @updateComment="updateComment()"></reply-item>
         </div>
    </div>
</template>


<script>
import ReplyItem from '../Comment/ReplyItem.vue'
export default {
    name:'CommentItem',
    components:{
       ReplyItem
    },
    props:{
        comment_item:{
            type:Object
        }
    },
    data(){
        return{
            display:false,
            textarea:''
        }
    },
    methods:{
        //回复评论
        async replyComment()
        {
            // console.log(this.textarea);
            //整合数据
            let data={
                comment_id:this.comment_item._id,
                from_id:'60865a0c56665c3a9c2c96d3',
                to_id:this.comment_item.user_id._id,
                content:this.textarea,
                create_time:Date.now()
            }
            //发送请求，增加评论
            let res=await this.request('post','reply/toComment',data);

            if(res.data.status==200)
            {
                //回复添加成功
                //通知父组件更新所有评论数据
                this.updateComment();
                //提醒用户
                this.$message({
                message: '回复成功！',
                type: 'success'
                });
            }
            else
            { 
                this.$message({
                message: '回复失败！',
                type: 'warning'
                });
            }
            //把回复框关闭
            this.display=false;
            //清空给输入框的内容
            this.textarea='';
        },
        updateComment(){
             //通知父组件更新所有评论数据
             this.$emit('updateComment');
        }
    },
    computed:{
        //检验该用户是否有点赞
        ifLike()
        {
            return this.comment_item.ifLike?{'color':'var(--all_theme)'}:{};
        }
    }
    
}
</script>

<style scoped>

    .comment_item
    {
        width: 100%;
        padding:10px 20px;
        border-radius: 10px;
        box-shadow: 10px 10px 30px #eee; 
        margin-top:20px;
    }

    .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid gray;
    }

    .top{
        display: flex;
        width: 100%;
        height: 40px;
        border-bottom:1px dotted #eee;
    }
    .comment_time{
        flex:3;
        text-align: right;
        line-height: 55px;
        font-size:10px;
        color:gray;
    }
    .comment_user_infor .username{
        
        font-size: 15px;
        color:gray;
        margin-left: 10px;
    }
    
    .comment_main
    {
        width: 100%;
        padding: 20px 10px;
        font-size: 16px;
        color:grey;
        line-height: 30px;
    }
    
    .can_change:hover{
        cursor: pointer;
        color:var(--all_theme);
    }
    .comment_infor{
        border-top:1px dotted #eee;
        padding: 10px 0;
        color:grey;
    }
    .comment_infor .reply
    {
        margin-left: 20px;
    }

    .button_list{
        width: 100%;
        height: 70px;
        position: relative;
    }
    .button_list .el-button{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
    }
    .button_list .cancel_button
    {
       left: 480px;
    }
    /* .reply_item{
        width: 100%;
        background-color: rgb(248, 248, 248);
        border-radius: 10px;
        padding:10px 10px;
        margin-top: 10px;
    }
    .reply_top{
         display: flex;
        width: 100%;
        height: 40px;
        border-bottom:1px dotted gray;
    }

    .reply_time{
        flex:3;
        text-align: right;
        line-height: 55px;
        font-size:10px;
        color:gray;
    }
    .reply_username
    {       
        font-size: 15px;
        color:gray;
        margin-left: 10px;
    }
    .reply_user_infor .reply_text
    {
        font-size:17px;
        color:var(--all_theme);
    }

    .reply_main{
        width: 100%;
        padding: 20px 10px;
        font-size: 16px;
        color:grey;
        line-height: 30px;      
    }

    .reply_infor{
        border-top:1px dotted gray;
        padding: 10px 0;
        color:gray;
    }
    .reply_infor .reply
    {
         margin-left: 20px;
    } */
</style>