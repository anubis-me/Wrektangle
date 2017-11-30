/**
 * Created by abhi on 30-Nov-17.
 */
angular.module('truckApp',['appRoutes','emailController','mainController','userControllers','authServices','driverServices', 'ngAnimate'])

    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });