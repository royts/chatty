var p = require('path');
module.exports = function (app, express) {

  app.use(express.static(
    p.join(__dirname, '..', 'client')
  ));

  app.get('/app*', function (req, res) {
    res.sendfile(p.join(__dirname, '..', 'client/index.html')
    );
  });

  app.get('/', function (req, res) {
    res.redirect('/app');
  });
};
