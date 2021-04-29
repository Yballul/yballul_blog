const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    //分类描述
    detail: {
        type: String,
        reqired: true
    },
    //分类名称
    name: {
        type: String,
        required: true
    }


})

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;