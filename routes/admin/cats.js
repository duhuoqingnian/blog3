var express = require('express');
//引入第三方模块，直接初始化一个客户端对象
const mongoClient=require('mongodb').MongoClient;
const DB_STR="mongodb://localhost:27017/myblog137"
var ObjectId=require("mongodb").ObjectID
var router = express.Router();


/*分类列表*/
router.get('/', function(req, res, next) {
    // res.render('admin/category_list');
    mongoClient.connect(DB_STR,function (err,db) {
    if(err){
        res.send(err);
        return;
    }
    var c=db.db("myblog137").collection("cats");
    c.find().toArray(function (err,docs) {
    if (err){
        res.send(err);
        return;
    }
    res.render('admin/category_list',{data:docs})
    });
    })
});
/*添加列表*/
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
});
router.post('/add',function (req,res,next) {
    //获取表单提交过来的数据
    var title=req.body.title;
    var sort=req.body.sort;
   // console.log(title,sort)
    //验证提交过来的数据
    //将数据提交到数据库并完成提示并跳转

    //连接数据库
    mongoClient.connect(DB_STR,function(err,db){
        if(err){
            res.send(err)
            return;
        }
        //连接成功 db代表数据库
        var c=db.db("myblog137").collection("cats");
        c.insert({title:title,sort:sort},function (err,result) {
            if(err){
                res.send(err)
            }else{
                res.send("添加分类成功,<a href='/admin/cats'>查看分类列表</a>")
            }
        })
    })

});
//编辑分类
router.get('/edit', function(req, res, next) {
    var id=req.query.id;
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("cats");
        c.find({_id:ObjectId(id)}).toArray(function (err,docs) {
            if (err){
                res.send(err);
                return;
            }
            res.render('admin/category_edit',{data:docs[0]})
        });
    })
});
router.post('/edit',function (req,res,next) {
    //获取表单中的数据
    var title=req.body.title;
    var sort=req.body.sort;
    var id=req.body.id;
    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("cats");
        c.update({_id:ObjectId(id)},{$set:{"title":title,"sort":sort}},function (err,result) {
            if(err){
                res.send(err)
            }else{
                res.send("更新成功<a href='/admin/cats'>返会分类列表</a>")
            }
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
        var c=db.db("myblog137").collection("cats");
        c.remove({_id:ObjectId(id)},function (err,result) {
            if(err){
                res.send(err);
                return;
            }
            res.redirect('/admin/cats')
        })
    })
})
module.exports = router;
