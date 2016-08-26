/**
 * Created by jeffersonwu on 7/22/16.
 * First Express based server, entry point to web app.
 */

// ==================================================
// LOAD MODULES =====================================
// ==================================================
var express = require('express');
var app = express();
var colors = require('colors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


//mongoose setup
var mongoose = require('mongoose');
var mongooseOptions = {
    server: {
        socketOptions: {keepAlive:1}
    }
};

//connect to local DB
mongoose.connect('mongodb://localhost/meadowlarkTest', mongooseOptions);

//connection event listeners (picked up from mongoose tutorial)
var db = mongoose.connection;

// ----- vacation setup -----
//mongoose vacation schema + model
// gets its own collection
var Vacation = require('./models/vacation.js');

//mongoose notify-me-when-in-season schema + model
// gets its own collection
var VacationInSeasonListener = require('./models/vacationInSeasonListener.js');

// ----- people setup -----
var Person = require('./models/people.js');

//create a database state object
var databaseAlive = false;


db.on('error',function(err){
    databaseAlive = false;
    console.error('connection error: ' + err);
});


db.once('open', function(){
    databaseAlive = true;
    console.log('MongoDB connection established');
    // ----- Mongoose / MongoDB data seeding -----
//check to see if there's something in the mock db
//Vacation.find(<callback function>);
    Vacation.find(function(err, vacations){

        //if there's something in the db, return out.
        if(vacations.length) {
            console.log('Dummy files already seeded.'.blue);
            return;
        }

        //vacation package 01
        new Vacation({
            name: 'Hood River Day Trip',
            slug: 'hood-river-day-trip',
            category: 'Day Trip',
            sku: 'HR199',
            description: 'Spend a day sailing on the Columbia and ' +
            'enjoying craft beers in Hood River!',
            priceInCents: 9995,
            tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
            inSeason: true,
            maximumGuests: 16,
            available: true,
            packagesSold: 0
        }).save();

        console.log('vacation package 1 saved.'.green);

        //vacation package 02
        new Vacation({
            name: 'Oregon Coast Getaway',
            slug: 'oregon-coast-getaway',
            category: 'Weekend Getaway',
            sku: 'OC39',
            description: 'Enjoy the ocean air and quant coastal towns!',
            priceInCents: 269995,
            tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
            inSeason: false,
            maximumGuests: 8,
            available: true,
            packagesSold: 0
        }).save();

        console.log('vacation package 2 saved.'.green);

        //vacation package 03
        new Vacation({
            name: 'Rock Climbing in Bend',
            slug: 'rock-climbing-in-bend',
            category: 'Adventure',
            sku: 'B99',
            description: 'Experience the thrill of climbing in the high desert.',
            priceInCents: 289995,
            tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
            inSeason: true,
            requiresWaiver: true,
            maximumGuests: 4,
            available: true,
            packagesSold: 0,
            notes: 'The tour guide is currently recovering from a skiing accident.'
        }).save();

        console.log('vacation package 3 saved.'.green);

        new Vacation({
            name: 'Get Wasted in Los Angeles',
            slug: 'get-wasted-in-los-angeles',
            category: 'Binge Drinking',
            sku: 'DRUNK99',
            description: 'Party and get drunk in the city of Angels.',
            priceInCents: 30095,
            tags: ['alcohol', 'partying', 'drinking'],
            inSeason: true,
            requiresWaiver: true,
            maximumGuests: 42,
            available: true,
            packagesSold: 0,
            notes: 'Be your own tour guide as you drink your way through downtown on foot.'
        }).save();
        console.log('vacation package 4 saved.'.green);

        new Vacation({
            name: 'Get Wasted in Miami',
            slug: 'get-wasted-in-miami',
            category: 'Binge Drinking',
            sku: 'DRUNK909',
            description: 'Party and get drunk in the city of whorebags.',
            priceInCents: 30095,
            tags: ['alcohol', 'partying', 'drinking'],
            inSeason: false,
            requiresWaiver: true,
            maximumGuests: 42,
            available: true,
            packagesSold: 0,
            notes: 'Be your own tour guide as you drink your way through downtown on foot.'
        }).save();
        console.log('vacation package 5 saved.'.green);

    });

});

//grab custom modules
var fortune = require('./lib/fortune.js');
var nursery = require('./lib/nursery.js');
var navlinks = require('./models/navlinks.js');
var credentials = require('./credentials.js');



//grab dummyDataModule (model)
var dummyData = require('./models/dummyData.js');


// ==========================================
// SETUP ====================================
// ==========================================
// -- set up Handlebars as view engine --
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


// =======================================
// MIDDLEWARE ============================
// =======================================

//Disable website if database connection is not established. (JWX)
app.use(function(req,res,next){
    if(databaseAlive === false) {
        res.status(503);
        res.end('Meadowlark database is down for maintenance. Please check back later.');
    } else {
        res.locals.databaseAlive = '<small style="color:rgba(0,175,0,1.0)">(database status: up and running!)</small>';
        next();
    }
});

// //debug log middleware (JWX)
app.use(function(req,res,next){
    var output = 'client request: ' + req.url.toString().blue + ', by:' + req.hostname + ', ' + new Date().toString().yellow;
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

// ========== PARTIALS =========== (res.locals.partials)
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

// ====================================
// ROUTES =============================
// ====================================
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

//----- cookies debug -----
//read cookies
app.get('/cookie-read', function(req,res){
    console.log('cookie: ' + req.cookies.monster);
    res.send('monster: ' + req.cookies.monster);
});
app.get('/cookie-signed-read', function(req,res){
    console.log('signed cookie: ' + req.signedCookies.signed_monster);
    res.send('signed_monster: ' + req.signedCookies.signed_monster);
});

//clear cookies
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

//set cookies
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

// ----- vacations related (mongoose and DB) -----
app.get('/vacations', function(req, res){
    //params, callback
    Vacation.find({available: true}, function(err, vacations){
        var context = {
            vacations: vacations.map(function(vacation){
                return {
                    sku: vacation.sku,
                    name: vacation.name,
                    description: vacation.description,
                    price: vacation.getDisplayPrice(),
                    inSeason: vacation.inSeason
                }
        })};
        //render and send context.
        res.render('vacations', context);
    });
});

// ----- in-season notification routes -----
app.get('/notify-me-when-in-season', function(req,res){
    res.render('notify-me-when-in-season', {sku: req.query.sku});
});
app.post('/notify-me-when-in-season', function(req,res){
    VacationInSeasonListener.update(
        {email: req.body.email},
        {$push: {skus: req.body.sku}},
        {upsert: true},
        function(err){
            if(err){
                console.error(err.stack);

                req.session.flash = {
                    type: 'danger',
                    intro: 'Ooops!',
                    message: 'There was an error processing your request.'
                };
                return res.redirect(303, '/vacations');
            }

            //TODO: ADD SESSIONS TO FIX
            req.session.flash = {
                type: 'success',
                intro: 'Thank you!',
                message: 'You will be notified when this vacation is in season.'
            };
            return res.redirect(303, '/vacations');
        }
    );
});

// ---- experimental 'people' accounts ----
//viewing page
app.get('/view-people', function(req,res){

    //find({<criteria>}, function(error, data)
    Person.find({}, function(err,data){
        if(err){
            console.log('an error has occurred: ' + err);
            return res.render('view-people', {error: 'database error occurred!'});
        } else {
            res.render('view-people', {users: formatData(data)});   //put into a 'user' object to pass to the view.
        }
    });
});

// getting the add-people page
app.get('/add-people', function(req,res){
    //render add-people page
    res.render('add-people', {dummyData: 'Data is passing fine, from backend to frontend.', csrf: 'crsf token goes here'});
});

// posting the data
app.post('/add-people', function(req,res){
    //add a person to db, using function chaining and anonymous variable
    new Person({
        firstname: req.body.firstname_data.toLowerCase(),
        lastname: req.body.lastname_data.toLowerCase(),
        email: req.body.email_data.toLowerCase(),
        age: req.body.age_data
    }).save();
    console.log('person added'.green);

    //log to console for debugging
    console.log('form name: ' + req.query.form);
    console.log('_csrf: '+ req.body._csrf);
    console.log('name: ' + req.body.firstname_data + ' ' + req.body.lastname_data);
    console.log('email: ' + req.body.email_data);
    console.log('age: ' + req.body.age_data);
    res.redirect(303, 'people-thank-you');
});

// people thank you note
app.get('/people-thank-you', function(req, res){
    res.render('people-thank-you', {datyum: 'pass this back to the front end.'});
});


// ---------- handlebars front end play -------------
//list-o-people related
app.get('/list-o-people', function(req, res){

    var contextObject = {};

    var data = Person.find({}, function(err, data){
        if(err){
            return res.end('this is not working.');
        } else {

            res.render('list-o-people', {users: formatData(data)});
        }
    });
});

// list-o-people data
app.get('/data/list-o-people', function(req,res){

    // var data = Person.find({}, function(err, data){
    //     if(err){
    //         return res.end('failed.');      //TODO: make this a JSON response so it can show on front end.
    //     } else {
    //         res.json({users: data});
    //     }
    // });

    var userData = {
        users:[
            {
                firstname: 'dummyFirst2',
                lastname: 'dummyLast2',
                age: 48,
                email: 'dummydummy2@gmail.com'
            },
            {
                firstname: 'dummyFirst3',
                lastname: 'dummyLast3',
                age: 48,
                email: 'dummydummy3@gmail.com'
            },
            {
                firstname: 'dummyFirst4',
                lastname: 'dummyLast4',
                age: 48,
                email: 'dummydummy4@gmail.com'
            }
        ],
        debug: true
    };



    res.json(userData);



    // res.json({
    //     firstname: 'dummyFirst',
    //     lastname: 'dummyLast',
    //     age: 47,
    //     email: 'dummyFirstDummyLast@dummy.com'
    // });
});

// ====================================
// CATCH-ALL MIDDLEWARE ===============
// ====================================

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

// =====================================
// START SERVER ========================
// =====================================
//using an app getter then running the 'listen()' function.
app.listen(app.get('port'), function(){
    console.log('Express'.blue + ' started on http://localhost: ' + app.get('port') +'; ' + 'press CTRL-C to terminate.'.yellow);
});


// =====================================
// HELPER FUNCTIONS ====================
// =====================================
//TODO: move to external library

/**
 * Capitalize the first letter of the input string.
 * @param string Lowercase string you want to capitalize.
 * @returns {string}
 */
function formatName(string) {
    return string.toString()[0].toUpperCase() + string.slice(1);
}


/**
 * Format data returned from Mongoose for frontend consumption.
 * Returns an array of objects to be passed in to the templating context.
 * @param obj Object to pass in.
 * @returns {array}
 */
function formatData(obj) {
    var filteredData = [];
    obj.forEach(function(elem, arr, ind){
        var d = {
            firstname: formatName(elem.firstname),
            lastname: formatName(elem.lastname),
            age: elem.age,
            email: elem.email
        };
        //push each element to
        filteredData.push(d);
    });
    return filteredData;
}

function formatDataToObject(obj){
    var filteredDataObject = {};
    //TODO: loop through and add properties to filteredDataObject
}
