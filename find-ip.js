var rest = require('restler');
var q = require('q');

var findIp = function () {
  var wtfismyipUrl = "https://wtfismyip.com/json";
  var deferred = q.defer();

  rest.get(wtfismyipUrl).on('complete', function (data) {
    deferred.resolve(data.YourFuckingIPAddress);
  });
  return deferred.promise;
};

module.exports = findIp;
