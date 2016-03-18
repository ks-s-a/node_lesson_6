var app = require('express')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var LocalStratagy = require('passport-local');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({keys: ['key']}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratagy(function (username, pass, done) {
  if (username !== 'admin') {
    return done(null, false)
  }
  else if (pass !== 'admin') {
    return done(null, false)
  } else {
    return done(null, {username: username});
  }
}));

passport.serializeUser(function (user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function (id, done) {
  return done(null, {username: id});
});

var auth = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login',
});

app.get('/', function (req, res, next) {
  res
    .status(200)
    .send('Это главная страница!');
});

app.get('/login', function (req, res) {
  res
    .status(200)
    .send(`<form action="/login" method="post">
      Login: 
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="submit" />
    </form>`);
});

app.post('/login', auth);

app.use('/user', mustBeAuthentificated, function (req, res, next) {
  if (req.path === '/settings')
    return next();

  res
    .status(200)
    .send('Привет, ' + req.user.username);
});

app.use('/user/settings', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Совершенно секретная часть. Только для тебя, ' + req.user.username);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(8000);

function mustBeAuthentificated (req, res, next) {
  if ( req.isAuthenticated() ) {
    next();
  } else {
    res.redirect('/login');
  }
}
