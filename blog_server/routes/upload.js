const express = require("express");
const Router = express.Router;
const router = new Router();
const uploadController = require('../controller/uploadController');
const multer = require('multer');
var upload = multer({ dest: 'static/img' });

//上传图片
router.post('/img', upload.single('image'), uploadController.uploadPic);

router.get('/test', (req, res) => {
    res.send('hello');
})

module.exports = router;