const express = require("express");
const Router = express.Router;
const router = new Router();
const likeController = require('../controller/likeController');

//点赞
router.post('/add', likeController.addLike);
//取消赞
router.post('/delete', likeController.deleteLike);

module.exports = router;