<template>
    <div id="login_page">
        <div class="login_container">
            <!-- 登录标题 -->
            <div class="login_title">登录</div>
            <div class="welcome">Hello,my friend!</div>
            <!-- 登录表单 -->
            <el-form ref="login_form" :model="login_infor" label-width="0" :rules="login_rules">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="login_infor.username" prefix-icon="el-icon-user-solid" 
                    class="login_username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" >
                    <el-input v-model="login_infor.password" prefix-icon="el-icon-s-goods" 
                    type="password" class="login_password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <!-- 登录确认按钮 -->
                <el-form-item prop="submit">
                    <el-button type="primary" class="login_submit">立即登录</el-button>
                </el-form-item>
            </el-form>
            <!-- 忘记密码 -->
            <div class="forget">忘记密码？</div>
            <!-- 提醒注册 -->
            <div class="regist">还没有账号？<span id="to" @click="toRegist()">立即注册</span></div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            login_infor:{
                username:'',
                password:''
            },
            login_rules:{
                username: [
                { required: true, message: '用户名不能为空！', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                { required: true, message: '密码不能为空！', trigger: 'blur' },
                { min: 8, max: 18, message: '长度在8到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //跳转到注册界面
        toRegist(){
            this.$router.push('/regist')
        }
        //跳转到重置密码界面


    }
}
</script>

<style scoped>
    #login_page{
        height: 100%;
        width: 100%;
        position: relative;
        background-color: deepskyblue;
        background-image: url("../../static/img/login_bac.jpg");
    }
    .login_container{
        width: 376px;
        height: 400px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        text-align: center;
    }

    .login_container .login_title
    {
          width: 100%;
          text-align: center;
          height: 70px;
          line-height: 70px;
          color:var(--all_theme);
          font-size: 30px;
    }
    .login_username,.login_password{
        width: 354px;
    }
    .login_username{
        margin-top:20px;
    }

     .login_password{
        margin-top:5px;
    }

    .welcome{
        font-size: 15px;
        text-align: center;
        color:var(--all_theme);
    }
    .login_submit{
        width: 354px;
    }
    #to{
        color:var(--all_theme);
        cursor: pointer;
    }
    #to:hover{
        color:blue;
        cursor: pointer;
    }
    .forget,.regist{
        color:dimgray;
        font-size:10px;
        text-align: center;
        line-height: 30px;
        height: 30px;
    }

    .el-form-item{
        width:354px;
        margin-left:10px;
    }

    .forget:hover{
        color:var(--all_theme);
        cursor: pointer;
    }
</style>