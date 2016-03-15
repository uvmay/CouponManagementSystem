/** 
 * the controller controlling every row in the customers table
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('customerTrController',function($scope,$http){
/**@param fieldsHide = declares if the edit fields should be hidden or not
 * @param fields = an object containing all of the edit fields
 * @param fields.name = the name field when editing
 * @param fields.password = the password field when editing */
	$scope.fieldsHide=true;
	$scope.fields={};
	$scope.fields.name=$scope.line.custName;
	$scope.fields.password=$scope.line.password;
	
/**the function that sends the edited company to the server */
		 this.doneEditing = function(){
			//the updated customer's object
			var newCust = {};
			newCust.id=$scope.line.id;
			newCust.custName=$scope.fields.name;
			newCust.password=$scope.fields.password;
			
			var JSONNewCust = JSON.stringify(newCust);
			$("#loader").show();
			$http.put("http://localhost:8080/Coupon_System_Project/rest/customer/update/admin",JSONNewCust)
	    	.then(
	    	 function(response){
	    	     $scope.getAllCustomers();
	    		},function(reason){
					  $("#loader").hide();
					  respondError(reason);
					 });
	};
	
/**the function that deletes a customer from the server
 * @param compId = the deleted company's id */
	$scope.deleteCustomer = function(custId){
		$("#loader").show();
		$http.delete("http://localhost:8080/Coupon_System_Project/rest/customer/remove/id/"+custId+"/admin")
		.then(function(){
			$scope.getAllCustomers();
			},function(reason){
				  $("#loader").hide();
				  respondError(reason);
				 });
	};
	
/**the function that adds or removes a customer's id from the checkedBoxes array,
 * it correlates to the state of the row's checkbox  
 * @param event = the click event
 * @param id = the id of the customer which checkbox was clicked*/
	$scope.checkboxChange = function(event,id){
		//sets the clicked checkbox to a variable
		var checkbox = event.target;

		//if the checkbox is checked, the customer's id is added
		//else, the fitting id in the array in nullified
		if(checkbox.checked==true)
			$scope.checkedBoxes.push(id);
		else
			for(var i=0;i<$scope.checkedBoxes.length;i++)
				if($scope.checkedBoxes[i]==id)
					$scope.chceckedBoxes==null;
	};
		
});
