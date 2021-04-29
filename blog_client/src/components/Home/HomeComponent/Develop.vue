<template>
    <div class="develop_page">
        <!-- 文章基本信息 -->
        <div class="base_infor">
            <el-form ref="form" :model="myArticle" :rules="rules" 
             label-width="100px">
                <el-form-item label="文章标题" prop='title'>
                    <!-- 文章标题 -->
                    <el-input v-model="myArticle.title"
                    placeholder="请输入文章标题"></el-input>
                </el-form-item>
                 <!-- 分类列表 -->
                <el-form-item label="文章分类" prop="cate">
                    <el-radio v-model="myArticle.cate" :label="item._id"
                    v-for="(item) in cateList" :key="item._id" >{{item.name}}</el-radio>
                </el-form-item>
                <!-- 标签列表 -->
                <el-form-item label="文章标签" prop="tag">
                    <el-checkbox-group v-model="myArticle.tag" >
                        <el-checkbox :label="item._id" v-for="item in tagList"
                        :key="item._id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>  
                <el-upload
                class="upload-demo"
                action="http://172.20.10.2:4087/upload/img"
                name="image"
                :on-change="handleChange"
                :file-list="myArticle.cover">
                <el-button size="small" type="primary">点击上传文章封面</el-button>
                <div slot="tip" class="el-upload__tip"></div>
                </el-upload>    
            </el-form>     
        </div>
        <!-- 富文本编辑器 -->
        <div class="mavonEditor">
            <mavon-editor ref='md' :toolbars="markdownOption"
             id="editor"
             :ishljs = "false"
             @imgAdd="$imgAdd"
             @change="$getData"
             v-model="handbook"/>
        </div>
        <div v-show="ifEmpty" class="error_message">文章内容不能为空！</div>
        <!-- 发布按钮  -->
        <div class="submit">
              <el-button type="primary" @click="submitForm('form')" >发布文章</el-button>
        </div>   
    </div>
</template>

<script>
import editorObj from '../../../config/editorConfig.js'
import axios from 'axios'
export default {
  data() {
    return {
      markdownOption:editorObj,
      //文章文本内容
      handbook: "快快写博客！",
      ifEmpty:false,
      //html文本
      myArticle:{
         htmlData:'',
         title:'',
         tag:[],
         cate:'',
         cover:[],
         trueCover:''
      },
      tagList:[],
      cateList:[],
      //表单校验规则
      rules:{
          title:[
            { required: true, message: '文章标题不能为空', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          cate:[
            { required: true, message: '请选择文章分类', trigger: 'change' }
          ],
          tag:[
            { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
          ],
      }
    };
  },
  created() {
      this.getAllData();
  },
   methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           console.log('执行')
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'http://172.20.10.2:4087/upload/img',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((res) => {
               console.log(this.$refs.md);
               console.log(res);
               let url=res.data.url;
               url=url.replace('localhost','http://172.20.10.2');
               console.log('图片',url);
               this.$refs.md.$img2Url(pos, url);
           })
        },
        $getHtml(status,value)
        {
            console.log(value);
        },
        $getData(value,render)
        {
            this.myArticle.htmlData=render;
            console.log(this.myArticle.htmlData);
        },
        //提交表单
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        //检查表单各个字段是否合法
          if (valid&&!this.ifEmpty) {
            //规范请求数据
            this.myArticle.htmlData= this.myArticle.htmlData.replace(/\<img/gi, '<img style="width:95%;height:auto" ');
            let obj={
                title:this.myArticle.title,
                content:this.myArticle.htmlData,
                cate:this.myArticle.cate,
                tag_list:this.myArticle.tag,
                create_time:Date.now(),
                cover:this.myArticle.trueCover
            }
            console.log(this.cover);
            console.log(obj);
            //发送请求，请求添加文章
            this.request('post','article/add',obj).then((res)=>{
                console.log(res.data);
                if(res.data.status==200)
                {
                    this.$message({
                    message: '发布文章成功',
                    type: 'success'
                    });
                    this.$router.push('/home/index');
                }
                else
                {
                    this.$message({
                    message: '网络传输出现问题，发布文章失败',
                    type: 'error'
                    });
                }   
            })          
          } else {
            this.$message({
            message: '发布失败,请检查是否正确填写表单',
            type: 'warning'
            });
          }
        });
       },
        //获取所有标签数据与所有分类数据
        async getAllData()
        {        
            let res1=await this.request('get','tag/all',null);
            let res2=await this.request('get','cate/all',null);
            this.tagList=res1.data.list;
            this.cateList=res2.data.list;
            console.log(res1.data);
        },
        handleChange(file, fileList) {
         console.log('执行');
         this.cover = fileList.slice(-3);
         if(this.cover[0].response!=undefined)  
         {
           this.myArticle.trueCover=this.cover[0].response.url;
           this.myArticle.trueCover=this.myArticle.trueCover.replace('localhost','http://172.20.10.2');
           console.log(this.cover[0].response);
           console.log(this.myArticle.trueCover);
         } 
        }
    },
    watch:{
        handbook(value){
        this.ifEmpty= value==''?true:false;
        }
    }
};
</script>

<style scoped>
    .mavonEditor{
        width: 100%;
        margin-top:30px;
    }
    .mavon-editor
    {
        height: 1000px;
        
    }
    .base_infor{
        margin-top: 20px;
        width: 100%;
    }
    .title label{
        display: inline-block;
    }
    #editor
    {
        min-height: 500px;
    }
    .el-button
    {
        width: 100%;
    }
    .submit{
        width: 100%;
        padding: 20px;
    }
    .error_message{
        color: var(--regist_theme);
        margin-top: 10px;
        font-size: 13px;
        margin-left: 20px;
        transition: 0.6s;
    }
</style>