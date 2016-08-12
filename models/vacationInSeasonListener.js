/**
 * Created by jeffersonwu on 8/12/16.
 */

//import mongoose model
var mongoose = require('mongoose');

//vacation in season listener schema
var vacationInSeasonListenerSchema = mongoose.Schema({
    email: String,
    skus: [String]
});

//vacation in season listener model
var vacationInSeasonListener = mongoose.model('VacationInSeasonListener', vacationInSeasonListenerSchema);

//export the model
module.exports = vacationInSeasonListener;
