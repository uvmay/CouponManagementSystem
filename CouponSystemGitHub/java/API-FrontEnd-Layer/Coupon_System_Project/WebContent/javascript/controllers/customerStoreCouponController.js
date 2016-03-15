/** 
 * the controller controlling the coupons on the customer's store page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('couponDivController',['$scope','$http',function($scope,$http){
/**@param isAmountZero = a boolean thats declares whether the amount of the coupon is 0 or not */
	$scope.isAmountZero=false;
	
	//declaring functions
/**a function that checks the amount attribute of the coupon
 * @return the coupon's image relative path or if the amount is 0, returns the
 * relative path to the "sold out" image */
	$scope.AmountCheck = function(){
		//if the amount is 0, isAmountZero = true and the function returns
		//the relative path to the "sold out" image
		if(parseInt($scope.coupon.amount)==0){
			$scope.isAmountZero=true;
			return "images/sold out.jpg"
		}
		//else, it returns the relative path to the original coupon's image
		else 
			return $scope.coupon.image;
	}
}]);
