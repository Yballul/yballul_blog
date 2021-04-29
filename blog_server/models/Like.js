const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    //赞的创建时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //对何物的赞
    refer_id: {
        type: String,
        required: true
    },
    //赞的类型
    type: {
        type: Number,
        required: true
    },
    //点赞者
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})

const Like = mongoose.model("likes", LikeSchema);
module.exports = Like;