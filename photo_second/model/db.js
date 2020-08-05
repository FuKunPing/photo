const mongoose=require('mongoose');

var dirSchema=mongoose.Schema({
    name:String
});

var picSchema=mongoose.Schema({
    name:String,
    dir:String
});

var Dir=mongoose.model('dir',dirSchema);
var Pic=mongoose.model('pic',picSchema);

var url='mongdb://localhost:27017/web';
var opt={useNewUrlParser:true,useUnifiedTopology:true};
mongoose.connect(url,opt);

module.exports={
    Dir:Dir,
    Pic:Pic
}

