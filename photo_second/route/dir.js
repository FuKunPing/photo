const express=require('express');
const route=express.Router();
const {Dir}=require('../model/db');
const {SUCCESS,FAILED}=require('../../status.js');


// 处理 /dir 请求，显示服务器上所有的相册
route.get('/',function(req,res){
    // 从数据库获取当前服务器上有哪些文件夹
    Dir.find({},null,{sort: {name:1}},function(err,dirs){
      if(err){
        console.log(err)
        res.render("error",{errMsg:"获取文件夹失败"});
        return ;
      }
      // dirs是一个对象数组
      console.log(dirs);
      res.render('index',{dirs:dirs})
    })
  })



















module.exports = route;



