angular.module('app.services', [])

.service('AuthService', function($q, $http){
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var apiServerPath = "http://api.smartapp.betalogics.com/public";
    //var user = "";
    var userId = 0;
    var username = '';
    var email = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    
    function loadUserCredentials(){
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if(token){
            useCredentials(token);
        }
    };
    
    function setUser(user){
        window.localStorage.setItem("user", angular.toJson(user));
    };
    
    var storeUserCredentials = function(user){
        setUser(user);
        
        var token = user.user_email + '.' + user.user_id + '.yourServerToken';
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    };
    
    function useCredentials(token){
        //user = angular.fromJson(window.localStorage.getItem('user'));
            
        SpitToken = token.split('.');
        email = SpitToken[0]+'.'+SpitToken[1];
        userId = SpitToken[2];
        
        isAuthenticated = true;
        authToken = token;
        
        $http.defaults.headers.common['X-Auth-Token'] = token;
       // $http.defaults.headers.common.Authorizaiton = token;
    };
    
    function destroyUserCredentials(){
        authToken = undefined;
        email = '';
        userId = 0;
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        //window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        //window.localStorage.removeItem("userId");
        //window.localStorage.removeItem("projects");
        //window.localStorage.removeItem("user");
        window.localStorage.clear();
    };
    var logout = function(){
        destroyUserCredentials();
    };
    
    var login = function(email, password){
        return $q(function(resolve, reject){
            
            $http({
                method: 'POST',
                url: apiServerPath + '/login',
                data: { userEmail:email, userPassword:password }
            }).then(function successCallback(response){
                //console.log(response);
                if(response.data.error){
                    console.log(response.data.error.text);
                    reject('Login failed !');
                }else{
                    storeUserCredentials(response.data.user);
                    resolve('Login success !');
                }
            },function errorCallback(response){
                reject('Login failed !');
            });            
        });
    };
    
    var isAuthorized = function(authorizedRoles){
        if(!angular.isArray(authorizedRoles)){
            authoriezedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authoriezedRoles.indexOf(role) !== -1)
    };
    
    loadUserCredentials();
    
    return {
        storeUserCredentials : storeUserCredentials,
        apiServerPath: function(){ return apiServerPath; },
        login: login,
        logout: logout,
        isAuthenticated: function(){return isAuthenticated;},
        User: function(){return angular.fromJson(window.localStorage.getItem('user')); },
        username: function(){return username;},
        userId: function(){return userId;},
        email: function(){return email;},
        role: function(){return role;}
    };
})

.run(function($rootScope, $state, AuthService){
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState){
        if(AuthService.isAuthenticated()){
            if(next.name == 'login' || next.name == 'register' || next.name == 'forgotPassword'){
                event.preventDefault();
                $state.go('tabsController.home');      
            }
        }
        if(!AuthService.isAuthenticated()){
            if(next.name != 'login' && next.name != 'register' && next.name != 'forgotPassword'){
                event.preventDefault();
                //$state.go('login');
            }
        }
    });
});
