const Tag = require('../models/Tag.js');
const express = require('express');

//获取所有的标签
exports.getAllTags = async(req, res) => {
    try {
        let result = await Tag.find();
        res.status(200).send({
            status: 200,
            msg: '获取标签成功',
            list: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取标签失败'
        })
    }
}