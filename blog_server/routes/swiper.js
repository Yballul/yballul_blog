const express = require("express");
const Router = express.Router;
const router = new Router();
const swiperController = require('../controller/swiperController.js');

//获取所有轮播图
router.get('/all', swiperController.getAllSwipers);

//添加轮播图
router.post('/add', swiperController.addSwipers);

module.exports = router;