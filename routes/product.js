/**
 * Created by Jason on 2015/6/13.
 */
var express=require('express');
var sqlOperator=require('../services/sqlQperator.js');
var router=express.Router();

//第一次请求入口
router.get('/',function(req,res,next){
    var $date=new Date().getHours();
    sqlOperator.query('select *  from products',function(err,recordset){

        res.render('product', {
            am: ($date >= 6 && $date < 12),
            at: ($date >= 12 && $date < 18),
            pm: (($date >= 18)),
            name: req.session.user,
            list: recordset
        });
    });


});

//保存数据
router.post('/add',function(req,res,next){
    var  str="insert into products(name,des,image) values('"+req.body.name+"','"+req.body.content+"','"+req.body.content+"')";
    //console.log(str);
    sqlOperator.query(str,function(err,recordset){
        res.redirect("/product");
    });
});
//修改数据
router.post('/update',function(req,res,next){
    var  str="update products set des='"+req.body.content+"',name='"+req.body.name+"'where id="+req.body.id;//,price="+req.body.price+"
    sqlOperator.query(str,function(err,recordset){
    res.send({isSuccess:true});
    });
});
//删除数据
router.post('/delete',function(req,res,next){
    sqlOperator.query('delete  from products where id='+req.body.id,function(errs,recordsets){
        res.send({isSuccess:true});
    });
});
module.exports=router;