// 处理相册的请求
const express=require("express");
const router=express.Router();
const {Dir}=require('../model/db.js');

// 处理 /dir 请求 (所有以/dir开头的请求),显示服务器上所有的相册
router.get('/',function(req,res){
    // 从数据库获取当前服务器上有哪些文件夹
    //{sort:{name=1}} 排序
    Dir.find({},null,{sort:{name:1}},function(err,dirs){
        if(err){
            console.log(err);
            res.render('error',{errMsg:"查询失败"});
            return ;
        }
        // 查询到了数据库的就显示到页面
        res.render('index',{dirs:dirs});
    })
});

