const Article = require('../models/Article.js');
const Comment = require('../models/Comment.js');
const Reply = require('../models/Reply.js');
const Like = require('../models/Like.js');
const User = require('../models/User');
async function getIfLike(id, user_id, type) {
    let count = await Like.countDocuments({ refer_id: id, user_id, type });
    if (count == 0)
        return false;
    else
        return true;
}
//获取所有评论
exports.getAllComments = async(req, res) => {
    try {
        //获取与文章id
        const { article_id, user_id, type } = req.query;
        console.log('comment', req.query);
        let commentList = [];
        if (type == '0')
            commentList = await Comment.find({ article_id }).populate('user_id').sort({ create_time: -1 });
        if (type == '1')
            commentList = await Comment.find({ article_id }).populate('user_id').sort({ like: -1 });
        console.log(commentList);
        //根据每个评论的id，搜索出对应的回复,并检验是否被对应的user所点赞
        for (let item of commentList) {
            //检验是否被点过赞
            let id = item['_id'];
            item.ifLike = getIfLike(id, user_id, 1);
            //搜索出对应的回复
            let replies = await Reply.find({ comment_id: item['_id'] }).populate('from_id to_id');
            //检验回复是否被点赞
            for (let item1 of replies) {
                let id1 = item1['_id'];
                item1.ifLike = getIfLike(id1, user_id, 2);
            }
            console.log(replies);
            //将回复压入对应的评论里面
            item.replies = replies;
        }
        res.status(200).send({
            status: 200,
            msg: '获取成功',
            list: commentList
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: "获取评论失败"
        })
    }
}

//发表评论
exports.addComment = async(req, res) => {
    try {
        let newComment = await new Comment(req.body).save();
        if (newComment) {
            res.send({
                status: 200,
                msg: '添加评论成功',
                data: {
                    comment: newComment
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '添加评论失败'
        })
    }
}