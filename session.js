var app = require('express')();
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

app.use(cookieParser());
app.use(session({keys: ['secret']}));

app.get('/', function (req, res, next) {
  var count = req.session.views || 0;

  req.session.views = ++count;
  res.end(count + ' показ(ов)');
});

app.listen(8000);
