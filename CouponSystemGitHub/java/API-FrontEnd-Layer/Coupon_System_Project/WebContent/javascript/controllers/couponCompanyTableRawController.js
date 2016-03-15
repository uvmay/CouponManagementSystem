/** 
 * the controller controlling every raw in the company's coupons table
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('couponTrController',function($scope,$http){
	
/**the function that deletes a coupon from the server
 * @param id = the deleted coupon's id */
	$scope.deleteCoupon = function(Id){
		$("#loader").show();
		$http.delete("http://localhost:8080/Coupon_System_Project/rest/coupon/remove/id/"+parseInt(Id)+"/company")
		.then(function(){
			$scope.getAllCoupons();
			},respondError);
	};
	
/**the function that adds or removes a coupon's id from the checkedBoxes array,
 * it correlates to the state of the row's checkbox  
 * @param event = the click event
 * @param id = the id of the coupon which checkbox was clicked*/
	$scope.checkboxChange = function(event,id){
		//sets the clicked checkbox to a variable
		var checkbox = event.target;
		
		//if the checkbox is checked, the company's id is added
		//else, the fitting id in the array in nullified
		if(checkbox.checked==true){
			$scope.boxes.checkedBoxes.push(id);
			console.log(id);}
		else
			for(var i=0;i<$scope.boxes.checkedBoxes.length;i++)
				if($scope.boxes.checkedBoxes[i]==id)
					$scope.boxes.chceckedBoxes==null;
	};
	
	
});
