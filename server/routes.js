var p = require('path');
module.exports = function (app, express) {

  app.use(express.static(
    p.join(__dirname, '..', 'client')
  ));

  app.get('/app*', function (req, res) {
    res.sendfile(p.join(__dirname, '..', 'client/index.html')
    );
  });

  var funnyStuff = {question: 'Why did the chicken cross the road?', answer: 'To get to the other side'};

  app.get('/data', function (req, res) {
    res.json(funnyStuff);
  });
};
