/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

var express = require('express');
var app = express();

//an app setter
app.set('port', process.env.PORT || 3000);

// ---- routes ----
app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Meadowlark Travel');
});
app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('About Meadowlark Travel');
});

// ---- middlware -----
// custom 404 page middleware
app.use(function(req,res,next){
    res.type('text/plain');
    res.status(404);
    res.send('Meadowlark - 404 - Not Found');
});

// custom 500 page middleware
app.use(function(req,res,next){
    res.type('text/plain');
    res.status(500);
    res.send('Meadowlark - 500 - Server Error');
});

//using an app getter...
app.listen(app.get('port'), function(){
    console.log('Express started on http:localhost: ' + app.get('port') +'; press CTRL-C to terminate.');
});
