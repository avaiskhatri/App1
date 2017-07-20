angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.home', {
    url: '/page2',
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
    url: '/page7',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('forgotPassword', {
    url: '/page9',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })

  .state('register', {
    url: '/page8',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('tabsController.settings', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/page5',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
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
  
  .state('tabsController.editProfile', {
    url: '/page6',
    views: {
      'tab3': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })
  
  .state('tabsController.changePassword', {
    url: '/page12',
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

$urlRouterProvider.otherwise('/page7')


});