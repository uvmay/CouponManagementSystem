/** 
 * the controller controlling the login page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('loginController',  function($scope,$http,$location){
/**@param selectType = the selected user type 
 * @param logout.isLoginPage = a boolean that declares if the current page is the login or signup page*/
	    $scope.selectType="Customer";
	    $scope.logout.isLoginPage=true;	

	    // function declaration
/**a function relocating the the signup page */
	    $scope.toSignUp=function(){
			$location.path("/customer/signup");
		};

/**a function that sends a login request to the server with a Login object
 * containing the username, password and user type */
	    $scope.login = function(){
	    //creates the login object from the fields
		var loginObject = {"userName":$scope.username, "password":$scope.password, "type":$scope.selectType.toUpperCase()};
		var JSONLoginObject = JSON.stringify(loginObject);
		
		//starts the "login loader"
		var timer = $scope.loadLogin();
	    	$http.post("http://localhost:8080/Coupon_System_Project/rest/login",JSONLoginObject)
	    	.then(function(response){
	    		//when the login object is valid
	    		//stops the "login loader"
	    		$scope.stopLoadLogin(timer);
	    		
	    		//relocates to the proper page using the "selectType" field
	    		if($scope.selectType=="Admin")
	    			 window.location.href="http://localhost:8080/Coupon_System_Project/#/admin/companies";
	    		else if($scope.selectType=="Company")
			    	 window.location.href="http://localhost:8080/Coupon_System_Project/#/company";
		    	else
				     window.location.href="http://localhost:8080/Coupon_System_Project/#/customer/store";
	    		
	    		},function(reason){
		    	   //when the login object is invalid it alerts and stays on the login page
	    		   alert(reason.data.errorMessage);
	    		   $scope.username="";
	    		   $scope.password="";
	    		   $scope.stopLoadLogin(timer);
	    	});
		};
		
/**a function that starts the loading of the login loader 
 * @return the interval that is responsible for the loader's loading*/
		$scope.loadLogin = function(){
			var count=0;
			//a timer that increases the size of the loader by 10px every 90 milliseconds
			var timer = window.setInterval(function(){
				count+=10;
				$("#loginLoading").css("width", count);
				if(count>=$(window).width())
					window.clearInterval(timer);
			},90);
			return timer;
		}
		
/**a function that stops the login loader's loading
 * @param the interval that loads the loader */
		$scope.stopLoadLogin = function(timer){
			window.clearInterval(timer);
			$("#loginLoading").css("width", 0);
		}
		
		//done declaring functions
		//checks if the URL pattern contains an error parameter
		//if so, it alerts the error message
		var errorMsg = urlErrorParser(window.location.href);
		if(errorMsg!="")
			alert(errorMsg);
});

