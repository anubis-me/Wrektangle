/**
 * Created by abhi on 30-Nov-17.
 */
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema   = mongoose.Schema; // Assign Mongoose Schema function to variable
var bcrypt   = require('bcrypt'); // Import Bcrypt Package
var titlize  = require('mongoose-title-case'); // Import Mongoose Title Case Plugin
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin

//Validator for validating the name of the driver

var driverNameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,30})+[ ]+([a-zA-Z]{3,30})+)+$/,
        message: 'Length of name must be between 3 and 30 characters without any special characters or numbers and must have a space in between first name and last name'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Name should be between 3 and 30 characters'
    })
];

//Validator for validating the E-mail of the driver

var driverEmailValidator = [
    validate({
        validator: 'matches',
        arguments: '/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/',
        message: 'Please enter a valid E-mail ID'
    })
];
//Validator for validating the aadhar number

var aadharValidator = [
    validate({
        validator: 'matches',
        arguments: '^\d{4}\d{4}\d{4}$',
        message: 'Please enter a valid Aadhar Number'
    })
];

//Validator for validating the mobile number

var mobNumValidator = [
    validate({
        validator: 'matches',
        arguments: '^[789]\d{9}$',
        message: 'Please enter a valid mobile number without the country code'
    })
];

//Validator for validating the password

var passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [7, 15],
        message: 'Please enter a password of length between 7 and 15 characters'
    })
];

//Basic schema of a truck object

var truckSchema = new Schema({
    driverName:{
        type:String,
        validator: driverNameValidator
        //required: true
    },
    driverEmail:{
        type: String,
        validator: driverEmailValidator,
        //required: true
        unique: true
    },
    truckNum:{
        type: Number,
        //required: true
        unique:true
    },
    aadharNum:{
        type:String,
        validator: aadharValidator,
        unique: true
        //required: true
    },
    mobileNum:{
        type: String,
        validator: mobNumValidator
        //required: true
    },
    password:{
        type: String,
        validator: passwordValidator
    }
});

//Before saving a truck object, the password will be hashed
truckSchema.pre('save', function(callback){
    var truck = this;
    bcrypt.genSalt(10, function(err, salt){
        if (err){
            callback(err);
        } else {
            bcrypt.hash(truck.password, salt, function(err, hash){
                if (err) {
                    callback(err);
                } else {
                    truck.password = hash;
                    //truck.aadharNum = truck.aadharNum.trim();
                    callback();
                }
            });
        }
    });
});

//Function for comparing a normal text with a hashed password

truckSchema.comparePassword = function(password, callback){
    var truck = this;
    bcrypt.compare(password, truck.password, function(err, isMatch){
        if (err){
            callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

//Exporting the schema model
module.exports = mongoose.model('Truck', truckSchema);

