const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    //评论内容
    content: {
        type: String,
        required: true
    },
    //评论者
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    //评论所属的文章
    article_id: {
        type: Schema.Types.ObjectId,
        ref: "articles",
        required: true
    },
    //点赞量
    like: {
        type: Number,
        default: 0
    },
    //评论时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //评论下的回复
    replies: {
        type: Array,
        default: []
    },
    //用户是否有点赞
    ifLike: {
        type: Boolean,
        default: false
    }

})

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;