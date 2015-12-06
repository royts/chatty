var _ = require('underscore');

var waitingForAnswer = null;
var answered = [];

function isQuestion(q) {
  return q.indexOf('?') > -1;
}

function reset() {
  waitingForAnswer = null;
}


module.exports = {
  getPreviousAnswer: function (question) {
    var questionWords = question.split(' ');
    var found = answered.filter(function (answer) {
      return _.intersection(answer.q.split(' '), questionWords).length >= 2;
    });

    if (!found || found.length === 0) {
      return "";
    }

    return found[0].a;
  },

  learn: function (q) {

    if (isQuestion(q)) {
      waitingForAnswer = q;
      return;
    }

    if (waitingForAnswer) {
      answered.push({
        q: waitingForAnswer,
        a: q
      });
      reset();
    }
  },
  reset: reset
}