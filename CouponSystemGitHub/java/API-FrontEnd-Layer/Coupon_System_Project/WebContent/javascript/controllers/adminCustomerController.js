/** 
 * the controller controlling admin's customer page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('adminCustomerController',  ['$scope',"$http",'$location',function($scope,$http,$location){
/**@param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param checkedBoxes = an array customer id's. the id's are of the companies which check boxes are checked
 * @param showHide = a boolean declaring if the new company panel is hidden or not
 * @param search = an object that contains all of the search related attributes
 * @param search.selector = selects which kind of search will happen
 * @param newCustomer = the object which attributes are the new created customer's attributes
 */
	$scope.logout.isLoginPage=false;	
	$scope.checkedBoxes =[];
	$scope.showHide=true;
	$scope.search={};
	$scope.search.selector="Id";
	$scope.newCustomer={};
	
	// declaring functions
/**a function that gets all of the customers in the system from the server */
	$scope.getAllCustomers = function(){
		$http.get("http://localhost:8080/Coupon_System_Project/rest/customer/read/all/admin")
		.then(function(response){
		//if the response is valid, the loader is hidden and the data is inserted
		//to the object "customers" which is ng-repeated in the table
		$("#loader").hide();
		$scope.customers = response.data;
		},respondError);
		};
	
/**a function that creates a new customer in the database. 
 * it sends the object "newCustomer"*/	
		$scope.createCustomer = function(){
		var JSONNewCustomer = JSON.stringify($scope.newCustomer);
		$("#loader").show();
		$http.post("http://localhost:8080/Coupon_System_Project/rest/customer/create/admin",JSONNewCustomer)
    	.then(
    		function(response){
    			//if the response is valid, updates the customers table and hides
    			//the new customer window
    			$scope.getAllCustomers();
    		    $scope.showHide=true;	
    		},function(reason){
    			//if the response is invalid, updates the customers table and hides
    			//the new customer window, then alerts the error
    			$scope.getAllCustomers();
 			    $scope.showHide=true;
    			respondError(reason);
    		});
	}; 
	
/**a function that shows or hides the new customer window */
	$scope.showCreate = function(){	
	   $scope.showHide=!$scope.showHide;	
	};
	
/**a function that deletes all of the checked companies */
	$scope.deleteAllCheckedAdminCustomers = function(){
		$("#loader").show();
		//iterates over the id's in the checkedBoxes array
		//if checkedBoxes[i] isn't null, it deletes the customer with the id checkedBoxes[i]
		for(var i=0;i<$scope.checkedBoxes.length;i++){
			if($scope.checkedBoxes[i]!=null)
			   $http.delete("http://localhost:8080/Coupon_System_Project/rest/customer/remove/id/"+$scope.checkedBoxes[i]+"/admin")
			   .then(function(){
				   //if the response is valid, updates the companies table
					$scope.getAllCustomers();
				  },respondError);
	   }	
	}
	
/**the search function for the search bar 
 * searches by the search selector, and validates the search data when needed*/
	$scope.search.funct=function(){
		$("#loader").show();
		//if the search bar is empty, it requests all of the companies in the database
		if($scope.search.value==null || $scope.search.value=="")
			$scope.getAllCustomers();

		else{
		  //if the selector is "id" and the search value is a  number,
		  // a request for a customer with this id is sent to the server
		  if($scope.search.selector=="Id"){
			if(!isNaN(parseInt($scope.search.value))){
			$http.get("http://localhost:8080/Coupon_System_Project/rest/customer/read/id/"+parseInt($scope.search.value)+"/admin")
			.then(function(response){
				//if the response is valid, the loader is hidden,
				//and the table is filled with the response data
				$("#loader").hide();
				$scope.customers = [response.data];
			  },function(reason){
				  $("#loader").hide();
				  respondError(reason);
				  });
		  }
		 } 
		  else{
			//if the selector is "name",
			//a request for customers which name contains the string in the search bar is sent to the server
			$http.get("http://localhost:8080/Coupon_System_Project/rest/customer/read/by/string/"+$scope.search.value+"/admin")
			.then(function(response){
				//if the response is valid, the loader is hidden,
				//and the table is filled with the response data
				$("#loader").hide();
				$scope.customers = response.data;
			  },function(reason){
				  $("#loader").hide();
				  respondError(reason);
				  });
		   }
		}
	}
	
/**a function that changes the page to the admin/companies page */
	$scope.moveToCompanies = function(){
		$location.path('/admin/companies');
	}
	
	// done declaring functions
	//shows the loader and gets all of the customers in the system from the server
	$("#loader").show();
	$scope.getAllCustomers();
	
}]);
