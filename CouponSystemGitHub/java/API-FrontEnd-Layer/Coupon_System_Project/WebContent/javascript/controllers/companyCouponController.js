/** 
 * the controller controlling a company's coupon page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.controller('companyCouponController',  ['$scope','$http','$location','Upload',function($scope,$http,$location,Upload){
/**@param logout.isLoginPage = a boolean that declares if the current page is the login or signup page
 * @param boxes.checkedBoxes = an array customer id's. the id's are of the companies which check boxes are checked
 * @param search = an object that contains all of the search related attributes
 * @param search.type = an object containing all of the attributes related to the "type" selector
 * @param search.type.selector = the different coupon types selector
 * @param search.date = an object containing all of the attributes related to the "date" selector
 * @param newCoupon = the object which attributes are the new created coupon's attributes
 * @param moreInfoCoupon = the object which attributes are shown on the "more info" panel
 * @param search.selector = selects which kind of search will happen
 * @param search.type.showHide = a boolean that declares if the coupon "type" selector should be hidden or not
 * @param search.date.showHide = a boolean that declares if the coupon "date" selector should be hidden or not
 * @param search.searchbar.showHide = a boolean that declares if the search text box should be hidden or not
 * @param newCoupon.type = the new coupon's "type" attribute
 * @param newCoupon.image = the new coupon's "image" attribute 
 * @param editCoupon = an object containing all of the attributes of the coupon that's being edited
 * @param hides = an object containing all of the boolean attributes that determines which window should be hidden
 * @param hides.showHideEdit = a boolean that declares if the edit coupon window is hidden or not
 * @param hides.showHideNewCoupon = a boolean that declares if the new coupon window is hidden or not
 * @param hides.showHideMoreInfo = a boolean that declares if the more info window is hidden or not
 * @param newImageUrl = the URL of the latest uploaded image */
	$scope.logout.isLoginPage=false;	
	$scope.boxes={};
	$scope.boxes.checkedBoxes =[];
	$scope.search={};
	$scope.search.type={};
	$scope.search.type.selector="Resturants";
	$scope.search.date={};
	$scope.newCoupon={};
	$scope.moreInfoCoupon={};
	$scope.search.selector="Id";
	$scope.search.type.showHide=true;
	$scope.search.date.showHide=true;
	$scope.search.searchbar={};
	$scope.search.searchbar.showHide=false;
	$scope.newCoupon.type="Resturants";
    $scope.newCoupon.image="images/No_image_available.jpg";
	$scope.editCoupon={};
	$scope.hides={};
    $scope.hides.showHideEdit=true;
	$scope.hides.showHideNewCoupon=true;
	$scope.hides.showHideMoreInfo=true;
    $scope.newImageUrl="";
    
    // making ever tag with the class "date" a jquery-ui datepicker
    $(".date").datepicker();
    
	// declaring functions
/**a function that hides and shows the search bar which is relevant to the search selector */
	$scope.isDateOrType = function(){
		//if the search selector is "Type", it shows a "select" type of search bar
		if($scope.search.selector=="Type"){
			$scope.search.type.showHide=false;
			$scope.search.date.showHide=true;
			$scope.search.searchbar.showHide=true;
			}
		//if the search selector is "End Date", it shows a jqeury-ui datepicker search bar
		else if($scope.search.selector=="End Date"){
			$scope.search.type.showHide=true;
			$scope.search.date.showHide=false;
			$scope.search.searchbar.showHide=true;
		}
		//else, it shows a text box search bar
		else{
			$scope.search.type.showHide=true;
			$scope.search.date.showHide=true;
			$scope.search.searchbar.showHide=false;
		}

	};
	
/**a function that gets all of the company's coupons in the system from the server */
	$scope.getAllCoupons = function(){
		$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/all/company")
		.then(function(response){
			//if the response is valid, the loader is hidden and the data is inserted
			//to the object "coupons" which is ng-repeated in the table
		    $("#loader").hide();
		    $scope.coupons = response.data;
		},respondError);
		};
	
/**a function that creates a new customer in the database. 
 * it sends the object "newCoupon"*/
	$scope.createCoupon = function(){
		//all of the attributes are parsed to the relevant types
		$scope.newCoupon.startDate=Date.parse($scope.newCoupon.startDate);
		$scope.newCoupon.endDate=Date.parse($scope.newCoupon.endDate);		
        $scope.newCoupon.type = $scope.newCoupon.type.toUpperCase();
        
		//if an image was uploaded it sets it as the new coupon's image
        if($scope.newImageUrl!="")
           $scope.newCoupon.image = $scope.newImageUrl;
		
		var JSONNewCoupon = JSON.stringify($scope.newCoupon);
		$("#loader").show();
		$http.post("http://localhost:8080/Coupon_System_Project/rest/coupon/create/company",JSONNewCoupon)
    	.then(
    		function(response){
    			//if the response is valid, updates the coupons table and hides
    			//the new coupon window
    			$scope.getAllCoupons();
    			$scope.hides.showHideNewCoupon=true;	
    		},function(reason){
    			//if the response is invalid, updates the coupons table and hides
    			//the new coupon window, then alerts the error
    			$scope.getAllCoupons();
 			    $scope.hides.showHideNewCoupon=true;
    			respondError(reason);
    		});
	}; 
