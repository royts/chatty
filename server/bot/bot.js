var s = require('string'),
chuck = require('./chuck'),
question = require('./question'),
Q = require('q'),
util = require('util');

function askForChuckFact(message) {
  return s(message.toLowerCase()).contains("chuck") ||
    s(message.toLowerCase()).contains("norris");
}


function isBotQuestion(message) {
  return s(message).startsWith('bot');
}

function formatBotResponse(title, answer) {
  util.format('<span class="answer-title">%s</span><span class="answer-body">%s</span>', title, answer);
}

function formatBotAnswer(answer) {
  return formatBotResponse("I think I know the answer to this question:", answer);
}

function formatChuckAnswer(answer) {
  return formatBotResponse("Here is a Chuck Norris fact:", answer);
}


function newMessage(msg) {

  var deferred = Q.defer();

  var message = msg.message.trim();

  if (isBotQuestion(message)) {

    question.reset();

    var cleanQuestion = s(message).chompLeft('bot').trim();

    if (askForChuckFact(cleanQuestion)) {

      chuck.getFact().then(function (fact) {
        formatChuckAnswer(fact);
      });
    } else {

      var answer = formatBotAnswer(question.getPreviousAnswer(cleanQuestion));

      deferred.resolve(answer);
    }

  } else {
    question.learn(message);
  }

  return deferred.promise;
}


module.exports = {
  newMessage: newMessage
};
