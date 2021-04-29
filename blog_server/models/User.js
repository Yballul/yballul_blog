const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    //头像(存储图片路径)
    avatar: {
        type: String,
        default: "http:"
    },
    //用户名
    username: {
        type: String,
        required: true
    },
    //用户邮箱
    email: {
        type: String,
        required: true,
        uniqued: true
    },
    //用户创建时间
    create_time: {
        type: Date,
        default: Date.now()
    },
    //个人简介
    detail: {
        type: String
    },
    //所在地
    location: {
        type: String,
        default: "来自火星的网友"
    },
    //身份
    role: {
        type: Number,
        default: 0
            //0是普通用户,1是管理员
    }

})

const User = mongoose.model("users", UserSchema);
module.exports = User;