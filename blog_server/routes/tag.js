const express = require("express");
const Router = express.Router;
const router = new Router();
const tagController = require('../controller/tagController');

//获取所有标签
router.get('/all', tagController.getAllTags);

module.exports = router;