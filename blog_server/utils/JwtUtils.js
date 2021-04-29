const jwt = require('jsonwebtoken');

//密钥
const secret = "kjafhkjsal";
exports.createToken = (user_id) => {
    let obj = {};
    //存入token的数据
    obj.data = user_id;
    //token的创建时间
    obj.ctime = Date.now();
    //设置过期时间,3天过期
    obj.expiresIn = 1000 * 60 * 60 * 24 * 3;
    let token = jwt.sign(obj, secret);
    console.log('生成的token值' + token);
    return token;
}

exports.verifyToken = (token) => {
    const { data, ctime, expiresIn } = jwt.veryfy(token, secret);
    let nowTime = Date.now();
    //如果现在的时间距离创建时间小于可维持的时间，那么就是没过期
    if (nowTime - ctime < expiresIn)
        return true;
    else
        return false;
}