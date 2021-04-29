<template>
    <!-- 我的联系方式模块 -->
    <div class="contact_me_part">
        <div class="title">
            联系方式
        </div>
       <div class="contact_item_list" >
            <contact-icon v-for='item in contact_list' :key="item.title"
            :title="item.title" :icon_image="item.icon_image" :detail_image="item.detail_image">
            </contact-icon>
       </div>      
    </div>
</template>

<script>
import ContactIcon from './ContactIcon.vue'
export default {
  components: { ContactIcon },
  data(){
      return{
          //联系列表
          contact_list:[
               {
                    icon_image:require('../../static/img/qq.jpg'),
                    detail_image:require('../../static/img/qqcode.jpg'),
                    title:'QQ'
               },
               {
                    icon_image:require('../../static/img/weixin.jpg'),
                    detail_image:require('../../static/img/weixincode.jpg'),
                    title:'微信'
               },
               {
                    icon_image:require('../../static/img/weibo.jpg'),
                    detail_image:require('../../static/img/qqcode.jpg'),
                    title:'微博'
               },
               {
                    icon_image:require('../../static/img/bilibili.jpg'),
                    detail_image:require('../../static/img/weixincode.jpg'),
                    title:'B站'
               }
          ]
      }
  }
}
</script>

<style scoped>
    .contact_me_part
    {
        margin-top: 30px;
        width: 320px;
        height: 170px;
        border-radius: 20px;
        box-shadow: 7px 7px 25px rgb(228, 228, 228);
    }
    .contact_me_part:hover{
        box-shadow: 7px 7px 25px gray;
        transform: translate(-4px,-4px);
        transition: 0.6s;
    }
    .contact_item_list{
        width: 100%;
        display: flex;
        padding: 15px 0;
    }
    .contact_icon{
        flex: 1;
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

</style>