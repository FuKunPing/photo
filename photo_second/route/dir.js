// 创建相册相关的路由
const express=require("express");
const router=express.Router();


// 处理 /dir 请求 (所有以/dir开头的请求),显示服务器上所有的相册
// 因为app.js设置了根目录/dir，所以这边不用/dir
router.get('/',function(req,res){
    // 将uploads里面的文件夹显示出来
    
        // 成功
})

    
  

// 处理get方式的 /dir/mkdir请求，跳转到新建相册页面

    // 跳转到该页面
    //该页面不需要渲染数据,所有不需要传递数据过去 


// 处理 post方式的 /dir/mkdir ，创建相册
router.post('/mkdir',function(req,res){
    // 获取请求参数dirName
  
    // 检查dirName的合法性
    

    // 调用file的create方法来创建文件夹
    // 将文件夹创建在uploads文件夹里面
   
});
// 处理/dir/check请求，获取传递过来的参数，并检查文件夹名称是否已经存在

    // 获取参数
    
    
        // 如果没有数据，则返回状态1
      
    // 获取所有文件夹，检查其中有没有该名称的文件夹
    
        // 读取成功，开始检查是否存在
       
            // 找到了
           
            // 没找到
           

// 处理/dir/delete 请求，删除相册

    // 获取参数
    
    // 调用file的delete方法删除文件夹
    





// 暴露路由
