var _ = require('underscore'),
s = require('string');

var waitingForAnswer = null;
var answered = [];

function isQuestion(q) {
  return q.indexOf('?') > -1;
}

function reset() {
  waitingForAnswer = null;
}

function cleanQuestion(question){
  return s(question).replaceAll("what","")
    .replaceAll("where", "")
    .replaceAll("when", "")
    .replaceAll("how", "")
    .toLowerCase();
}

module.exports = {
  getPreviousAnswer: function (question) {
    question = cleanQuestion(question);

    var questionWords = question.split(' ');
    var found = answered.filter(function (answer) {
      return _.intersection(answer.q.split(' '), questionWords).length >= 2;
    });

    if (!found || found.length === 0) {
      return "";
    }

    return found[0].a;
  },

  learn: function (question) {

    question = cleanQuestion(question);

    if (isQuestion(question)) {
      waitingForAnswer = question;
      return;
    }

    if (waitingForAnswer) {
      answered.push({
        q: waitingForAnswer,
        a: question
      });
      reset();
    }
  },
  reset: reset
}