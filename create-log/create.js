/**
 * Created by Jason on 2015/6/13.
 */
//������־
var path=require('path');
module.exports=function(options)
{
    return function(req,res,next){
        if(req.session.user!=undefined) {
            var $date = new Date();
            var $dateformat = $date.toLocaleString();//$date.getYear() + "-" + ($date.getMonth() + 1) + "-" + $date.getDay() + " " + $date.getHours() + ":" + $date.getMinutes() + ":" + $date.getSeconds();
            var logtext = $dateformat;
            logtext += " " + req.url;
            logtext += "\r\n";
            //options.stream.writeFile(path.join(__dirname, 'account.js'), JSON.stringify(tempAccount), function (err) {
            //    if (err) throw err;
            //    console.log("Export Account Success!");
            //
            //});
            options.stream.writeFile((req.session.user||"") + " " + logtext);
        }
        next();
    };
};