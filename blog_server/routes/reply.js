const express = require("express");
const Router = express.Router;
const router = new Router();
const replyController = require('../controller/replyController');

//回复评论
router.post('/toComment', replyController.replyComment);

//回复回复
router.post('/toReply', replyController.replyReply);

module.exports = router;