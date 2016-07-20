/**
 * Created by jeffersonwu on 7/9/16.
 */
var express = require('express');
var router = express.Router();

var dummyData = {name: 'Jimbo Jones', age: 15, title: 'Bully'};

//get mongo data

router.get('/api/data', function(req, res, next){
    res.render('debug', {title: 'debug page', myData: dummyData });
});

module.exports = router;
