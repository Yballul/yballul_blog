<template>
    <div class="search_input">
        <div class="search_box">
            <el-input
            placeholder="请输入想要搜索的文章"
            v-model="input"
            clearable class="my_input"
            @blur="handleBlur()"
            @input="searchTitle()"
            @focus="display=true"
            >
            </el-input>
            <div class="btn_box">
                <el-button type="primary" class="search"
                @click='toSearch()'> 搜索</el-button> 
            </div>
        </div>
        <transition name="el-zoom-in-top">
             <div class="history" v-if="input&&display&&(resultList.length!=0)" v-show="display">
               <div class="history_item"  v-for="item in resultList" :key="item._id" 
               @click="getTitle(item.title)">
                   <span>{{item.title}}</span>             
                   <!-- <div class="history_delete">
                       删除
                   </div> -->
               </div>
             </div>
             <div class="history" v-if="!input&&display&&(historyList.length!=0)" v-show="display">
               <div class="history_item"  v-for="item in 4" :key="item" 
                @click="getTitle(item.title)">
                   <span>{{item}}</span>             
                   <div class="history_delete">
                       删除
                   </div>
               </div>
             </div>
        </transition>       
    </div>
</template>
<script>

export default {
    name:'SearchInput',
    data(){
       return{
           //搜索框内容
           input:'',
           display:false,
           resultList:[],
           historyList:[],
           timer:null
       }
    },
    methods:{
        //获取用户想搜索的结果列表
        getResultList(){
            
        },
        //获取用户的搜索历史
        getHistoryList(){
            
        },
        //搜索想要的文章的title
        searchTitle(){
            //先清除定时器
            //防抖函数
            clearTimeout(this.timer);
            if(this.input.trim()!=='')
            {
                 this.timer=setTimeout(async()=>{
                 let res=await this.request('get',`article/searchTitle?detail=${this.input}`,null);
                 this.resultList=res.data.titles;
                 console.log(res.data);
                 console.log(this.resultList);
                 },1200);
            }
          
        },
        getTitle(title)
        {
            console.log(title);
            this.input=title;
            this.searchTitle();
        },
        handleBlur()
        {
              setTimeout(()=>{
                  this.display=false;
              },500);
        },
        toSearch()
        {
            this.$router.push(`/home/search/${this.input}`);
        }
    },
    watch:{
        // resultList()
        // {
        //     if(this.resultList.length!=0||this.historyList.length!=0)
        //     this.display=true;
        // },
        // historyList()
        // {
        //     if(this.resultList.length!=0||this.historyList.length!=0)
        //     this.display=true;
        // }
    }
}
</script>

<style scoped>
      .my_input{
          width: 200px;
      }
      .search_box
      {
          width: 100%;
          display: flex;
      }
      .search_input{
          width: 300px;
          position: absolute;
          z-index:99;
          top:24px;
          right:530px;
          height: 200px;
      }
      .btn_box
      {
          width: 50px;
          flex:1;
          padding-left: 10px;
      }
      .history{
          width: 200px;
          border-radius: 10px;
          border:1px solid var(--all_theme);
          margin-top:10px;
          overflow: hidden;
          background-color: #fff;
      }
      .history_delete{
          height: 12px;
          line-height: 10px;
          text-align: center;
          font-size: 2px;
          color:gray;
          position: absolute;
          right: 10px;
          top:50%;
          transform: translateY(-50%);
      }
      
      .history_delete:hover{
          color: var(--all_theme);
          cursor: pointer;
      }

      .history_item{
          color:gray;
          position: relative;
          height: 40px;
          line-height: 40px;
          width: 100%;
          text-indent: 1em;    
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;      
      }
      .history_item:hover{
          background-color: #eee;
      }
</style>