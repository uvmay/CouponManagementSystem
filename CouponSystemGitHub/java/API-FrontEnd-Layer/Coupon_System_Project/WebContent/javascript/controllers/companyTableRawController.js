/** 
 * the controller controlling every row in the companies table
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('comapnyTrController',function($scope,$http){
/**@param fieldsHide = declares if the edit fields should be hidden or not
 * @param fields = an object containing all of the edit fields
 * @param fields.name = the name field when editing
 * @param fields.password = the password field when editing
 * @param fields.email = the email field when editing */
	$scope.fieldsHide=true;
	$scope.fields={};
	$scope.fields.name=$scope.line.compName;
	$scope.fields.password=$scope.line.password;
	$scope.fields.email=$scope.line.email;
	
	// declaring functions
/**the function that sends the edited company to the server */
		 this.doneEditing = function(){
			//the updated company object
			var newComp = {};
			newComp.id=$scope.line.id;
			newComp.compName=$scope.fields.name;
			newComp.password=$scope.fields.password;
			newComp.email=$scope.fields.email;
			var JSONNewComp = JSON.stringify(newComp);
			$("#loader").show();
			
		    //the update request that's being sent to the server
			$http.put("http://localhost:8080/Coupon_System_Project/rest/company/update/admin",JSONNewComp)
	    	.then(
	    		function(response){
	    			   $scope.getAllCompanies();
	    		   },respondError);
			   
	};
	
/**the function that deletes a company from the server
 * @param compId = the deleted company's id */
	$scope.deleteCompany = function(compId){
		$("#loader").show();
		$http.delete("http://localhost:8080/Coupon_System_Project/rest/company/remove/id/"+compId+"/admin")
		.then(function(){
			$scope.getAllCompanies();
			},respondError);
	};
	
/**the function that adds or removes a company's id from the checkedBoxes array,
 * it correlates to the state of the row's checkbox  
 * @param event = the click event
 * @param id = the id of the company which checkbox was clicked*/
	$scope.checkboxChange = function(event,id){
		//sets the clicked checkbox to a variable
		var checkbox = event.target;
		
		//if the checkbox is checked, the company's id is added
		//else, the fitting id in the array in nullified
		if(checkbox.checked==true)
			$scope.checkedBoxes.push(id);
		else
			for(var i=0;i<$scope.checkedBoxes.length;i++)
				if($scope.checkedBoxes[i]==id)
					$scope.chceckedBoxes==null;
	};
		
});
