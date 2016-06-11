// Модуль cookies

var http = require('http');
var Cookies = require('cookies');

http
  .createServer(function(request, response) {
    // Получение cookies из запроса
    var cookies = new Cookies(request, response);

    var language = cookies.get('language');
    console.log('language is: ', language);

    var platform = cookies.get('platform');
    console.log('platform is: ' , platform);

    // Установка cookies
    cookies.set('language', 'javascript');
    cookies.set('platform', 'NodeJS');

    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });

    response.end('I know your preferences!');
  })
  .listen(8000, function () {
    console.log('Let\'s get started: 8000');
  });
