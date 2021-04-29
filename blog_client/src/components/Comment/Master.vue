<template>
    <div class="master">
        <div class="avatar_container">
               <img src="../../static/img/avatar.jpg" alt="">
        </div>
        <div class="host_name">
            博主:Yballul☻
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .master{
        margin-top: 10px;
        width: 320px;
        height: 300px;
        border-radius: 20px;
        box-shadow: 7px 7px 25px rgb(228, 228, 228);
    }
    .master:hover{
        box-shadow: 7px 7px 25px gray;
        transform: translate(-4px,-4px);
        transition: 0.6s;
    }
    .avatar_container{
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar_container img{
        border-radius: 50%;
        width: 100px;
        height: 100px;
        vertical-align:middle;
        box-shadow: 7px 7px 25px #eee;
    }

    .avatar_container img:hover{
        transition: 0.6s;
        transform: translate(-4px,-4px);
        box-shadow: 7px 7px 25px deepskyblue;
    }
    .host_name{
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        color:var(--all_theme);
        text-align: center;
        border-bottom: 1px solid var(--all_theme);
    }
</style>