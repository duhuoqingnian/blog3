var express = require('express');
const mongoClient=require('mongodb').MongoClient;
const DB_STR="mongodb://localhost:27017/myblog137"
var ObjectId=require("mongodb").ObjectID
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 //载入登陆页面
    res.render('admin/login')
});
//用户登录处理
router.post('/signin',function (req,res) {
    //获取用户名和密码
    var username=req.body.username;
    var pwd=req.body.pwd;

    mongoClient.connect(DB_STR,function (err,db) {
        if(err){
            res.send(err);
            return;
        }
        var c=db.db("myblog137").collection("users");
        c.find({username:username,pwd:pwd}).toArray(function (err,docs) {
            if(err){
              res.send(err);
              return;
            }
            if(docs.length){
              //登录成功
                req.session.isLogin=true;
                res.redirect('/admin/index')
            }else{
              res.redirect('/admin/users')
            }
        })
    })
});
//用户注销操作
router.get('/logout',function (req,res) {
    req.session.isLogin=null;
    res.redirect('/admin/users')
})

module.exports = router;
