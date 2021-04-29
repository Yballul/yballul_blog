const MyPhoto = require('../models/MyPhoto');

//上传我自己的图库
exports.addPhoto = async(req, res) => {
    try {
        let newPhoto = await new MyPhoto(req.body).save();
        res.status(200).send({
            status: 200,
            msg: '添加成功',
            photo: newPhoto
        })

    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '添加失败'
        })
    }
}