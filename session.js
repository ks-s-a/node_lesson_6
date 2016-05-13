// Cookies and user session
var app = require('express')();
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

// Set middlewares
app.use(cookieParser());
app.use(session({
  keys: ['key'],
}));

// Set request handler
app.get('/', function (req, res) {
  var count = req.session.views || 0; // 0 it is a default value

  req.session.views = ++count; // increment value 
                               // and save it in user session
  res.end(count + ' показ(ов)');
});

app.listen(8000, function () {
  console.log('The application was launched on 8000 port!');
});
