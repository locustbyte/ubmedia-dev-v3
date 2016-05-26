// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// AUTHO PAGES INSTRUCTIONS - https://auth0.com/docs/native-platforms/ionic

angular.module('starter', ['ionic','starter.controllers', 'starter.services', 'starter.directives', 'auth0',
  'angular-storage',
  'angular-jwt', 'ngStorage'])

.run(function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      return StatusBar.hide();
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.grabImage = function() {
      $("#mask-load-file").trigger('click');
  }
  $rootScope.mediaCheck = '';
  $rootScope.infoCheck = false;
  //This hooks all auth avents
  auth.hookEvents();
  //This event gets triggered on URL change
  var refreshingToken = null;
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        if (refreshToken) {
          if (refreshingToken === null) {
            refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken) {
              store.set('token', idToken);
              auth.authenticate(store.get('profile'), idToken);
            }).finally(function() {
              refreshingToken = null;
            });
          }
          return refreshingToken;
        } else {
          $location.path('/login');// Notice: this url must be the one defined
        }                          // in your login state. Refer to step 5.
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('start', {
      url: '/start',
      templateUrl: 'templates/start.html',
      controller: 'startCtrl'
  })

  //Auth0 Stuff

  .state('tabl', {
    url: '/tabl',
    abstract: true,
    templateUrl: 'templates/tabsl.html'
  })

  
  .state('tabl.login', {
    url: '/login',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tabl-login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('userInfo', {
    url: '/userInfo',
    templateUrl: 'templates/user-info.tpl.html',
    controller: 'UserInfoCtrl',
    data: {
      // This tells Auth0 that this state requires the user to be logged in.
      // If the user isn't logged in and he tries to access this state
      // he'll be redirected to the login page
      requiresLogin: true
    }
  })


  // Your app states
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dashboard/doDashboard.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.record', {
    url: '/record',
    views: {
      'tab-record': {
        templateUrl: 'templates/record/doRecord.html',
        controller: 'RecordCtrl'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search/doSearch.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.activity', {
    url: '/activity',
    views: {
      'tab-activity': {
        templateUrl: 'templates/activity/doActivity.html',
        controller: 'ActivityCtrl'
      }
    }
  })
    

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/profile/doProfile.html',
        controller: 'AccountCtrl'
      }
    }
  });

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

  authProvider.init({
    domain: 'ubmedia.auth0.com',
    clientID: 'Dw45Jg5Dr4baN1JvfOtNG9rRJSQvWVud',
    loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
  });

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  };

  $httpProvider.interceptors.push('jwtInterceptor');

})


.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
});
