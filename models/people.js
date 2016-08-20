/**
 * Created by jeffersonwu on 8/19/16.
 * Dummy account creation schema
 */

var mongoose = require('mongoose');

var peopleSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    email: String
});

//add schema method
peopleSchema.methods.getAccountInfo = function(){
    return dataym = {
        firstname: this.firstname,
        lastname: this.lastname,
        age: this.age,
        email: this.email
    };
};

//create person model
var Person = mongoose.model('Person', peopleSchema);

//export module
module.exports = Person;

