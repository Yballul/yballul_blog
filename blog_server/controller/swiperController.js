const Swiper = require('../models/Swiper.js');
const express = require('express');

//获取所有的轮播图
exports.getAllSwipers = async(req, res) => {
    try {
        let result = await Swiper.find().limit(5);
        res.status(200).send({
            status: 200,
            msg: '获取轮播图成功',
            list: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取轮播图失败'
        })
    }
}

//添加轮播图的接口
exports.addSwipers = async(req, res) => {
    let list = req.body.list;
    try {
        let result = await Swiper.insertMany(list);
        res.status(200).send({
            status: 200,
            msg: '添加成功',
            list: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '添加轮播图失败'
        })
    }
}