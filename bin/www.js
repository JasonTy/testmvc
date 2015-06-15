/**
 * Created by Jason on 2015/6/12.
 */
var http=require('http');
var app=require('../app.js')
http.createServer(app).listen(3000).on('listening',function(){
    console.log('Running');
});