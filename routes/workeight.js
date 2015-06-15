/**
 * Created by Jason on 2015/6/15.
 */
var express=require('express');
var q=require('q');
var router=express.Router();
var sqlOperator=require('../services/sqlQuery.js');

//第一次请求入口
router.get('/',function(req,res,next){
    var list=[];//保存用户信息
    var productlsit=[];
    sqlOperator.query('select *  from users').then(function(data){
        var sql="";
        sql+="(";
        for(var i=0;i<data.length;i++)
        {
            sql+=data[i].id;
            if(i<(data.length-1))
            {
                sql+=",";
            }
        }
        sql+=")";
        //console.log(sql);
        list=data;
        sqlOperator.query('select *  from orders where userid in'+sql).then(function(data){
//拼接数据
            for(var i=0;i<data.length;i++)
            {
                var objects={};
                objects=data[i];
                for(var j=0;j<list.length;j++)
                {

                    if(data[i].userID==list[j].id)
                    {
                        objects.username=list[j].name;
                        break;
                    }
                }
                productlsit.push(objects);
            }
            var sql="";
            sql+="(";
            for(var i=0;i<data.length;i++)
            {
                sql+=data[i].productID;
                if(i<(data.length-1))
                {
                    sql+=",";
                }
            }
            sql+=")";
            sqlOperator.query('select *  from products where id in'+sql).then(function(data){
                var prolsit=[];
                for(var i=0;i<data.length;i++)
                {
                    var objects={};
                    objects=data[i];
                    for(var j=0;j<productlsit.length;j++)
                    {

                        if(data[i].id==productlsit[j].productID)
                        {
                            objects.username=productlsit[j].username;
                            break;
                        }
                    }
                    prolsit.push(objects);
                }
                //console.log(prolsit);
                res.render('workeight',{list:prolsit});
            })
        })
    });

});

module.exports=router;