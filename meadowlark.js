/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

/* #################### MODULES #################### */
var express = require('express');
var app = express();
var colors = require('colors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//grab custom modules
var fortune = require('./lib/fortune.js');
var nursery = require('./lib/nursery.js');
var navlinks = require('./models/navlinks.js');
var credentials = require('./credentials.js');

//grab dummyDataModule (model)
var dummyData = require('./models/dummyData.js');

/* #################### SETUP #################### */
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


/* #################### MIDDLEWARE #################### */
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
//for POST submissions
app.use(bodyParser.json()); //updated past book
app.use(bodyParser.urlencoded({extended: false}));   //updated past book

//for cookies (modified from book)
app.use(cookieParser(credentials.cookieSecret));

// =====  PARTIALS ===== (res.locals.partials)
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = dummyData.getWeatherData();
    next();
});
// ---- videogame data ----
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.videoGames = dummyData.getGameData();
    next();
});
// ---- basic weather data ----
app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.basicWeather = dummyData.getBasicWeatherData();
    //console.log(res.locals.partials.basicWeather);
    next();
});
// ---- navigation links ----
app.use(function(req,res,next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.navlinks = navlinks.getNavLinks();
    next();
});

/* #################### ROUTES #################### */
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

//layout debug
app.get('/foo', function(req,res){
    res.render('blocks', blockObject );
});

//cookies debug
//TODO: need to make a reader.
app.get('/cookie-read', function(req,res){
    console.log('cookie: ' + req.cookies.monster);
    res.send('monster: ' + req.cookies.monster);
});

app.get('/cookie-signed-read', function(req,res){
    console.log('signed cookie: ' + req.signedCookies.signed_monster);
    res.send('signed_monster: ' + req.signedCookies.signed_monster);
});

app.get('/cookie-clear', function(req,res){
    res.clearCookie('monster');
    console.log('cookie cleared!');
    res.send('cookie cleared!');
});

app.get('/cookie-signed-clear', function(req, res){
    res.clearCookie('signed_monster');
    console.log('signed cookie cleared!');
    res.send('signed cookie cleared!');
});

//res.cookie(name , 'value', {expire : new Date() + 9999});
app.get('/cookie-set/:cookie', function(req,res){
    console.log(req.params.cookie);
    res.cookie('monster', req.params.cookie, {expire: new Date() + 5000});
    res.send('monster cookie was set: ' + req.params.cookie);
});

app.get('/cookie-signed-set/:cookie', function(req,res){
    res.cookie('signed_monster', req.params.cookie, {signed: true});
    res.send('signed monster cookie was set: ' + req.params.cookie);
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
    currencies: ['USD','GBP','BTC','HRK','EURO','TB']
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
        animal: nursery.getRandomAnimal(),
        bodyPart: nursery.getRandomBodyPart(),
        adjective: nursery.getRandomAdjective(),
        noun: nursery.getRandomNoun()
    });
});

// ---- newsletter related ----

//standard version
app.get('/newsletter', function(req,res){
    res.render('newsletter', {csrf: 'CSRF token goes here'});
});
//ajax version
app.get('/newsletter-ajax', function(req,res){
    res.render('newsletter-ajax', {csrf: 'CSRF token goes here, ajax.'});
});

app.post('/process', function(req,res){
    console.log('Form (from query string): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);

    //store info to universal context
    if(!res.locals.formData) res.locals.formData = {};
    res.locals.formData.name = req.body.name;
    res.locals.formData.email = req.body.email;

    app.set('formUser', res.locals.formData.name);
    app.set('formEmail', res.locals.formData.email);
    res.redirect(303, '/thank-you');
});

//ajax
app.post('/process-ajax', function(req,res){
    //convenience properties
    if(req.xhr || req.accepts('json,html') === 'json'){
        //add error catching if you need to here...

        //ajax data.success = true
        res.send({success: true});
    } else {
        res.redirect(303, '/thank-you');
    }
});

app.get('/thank-you', function(req,res){
    // res.render('thank-you', {
    //     name: res.locals.formData.name,
    //     email: res.locals.formData.email
    // });

    res.render('thank-you', {name: app.get('formUser'), email:app.get('formEmail')});
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

/* #################### START SERVER #################### */
//using an app getter then running the 'listen()' function.
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost: ' + app.get('port') +'; ' + 'press CTRL-C to terminate.'.red);
});
