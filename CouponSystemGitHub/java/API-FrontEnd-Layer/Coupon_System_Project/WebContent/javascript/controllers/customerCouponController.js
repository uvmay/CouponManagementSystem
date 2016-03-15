/** 
 * the controller controlling a customer's purchased coupons page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('customerCouponsController',['$scope','$location','$http',function($scope,$location,$http){
/**@param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param search = an object that contains all of the search related attributes
 * @param search.searchbar = the object thats contains all of the attributes related to the text searchbar
 * @param search.type = the object thats contains all of the attributes related to the type selector
 * @param moreInfoCoupon = the object which attributes are shown on the "more info" window
 * @param search.selector = selects which kind of search will happen
 * @param search.type.selector = selects which kind of coupons will be retrieved when searched
 * @param search.searchbar.showHide = a boolean that declares if the searchbar is hidden or not
 * @param search.type.showHide = a boolean that declares if the search type is hidden or not */
	$scope.logout.isLoginPage=false;	
	$scope.search={};
	$scope.search.searchbar={};
    $scope.search.type={};
    $scope.moreInfoCoupon={};
    $scope.opacityWindow={};
	$scope.search.selector="Title";
	$scope.search.type.selector="Resturants";
    $scope.search.searchbar.showHide=false;
    $scope.search.type.showHide=true;
       
/**a function that changes the page to the customer/store page */
    $scope.moveToStore= function(){
		$location.path("/customer/store");
	};
	
/**a function that changes the page to the customer/cart page */
	$scope.moveToShoppingCart=function(){
		$location.path("/customer/cart");
	};
	
/**a function that closes the more info window */
    $scope.closeMoreInfo=function(){
		//fades out and hides the more info window
		$("#moreInfoWindowStore").fadeOut("slow");
		$("#opacityWindow").fadeTo("slow",0,function(){
			$("#moreInfoWindowStore").hide();
			$("#opacityWindow").hide();
		});	
	};
	
/**the search function for the search bar 
 * searches by the search selector, and validates the search data when needed*/
	$scope.search.funct=function(){
		$("#loader").show();
		
		//if the search text box is empty and the selector is relevant to the search text box,
		//it requests all of the coupons in the database
		if(($scope.search.value==null || $scope.search.value=="") &&  $scope.search.type.showHide==true)
					$scope.getAllCoupons();
		
		//if the selector is "title",
		//a request for coupons which name contains the string in the search bar is sent to the server
		else if($scope.search.selector=="Title"){
		   $http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/purchased/read/by/string/"+$scope.search.value+"/customer")
		   .then(function(response){
			   $("#loader").hide();
			   $scope.coupons = response.data;
			    },function(reason){
					  $("#loader").hide();
					  respondError(reason);
					  });
			} 
		//if the selector is "type",
		//a request for coupons with the selected type is sent to the server
		else if($scope.search.selector=="Type"){
		   $http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/purschased/read/by/type/"+$scope.search.type.selector.toUpperCase()+"/customer")
		   .then(function(response){
		   $("#loader").hide();
		   $scope.coupons = response.data;
				},function(reason){
					  $("#loader").hide();
					  respondError(reason);
					  });
		   }
		//if the selector is "price", and the search value is a number
		//a request for coupons with the selected price is sent to the server
		else if($scope.search.selector=="Price"){
		   if(!isNaN(parseInt($scope.search.value))){
				$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/purschased/read/by/price/"+parseFloat($scope.search.value)+"/customer")
				.then(function(response){
					$("#loader").hide();
					$scope.coupons = response.data;
					 },function(reason){
						  $("#loader").hide();
						  respondError(reason);
						  });
					 }}
			};
	
/**a function that checks if the search selector is "type"
 * if it is, it hides the text searchbar, else, it hides the type bar*/
	$scope.isType = function(){
		if($scope.search.selector=="Type"){
			$scope.search.type.showHide=false;
			$scope.search.searchbar.showHide=true;
			}
		else{
			$scope.search.type.showHide=true;
			$scope.search.searchbar.showHide=false;
		}
	};
	
/**a function that gets all of the coupons from the server */
	$scope.getAllCoupons = function(){
		$("#loader").show();
		$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/purchased/read/all/customer")
		.then(function(response){
		    $("#loader").hide();
		    $scope.coupons = response.data;
		},respondError);
	};
	
	// done declaring functions
	$scope.getAllCoupons();
	
	//sets the keydown function to the general window
	$(window).keydown(function(event){
		//if the key pressed is "Esc" it triggers the closeMoreInfo function
		if(event.keyCode=="27")
			$scope.closeMoreInfo();
	});
}]);
