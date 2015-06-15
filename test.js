/**
 * Created by Jason on 2015/6/15.
 */
  //  var events=require('events');
  //var eventEmitter=new events.EventEmitter();
    var q=require('q');
var step1=function(callback)
{
    console.log('Step1 Start');
    var deferred = q.defer();
    setTimeout(function(){
        callback('Step1');
        deferred.resolve('step1');
        //eventEmitter.emit('step1end');
    },3000);
    return deferred.promise;
};

    var step2 = function (callback) {
        console.log('Step2 Start');
        var deferred = q.defer();
        setTimeout(function () {
            callback('Step2');
            deferred.resolve('step2');
            //eventEmitter.emit('step2end');
        }, 2000);
        return deferred.promise;
    };


    var step3 = function (callback) {
        console.log('Step3 Start');
        setTimeout(function () {
            callback('Step3');
        }, 1000)
    };
//eventEmitter.on('step1end',function(){
//    step2(_callback);
//    //setTimeout(function(){
//    //    //console.log('Event-Step1 End')
//    //
//    //},100);
//});
//eventEmitter.on('step2end',function(){
//    step3(_callback);
//});
//
//step1(_callback);

var _callback=function(msq)
{
    console.log(msq+'end');
};
step1(_callback).then(function(){
    step2(_callback).then(function(){
        step3(_callback);
    });
});
