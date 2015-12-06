var req = require('request'),
Q = require('q');

module.exports = {
  getFact: function () {
    var deferred = Q.defer();

    req('http://api.icndb.com/jokes/random', function (error, response, body) {
      if (error || response.statusCode !== 200) {
        deferred.resolve("");
      }
      deferred.resolve(JSON.parse(body).value.joke);
    });

    return deferred.promise;

  }
};