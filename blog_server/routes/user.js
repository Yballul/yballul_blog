const express = require("express");
const Router = express.Router;
const router = new Router();
const userController = require('../controller/userController.js');
const User = require("../models/User.js");

//检验username是否存在
router.get('/ifExist', userController.ifExisitEmail);

//测试加入一个user
// router.get('/test', async(req, res) => {
//     try {
//         let user = new User({
//             username: 'hell123217',
//             password: '1234561asd21233',
//             email: '1102067530@qq.com'
//         });
//         let newUser = await user.save();
//         console.log(newUser);
//         res.send({
//             status: 200
//         })
//         let i = 10 /
//             console.log(i);
//         console.log(newUser.create_time);
//         console.log(new Date(newUser.create_time).getTime());

//     } catch (error) {
//         res.send({
//             status: 500
//         })
//     }


// })


module.exports = router;