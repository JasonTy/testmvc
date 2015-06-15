/**
 * Created by Jason on 2015/6/13.
 */
//创建日志
var path=require('path');
module.exports=function(options)
{
    return function(req,res,next){
        if(req.session.user!=undefined) {
            var $date = new Date();
            console.log();
            var $dateformat = $date.toLocaleString();//$date.getYear() + "-" + ($date.getMonth() + 1) + "-" + $date.getDay() + " " + $date.getHours() + ":" + $date.getMinutes() + ":" + $date.getSeconds();
            var logtext = $dateformat;
            logtext += " " + req.url;
            logtext += "\r\n";
            options.stream.write((req.session.user||"") + " " + logtext);
        }
        next();
    };
};