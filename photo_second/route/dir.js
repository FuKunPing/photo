const express=require('express');
const route=express.Router();
const {Dir}=require('../model/db');
const {SUCCESS,FAILED}=require('../../status.js');
const fs=require('fs');
const rf=require("rimraf");


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

// 处理 get方式的 /dir/mkdir 请求，跳转到新建相册页面
route.get('/mkdir',function(req,res){
	res.render('create');
});

// post /dir/mkdir 创建相册ajax
route.post('/mkdir',function(req,res){
	var dirName=req.body.dirName;
	if(!dirName){
		res.send({status:FAILED,msg:"相册名不合法"});
		return ;
	}
	// fs模块创建文件夹，保存进数据库
	fs.mkdir('./uploads/'+dirName,function(err){
		if(err){
			console.log(err);
			res.send({status:FAILED,msg:"创建失败"});
			return ;
		}
		// 创建成功，保存数据库
		var o=new Dir({name:dirName});
		o.save(function(err,d){
			res.send({status:SUCCESS,msg:"创建成功"});
		})
	});
})

// get  /dir/check 获取传递过来的参数并检查文件夹名称是否已经存在ajax
route.get('/check',function(req,res){
	var dirName=req.query.dirName;
	if(!dirName){
		res.send({status:FAILED,msg:"文件夹名称不能为空"});
		return ;
	}
	// 判断数据库里的dirName是否已经存在
	Dir.find({name:dirName},function(err,dirs){
		if(err){
			console.log(err);
			res.send({status:FAILED,msg:"网络波动"});
			return ;
		}
		console.log(dirs);
		// 打印了说明查找到了
		if(dirs.length>0){
			res.send({status:FAILED,msg:"文件夹已存在"});
		}else{
			res.send({status:SUCCESS,msg:"可以使用"});
		}
	})
});

// 处理/dir/delete 请求，删除相册 ajax
route.get('/delete',function(req,res){
	var dirName=req.query.dirName.trim();
	if(!dirName){
		res.send({status:FAILED,msg:"参数不合法"});
		return ;
	}
	// 删除非空文件夹，使用rimraf模块
	rf('./uploads/'+dirName,function(err){
		if(err){
			console.log(err);
			res.send({status:FAILED,msg:"删除失败"});
			return ;
		}
		// 删除文件夹成功，去删除数据库中的记录
		Dir.deleteOne({name:dirName},function(err,raw){
			res.send({status:SUCCESS,msg:"删除成功"});
		})		
	})
})




















module.exports = route;



