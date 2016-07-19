//router-express-server.js

// ROUTES
// ======================================
var colors = require('colors');
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;


// ROUTES
// ======================================

var routes = require('./routes/mongoose-routes');

// sample Express 3.0 kind of route.
app.get('/sample', function(req,res){
    res.send('This sample is working.');
});

// create Express 4.0 Router routes here!
var router = express.Router();

//Router middleware, happens with every transaction (use this for authentication)
router.use(function(req, res, next){
    //log each request
    console.log('request method: '.blue + req.method + ', url: '.blue + req.url);

    //continue on
    next();
});

//custom static routes
router.use(express.static(__dirname + '/public/'));

//custom external routes
app.use('/routes', routes);


//Route middleware to validate :name, using Express.param().
router.param('name', function(req, res, next, name){
    //do some validation here

     console.log('Running name-validation on ' + name);

    //once validated, assign the value to the request object under 'req.name'
    req.name = name;

    //do the next thing.
    next();

});

//home page route (EXAMPLE)
router.get('/', function(req, res){
    res.send('I\'m on the home page!');
});

//about page route (EXAMPLE)
router.get('/about', function(req,res){
    res.send('I\'m at the about page!');
});

//route with parameters (EXAMPLE)
router.get('/hello/:name', function(req, res){
    res.send('Hello there, ' + req.params.name + '!');
});

// custom catch all
router.get('*', function(req,res){
    res.send('Four uh-oh Four.');
});


//apply the routes to our application
app.use('/', router);

// MULTIPLE ACTIONS WITH THE SAME ROUTE (EXAMPLE)
// ======================================
app.route('/login')
// show the form
    .get(function(req, res){
        res.send('this is the login form, GET')
    })
    
//process the form
    .post(function(req, res){
        console.log('processing');
        res.send('processing login form! POST ' + new Date());
    });


// START THE SERVER
// ======================================
app.listen(port);
console.log('Wonderful things happen on port ' + process.env.PORT.black.yellowBG + '.');