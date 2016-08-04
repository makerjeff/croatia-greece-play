/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

var express = require('express');
var app = express();
var colors = require('colors');

//grab fortune module
var fortune = require('./lib/fortune.js');
//grab dummyDataModule
var dummyData = require('./lib/dummyData.js');

//set up Handlebars as view engine
// var handlebars = require('express-handlebars').create({defaultLayout:'main});
var handlebarsModule = require('express-handlebars');
var handlebars = handlebarsModule.create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//disable application engine information
app.disable('x-powered-by');

//enable view cache
app.set('view-cache', true);

//an app setter
app.set('port', process.env.PORT || 3000);

//debug log middleware (JWX)
app.use(function(req,res,next){
    var output = 'client request: ' + req.url.toString().blue + ', by:' + req.host + ', ' + new Date().toString().yellow;
    console.log(output);
    next();
});

// QA testing switch (middlware)
app.use(function(req,res,next){
    //res.locals is part of the 'context' that gets passed to views.(ch7)
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// middleware res.locals.partials
//TODO: this does not work with a partial named 'weather', but will work with an exact template file named 'weather2'.
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = dummyData.getWeatherData();
    next();
});

//TODO: but this does... why??
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.videoGames = dummyData.getGameData();
    next();
});

//TODO: lets add another basic one
app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
    //res.locals.partials.basicWeather = getBasicWeatherData();
    res.locals.partials.basicWeather = dummyData.getBasicWeatherData();
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

//Blocks template example
var blockObject = {
    currency: {
        name: 'United States dollars',
        abbrev: 'USD'
    },
    tours: [
        {name: 'Hood River', price: '$99.95'},
        {name: 'Oregon Coast', price: '$159.95'},
        {name: 'Los Angeles', price: '$299.95'},
        {name: 'San Gabriel', price: '$129.95'}
    ],
    specialsUrl: '/january-specials',
    currencies: ['USD','GBP','BTC','HRK','EURO']
    //videoGames: ['Assassin\'s Creed: Black Flag', 'Grand Theft Auto 5', 'Forza Motorsports']
};

app.get('/blocks', function(req, res){
    res.render('blocks', blockObject);
});

/***** MIDDLEWARE *****/

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
    console.log('Express started on http:localhost: ' + app.get('port') +'; ' + 'press CTRL-C to terminate.'.red);
});


//dummy functions and data getters (2016.AUG.03, externalized to its own module);
