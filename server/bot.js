var s = require('string'),
chuck = require('./chuck'),
question = require('./question'),
Q = require('q');

function askForChuckFact(message) {
  return s(message.toLowerCase()).contains("chuck") ||
    s(message.toLowerCase()).contains("norris");
}


function isBotQuestion(message) {
  return s(message).startsWith('bot');
}

function newMessage(msg) {

  var deferred = Q.defer();

  var message = msg.message.trim();

  if (isBotQuestion(message)) {

    var cleanQuestion = s(message).chompLeft('bot').trim();

    if (askForChuckFact(cleanQuestion)) {

      chuck.getFact().then(function (fact) {
        deferred.resolve("* Chuck Norris fact * : " + fact);
      });
    } else {

      var a = question.getPreviousAnswer(cleanQuestion);
      console.log("-->bot answer: ", a);

      deferred.resolve(a);
    }

  } else{
    question.learn(message);
  }

  return deferred.promise;
}


module.exports = {
  newMessage: newMessage
}
