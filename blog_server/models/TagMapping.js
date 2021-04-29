const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagMappingSchema = new Schema({
    //文章
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'article'
    },
    //标签
    tag_id: {
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }

})

const TagMapping = mongoose.model("tagMappings", TagMappingSchema);
module.exports = TagMapping;