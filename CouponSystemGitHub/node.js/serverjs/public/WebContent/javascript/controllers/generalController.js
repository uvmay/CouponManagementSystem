/** 
 * the JS page declaring the ng-app "couponApp". and containing the controller
 * that controls the entire website.
 * @author Yuval Maayan
 * @version 1.0
 * */

/**declaring the module "couponApp" which describes the website.
 * declaring the use of the plugins: "ngRoute" and "ngFileUpload".
 * @param ngRoute = an angular plugin that enables the implementation of a single page application
 * @param ngFileUpload = an angular plugin that enables easy to use file uploads */
var couponApp = angular.module('couponApp',['ngRoute','ngFileUpload']);

/**the general callback function responding to errors*/
function respondError(reason){
	   var error = reason.data;
	   console.log(error);
	   console.log("status "+reason.status);
	   if(reason.status == 401)
		   window.location.href="http://localhost:8081/#login?error=Unauthorized! Login With Proper User";
	   else
	      alert(error.message);
}

/**the general controller which controls the entire couponApp index.html page */
couponApp.controller('generalController',['$scope','$http','$location', function($scope,$http,$location){
/**@param logout = an object containing attributes concerning logging in
 * @param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param general = an object containing general attributes and functions
 * @param general.shoppingCart = an array containing the id's of the coupons selcted by
 * the customer
 * @param general.isCartUpdated = a boolean that declares whether the shopping cart is updated */
	// declaring global variables
	$scope.logout={};
	$scope.logout.isLoginPage=true;	
	$scope.general={};
	$scope.general.shoppingCart=[];
	$scope.general.isCartUpdated=false;
	
// declaring functions
/**a function that logs out a user from the web page
 * it sends an http request to the server to invalidate the session
 * and reboots the shopping cart*/
	$scope.logoutFunc = function(){
		console.log("clicked");
	$http.get("http://localhost:8081/rest/login")
	.then(function(response){
		$scope.general.shoppingCart=[];
		$location.path('/login');
	});
};

/**a function the retrieves the last saved state of the shopping cart from the server */
$scope.general.retrieveCart = function(){
	$http.get("http://localhost:8081/rest/customer/get/cart")
	.then(function(response){
		var serverCart = response.data;
		console.log(serverCart);
		if(serverCart instanceof Array)
		     $scope.general.shoppingCart=serverCart;
		$scope.general.isCartUpdated=true;
	},respondError);
}

/**a function that updates the shopping cart's state that is saved on the server */
$scope.general.updateCart = function(){
	   var JSONcart = JSON.stringify($scope.general.shoppingCart); 
	    $http.put("http://localhost:8081/rest/customer/update/cart",JSONcart);   
};

/** a function that changes a capital lettered type to a proper written type.
 * it makes the first letter a capital letter and the other ones in lower case.
 * @param string = the type to rewrite
 * @return a proper written type*/
$scope.general.properType=function(string) {
	string = string.toLowerCase();
	console.log("the string "+string);
    return string.charAt(0).toUpperCase() + string.slice(1);
    };

}]);