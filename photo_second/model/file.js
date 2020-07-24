// 处理文件的
var fs=require("fs");

/**
* @method 读取某个文件夹的内容
* @param { String } dirName 被读取的文件夹名称或路径
* @param { Function } cb 回调函数
*/
exports.getDirs=function(dirName,cb){
    // 读取文件
    fs.readdir(dirName,function(err,files){
        cb(err,files);
    })
}
