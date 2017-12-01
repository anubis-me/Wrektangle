/**
 * Created by abhi on 30-Nov-17.
 */
angular.module('authServices', [])
    .factory('Auth', function($http, AuthToken) {
        var authFactory = {}; // Create the factory object

        // Function to log the user in
        authFactory.login = function (loginData) {
            return $http.post('/api/authenticate', loginData).then(function (data) {
                location.path('/profile');
                return data;
            });
        };
    });