/**
 * Created by jeffersonwu on 7/20/16.
 * Example from Web Development with Node and Express
 */

var port = process.env.PORTNUM;
var http = require('http');

var server = http.createServer(function(req, res){

    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {
        case '':
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('About');
            break;
        default:
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('Not Found');
            break;
    }
});

server.listen(port);
console.log('Server started on localhost: ' + port + ', press CTRL+c to terminate...');

