const Article = require('../models/Article.js');
const Category = require('../models/Category.js');
const Like = require('../models/Like.js');
const Tag = require('../models/Tag.js');
const TagMapping = require('../models/TagMapping.js');


//添加文章
exports.addArticle = async(req, res) => {
    try {
        const { title, content, cate, tag_list, create_time, cover } = req.body;
        //先创建文章
        let newArticle = await new Article({ title, content, cate, create_time, cover }).save();
        //确定文章所拥有的标签
        console.log(tag_list);
        for (let item of tag_list) {
            await new TagMapping({ article_id: newArticle[`_id`], tag_id: item }).save();
        }
        res.send({
            status: 200,
            msg: '创建文章成功',
            data: {
                article: newArticle
            }
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: 400,
            msg: '创建文章失败'
        })
    }
}

//增加访客量
exports.addView = async(req, res) => {
    try {
        console.log(req.query);
        let articleView = await Article.findById(req.query.article_id);
        let newArticle = await Article.findOneAndUpdate({ _id: req.query.article_id }, { view: articleView.view + 1 });
        res.status(200).send({
            status: 200,
            msg: '访问成功'
        })

    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '访问失败'
        })
        console.log(error);
    }
}

//根据分类获取文章
exports.getArticleByCate = async(req, res) => {

    try {
        let { page, pageSize, cate } = req.query;
        console.log(page);
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        let skip = pageSize * (page - 1);
        //先查出文章
        let article = await Article.find({ cate }).populate('cate').skip(skip).limit(pageSize).sort({ create_time: -1 });
        //文章总数
        console.log(article.length);
        let totalNum = await Article.countDocuments({ cate });
        //查出文章的标签
        for (let item of article) {
            let array = [];
            //在mapping中查找出所有对应关系
            let mapping = await TagMapping.find({ article_id: item['_id'] });
            for (let item1 of mapping) {
                array.push(await Tag.findOne({ _id: item1['tag_id'] }).select('name'));
            }
            item.tag = array;
        }
        res.status(200).send({
            status: 200,
            msg: '获取成功',
            list: article,
            totalNum
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取失败'
        })
    }
}

//获取所有文章
exports.getAllArticle = async(req, res) => {
    try {
        let { page, pageSize } = req.query;
        console.log(page);
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        let skip = pageSize * (page - 1);
        //先查出文章
        let article = await Article.find({}).populate('cate').skip(skip).limit(pageSize).sort({ create_time: -1 });
        //文章总数
        console.log(article.length);
        let totalNum = await Article.countDocuments();
        //查出文章的标签
        for (let item of article) {
            let array = [];
            //在mapping中查找出所有对应关系
            let mapping = await TagMapping.find({ article_id: item['_id'] });
            for (let item1 of mapping) {
                array.push(await Tag.findOne({ _id: item1['tag_id'] }).select('name'));
            }
            item.tag = array;
        }
        res.status(200).send({
            status: 200,
            msg: '获取成功',
            list: article,
            totalNum
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 400,
            msg: '获取失败'
        })
    }
}

//根据id获取文章
exports.getArticleById = async(req, res) => {
        try {
            console.log(req.query);
            let article = await Article.findById(req.query.id).populate('cate');
            let array = [];
            //在mapping中查找出所有对应关系
            let mapping = await TagMapping.find({ article_id: req.query.id });
            for (let item of mapping) {
                array.push(await Tag.findOne({ _id: item['tag_id'] }).select('name'));
            }
            article.tag = array;
            res.status(200).send({
                status: 200,
                msg: '获取成功',
                article: article
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                msg: '获取失败'
            })
        }
    }
    //根据名字搜索文章的标题，支持模糊查询，返回标题
exports.searchArticleTitle = async(req, res) => {
        try {
            console.log(req.query.detail);
            let titles = await Article.find({ title: { $regex: req.query.detail } }).select('title');
            console.log(titles);
            res.status(200).send({
                status: 200,
                msg: "搜索文章标题成功",
                titles: titles
            })
            console.log(titles);
        } catch (error) {
            res.status(400).send({
                status: 400,
                msg: '获取失败'
            })
        }
    }
    //搜索文章
exports.searchArticleDetail = async(req, res) => {
    try {
        console.log(req.body.detail);
        let articles = await Article.find({ title: { $regex: req.body.detail } });
        console.log(articles);
        res.status(200).send({
            status: 200,
            msg: "搜索文章成功",
            articles
        })
        console.log(titles);
    } catch (error) {
        res.status(400).send({
            status: 400,
            msg: '获取失败'
        })
    }
}