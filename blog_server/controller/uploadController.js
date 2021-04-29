const multer = require('multer');
const fs = require('fs');
const path = require('path');
exports.uploadPic = (req, res) => {
    console.log('上传图片');
    //读取文件路径
    fs.readFile(req.file.path, (err, data) => {
        //如果读取失败
        if (err) {
            return res.status(500).send({
                status: 500,
                msg: "上传失败"
            })
        }
        //如果读取成功
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        //拓展名
        let extname = req.file.mimetype.split('/')[1]
            //拼接成图片名
        let keepname = time + '.' + extname
            //三个参数
            //1.图片的绝对路径
            //2.写入的内容
            //3.回调函数
        fs.writeFile(path.join(__dirname, '../static/img/' + keepname), data, (err) => {
            if (err) {
                return res.status(500).send({
                    status: 500,
                    msg: "上传失败"
                })
            } else
                res.status(200).send({
                    status: 200,
                    msg: '上传成功',
                    url: "localhost:4087/static/img/" + keepname
                })
        });
    });
}