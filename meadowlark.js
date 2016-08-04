/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

var express = require('express');
var app = express();
var colors = require('colors');

//grab custom modules
var fortune = require('./lib/fortune.js');

//grab dummyDataModule (model)
var dummyData = require('./models/dummyData.js');

//set up Handlebars as view engine
// var handlebars = require('express-handlebars').create({defaultLayout:'main});
var handlebarsModule = require('express-handlebars');
var handlebars = handlebarsModule.create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//disable application engine information
app.disable('x-powered-by');

//enable view cache
app.set('view-cache', true);

//an app setter
app.set('port', process.env.PORT || 3000);


// //debug log middleware (JWX)
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

// ---- MIDDLEWARE ---- 
// for PARTIALS res.locals.partials
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = dummyData.getWeatherData();
    next();
});
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.videoGames = dummyData.getGameData();
    next();
});
app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
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

//different layout test route
app.get('/foo', function(req,res){
    res.render(blocks, blockObject );
});

//three.js route
app.get('/three/:num', function(req, res){
    res.sendFile(__dirname + '/public/threejs_' + req.params.num + '.html');
});

//Blocks template example
var blockObject = {
    //layout: null,
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

// nursery rhyme related
app.get('/nursery', function(req,res){
    res.render('nursery');
});

app.get('/data/nursery', function(req,res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});

/***** Catch-Alls *****/

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

//using an app getter then running the 'listen()' function.
app.listen(app.get('port'), function(){
    console.log('Express started on http:localhost: ' + app.get('port') +'; ' + 'press CTRL-C to terminate.'.red);
});
