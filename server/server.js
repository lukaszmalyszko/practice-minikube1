var http = require('http');
var url = require('url');

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

var options = {
    host: '',
    path: '',
    headers: headers
}

function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function getMessage(callback) { 
	return http.get(options, function(response) {
	  // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {

        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        callback({
            message: parsed
        });
    }).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
});

}
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  
  var query = url.parse(request.url, true).query;
  query = jsonToQueryString(query);
  var path = options['path'];
  options['path'] += query;
  getMessage(function(callback) {
		response.end(JSON.stringify(callback))
		});
  options['path'] = path;
};

var www = http.createServer(handleRequest);
www.listen(8080);







