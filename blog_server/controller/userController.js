const User = require('../models/User');

//检验email是否存在
exports.ifExisitEmail = async(req, res) => {
    try {
        let result = await User.findOne(req.query);
        if (result == null) {
            res.status(200).send({
                status: 200,
                msg: '邮箱没有重复'
            })
        } else {
            res.status(500).send({
                status: 400,
                msg: '邮箱重复'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            msg: '服务器错误'
        })
    }
}

//注册用户
exports.createUser = async(req, res) => {
    try {
        const data = req.body;
        //创建新用户
        let newUser = await new User(req.body).save();
        res.status(200).send({
            status: 200,
            msg: '用户创建成功'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            msg: '服务器错误'
        })
    }
}