/**
 * Created by jeffersonwu on 7/20/16.
 * Example from Web Development with Node and Express
 *
 * Note: Manual, serving static files.
 */

var port = process.env.PORTNUM;
var http = require('http');
var fs = require('fs');

/**
 * Serve a Static File.
 * @param res Response object to pass in.
 * @param path Path to file that should be served.
 * @param contentType Content type.
 * @param responseCode Explicit response code. If none is set, defaults to 200.
 */
function serveStaticFile(res, path, contentType, responseCode){

    //if no responseCode is set (save this pattern!), set responsecode.
    if(!responseCode){
        responseCode = 200;
    }

    //read file
    fs.readFile(__dirname + path, function(error, data){
        if(error){
            res.writeHead(500, {'Content-Type':'text/plain'});
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, {'Content-Type':'text/html'});
            res.end(data);
        }
    });
}


var server = http.createServer(function(req, res){
    //strip query strings and case
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        default:
            serveStaticFile(res, '/public/notfound.html', 'text/html');
            break;
    }
});

server.listen(port);
console.log('Server started on localhost: ' + port + ', press CTRL+c to terminate...');

