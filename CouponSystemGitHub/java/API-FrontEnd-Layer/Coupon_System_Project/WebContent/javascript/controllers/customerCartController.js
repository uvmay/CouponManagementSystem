/** 
 * the controller controlling a customer's shopping cart page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('customerCartController',['$scope','$location','$http',function($scope,$location,$http){
/**@param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param isDonePurchasing = a boolean that declares if a purchase has occurred or not
 * @param boxes.checkedBoxes =  an array companies id's. the id's are of the companies which check boxes are checked
*/
	$scope.logout.isLoginPage=false;
	$scope.isDonePurchasing=false;
	$scope.boxes={};
	$scope.boxes.checkedBoxes =[];
    
	// declaring functions
/**a function that changes the page to the customer/store page */
	$scope.moveToStore= function(){
		$location.path("/customer/store");
	};
	
/**a function that changes the page to the customer/coupons page */
	$scope.moveToMyCoupons=function(){
		$location.path("/customer/coupons");
	};
	
/**a function that removes a single coupon id from the shoppingCart array 
 * @param id = the removed coupon's id*/
    $scope.removeCouponFromCart = function(id){
    	//the new cart to replace the old one
	    var newCart=[];
	    
	    //iterates over the old shopping cart, and copies all of the id's except of
	    //the removed coupon's id and null pointers
	    for(var i=0; i<$scope.general.shoppingCart.length;i++)
		    if($scope.general.shoppingCart[i]!=id && $scope.general.shoppingCart[i]!=null)
			    newCart.push($scope.general.shoppingCart[i]);
	    
	    //sets the shoppingCart object to the newset shopping cart
	    $scope.general.shoppingCart=newCart;
    };

/**a function that removes a single coupon from the shoppingCart Array and then updates the 'coupons' table
 * @param id = the removed coupon's id */
    $scope.removeSingleCoupon = function(id){
    	//removes the coupon from the shoppingCart object
	    $scope.removeCouponFromCart(id);
	    
	    //gets the coupons in the cart from the server by their id's, and inserts
	    //them into the shopping cart table
	    $scope.getCartCoupons();
	    
	    //updates the shopping cart on the server
	    $scope.general.updateCart();
    };

/**removes an array of coupons from the shoppingCart Array and then updates the
 * shopping cart table
 * @param idArray = an array of coupon id's to be removed from the shopping cart*/
    $scope.removeCouponsArray = function(idArray){
    	//removes the coupons from the shoppingCart object
	    for(var i=0;i<idArray.length;i++)
		    $scope.removeCouponFromCart(idArray[i]);
	    
	    //gets the coupons in the cart from the server by their id's, and inserts
	    //them into the shopping cart table
	    $scope.getCartCoupons();
	    
	    //updates the shopping cart on the server
	    $scope.general.updateCart();
    };

/**a function that gets the coupons in the cart from the server by their id's, and inserts
 * them into the shopping cart table*/
    $scope.getCartCoupons = function(){
	        $("#loader").show();
	        var JSONcart = JSON.stringify($scope.general.shoppingCart);
	        $http.post("http://localhost:8080/Coupon_System_Project/rest/coupon/get/by/array/customer",JSONcart)
	        .then(function(response){
	            $("#loader").hide();
	            
	            //if the response is valid, the  shopping cart table is 
	            //filled with the received data
	            $scope.coupons = response.data;
	        },function(reason){
			    $("#loader").hide();
			    respondError(reason);
			  });
    };

/**the function that purchases the coupons */
    $scope.purchaseCart = function(){
    	//sets the isDonePurchasing variable to true
        $scope.isDonePurchasing=true;
        
        //for each coupon in the shopping cart table - 
        //sends an http request with the purchased coupon the server
	    angular.forEach($scope.coupons,function(coupon,key){
		    var couponPurchased ={};
		    couponPurchased.id=coupon.id;
		    couponPurchased.title=coupon.title;
		    couponPurchased.price=coupon.price;
		    couponPurchased.amount=coupon.amount;
		    couponPurchased.startDate=coupon.startDate;
		    couponPurchased.endDate=coupon.endDate;
		    couponPurchased.image=coupon.image;
		    couponPurchased.message=coupon.message;
		    couponPurchased.type=coupon.type;
		
		    var JSONcoupon=JSON.stringify(couponPurchased);
		
		    $http.post("http://localhost:8080/Coupon_System_Project/rest/coupon/purchase/customer",JSONcoupon)
	        .then(function(response){
	    	   //if the response is valid and the purchase is successful,
	           //the "V" mark is shown on the "purchased" column of the purchased coupon
	           $("#success"+coupon.id).show();
	           
	           //removes the coupon from the cart on the page and on the server
	           //and removes it form the shopping cart table
	           $scope.removeSingleCoupon(coupon.id);
	        },function(reason){
	        	//if the response is invalid and purchase is not successful,
		        //the "X" mark is shown on the "purchased" column of the purchased coupon
	    	    $("#fail"+coupon.id).show();
	    	    
	    	    //removes the coupon from the cart on the page and on the server
	    	    $scope.removeCouponFromCart(coupon.id);	 
	    	    $scope.general.updateCart();	
	        });
	    });
    };

/** removes all checked coupons from the shopping cart and updates the 'coupons' table*/
    $scope.removeAllCheckedCoupons = function(){
	    $scope.removeCouponsArray($scope.boxes.checkedBoxes);
    };

    // done declaring functions
    //sets the isCartUpdated boolean to false
    $scope.general.isCartUpdated=false;
    $("#loader").show();
    
    //retrieves the cart from the server
    $scope.general.retrieveCart();
    
    //waits for the cart to be updated, and then inserts the coupons to the
    //shopping cart table by getting them from the server
    var interval = setInterval(function(){
	    if($scope.general.isCartUpdated==true){
		    $scope.getCartCoupons();
		    clearInterval(interval);
	    }
    },200);
}]);
