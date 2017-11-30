/**
 * Created by abhi on 30-Nov-17.
 */
var app = angular.module('appRoutes', ['ngRoute'])

// Configure Routes; 'authenticated = true' means the user must be logged in to access the route
    .config(function($routeProvider, $locationProvider) {

        // AngularJS Route Handler
        $routeProvider

        // Route: Home
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })

            // Route: About Us (for testing purposes)
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })

            // Route: User Registration
            .when('/register', {
                templateUrl: 'app/views/pages/driver/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })

            // Route: User Login
            .when('/login', {
                templateUrl: 'app/views/pages/driver/login.html'
            })

            // Route: Activate Account Through E-mail
            .when('/activate/:token', {
                templateUrl: 'app/views/pages/driver/activation/activate.html',
                controller: 'emailCtrl',
                controllerAs: 'email'
            })

            // Route: Request New Activation Link
            .when('/resend', {
                templateUrl: 'app/views/pages/driver/activation/resend.html',
                controller: 'resendCtrl',
                controllerAs: 'resend'
            })

            // Route: Send Username to E-mail
            .when('/resetusername', {
                templateUrl: 'app/views/pages/driver/reset/username.html',
                controller: 'usernameCtrl',
                controllerAs: 'username'
            })

            // Route: Send Password Reset Link to User's E-mail
            .when('/resetpassword', {
                templateUrl: 'app/views/pages/driver/reset/password.html',
                controller: 'passwordCtrl',
                controllerAs: 'password'
            })

            // Route: User Enter New Password & Confirm
            .when('/reset/:token', {
                templateUrl: 'app/views/pages/driver/reset/newpassword.html',
                controller: 'resetCtrl',
                controllerAs: 'reset'
            })
            // Route: User Profile
            .when('/profile', {
                templateUrl: 'app/views/pages/driver/profile.html'
            })


            .otherwise({ redirectTo: '/' }); // If user tries to access any other route, redirect to home page

        $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
    });
