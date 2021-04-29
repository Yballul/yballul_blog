<template>
    <div id="index_page">
        <!-- 主体部分 -->
        <!-- <search-input></search-input> -->
        <div class="main">
            <!-- 左侧部分 -->
            <div class="left_part">
                <div class="block">
                    <el-carousel height="400px" >
                        <el-carousel-item v-for="(item) in swiperList" :key="item._id" >
                            <img :src="item.url" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>

                <!-- <article-detail-item></article-detail-item>
                <comment-item></comment-item> -->

                <div class="title">所有文章</div>
                <div class="article_list">
                     <article-item v-for="item in articleList" :key="item[`_id`]"
                     :article="item"
                     @click.native="toDetail(item._id)"></article-item>
                </div>
                <!-- 分页条 -->
                <el-pagination class="page_list"
                :page-sizes="[4,8,12,16]"
                :page-size="pageInfor.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfor.dataTotal"
                @current-change="currentChange"
                @size-change="sizeChange"
                @pre-click="currentChange"
                @next-click="currentChange">
                </el-pagination>
            </div>
            <!-- 右侧部分 -->
            <div class="right_part">
                <!-- 博主简介 -->
                <master></master> 
                <!-- 联系方式栏目 -->
                 <contact-me></contact-me>
                 <!-- 最新文章栏目 -->
                 <latest-article></latest-article>                
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
    components:{
        ArticleItem,
        ContactMe,
        LatestArticle,
        Master,
        SearchInput,
        ArticleDetailItem,
        CommentItem
    },
    data(){
        return{
            //轮播图数据
            swiperList:[],
            //文章列表数据
            articleList:[],
            //页码数据
            pageInfor:{
                page:1,
                pageSize:4,
                //总页数
                pageTotal:0,
                //总数据数量
                dataTotal:0
            }
        }
    },
    created() {
        //获取数据
        this.getArticleData()
        this.getSwiperData();
    },
    methods: {
        //获取轮播图的数据
        async getSwiperData(){
           let result=await this.request('get','swiper/all',null);
           console.log('轮播图',result);
           if(result.status==200)
           this.swiperList=result.data.list;
           else
           console.log('获取失败');
        },
        //获取文章数据
        async getArticleData(){
            let result=await this.request('get',`article/all?page=${this.pageInfor.page}&pageSize=${this.pageInfor.pageSize}`,);
            console.log(result.data);
            if(result.data.status==200)
            {    
                        
                 this.articleList=result.data.list;
                 console.log(this.articleList);
                 this.pageInfor.dataTotal=result.data.totalNum;
                 this.pageInfor.pageTotal=Math.ceil(this.pageInfor.dataTotal/this.pageInfor.pageSize);
                 console.log(this.pageInfor);
                 window.scrollTo(0,0);
            }
            else
            console.log('获取失败');
        },
        //获取所有数据
        getAllData(){
            this.getSwiperData();
            this.getArticleData();
        },
        toDetail(index)
        {
            console.log(index);
            this.$router.push('/home/article/'+index);
        },
        currentChange(page)
        {
            console.log('参数',page);
            this.pageInfor.page=page;
            this.getArticleData();
            
        },
        sizeChange(pageSize)
        {
            this.pageInfor.pageSize=pageSize;
            this.getArticleData();
        }

    }
}
</script>

<style scoped>
    #index_page{
        width: 100%;
        height: 100%;
    }
    .title{
        width: 85%;
        font-weight: 700;
        font-size:30px;
        color:gray;
        text-indent: 1em;
        border-bottom:1px solid var(--all_theme);
        height: 60px;
        line-height: 60px;
    }
    .main{
        display: flex;
        width: 100%;
    }
    .left_part{
        flex:2; 
    }
    .right_part{
        flex:1;
        padding:60px 10px;
    }
     .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .block{
      width: 90%;
      margin-left: 10px;
      height: 250px;
      margin-top: 20px;
      border-radius: 20px;
      overflow: hidden;
  }

  .page_list
  {
      margin-top:30px;
  }
  .el-carousel__item img
  {
      width: 700px;
      
  }


</style>