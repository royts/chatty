var s = require('string'),
chuck = require('./chuck'),
question = require('./question'),
Q = require('q'),
format = require('./format');

function askForChuckFact(message) {
  return s(message.toLowerCase()).contains("chuck") ||
    s(message.toLowerCase()).contains("norris");
}


function isBotQuestion(message) {
  return s(message).startsWith('bot');
}

function formatBotAnswer(answer) {
  return format.formatBotResponse("I think I know the answer to this question:", answer);
}

function formatChuckAnswer(answer) {
  return format.formatBotResponse("Here is a Chuck Norris fact:", answer);
}


function newMessage(msg) {

  var deferred = Q.defer();

  var message = msg.message.trim();

  if (isBotQuestion(message)) {

    question.reset();

    var cleanQuestion = s(message).chompLeft('bot').trim().toString();

    if (askForChuckFact(cleanQuestion)) {

      chuck.getFact().then(function (fact) {
        deferred.resolve(formatChuckAnswer(fact));
      });

    } else {
      deferred.resolve(formatBotAnswer(question.getPreviousAnswer(cleanQuestion)));
    }

  } else {
    question.learn(message);
  }

  return deferred.promise;
}


module.exports = {
  newMessage: newMessage
};
