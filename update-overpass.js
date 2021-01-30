requirejs = require('requirejs');
done= function() {};
requirejs.config({
baseUrl: __dirname,
});
var testmode = false;
requirejs(['js/common_nojq'], function () {
requirejs(['tempo30/app/update-overpass'], function(updateOverpass) {
console.log('loaded');
updateOverpass(testmode, done, done);
}, function(e) {
console.log('err',e);
});
}, function (a) {
console.log('error', a);
});

