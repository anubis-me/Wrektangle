/**
 * Created by Yash 1300 on 01-12-2017.
 */

var mongoose = require('mongoose'); // Import Mongoose Package
var Schema   = mongoose.Schema; // Assign Mongoose Schema function to variable
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin

//Validator for validating the location of the bin
var latlongValidator = [
    validate({
        validator: 'matches',
        arguments: '^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(([-+]?)([\d]{1,3})((\.)(\d+))?)$', // for example => 51.498134,-0.201755
        message: 'Please enter correct values of latitude and longitude separated by comma'
    })
];

//Basic Schema of a bin
var binSchema = new Schema({
    binId:{
        type:String,
        required: true
    },
    binLocation:{
        type:String,
        validator: latlongValidator
    }
});

module.exports = mongoose.model('Bin', binSchema);

