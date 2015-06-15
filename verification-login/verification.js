/**
 * Created by Jason on 2015/6/13.
 */
var path=require('path');
module.exports=function(options)
{
return function(req,res,next)
{
  var $next=true;//默认情况可以进行下一步
    if(req.url.indexOf('product')>0)
    {
      if(req.session.user==undefined)
      {
          res.redirect(options.login);
          $next=false;
       }
    }
    if($next)
        next();

};
};