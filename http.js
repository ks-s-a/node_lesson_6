// Cookies via http module

var http = require('http');

http
  .createServer(function(request, response) {
    // Show me your cookies
    console.log(request.headers['cookie']);

    // Write http headers
    response.writeHead(200, {
      'Set-Cookie': ["type=ninja", "language=javascript"],
      'Content-Type': 'text/plain',
    });

    response.end('This is a test cookie page.');
  })
  .listen(8000, function () {
    console.log('Let\'s get started: 8000');
  });
