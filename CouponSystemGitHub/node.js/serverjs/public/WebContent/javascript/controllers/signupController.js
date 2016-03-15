/** 
 * the controller controlling the signup page
 * @author Yuval Maayan
 * @version 1.0
 * */

couponApp.controller('signupController',['$scope','$location','$http',function($scope,$location,$http){
/** @param logout.isLoginPage = a boolean that declares if the current page is the login or signup page*/
	$scope.logout.isLoginPage=true;	

/**the function hat sends the signup request to the server with a Customer object
 * the password and username from the fields  */
	$scope.signup = function(){
		//creating the new customer object
		var newCustomer = {};
		newCustomer.username=$scope.username;
		newCustomer.password=$scope.password;
         
		var JSONcustomer = JSON.stringify(newCustomer);
		$http.post("http://localhost:8081/rest/customer/create/signup",JSONcustomer)
	    .then(function(response){
	    	//if the creation was successful, it alerts and relocates to the login page
	    	alert("Created Successfuly");
	    	$location.path("/login");
	    },respondError);
	};
}]);