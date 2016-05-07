var app = require('express')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var LocalStratagy = require('passport-local');

app.use(cookieParser()); // req.cookies
app.use(session({keys: ['key']})); // req.session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratagy(function (username, pass, done) {
  if (username !== 'admin' || pass !== 'admin') {
    return done(null, false)
  } else {
    return done(null, {username: username});
  }
}));

passport.serializeUser(function (user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  return done(null, {username: username});
});

app.get('/', function (req, res) {
  return res
    .status(200)
    .send('Это главная страница!');
});

app.get('/login', function (req, res) {
  return res
    .status(200)
    .send('<form action="/login" method="post">' +
      'Login: ' +
      '<input type="text" name="username" />' +
      '<input type="password" name="password" />' +
      '<input type="submit" />' +
    '</form>');
});

app.post('/login', bodyParser.urlencoded({ extended: false }), passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login'
}));

app.use('/user/settings', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Совершенно секретная часть. Только для тебя, ' + req.user.username);
});

app.use('/user', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Привет, ' + req.user.username);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(8000, function () {
  console.log('The application was launched on 8000 port!');
});

function mustBeAuthentificated (req, res, next) {
  if ( req.isAuthenticated() ) {
    next();
  } else {
    res.redirect('/login');
  }
}
