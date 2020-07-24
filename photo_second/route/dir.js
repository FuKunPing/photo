// 处理相册的请求
const express=require("express");
const router=express.Router();
const file=require("../model/file.js");//引入操作文件的js

// 处理 /dir 请求 (所有以/dir开头的请求),显示服务器上所有的相册
router.get('/',function(req,res){
     // 将uploads里面的文件夹显示出来->这里调用file.js
     file.getDirs('../uploads',function(err,files){
         if(err){
            //  读取错误跳转到错误ejs
            res.render("error",{errMsg:"打开相册失败"});
            return ;
         }
     });
});

