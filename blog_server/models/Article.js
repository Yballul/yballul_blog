const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    //文章标题
    title: {
        type: String,
        required: true
    },
    //文章内容
    content: {
        type: String,
        required: true
    },
    //访客量
    view: {
        type: Number,
        default: 0
    },
    //文章创建的时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //文章所属分类
    cate: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    //点赞量
    like: {
        type: Number,
        default: 0
    },
    //评论数
    comment: {
        type: Number,
        default: 0
    },
    //收藏量,要命名为num，不然跟mongo里面一些字段冲突
    collection_num: {
        type: Number,
        default: 0
    },
    //标签列表
    tag: {
        type: Array,
        default: []
    },
    //文章封面
    cover: {
        type: String,
        default: 'http://172.20.10.2:4087/static/img/1619426863198.jpeg'
    }
})

const Article = mongoose.model("articles", ArticleSchema);
module.exports = Article;