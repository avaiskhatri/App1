angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.labels = ["Refigrator", "AC", "Others"];
    $scope.data = [350, 450, 180];
    $scope.allUnits = $scope.data.reduce(function(a, b) { return a + b; }, 0);
    
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 140).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = $scope.allUnits + " Un",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
}])
   
.controller('devicesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('addDeviceCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])   

.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('aboutUsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('changePasswordCtrl', ['$scope', '$state', '$http', '$log', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $log) {
    $scope.changePasswordData = [];
    $scope.updatePassword = function(changePasswordData){
        if( angular.isDefined(changePasswordData.password) && angular.isDefined(changePasswordData.confirmPassword) ){
            if(changePasswordData.password.length == 0 || changePasswordData.confirmPassword == 0){
                $scope.showPopup("Error !","Both fields are required.");
            }else if(changePasswordData.password != changePasswordData.confirmPassword){
                $scope.showPopup("Error !","Both passwords must match.");
            }else{
                $scope.showLoading();
                $http({
                    method: 'POST',
                    url: $scope.apiServerPath +'/changePassword',
                    data: { userPassword : changePasswordData.password, userId : $scope.user.user_id }
                }).then(function successCallback(response){
                    if(response.data.error){
                        $scope.hideLoading();
                        $scope.showPopup("Error !",response.data.error.text);
                    }else{
                        $scope.showLoading('You have successfully changed password',1);
                        $state.go('tabsController.settings',{reload: true});
                    }
                },function errorCallback(response){
                    $scope.hideLoading();
                    $scope.showPopup("Error !",JSON.stringify(response.data));
                });
            }
        }else{
            $scope.showPopup("Error !","Both fields are required.");
        }
    }

}])

.controller('reportCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

}])

.controller('feedbackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$state', 'AuthService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, AuthService) {
    $scope.loginData = [];
    $scope.submitLogin = function(loginData){
        //console.log(loginData);
        if( angular.isDefined(loginData.userEmail) && angular.isDefined(loginData.userPassword) ){
            if(loginData.userEmail.length != 0 && loginData.userPassword.length != 0){
                $scope.showLoading();
                AuthService.login(loginData.userEmail,loginData.userPassword).then(function(authenticated){
                    $state.go('tabsController.home',{reload: true});
                    $scope.setCurrentUser();
                    //$scope.showPopup("Login Succesfull","You are logged in.");
                },function(err){
                    $scope.showPopup("Login failed !","Please check your credentials.");
                });

                $scope.hideLoading(1);
            }else{
                $scope.showPopup("Login Failed !","Both fields are required.");
            }
        }else{
            $scope.showPopup("Login Failed !","Both fields are required.");
        }
    };
    
}])

.controller('registerCtrl', ['$scope', '$state', '$http', '$log', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $log) {

    $scope.registerData = [];
    $scope.submitRegister = function(registerData){
        if( angular.isDefined(registerData.userFullName) && angular.isDefined(registerData.userEmail) && angular.isDefined(registerData.userPassword) ){
            if(registerData.userFullName.length == 0 || registerData.userEmail.length == 0 || registerData.userPassword.length == 0){
                 $scope.showPopup("Registration Failed","All fields are required");
            }else{
                $scope.showLoading();
                $http({
                    method: 'POST',
                    url: $scope.apiServerPath +'/register',
                    data: { userFullName : registerData.userFullName, userEmail : registerData.userEmail, userPassword : registerData.userPassword }
                }).then(function successCallback(response){
                    if(response.data.error){
                        $scope.hideLoading();
                        $scope.showPopup("Registration Failed",response.data.error.text);
                    }else{
                        $scope.showLoading('You have successfully registered, Please check your inbox for email verification',1);
                        $scope.storeUserCredentials(response.data.user);
                        $state.go('tabsController.home',{reload: true});
                        //$state.go('login');
                    }
                },function errorCallback(response){
                    $scope.hideLoading();
                    //$scope.showPopup(response);
                    console.log(response);
                    $scope.showPopup("Network Error!","Please check your network connection.");
                }); 
            }
        }else{
            $scope.showPopup("Alert!","All fields are required");
        }
    }

}])

.controller('forgotPasswordCtrl', ['$scope', '$state', '$http', '$log',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $log) {
    
    $scope.forgotPasswordData = [];
    $scope.submitForgotPassword = function(forgotPasswordData){
        if( angular.isDefined(forgotPasswordData.userEmail) ){
            $scope.showLoading();
            $http({
                method: 'POST',
                url: $scope.apiServerPath + '/resetPassword',
                data: { userEmail: forgotPasswordData.userEmail }
            }).then(function successCallback(response){
                if(response.data.error){
                    $scope.hideLoading();
                    $scope.showPopup("Error !",response.data.error.text);
                }else{
                    $scope.showLoading('Please check your inbox for new password.',1);
                    $state.go('login');
                }
            },function errorCallback(response){
                
                $scope.hideLoading();
                $scope.showPopup("Network Error !","Please check your network connection.");
            });
        }else{
            $scope.showPopup("Alert !","Email Address missing.");
        }
    }

}])

.controller('AppCtrl',function($state, $http, $rootScope, $location, $ionicPopup, $ionicLoading, $timeout, $interval, AuthService){
    
    $rootScope.apiServerPath = AuthService.apiServerPath();
    $rootScope.user = AuthService.User();
    
    $rootScope.storeUserCredentials = function(data){
        //console.log(data);
        AuthService.storeUserCredentials(data);
        $rootScope.setCurrentUser();
    }
    
    $rootScope.setCurrentUser = function(){
        $rootScope.user = AuthService.User();
    };
    
    $rootScope.logout = function(){
        AuthService.logout();
        $state.go('login', {reload:true});
    };
    
    $rootScope.showLoading = function(text,duration){
        $ionicLoading.show({
            //content: 'Loading',
            //animation: 'fade-in',
            //showBackdrop: true,
            //maxWidth: 200,
            //showDelay: 0,
            template : text || "Please wait for a while"      
        });
        if(angular.isDefined(duration) || duration >= 0){
            $timeout(function(e){
                $ionicLoading.hide(); 
            },(duration*1000));
        }
    };
    $rootScope.hideLoading = function(duration){
      if(angular.isDefined(duration) || duration >= 0){
            $timeout(function(e){
                $ionicLoading.hide(); 
            },(duration*1000));
        }else{
            $ionicLoading.hide(); 
        }
    };
    
    $rootScope.showPopup = function(title,template){
        $ionicPopup.alert({
                 title: title,
                 template: template
        });
    }
})
    