/**a function that shows or hides the new coupon bar */
	$scope.showCreate = function(){
	     $scope.hides.showHideNewCoupon=!$scope.hides.showHideNewCoupon;
	     $scope.hides.showHideEdit=true;
	     $scope.hides.showHideMoreInfo=true;
	};
	
/**a function that deletes all of the checked coupons */
	$scope.deleteAllCheckedCompanyCoupons = function(){
		$("#loader").show();
		//iterates over the id's in the checkedBoxes array
		//if checkedBoxes[i] isn't null or undefined, it deletes the coupon with the id checkedBoxes[i]
		for(var i=0;i<$scope.boxes.checkedBoxes.length;i++){
			if($scope.boxes.checkedBoxes[i]!=null && $scope.boxes.checkedBoxes[i]!=undefined )
			   $http.delete("http://localhost:8080/Coupon_System_Project/rest/coupon/remove/id/"+$scope.boxes.checkedBoxes[i]+"/company")
			   .then(function(){
				   //if the response is valid, updates the coupons table
					$scope.getAllCoupons();
				  },function(reason){
					  $("#loader").hide();
					  respondError(reason)
					  });
	   }	
	}
	
/**the search function for the search bar 
 * searches by the search selector, and validates the search data when needed*/
	$scope.search.funct=function(){
		$("#loader").show();
		//if the search text box is empty and the selector is relevant to the search text box,
		//it requests all of the companies in the database
		if(($scope.search.value==null || $scope.search.value=="") && ( $scope.search.type.showHide==true &&
		$scope.search.date.showHide==true))
			$scope.getAllCoupons();

		else{
		  //if the selector is "id" and the search value is a  number,
		  // a request for a coupon with this id is sent to the server
		  if($scope.search.selector=="Id"){
			if(!isNaN(parseInt($scope.search.value))){
			$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/id/"+parseInt($scope.search.value)+"/company")
			.then(function(response){
				$("#loader").hide();
				$scope.coupons = [response.data];
			  },function(reason){
				  $("#loader").hide();
				  respondError(reason);
				  });
		  }else 
			  $("#loader").hide();
		 } 
		  //if the selector is "title",
		  //a request for coupons which name contains the string in the search bar is sent to the server
		  else if($scope.search.selector=="Title"){
			$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/string/"+$scope.search.value+"/company")
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
				$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/type/"+$scope.search.type.selector.toUpperCase()+"/company")
				.then(function(response){
					$("#loader").hide();
					$scope.coupons = response.data;
				  },function(reason){
					  $("#loader").hide();
					  respondError(reason);
					  });
			   }
		  //if the selector is "End Date",
		  //a request for coupons with the selected expiration date is sent to the server
		  else if($scope.search.selector=="End Date"){
			   console.log($scope.search.date.value);
				$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/date/"+Date.parse($scope.search.date.value)+"/company")
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
				$http.get("http://localhost:8080/Coupon_System_Project/rest/coupon/read/by/price/"+parseFloat($scope.search.value)+"/company")
				.then(function(response){
					$("#loader").hide();
					$scope.coupons = response.data;
				  },function(reason){
					  $("#loader").hide();
					  respondError(reason);
					  });
			   }else 
				   $("#loader").hide();
			  }
		}
	};
	
/**a function that sends a coupon to the server after it was edited */
	$scope.doneEditingCoupon = function(){
		    //all of the attributes are parsed to the relevant types
			$scope.editCoupon.startDate=Date.parse($scope.editCoupon.startDate);
			$scope.editCoupon.endDate=Date.parse($scope.editCoupon.endDate);		
	        $scope.editCoupon.type = $scope.editCoupon.type.toUpperCase();
		   var JSONEditCoup = JSON.stringify($scope.editCoupon);
		   $("#loader").show();
		   $http.put("http://localhost:8080/Coupon_System_Project/rest/coupon/update/company",JSONEditCoup)
    	   .then(
    		   function(response){
    			   //if the response is valid, updates the coupons table and hides
       			   //the edit coupon window
    			   $scope.getAllCoupons();
    			   $scope.hides.showHideEdit=true;				
    		   },function(reason){
    			     //if the response is invalid, hides the loader
       			     //and alerts the error
					  $("#loader").hide();
					  respondError(reason);
					  });
};
    
/**a function that closes the more info window */
    $scope.closeMoreInfo = function(){
		$scope.hides.showHideMoreInfo=true;
    }
    
/**a function that happens on a coupon image selection - it uploads the image to the server*/
    $scope.onFileSelect = function($file) {
          var file=$file;
          Upload.upload({
            url: "http://localhost:8080/Coupon_System_Project/rest/upload/coupon/image",
            data: {file:file},
            progress: function(e){}
          }).then(function(response) {
            //when the file is uploaded successfully,
        	//the newImageUrl is set to the response data, which is a URL path
        	//to the image on the server
            $scope.newImageUrl=response.data;
            //checks if it's an edited coupon or a new coupon and sets the image accordingly
            if($scope.hides.showHideNewCoupon==false)
                  $scope.newCoupon.image=$scope.newImageUrl;
            else
                $scope.editCoupon.image=$scope.newImageUrl;
          },respondError); 
        
    };
    
	// done declaring functions
	//shows the loader and gets all of the company's coupons from the server
	$("#loader").show();
	$scope.getAllCoupons();
	
}]);
