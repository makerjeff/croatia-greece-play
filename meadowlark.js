/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

var express = require('express');
var app = express();
var colors = require('colors');

//grab fortune module
var fortune = require('./lib/fortune.js');

//set up Handlebars as view engine
// var handlebars = require('express-handlebars').create({defaultLayout:'main});
var handlebarsModule = require('express-handlebars');
var handlebars = handlebarsModule.create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//disable application engine information
app.disable('x-powered-by');

//an app setter
app.set('port', process.env.PORT || 3000);

//debug log middleware (JWX)
app.use(function(req,res,next){
    var output = req.url + ', ' + new Date().toString().yellow;
    console.log(output);
    next();
});

// QA testing switch (middlware)
app.use(function(req,res,next){
    //res.locals is part of the 'context' that gets passed to views.(ch7)
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// ---- routes ----
app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

//headers debug, see what's available.
app.get('/headers', function(req, res){
    res.set('Content-Type', 'text/plain');
    var s = '';

    for(var name in req.headers){
        s += name + ': ' + req.headers[name] + '\n';
    }

    res.send(s);
    console.log(req.headers);
});


//three.js route
app.get('/three/:num', function(req, res){
    res.sendFile(__dirname + '/public/threejs_' + req.params.num + '.html');
});

// ---- middlware -----

// serve static files
app.use(express.static(__dirname + '/public'));

// custom 404 page middleware
app.use(function(req,res,next){
    res.status(404);
    res.render('404');
});

// custom 500 page middleware
app.use(function(req,res,next){
    res.status(500);
    res.render('500');
});

//using an app getter...
app.listen(app.get('port'), function(){
    console.log('Express started on http:localhost: ' + app.get('port') +'; press CTRL-C to terminate.');
});
