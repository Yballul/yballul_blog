const express = require("express");
const Router = express.Router;
const router = new Router();
const cateController = require('../controller/cateController');

//获取所有标签
router.get('/all', cateController.getAllCates);

//根据标签获取标签信息
router.get('/id', cateController.getCateById);

module.exports = router;