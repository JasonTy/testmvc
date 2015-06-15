/**
 * Created by Jason on 2015/6/13.
 */
var mssql=require('mssql');
var q=require('q');
var config={
    user:'sa',//user:'sa',
    password:'sql@123',//password:'123456',
    server:'192.168.2.199',//server:'localhost',
    database:'testing',
    options:{
        encrypt:false
    }
};

exports.query=function(sql)
{
    var deferred = q.defer();
    var  connection=new mssql.Connection(config,function(err){

        var  request=new mssql.Request(connection);
        request.query(sql,function(err,recordset){
    if(err)
    {
        deferred.reject(err);
    }
      else
    {
        deferred.resolve(recordset);
    }
        });

    });
    return deferred.promise;
};
//用来测试是否得到数据
//exports.query('select *  from  users').then(function(data)
//{
//    console.log(data);
//})