var connect = require('connect');
var redirects = require('./redirects.js');

var app = connect();

app.use(connect.logger());

app.use(function(req, res, next) {
  var host = req.headers.host.split(':', 1)[0].toLowerCase();
  var protocol = req.connection.encrypted ? 'https://' : 'http://';

  if (redirects[host]) {
    res.writeHead( 301, { 'Location' : protocol + redirects[host] + req.url });
    return res.end();
  }

  next();
});

app.use(function(req, res, next) {
  res.writeHead(404);
  return res.end('Not Found');
});

connect.createServer(app).listen(process.env.PORT | 5000);
