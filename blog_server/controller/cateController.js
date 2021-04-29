const Category = require('../models/Category.js');
const express = require('express');

//获取所有的标签
exports.getAllCates = async(req, res) => {
    try {
        let result = await Category.find();
        res.status(200).send({
            status: 200,
            msg: '获取分类成功',
            list: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取分类失败'
        })
    }
}

//根据id获取文章数据
exports.getCateById = async(req, res) => {
    try {
        console.log('来了');
        let result = await Category.findById(req.query.id);
        console.log(result);
        res.status(200).send({
            status: 200,
            msg: '获取分类成功',
            cate: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取分类失败'
        })
    }
}