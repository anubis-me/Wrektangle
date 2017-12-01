/**
 * Created by abhi on 30-Nov-17.
 */
angular.module('driverServices', [])

   .factory('User', function($http) {
        var userFactory = {}; // Create the userFactory object

        // Register users in database
        userFactory.create = function(regData) {
            return $http.post('/api/register', regData);
        };


        return userFactory; // Return userFactory object
    });
