/**
 * Created by abhi on 30-Nov-17.
 */
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrythepotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var Truck = require('../models/truck');

module.exports = function(router){
    router.post('/register', function(req, res){
        var driverName = req.body.drivername;
        var driverEmail = req.body.driveremail;
        var truckNum = req.body.trucknum;
        var aadharNum = req.body.aadharnum;
        var mobileNum = req.body.mobilenum;
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
                        }
                    }
                }
            } else {
                res.json({success: true, message: "Registered successfully"});
            }
        });
    });


    return router;
};
