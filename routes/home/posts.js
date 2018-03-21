var express=require("express");
var mongoClient=require("mongodb").MongoClient;
const DB_STR="mongodb://localhost:27017/myblog137"
var objectId=require("mongodb").ObjectId;

var router=express.Router();


/*获取详情页面*/
 router.get('/',function (req,res,next) {
     var id=req.query.id;
     mongoClient.connect(DB_STR,function (err,db) {
         if(err){
             red.send(err)
             return;
         }
         var c=db.db("myblog137").collection('posts');
         c.find({_id:objectId(id)}).toArray(function (err,docs) {
             if(err){
                 res.send(err)
                 return;
             }
             res.render('home/article',{data:docs[0]})
         })
     })
 })



module.exports=router;