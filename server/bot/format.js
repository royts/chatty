var util = require('util');

module.exports = {
  formatBotResponse: function(title, answer) {
  return util.format('<span class="answer-title">%s</span><span class="answer-body">%s</span>', title, answer);
}
}