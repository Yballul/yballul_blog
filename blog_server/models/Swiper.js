const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SwiperSchema = new Schema({
    //图片地址
    url: {
        type: String,
        required: true
    }

})

const Swiper = mongoose.model("swipers", SwiperSchema);
module.exports = Swiper;