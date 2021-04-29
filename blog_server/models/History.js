const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    //搜索内容
    title: {
        type: String,
        required: true
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //搜索对应的用户
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

const History = mongoose.model("histories", HistorySchema);
module.exports = History;