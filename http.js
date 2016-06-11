// Cookie через http модуль

var http = require('http');

http
  .createServer(function(request, response) {
    // Покажи мне свои cookies
    console.log(request.headers.cookie);

    // Пишем http-заголовки
    response.writeHead(200, {
      'Set-Cookie': ["type=ninja", "language=javascript"],
      'Content-Type': 'text/plain',
    });

    response.end('This is a test cookie page.');
  })
  .listen(8000, function () {
    console.log('Let\'s get started: 8000');
  });
