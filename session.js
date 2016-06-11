// Cookies и сессии пользователя

var app = require('express')();
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

app.use(cookieParser());
app.use(session({
  keys: ['key'],
}));

app.get('/', function (req, res) {
  req.sessionOptions.maxAge = 5000;
  
  var count = req.session.views || 0; // 0 по-умолчанию

  req.session.views = ++count; // увеличиваем значение на 1
                               // и сохраняем в сессию
  res.end(count + ' показ(ов)');
});

app.listen(8000, function () {
  console.log('The application was launched on 8000 port!');
});
