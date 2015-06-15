/**
 * Created by Jason on 2015/6/12.
 */
var  express=require('express');
var  router=express.Router();
//router.get('/',function(req,res,next){
//res.render('index',{title:'Express'});
//});
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports=router;