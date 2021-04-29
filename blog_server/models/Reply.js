const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    //回复内容
    content: {
        type: String,
        required: true
    },
    //回复者
    from_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    //被回复者
    to_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    //点赞量
    like: {
        type: Number,
        default: 0
    },
    //回复创建时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //是否被用户点赞了
    ifLike: {
        type: Boolean,
        default: false
    },
    //评论的id
    comment_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
})
const Reply = mongoose.model("replies", ReplySchema);
module.exports = Reply;