/**
 * Created by abhi on 30-Nov-17.
 */
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema   = mongoose.Schema; // Assign Mongoose Schema function to variable
var bcrypt   = require('bcrypt-nodejs'); // Import Bcrypt Package
var titlize  = require('mongoose-title-case'); // Import Mongoose Title Case Plugin
var validate = require('mongoose-validator'); // Import Mongoose Validator Plugin
