const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    //留言内容
    content: {
        type: String,
        required: true
    },
    //留言者
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    //点赞量
    like: {
        type: Number,
        default: 0
    },
    //留言创建时间
    create_time: {
        type: Date,
        default: Date.now()
    }

})

const Message = mongoose.model("messages", MessageSchema);
module.exports = Message;