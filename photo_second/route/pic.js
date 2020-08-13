const express=require('express');
const route=express.Router();
const {Pic, Dir}=require('../model/db');
const {SUCCESS,FAILED}=require('../../status.js');
const { pic } = require('.');
const fd=require('formidable');
const fs=require('fs');

//get /pic/show 显示相册里的图片
route.get('/show',function(req,res){
    // 获取请求参数得到被点击的相册名称
    var dirName=req.query.dirName.trim();
    console.log(dirName);
    //查找数据库里的数据
    Pic.find({dir:dirName},function(err,pics){
        console.log(err);
        res.render('show',{pics:pics});
    }) 
});

// 处理 get方式的/pic/upload 请求，跳转到上传页面
route.get('/upload',function(req,res){
    // 在上传图片时需要知道将图片传到哪个相册中
    // 获取uploads下所有的相册名
    Dir.find({},function(err,dirs){
        res.render('upload',{dirs:dirs});
    })
})

// 处理 post方式的/pic/upload 请求，上传图片
route.post('/upload',function(req,res){
    var form=new fd.IncomingForm();
    form.uploadDir='./temp';
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.render('error',{errMsg:"上传图片失败"});
            return ;
        }
        var dirName=fields.dirName;//文本域的值(相册名)
        var pic=files.pic;//图片信息
        var name=pic.name;//图片名
        var oldPath=pic.path;
        var newPath='./uploads/'+dirName+'/'+name;
        fs.rename(oldPath,newPath,function(err){
            console.log(err);
            var o=new Pic({
                name:name,
                dir:dirName
            });
            o.save(function(err,product){
                console.log(err);
                console.log(product);
                res.redirect('/pic/show?dirName='+dirName);
            })
        })
    })
})



module.exports = route;