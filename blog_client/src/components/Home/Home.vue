<template>
    <div id="home_page">
        <!-- 当前时间部分-->
        <div class="date_message">
         现在的时间是:{{nowTime|dateFormat}}
       </div>
       <!-- 导航栏部分 -->
       <el-menu :default-active="activeIndex" 
        class="el-menu-demo" mode="horizontal" 
        id="home_menu"
        @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">文章</template>
                <el-menu-item :index="calIndex(index1)" v-for="(item1,index1) in cateList"
                :key="item1._id" 
                >{{item1.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">图集</el-menu-item>
            <el-menu-item index="4">关于我</el-menu-item>
            <el-menu-item index="5">搜索结果</el-menu-item>
       </el-menu>
       <search-input></search-input>
       
       <el-button type="warning" class="dev_btn" @click="addArticle()">发表文章</el-button>
       <!-- 登录注册按钮 -->
       <el-button type="primary" class="login_btn" @click="toLogin()">登录</el-button>
       <el-button type="danger" class="regist_btn" @click="toRegist()">注册</el-button>
       <!-- 主体部分 -->
       <div class="main">
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
import ContactIcon from '../Comment/ContactIcon.vue';
import ContactMe from '../Comment/ContactMe.vue'
import SearchInput from '../Comment/SearchInput.vue';
export default {
    components:{
       ContactIcon,
       ContactMe,
        SearchInput
    },
    data() {
      return {
        activeIndex: '1',
        nowTime:Date.now(),
        tabList:['/home/index','/home/cate/','/home/index','/home/aboutMe','/home/search'],
        cateList:[]
      };
    },
    created(){
        //一经创建，就要开始更新时间
        this.updateTime();
        //获取分类列表数据
        this.getCateList();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        //如果key的长度是等于三的那么证明点击的是多级菜单
        let sonKey;
        if(key.length==3)
        {
            let array=key.split('-');
            key=array[0];
            sonKey=array[1];
            sonKey=parseInt(sonKey);
        }
        //将key转化为number
        key=parseInt(key);
        console.log(key,sonKey);
        //如果sonKey不存在，是一级菜单
        if(!sonKey)
        this.$router.push(this.tabList[key-1]);
        else
        {
            this.$router.push(this.tabList[key-1]+this.cateList[sonKey-1]._id);
            console.log(this.tabList[key-1]+this.cateList[sonKey-1]._id);
        }
        
      },
      //跳转到登录页面
      toLogin(){
          console.log('登录');
          this.$router.push('/login');
      },
      //跳转到注册页面
      toRegist(){
          console.log('注册');
         this.$router.push('/regist');
      },
      //更新时间
      updateTime(){
          setInterval(()=>{
              this.nowTime=Date.now()
          },1000);
      },
      //去到发表文章页面
      addArticle(){
          this.$router.push('/home/develop');
      },
      //获取分类列表
      async getCateList(){
          let res=await this.request('get','cate/all',null);
          this.cateList=res.data.list;
          console.log('分类',res);
      },
      calIndex(index)
      {
          return '2-'+(index+1);
      }
    }
}
</script>

<style scoped>
    #home_page{
        width: 70%;
        margin:0 auto;
    }

    .el-menu{
        position: relative;
    }
    .el-button{
        position: absolute;
        right:240px;
        top:24px;
    }
    .login_btn{
        right:330px;
    }
    .dev_btn{
        right:420px;
    }
    .date_message{
        height: 14px;
        line-height: 14px;
        background-color:var(--regist_theme);
        color:white;
        padding:0 20px;
        font-size:10px;
        border-radius: 3px;
    }
   .contact-icon{
       margin-top:100px;
   }
</style>