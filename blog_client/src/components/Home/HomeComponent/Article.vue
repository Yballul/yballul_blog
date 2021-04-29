<template>
    <div id="article_page">
        <!-- 主体部分 -->
        <!-- <search-input></search-input> -->
        <div class="main">
            <!-- 左侧部分 -->
            <div class="left_part">
                <article-detail-item :article="article"></article-detail-item>
                <div class="comment_head">
                      <div class="comment_head_title">
                          评论列表
                      </div>
                      <div class="sort_list">
                          <span :class="activeIndex==0?'active':''" @click="changeIndex(0)">按时间排序</span>
                          <span :class="activeIndex==1?'active':''" @click="changeIndex(1)">按热度排序</span>
                      </div>
                </div>
                <!-- 评论列表 -->
                <div class="comment_list">
                    <div class="no_comment_box" v-if="!commentList.length">
                        文章还没有评论哦~
                    </div>
                    <comment-item v-for="item in commentList" :key='item._id' :comment_item="item"
                    @updateComment="updateData()">
                    </comment-item>
                </div>
                <!-- 发表评论框 -->
                <div class="comment_box">
                    <div class="title">
                        -----------快来发表评论吧~-----------
                    </div>
                    <div class="comment_content">
                       <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="30"
                        show-word-limit
                        :autosize="{minRows:7,maxRows:7}"
                        >
                        </el-input>
                    </div>
                    <div class="button_box">
                        <el-button type="primary" @click.native="submitComment()">
                            发表评论
                        </el-button>
                    </div>
                </div>
                
            </div>
            <!-- 右侧部分 -->
            <div class="right_part">
                <!-- 博主简介 -->
                <master></master> 
                <!-- 联系方式栏目 -->
                 <contact-me></contact-me>
                 <!-- 最新文章栏目 -->
                 <latest-article @toNewArticle="toNewArticle"></latest-article>                
            </div>              
        </div>       
    </div>
</template>

<script>
import ArticleItem from '../../Comment/ArticleItem.vue'
import ContactMe from '../../Comment/ContactMe.vue'
import LatestArticle from '../../Comment/LatestArticle.vue'
import Master from '../../Comment/Master.vue'
import SearchInput from '../../Comment/SearchInput.vue'
import ArticleDetailItem from '../../Comment/ArticleDetailItem'
import CommentItem from '../../Comment/CommentItem.vue'
export default {
    name:'Article',
    created() {
        this.getArticleData();
        this.getCommentData();
        window.scrollTo(0,0);
    },
    components:{
        ArticleItem,
        ContactMe,
        LatestArticle,
        Master,
        SearchInput,
        ArticleDetailItem,
        CommentItem,
        ArticleDetailItem
    },
    data(){
        return{
           //区别评论是按热度排序还是按时间排序
           activeIndex:0,
           //文章对象
           article:{},
           //评论列表
           commentList:[],
           //评论内容
           textarea:''
        }
    },
    methods:{
        //获取文章数据
          async getArticleData(){
          let id=this.$route.params.id;
          console.log(id);
         //先增加文章访客量
          let res1=await this.request('get','article/addView?article_id='+id,null);
          console.log(res1.data);
          if(res1.data.status==200)
          {   
            this.$message({
            message: '文章访客量+1~~',
            type: 'success'
            });
          }
          let res=await this.request('get','article/id?id='+id,null); 
          console.log(res.data);
          this.article=res.data.article;
        },
        //获取对应文章的对应数据
          async getCommentData()
          {
              let params={
                  article_id:this.$route.params.id,
                  user_id:"606e9ba9c4e8bb45440b4720",
                  type:this.activeIndex
              }
              let url=`comment/all?article_id=${this.$route.params.id}&&user_id=606e9ba9c4e8bb45440b4720&&type=${this.activeIndex}`
              let res=await this.request('get',url,null);
              console.log(res.data);
              this.commentList=res.data.list;
              console.log(this.commentList.length);
          },
          //更新评论数据
          updateData(){
              this.getCommentData();
          },
          //改变activeIndex
          changeIndex(index)
          {
               console.log(index);
               this.activeIndex=index;
               this.getCommentData();
          },
          //提交评论
          async submitComment()
          {
               let obj={
                   content:this.textarea,
                   user_id:'606e9ba9c4e8bb45440b4720',
                   article_id:this.$route.params.id,
                   create_time:Date.now()
               }
               let res=await this.request('post','comment/add',obj);
                if(res.data.status==200)
                {   
                    this.$message({
                    message: '发表评论成功！',
                    type: 'success'
                    });
                }
                //重新获取评论数据
                this.getCommentData();
                //清空评论区内容
                this.textarea='';
                window.scrollTo(0,0);

          },
          //去到新的文章页面，是旁边最热文章的链接触发的
          toNewArticle(params)
          {
            console.log(params);
             this.getArticleData();
             this.getCommentData();
             window.scrollTo(0,0);
          }
    },
    computed:{
    }
}
</script>

<style scoped>
    #article_page{
        width: 100%;
        height: 100%;
    }
    .main{
        display: flex;
        width: 100%;
    }
    .left_part{
        flex:2; 
        padding: 70px 10px;
    }
    .right_part{
        flex:1;
        padding:60px 10px;
    }
    .comment_head
    {
        margin-top: 20px;
        width: 100%;
        padding:0px 20px;
        border-radius: 10px;
        box-shadow: 10px 10px 30px #eee; 
        height: 60px;
        display: flex;
        color: grey;
    }
    .comment_head_title
    {
        font-size: 25px;
        height: 100%;
        line-height: 60px;
        flex: 1;
    }
    .sort_list
    {
        flex: 1;
        text-align: right;
        font-size: 10px;
        line-height: 80px;
    }
    .sort_list span
    {
        margin-left: 16px;
    }
    .sort_list span:hover
    {
        cursor: pointer;
    }
    .active
    {
        color:var(--all_theme);
    }
    .no_comment_box
    {
        width: 100%;
        height: 100px;
        margin-top: 20px;
        line-height: 100px;
        color:var(--all_theme);
        text-align: center;
        font-size:20px;
    }
    .button_box
    {
        width: 100%;
        padding: 20px 0px; 
    }
    .el-button
    {
        width: 100%;
    }
    .comment_box
    {
        height: 300px;
        margin-top: 40px;
    }
    .comment_box .title
    {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color:var(--all_theme);
    }
</style>