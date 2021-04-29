const express = require("express");
const Router = express.Router;
const router = new Router();
const Comment = require('../models/Comment.js');
const Reply = require('../models/Reply.js');
const Article = require('../models/Article.js');
const commentController = require('../controller/commentController');

//获取对应文章的所有评论
router.get('/all', commentController.getAllComments);

//添加评论
router.post('/add', commentController.addComment);

module.exports = router;