/**
 * Created by Jason on 2015/6/16.
 */
var should=require('should');
var  sqlQperator=require('../services/sqlQperator.js');
var getArray=function()
{
    return [1,2,3];
};

var  getString=function()
{
    return "Hello";
};

//describe('Test Biz Functions',function(){
//    it('should return  2', function () {
//       getArray().should.have.length(3);
//    });
//});
//
//describe('Test String Function',function(){
//    it('should begin with H',function(){
//        getString().should.startWith('H');
//    });
//});

describe('检查sqlQperator', function(){
    describe('检查是否可以按照条件查询', function(){
        it('should save without error', function(){
            return  sqlQperator.query("select *  from users where name='admin'",function(err,recordest){
               (recordest).should.have.length(1);
            });
        });
    });
});