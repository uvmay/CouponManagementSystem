/** 
 * the directive representing every row in a customers table
 * @author Yuval Maayan
 * @version 1.0
 * */

couponApp.directive('customerTr',function(){
	return {
		retstrict: 'A',
		scope: {
			line:'=data',
			checkedBoxes:'=',
			getAllCustomers:'='
		},
		controller:'customerTrController',
		link: function link(scope, element, attrs, controller, transcludeFn) {
/**the function that edits the company selected */
			    scope.editCustomer = function(event){
			       //removes the text to leave place for the text fields
				   //shows the the text fields
			       scope.line.username="";
				   scope.line.password="";
				   scope.fieldsHide=false;
				
				    //change the "edit" button to "done"
					var button = event.target;
					var icon = $(button).children();
					icon=icon[0];
					$(icon).removeClass("glyphicon-pencil").addClass("glyphicon-ok");
					$(button).html($(button).html().replace("Edit","Done"));
					
					// changes the onclick function to the "doneEditing"
					// function in the controller
					angular.element(button).off("click",scope.editCustomer);
					angular.element(button).on("click",controller.doneEditing);
			};
		},
		templateUrl:'WebContent/javascript/templates/customertr.html'
	}
});
