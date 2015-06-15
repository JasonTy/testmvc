/**
 * Created by Jason on 2015/6/12.
 */
var  express=require('express');//express  框架
var path=require('path');//跳转相关
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var uuid=require('uuid');
var fs=require('fs');

//自定义模块（中间件）
var verification=require('./verification-login');//验证是否登录
var create=require('./create-log');//写入日志


var app=express();

var index=require('./routes/index.js');//引用index视图
var login=require('./routes/login.js');//引用login视图
var product=require('./routes/product.js')//引用product视图
var workeight=require('./routes/workeight.js')//引用workeight联系Q视图

var stream=fs.createWriteStream('../log.txt');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hjs');

//app.use(express.static(path.join(__dirname,'public')));

app.use(session({
genid:function(req)
{
    return uuid.v4();
},
    secret:'www.1caifu',
    resave:false,
    saveUninitialized:false
}));

//建立中间件验证用户是否登录
app.use(verification({login:'/login'}));
//写入日志
app.use(create({stream:stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//app.engine('html',require('hjs').__expresss);

app.use('/',login);
app.use('/index',index);
app.use('/product',product);
app.use('/workeight',workeight);
//function(req,res,next){
//    res.render('index.hjs',{title:'Express'});
//}
//app.get('/',function(req,res,next){
//    res.render('index.hjs',{title:'Express'});
//});

app.use(function(req,res,next){
    //res.status(404);
    //res.render('error',{statusCode:404});
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports=app;