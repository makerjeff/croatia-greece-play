/**
 * Created by jefferson.wu on 8/12/16.
 *
 * Mongoose Schema + Model that's exported
 */

var mongoose = require('mongoose');

//create schema
var vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,
    description: String,
    priceInCents: Number,
    tags: [String],
    inSeason: Boolean,
    available: Boolean,
    requiresWaiver: Boolean,
    maximumGuests: Number,
    notes: String,
    packagesSold: Number
});

//schema methods, need to be declared before model is created.
vacationSchema.methods.getDisplayPrice = function(){
    return '$' + (this.priceInCents / 100).toFixed(2);
};

//create model
var Vacation = mongoose.model('Vacation', vacationSchema);

//export module
module.exports = Vacation;