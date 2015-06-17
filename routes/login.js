/**
 * Created by Jason on 2015/6/13.
 */
var  express=require('express');
var  router=express.Router();

var sqlOperator=require('../services/sqlQperator.js');
//第一次进入入口
router.get('/',function(req,res,next){
    //console.log("第一次进入");
    res.render('login',{title:'Express'});
});
//退出登录清除session
router.get('/login',function(req,res,next){
    //console.log("第二次进入");
    if(req.query.logout=="123")
    {
        if(req.session.user!=undefined)
        {
            req.session.destroy(function(err){
                //console.log(err);
            });
        }
    }
    res.render('login', { title: 'Express' });
});
//登录post请求入口
//router.post('/',function(req,res,next){
////1.从数据库中查找数据判断用户登录是否正确
//// 2.同时将用户信息存入session
//    sqlOperator.query('select name,password from [user]',function(err,recordest){
//        console.log("第一次登录");
//        if(recordest[0].name.trim()==req.body.name.toLocaleLowerCase().trim()&&recordest[0].password.trim()==req.body.password.toLocaleLowerCase().trim())
//        {
//            req.session.user=recordest[0].name.trim();
//            res.redirect('product');
//        }
//        else
//            res.render('login',{title:'Express',condi:true});
//    });
//});
//登录后跳转入口
router.post('/login',function(req,res,next){
//1.从数据库中查找数据判断用户登录是否正确
// 2.同时将用户信息存入session
    console.log("第二次登录");
    sqlOperator.query('select name,password from [users]',function(err,recordset)
    {
        if(recordset[0].name.trim()==req.body.name.toLocaleLowerCase().trim()&&recordset[0].password.trim()==req.body.password.toLocaleLowerCase().trim())
        {
            //console.log(recordset[0].name.trim());
            req.session.user=recordset[0].name.trim();
            res.redirect('product');
        }
        else
            res.render('login',{title:'Express',condi:true});
    });
});
module.exports=router;