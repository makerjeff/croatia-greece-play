/**
 * Created by jefferson.wu on 8/12/16.
 *
 * Mongoose Schema + Model for Restaurants and menu items.
 * This might be swapped out for a JSON file.  Might be easier to maintain than to use a database.
 * Static menu content can be loaded at start, with a manual refresh button.
 *
 * Will try out Embedded Documents: http://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
 */

var mongoose = require('mongoose');

//create schema
var restaurantSchema = mongoose.Schema({
    name: String,
    info: {
        description: String,
        address: String,
        url: String,
        phone: String
    },
    menu: {}

});

//schema methods, need to be declared before model is created.
vacationSchema.methods.getDisplayPrice = function(){
    return '$' + (this.priceInCents / 100).toFixed(2);
};

//create model
var Vacation = mongoose.model('Vacation', vacationSchema);

//export module
module.exports = Vacation;