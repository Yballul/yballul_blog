<template>
    <div class="contact_icon">
        <div class="icon" @mouseover="displayDetail()" @mouseout="hideDetail()">
            <img :src="icon_image" alt="">
            <transition name="el-fade-in-linear">
            <div class="detail" v-show="show">
                <div class="content">
                    <img :src="detail_image" alt="">
                </div>
                <div class="arrow"></div>
            </div>
        </transition>
        </div>
        <div class="title">
              {{title}}
        </div>      
    </div>
</template>

<script>
export default {
    name:'ContactIcon',
    props:{
        icon_image:{
            type:String,
            default:require('../../static/img/weixin.jpg')
        },
        detail_image:{
            type:String,
            default:require('../../static/img/weixincode.jpg')
        },
        title:{
            type:String,
            default:'微信'
        }
    },
    data(){
        return{
            show:false
        }
    },
    methods: {
        //显示联系方式
        displayDetail(){
            this.show=true;
        },
        hideDetail(){
            this.show=false;
        }
    },
}
</script>

<style scoped>
    
    .contact_icon{
        width: 50px;
        height: 80px;
        position: relative;
    }
    .contact_icon img{
        border-radius: 7px;
    }
    .icon{
        width: 50px;
        height: 50px;
        border-radius: 7px;
        background-color: deepskyblue;
        position: absolute;
        left:50%;
        transform: translateX(-50%);
    }
    .detail .content{
        width: 100px;
        height: 100px;
        background-color:#fff;
        border-radius: 7px;
        text-align: center;
        position: absolute;
        top:-110px;
        left:50%;
        transform: translateX(-50%);
        box-shadow: 5px 5px 13px gray;
        text-align: center;
        overflow: hidden;
    }
    .detail .arrow{
        border:7px solid transparent;
        border-top-color: #fff;
        position: absolute;
        top:-10px;
        left:50%;
        transform: translateX(-50%);
    }
    .title{
        text-align: center;
        height:30px;
        line-height: 30px;
        font-size:15px;
        color:gray;
        position: absolute;
        top:50px;
        width: 100%;
    }
    .icon img{
        width: 100%;
        height: 100%;
    }
    /* .content img{
        width: 100%;
        height: 100%;
    } */
</style>