const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const Message = require('../models/Message');
const MyPhoto = require('../models/MyPhoto');
const Like = require('../models/Like');

//点赞功能
exports.addLike = async(req, res) => {
    try {
        const { user_id, refer_id, type } = req.body;
        //先在like表中增加相对应的赞
        let newLike = await new Like(req.body).save();
        //更新点赞数
        switch (type) {
            case 0:
                {
                    let like = await Article.findById(refer_id).select('like').exec();
                    let newArticle = await Article.findByIdAndUpdate(refer_id, { like: like + 1 });
                    break;
                }
            case 1:
                {
                    let like = await Comment.findById(refer_id).select('like').exec();
                    let newComment = await Comment.findByIdAndUpdate(refer_id, { like: like + 1 });
                    break;
                }
            case 2:
                {
                    let like = await Reply.findById(refer_id).select('like').exec();
                    let newReply = await Reply.findByIdAndUpdate(refer_id, { like: like + 1 });
                    break;
                }
            case 3:
                {
                    let like = await Message.findById(refer_id).select('like').exec();
                    let newMessage = await Message.findByIdAndUpdate(refer_id, { like: like + 1 });
                    break;
                }
            case 4:
                {
                    let like = await MyPhoto.findById(refer_id).select('like').exec();
                    let newMyPhoto = await MyPhoto.findByIdAndUpdate(refer_id, { like: like + 1 });
                    break;
                }
        }
        res.status(200).send({
            status: 200,
            msg: "点赞成功"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 400,
            msg: '点赞失败'
        })
    }
}

//取消赞功能
exports.deleteLike = async(req, res) => {
    try {
        const { user_id, refer_id, type } = req.body;
        //先在like表中删除相对应的赞
        let deleteOne = await Like.findOneAndDelete(req.body);
        //更新点赞数
        switch (type) {
            case 0:
                {
                    let like = await Article.findById(refer_id).select('like').exec();
                    let newArticle = await Article.findByIdAndUpdate(refer_id, { like: like - 1 });
                    break;
                }
            case 1:
                {
                    let like = await Comment.findById(refer_id).select('like').exec();
                    let newComment = await Comment.findByIdAndUpdate(refer_id, { like: like - 1 });
                    break;
                }
            case 2:
                {
                    let like = await Reply.findById(refer_id).select('like').exec();
                    let newReply = await Reply.findByIdAndUpdate(refer_id, { like: like - 1 });
                    break;
                }
            case 3:
                {
                    let like = await Message.findById(refer_id).select('like').exec();
                    let newMessage = await Message.findByIdAndUpdate(refer_id, { like: like - 1 });
                    break;
                }
            case 3:
                {
                    let like = await Message.findById(refer_id).select('like').exec();
                    let newMessage = await Message.findByIdAndUpdate(refer_id, { like: like - 1 });
                    break;
                }
        }
        res.status(200).send({
            status: 200,
            msg: "取消赞成功"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 400,
            msg: '取消赞失败'
        })
    }
}