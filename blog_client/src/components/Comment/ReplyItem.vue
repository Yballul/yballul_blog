<template>
           <div class="reply_item">
               <!-- 回复顶部 -->
               <div class="reply_top">
                    <!-- 回复的两个用户的信息 -->
                    <div class="reply_user_infor">
                        <img :src="reply_item.from_id.avatar" alt="" class="avatar">
                        <span class="from_username reply_username">{{reply_item.from_id.username}}</span>
                        <span class="reply_text">&nbsp;&nbsp;回复>>&nbsp;</span>
                        <img :src="reply_item.to_id.avatar" alt="" class="avatar">
                        <span class="to_username reply_username">{{reply_item.to_id.username}}</span>
                    </div>
                    <!-- 回复时间 -->
                    <div class="reply_time">
                        {{reply_item.create_time|dateFormat}}
                    </div>
               </div>
               <!-- 回复主题内容 -->
               <div class="reply_main">
                   <p>
                       {{reply_item.content}}
                   </p>
               </div>
               <!-- 回复相关信息 -->
               <div class="reply_infor">
                   <div class="el-icon-thumb can_change" :style="ifLike">{{reply_item.like}}</div>
                   <span class='reply can_change' @click="display=true">回复</span>
               </div>
               <transition name="el-zoom-in-top">
                   <div class="reply_box" v-show="display">
                       <el-input
                        type="textarea"
                        placeholder="请输入回复内容"
                        v-model="textarea"
                        maxlength="500"
                        show-word-limit
                        >
                        </el-input>
                        <div class="button_list">
                            <el-button type="danger" class="cancel_button" @click="display=false">取消</el-button>
                            <el-button type="primary" @click="replyReply()">回复</el-button>  
                        </div>                                 
                    </div>
               </transition>
               
             </div>    
</template>

<script>
export default {
    props:{
        reply_item:{
            type:Object
        }
    },
    data() {
        return {
            textarea:'',
            display:false
        }
    },
    computed:{
        ifLike()
        {
            return this.reply_item.ifLike?{'color':'var(--all_theme)'}:{};
        }
    },
    methods:{
        //回复回复
        async replyReply()
        {
            // console.log(this.textarea);
            //整合数据
            //被回复的人应该是该回复中的from用户
            let data={
                comment_id:this.reply_item.comment_id,
                from_id:'60865a0c56665c3a9c2c96d3',
                to_id:this.reply_item.from_id._id,
                content:this.textarea,
                create_time:Date.now()
            }
            //发送请求，增回复
            let res=await this.request('post','reply/toReply',data);

            if(res.data.status==200)
            {
                //回复添加成功
                //通知父组件更新所有评论数据
                this.$emit('updateComment');
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
        }
    }
}
</script>

<style scoped>
     .reply_item{
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
    }
    
    .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid gray;
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
       left: 460px;
    }
    .can_change:hover
    {
        color: var(--all_theme);
        cursor: pointer;
    }
</style>