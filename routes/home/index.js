var express = require('express');
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog137"
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoClient.connect(DB_STR,function (err,db) {
      if(err){
        res.send(err);
        return;
      }
      var c=db.db("myblog137").collection('posts');
      c.find().toArray(function (err,docs) {
          if(err){
            res.send(err);
            return;
          }
          var c1=db.db("myblog137").collection('cats');
          c1.find().toArray(function (err,result) {
              if(err){
                res.send(err);
                return;
              }
              res.render('home/index',{data:docs,data1:result})
          })
      })
  })
});

module.exports = router;
