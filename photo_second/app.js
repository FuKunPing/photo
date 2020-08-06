const express=require('express');
const app=express();
const router=require('./route/index.js');
app.listen(4000);

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/',function(req,res){
    res.redirect('/dir');
});

app.use('/dir',router.dir);

app.use('/pic',router.pic);

// 处理所有其他错误的请求地址
app.use(function(req,res){
    res.render('error',{errMsg:"地址错误"})
  })






