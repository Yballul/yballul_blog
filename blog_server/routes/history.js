const express = require("express");
const Router = express.Router;
const router = new Router();
const historyController = require('../controller/historyController.js');

//获得对应用户的所有搜索历史
router.get('/all', historyController.getAllHistory);

//增加对应用户的搜索历史
router.post('/add', historyController.addHistory);

//删除对应用户的搜索历史(单条)
router.delete('/deleteForOne', historyController.deleteHistoryForOne);

//删除对应用户的所有搜索历史
router.delete('/deleteAll', );
module.exports = router;