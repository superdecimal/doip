var q = require('q');
var rest = require('restler');

var digitalOcean = function (apiKey) {
  var url = 'https://api.digitalocean.com/v2/';

  var options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    }
  };

  this.getDomains = function () {
    var deferred = q.defer();

    rest.get(url + 'domains', options).on('complete', function (data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  };

  this.updateDomainRecord = function (domain, recordName, recordId, data) {
    var deferred = q.defer();

    rest.putJson(url + 'domains/' + domain + '/records/' + recordId, {'name': recordName, 'data': data}, options).on('complete', function (data) {
      deferred.resolve(data);
    });

    return deferred.promise;
  };

  this.getDomainRecord = function (domain, recordName) {
    var deferred = q.defer();

    rest.get(url + 'domains/' + domain + '/records', options).on('complete', function (data) {
      var i;
      var domainRecords = data.domain_records;
      for (i in domainRecords) {
        if (domainRecords[i].name === recordName) {
          deferred.resolve(domainRecords[i]);
        }
      }
    });
    return deferred.promise;
  };


};

module.exports = digitalOcean;
