var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog137"
var ObjectId=require("mongodb").ObjectID
var router = express.Router();

/* 文章列表路由 */
router.get('/', function(req, res, next) {
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("posts");
        c.find().toArray(function (err,docs) {
            if(err){
                res.send(err);
                return;
            }
            res.render('admin/article_list',{data:docs});
        })
    })

});
/* 添加文章路由*/
router.get('/add', function(req, res, next) {
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("cats");
        c.find().toArray(function (err,docs) {
            if(err){
                res.send(err);
                return;
            }
            res.render('admin/article_add',{data:docs})
        })
    })
});
//完成具体添加文章的功能
router.post('/add',function (req,res) {
    //获取表单提交的数据
    var cat=req.body.cat;
    var title=req.body.title;
    var summary=req.body.summary;
    var content=req.body.content;
    var time=new Date();
    var post={
        "cat":cat,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time,
    }
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("posts");
        c.insert(post,function (err,result) {
            if(err){
                res.send(err);
                return;
            }
            res.send("添加文章成功 <a href='/admin/posts'>查看文章列表</a>")
        })
    })
})
router.get('/delete',function (req,res) {
    var id=req.query.id;
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("posts");
        c.remove({_id:ObjectId(id)},function (err,result) {
            if(err){
                res.send(err);
                return;
            }
            res.redirect('/admin/posts')
        })
    })
})
module.exports = router;
