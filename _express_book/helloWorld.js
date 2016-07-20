/**
 * Created by jeffersonwu on 7/20/16.
 * Example from Web Development with Node and Express
 */

var port = process.env.PORTNUM;
var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello world!');
});

server.listen(port);

console.log('Server started on localhost: ' + port + ', press CTRL+c to terminate...');

