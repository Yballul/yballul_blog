const JwtUtils = require('../utils/JwtUtils');
//验证用户是否携带了token值
module.exports = (req, res, next) => {
    if (req.url != '/user/login' && req.url != '/user/regist') {
        let token = req.headers.authorization;
        if (token == null) {
            res.status(400).send({
                status: 400,
                msg: 'token值为空'
            });
        } else if (!JwtUtils.verifyToken(token)) {
            res.status(400).send({
                status: 400,
                msg: "token已过期"
            })
        } else
            next();
    } else {
        next();
    }
}