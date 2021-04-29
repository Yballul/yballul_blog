<template>
    <div id="regist_page">
        <div class="regist_container">
            <!-- 注册标题 -->
            <div class="regist_title">注册</div>
            <div class="welcome">Hey,nice to meet you!</div>
            <!-- 注册表单 -->
            <el-form ref="regist_form" :model="regist_infor" label-width="0" :rules="regi_rules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="regist_infor.username" prefix-icon="el-icon-user-solid" 
                     placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" >
                    <el-input v-model="regist_infor.password" prefix-icon="el-icon-s-goods" 
                    type="password"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- 再次确认密码 -->
                <el-form-item prop="checkPassword" >
                    <el-input v-model="regist_infor.checkPassword" prefix-icon="el-icon-s-goods" 
                    type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item prop="email" >
                    <el-input v-model="regist_infor.email" prefix-icon="el-icon-s-goods" 
                    type="password" placeholder="输入邮箱"></el-input>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item prop="mobile" >
                    <el-input v-model="regist_infor.mobile" prefix-icon="el-icon-s-goods" 
                    type="password" placeholder="输入手机号" ></el-input>
                </el-form-item>
                <!-- 注册确认按钮 -->
                <el-form-item prop="submit">
                    <el-button type="danger" class="login_submit">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'Regist',
    data(){
        return{
            regist_infor:{
                username:'',
                password:'',
                checkPassword:'',
                mobile:'',
                email:''
            }
        

        }
    }
}
</script>

<style scoped>
    #regist_page{
        height: 100%;
        background-image: url("../../static/img/regist_bac.jpg");
        background-repeat: no-repeat;
        background-size:100% 100%;
        color:var(--regist_theme);
    }
    .regist_container{
        width: 376px;
        height: 500px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        text-align: center;
    }
    .regist_title{
         width: 100%;
          text-align: center;
          height: 70px;
          line-height: 70px;
          font-size: 30px;
    }

    .el-form-item
    {
        margin-left:2px;
    }
    .el-form{
        margin-top:20px;
    }

    .el-input{
        width: 354px;
    }
</style>