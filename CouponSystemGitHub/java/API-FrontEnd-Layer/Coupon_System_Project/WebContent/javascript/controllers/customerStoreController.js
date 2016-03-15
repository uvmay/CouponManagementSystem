/** 
 * the controller controlling the customer's coupon store page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('customerStoreController',['$scope','$location','$http',function($scope,$location,$http){
/**@param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param search = an object that contains all of the search related attributes
 * @param search.type = an object containing all of the attributes related to the "type" selector
 * @param moreInfoCoupon = the object which attributes are shown on the "more info" panel
 * @param opacityWindow = the object containing all of the attributes related to the low opcaity window
 * @param search.selector = selects which kind of search will happen
 * @param search.type.selector = selects which kind of coupons will be retrieved when searched
 * @param search.searchbar.showHide = a boolean that declares if the searchbar is hidden or not
 * @param search.type.showHide = a boolean that declares if the search type is hidden or not 
 * @param viewport = the size of the coupon's store panel - fits the screen size*/
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
    $scope.viewport = parseInt($(window).height())-270;
	
    //declaring functions
/**a function that changes the page to the customer/coupons page */
	$scope.moveToMyCoupns= function(){
		$location.path("/customer/coupons");
	};
	
/**a function that changes the page to the customer/cart page */
	$scope.moveToShoppingCart=function(){
		$location.path("/customer/cart");
	};

/**a function that shows and hides the shopping alert when an item is added to the cart
 * @param the shopping alert object in the DOM */
	$scope.shoppingAlert = function(alert){
		$(alert).fadeIn("fast");
		setTimeout(function(){
			$(alert).fadeOut("fast");
		},1000);
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
	
/**a function that adds a coupon to the shopping cart
 * @param coupon = the coupon to add to the cart */
	$scope.addToCart=function(coupon){
		//a boolean that declares if the coupon should be added or not
		var add = true;
		
		//iterates over the shoppinCart and checks if the coupon already exists
		//in the shopping cart. if it exists - the boolean "add" is set to false
		for(var i=0;i<$scope.general.shoppingCart.length;i++){
			if($scope.general.shoppingCart[i]!=null && $scope.general.shoppingCart[i]!=undefined)
			   if($scope.general.shoppingCart[i]==coupon.id){
				   add=false;   
			   }
		}
		
		//if the "add" boolean is true, the coupon is added to the cart
		if(add==true){
			$scope.general.shoppingCart.push(coupon.id);
			$scope.general.updateCart();
		   
			//if the coupon was added from the moreInfoCoupon window, the fitting
			//shopping alert is shown. else, another alert is shown
		    if(coupon===$scope.moreInfoCoupon)
			    $scope.shoppingAlert($("#shoppingAlertInfo"));	
		    else
		    	$scope.shoppingAlert($("#shoppingAlert"));
		}
	};
	
/**the search function for the search bar 
 * searches by the search selector, and validates the search data when needed*/
	$scope.search.funct=function(){
		$("#loader").show();
		
		//if the search text box is empty and the selector is relevant to the search text box,
		//it requests all of the coupons in the database
		if(($scope.search.value==null || $scope.search.value=="") &&  $scope.search.type.showHide==true)
					$scope.getAllSystemCoupons();

		//if the selector is "title",
		//a request for coupons which name contains the string in the search bar is sent to the server
		else if($scope.search.selector=="Title"){
			$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/string/"+$scope.search.value+"/customer")
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
			$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/type/"+$scope.search.type.selector.toUpperCase()+"/customer")
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
					$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/price/"+parseFloat($scope.search.value)+"/customer")
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
	
/** a function that gets all of the coupons in the system*/
	$scope.getAllSystemCoupons=function(){
		$("#loader").show();
		$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/all/customer")
		.then(function(response){
		    $("#loader").hide();
		    $scope.coupons = response.data;
		},respondError);
	}
    
	// done declaring
    $scope.getAllSystemCoupons();
    
    //gets the most updated cart from the server
    $scope.general.retrieveCart();
    
	//sets the keydown function to the general window
	$(window).keydown(function(event){
		//if the key pressed is "Esc" it triggers the closeMoreInfo function
		if(event.keyCode=="27")
			$scope.closeMoreInfo();
	});
	
}]);
