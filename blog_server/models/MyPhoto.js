const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//图库
const MyPhotoSchema = new Schema({
    //图片地址
    url: {
        type: String,
        required: true
    },
    //图片描述
    title: {
        type: String,
        default: '无题'
    },
    //点赞数
    like: {
        type: Number,
        default: 0
    },
    //观看量
    view: {
        type: Number,
        default: 0
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now()
    }
})

const MyPhoto = mongoose.model("myphotos", MyPhotoSchema);
module.exports = MyPhoto;