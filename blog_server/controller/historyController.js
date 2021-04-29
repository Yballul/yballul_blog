const History = require('../models/History.js');

//获取对应用户的历史
exports.getAllHistory = async(req, res) => {
    try {
        const { user_id } = req.body;
        let result = await History.find(req.body).sort({ create_time: -1 });
        res.status(200).send({
            status: 200,
            msg: '获取搜索历史成功',
            list: result
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取历史失败'
        })
    }
}

//添加搜索历史
exports.addHistory = async(req, res) => {
    try {
        let result = await new History(req.body).save();
        res.status(200).send({
            status: 200,
            msg: '添加历史成功',
            historyOne: result
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '添加历史失败'
        })
    }
}

//删除单条搜索历史
exports.deleteHistoryForOne = async(req, res) => {
    try {
        let result = await History.deleteOne(req.query);
        res.status(200).send({
            status: 200,
            msg: '删除历史成功',
            historyOne: result
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '删除历史失败'
        })
    }
}

//删除所有的搜索历史
exports.deleteHistoryForAll = async(req, res) => {
    try {
        let result = await History.deleteMany();
        res.status(200).send({
            status: 200,
            msg: '删除历史成功',
            historyAll: result
        })

    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '删除历史失败'
        })
    }

}