/**
 * Created by abhi on 30-Nov-17.
 */
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrythepotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var Truck = require('../models/truck');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(router){
    router.post('/register', function(req, res){
        var driverName = req.body.name;
        var driverEmail = req.body.email;
        var truckNum = req.body.truckno;
        var aadharNum = req.body.aadharno;
        var mobileNum = req.body.mobno;
        var password = req.body.password;

        var newTruck = new Truck({
            driverName: driverName,
            driverEmail: driverEmail,
            truckNum: truckNum,
            aadharNum: aadharNum,
            mobileNum: mobileNum,
            password: password
        });

        /*

            240 anand bagh society dushan road

        */

        newTruck.save(function(err){
            if (err){
                if (err.errors !== null){
                    console.log(err);
                    res.json({success: false, message:"Error while registering the user"});
                } else if (err) {
                    if (err.code == 11000){
                        console.log(err.errorMsg);
                        if (err.errorMsg[57] == 'E'){
                            res.json({success: false, message: "A user with the following details already exists"});
                        } else {
                            res.json({success: false, message: "A user with the following details already exists"});
                        }
                    }
                }
            } else {
                res.json({success: true, message: "Registered successfully"});
            }
        });
    });

    router.post('/authenticate', function(req, res){
        var email = req.body.email;
        var password = req.body.password;

        Truck.findOne({driverEmail: email}, function(err, truck){
            if (err){
                console.log(err);
                res.json({success: false, message: "Error occured while authenticating the user"});
            } else {
                if (!truck){
                    console.log(err);
                    res.json({success: false, message: "No such user exists"});
                } else {
                    var passMatch = bcrypt.compareSync(password, truck.password);
                    if (!passMatch){
                        console.log("Wrong password entered by " + truck.driverName);
                        res.json({success: false, message: "Wrong password entered"});
                    } else {
                        res.json({success: true, message: "User successfully authenticated"});
                    }
                }
            }
        });
    });

    return router;
};
