var http = require('http');
var url = require('url');
var _request = require('request');

var options = {
  json: true,
  url: 'https://jsonplaceholder.typicode.com/posts',
}

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  
  var query = url.parse(request.url, true).query;
  options['qs'] = query;
  _request(options, (err, res, body) => {
		if (err) { return console.log(err); }
		response.end(JSON.stringify(body));
	});
};

var www = http.createServer(handleRequest);
www.listen(8080);







