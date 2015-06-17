/**
 * Created by Jason on 2015/6/17.
 */
var should = require('should');
var Q = require('q');

var query = function(sql) {
    var deferred = Q.defer();
//定义一个期望值
    if(sql) {
        deferred.resolve(1);
    } else {
        deferred.reject(-1);
    }
    return deferred.promise;
};

//anything
describe('Testing Group', function() {
    it('should return 1', function() {
        return   query().then(function(data) {
             data.should.equal(1);
        });
    });
});