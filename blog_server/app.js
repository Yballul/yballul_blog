const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Auth = require('./middleware/Auth.js');
const Cors = require('cors');
const path = require('path');

const user = require('./routes/user.js');
const comment = require('./routes/comment.js');
const article = require('./routes/article.js');
const like = require('./routes/like.js');
const reply = require('./routes/reply.js');
const upload = require('./routes/upload.js');
const swiper = require('./routes/swiper.js');
const history = require('./routes/history.js');
const tag = require('./routes/tag.js');
const cate = require('./routes/cate.js');

const bodyParser = require('body-parser');
const Category = require('./models/Category.js');
const Tag = require('./models/Tag.js');

//开放static文件夹

//连接数据库
mongoose.connect('mongodb://localhost:27017/yballul_blog', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

//中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// app.use(Auth);
app.use(Cors());


//测试路由
app.use('/test', (req, res) => {
    console.log('hello')
    res.send("this is test");
})

//开放一个可访问的static文件夹
app.use('/static', express.static('static'));

//user相关路由
app.use('/user', user);

//comment相关路由
app.use('/comment', comment);

//article相关路由
app.use('/article', article);

//like相关路由
app.use('/like', like);

//reply相关路由
app.use('/reply', reply);

//upload相关路由
app.use('/upload', upload);

//swiper相关路由
app.use('/swiper', swiper);

//history相关路由
app.use('/history', history);

//tag相关路由
app.use('/tag', tag);

//cate相关路由
app.use('/cate', cate);

app.post('/addcate', async(req, res) => {
    let result = await new Category(req.body).save();
    res.send({ result });
})
app.post('/addtag', async(req, res) => {
    let result = await new Tag(req.body).save();
    res.send({ result });
})

//监听端口
app.listen(4087, (err) => {
    if (err == null) {
        console.log('监听成功!');
    } else
        console.log(err);
})