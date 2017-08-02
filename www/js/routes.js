angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.devices', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/devices.html',
        controller: 'devicesCtrl'
      }
    }
  })

  .state('tabsController.addDevice', {
    url: '/page10',
    views: {
      'tab2': {
        templateUrl: 'templates/addDevice.html',
        controller: 'addDeviceCtrl'
      }
    }
  })
  
  .state('tabsController.report', {
    url: '/page14',
    views: {
      'tab4': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      }
    }
  })
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('forgotPassword', {
    url: '/forgotPassword',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  
  .state('tabsController.editProfile', {
    url: '/editProfile',
    views: {
      'tab3': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })
  
  .state('tabsController.aboutUs', {
    url: '/page11',
    views: {
      'tab3': {
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'
      }
    }
  })
  
  
  
  .state('tabsController.changePassword', {
    url: '/changePassword',
    views: {
      'tab3': {
        templateUrl: 'templates/changePassword.html',
        controller: 'changePasswordCtrl'
      }
    }
  })
  
  .state('tabsController.feedback', {
    url: '/page13',
    views: {
      'tab3': {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackCtrl'
      }
    }
  })
  
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/login')


});