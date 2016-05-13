// User authtorization with PassportJS

var app = require('express')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var LocalStratagy = require('passport-local');

// Set middlewares
app.use(cookieParser()); // req.cookies
app.use(session({keys: ['key']})); // req.session
app.use(passport.initialize());
app.use(passport.session());

// Set authtorization stratagy
passport.use(new LocalStratagy(function (username, pass, done) {
  if (username !== 'admin' || pass !== 'admin')
    return done(null, false)

  done(null, {username: username});
}));

// Method for saving user in session
passport.serializeUser(function (user, done) {
  done(null, user.username);
});

// Method for restore user from session
passport.deserializeUser(function (username, done) {
  done(null, {username: username});
});

// Main page for everyone
app.get('/', function (req, res) {
  res
    .status(200)
    .send('Это главная страница!');
});

// Login form
app.get('/login', function (req, res) {
  res
    .status(200)
    .send(
      '<form action="/login" method="post">' +
        'Login: ' +
        '<input type="text" name="username" />' +
        '<input type="password" name="password" />' +
        '<input type="submit" />' +
      '</form>');
});

// Login request handler
app.post('/login', bodyParser.urlencoded({ extended: false }), passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login'
}));

// Page for user settings
app.use('/user/settings', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Совершенно секретная часть. Только для тебя, ' + req.user.username);
});

// User cabinet
app.use('/user', mustBeAuthentificated, function (req, res) {
  res
    .status(200)
    .send('Привет, ' + req.user.username);
});

// Logout page
app.get('/logout', function(req, res) {
  req.logout(); // execute passportJS logout
  res.redirect('/'); // go to main page
});

// Middleware for login checking
function mustBeAuthentificated (req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/login'); // go to login page
}

app.listen(8000, function () {
  console.log('The application was launched on 8000 port!');
});

