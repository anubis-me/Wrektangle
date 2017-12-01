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
                templateUrl: 'app/views/pages/driver/login.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
            })


            // Route: User Profile
            .when('/profile', {
                templateUrl: 'app/views/pages/driver/profile.html'
            })


            .otherwise({ redirectTo: '/' }); // If user tries to access any other route, redirect to home page

        $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
    });
