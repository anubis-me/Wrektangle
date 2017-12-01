/**
 * Created by abhi on 30-Nov-17.
 */
angular.module('mainController', ['authServices', 'driverServices'])
    .controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window, $interval, User, AuthToken, $scope) {
        var app = this;
        app.loadme = false; // Hide main HTML until data is obtained in AngularJS
        if ($window.location.pathname === '/') app.home = true; // Check if user is on home page to show home page div

        // Check if user's session has expired upon opening page for the first time




        // Function to hide the modal
        var hideModal = function() {
            $("#myModal").modal('hide'); // Hide modal once criteria met
        };



        // Function that performs login
        this.doLogin = function(loginData) {
            app.loading = true; // Start bootstrap loading icon
            app.errorMsg = false; // Clear errorMsg whenever user attempts a login
            app.disabled = true; // Disable form on submission
            $scope.alert = 'default'; // Set ng class

            // Function that performs login
            Auth.login(app.loginData).then(function(data) {
                // Check if login was successful
                if (data.data.success) {
                    app.loading = false; // Stop bootstrap loading icon
                    $scope.alert = 'alert alert-success'; // Set ng class
                    app.successMsg = data.data.message + '...Redirecting'; // Create Success Message then redirect
                    // Redirect to home page after two milliseconds (2 seconds)
                    $timeout(function() {
                        $location.path('/'); // Redirect to home
                        app.loginData = ''; // Clear login form
                        app.successMsg = false; // CLear success message
                        app.disabled = false; // Enable form on submission
                        }, 2000);
                }
            });
        };

        // Function to logout the user
        app.logout = function() {
            showModal(2); // Activate modal that logs out user
        };
    });
