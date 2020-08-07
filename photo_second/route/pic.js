const express=require('express');
const route=express.Router();
const {Pic}=require('../model/db');
const {SUCCESS,FAILED}=require('../../status.js');
const { pic } = require('.');

// get /pic/show 显示相册里的图片
// route.get('/show',function(req,res){
//     // 获取请求参数得到被点击的相册名称
//     var dirName=req.query.dirName.trim();
//     console.log(dirName);
//     //查找数据库里的数据
//     Pic.find({dir:dirName},function(err,pics){
//         // if(err){
//         //     console.log(err);
//         //     res.render('error',{errMsg:"获取相册图片失败"})
//         //     return ;
//         // }
//         console.log(err);
//         res.render('show',{pics:pics});
//     }) 
// });


















module.exports = route;