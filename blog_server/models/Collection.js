const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'article'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    create_time: {
        type: Date,
        default: Date.now()
    }

})

const Collection = mongoose.model("collections", CollectionSchema);
module.exports = Collection;