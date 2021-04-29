const Article = require('../models/Article.js');
const Comment = require('../models/Comment.js');
const Reply = require('../models/Reply.js');
const Like = require('../models/Like.js');

//回复评论
exports.replyComment = async(req, res) => {
    try {
        let newReply = await new Reply(req.body).save();
        res.status(200).send({
            status: 200,
            msg: '回复评论成功',
            reply: newReply
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            msg: '回复评论失败'
        })
    }
}

//回复回复
exports.replyReply = async(req, res) => {
    try {
        let newReply = await new Reply(req.body).save();
        res.status(200).send({
            status: 200,
            msg: '回复回复成功',
            reply: newReply
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            msg: '回复回复失败'
        })
    }
}