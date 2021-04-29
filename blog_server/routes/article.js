const express = require("express");
const Router = express.Router;
const router = new Router();
const Article = require('../models/Article.js');
const Like = require('../models/Like.js');
const Tag = require('../models/Tag.js');
const TagMapping = require('../models/TagMapping.js');
const articleController = require('../controller/articleController.js');

//添加文章操作
router.post('/add', articleController.addArticle);
//增加访客量
router.get('/addView', articleController.addView);
//获取所有文章
router.get('/all', articleController.getAllArticle);
//获取对应分类的文章
router.get('/cate', articleController.getArticleByCate);
//根据id获取文章数据
router.get('/id', articleController.getArticleById);
//模糊查询文章标题
router.get('/searchTitle', articleController.searchArticleTitle);
//模糊查询文章
router.post('/searchDetail', articleController.searchArticleDetail);
module.exports = router;