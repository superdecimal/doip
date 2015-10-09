var rest = require('restler');
var config = require('./config');
var digitalOcean = require('./digital-ocean');
var findIp = require('./find-ip');

var doInst = new digitalOcean(config.apiKey);

findIp().then(function (ip) {
  doInst.getDomainRecord(config.domain, config.record).then(function (domainRecord) {
    return doInst.updateDomainRecord(config.domain, config.record, domainRecord.id, ip);
  })
  .then(function (data) {
    console.log(new Date() + " IP: " + data.domain_record.data) ;
  });

});
