/** 
 * the directive representing every row in a companies table
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.directive('companyTr',function(){
	return {
		retstrict: 'A',
		scope: {
			line:'=data',
			checkedBoxes:'=',
			getAllCompanies:'='
		},
		controller:'comapnyTrController',
		link: function link(scope, element, attrs, controller, transcludeFn) {
/**the function that edits the company selected */
			    scope.editCompany = function(event){
				   //removes the text to leave place for the text fields
			       //shows the the text fields
			       scope.line.compName="";
				   scope.line.password="";
				   scope.line.email="";
				   scope.fieldsHide=false;
				
		   	        //change the "edit" button to "done"
					var button = event.target;
					var icon = $(button).children();
					icon=icon[0];
					$(icon).removeClass("glyphicon-pencil").addClass("glyphicon-ok");
					$(button).html($(button).html().replace("Edit","Done"));
					
					// changes the onclick function to the "doneEditing"
					// function in the controller
					angular.element(button).off("click",scope.editCompany);
					angular.element(button).on("click",controller.doneEditing);
			};
		},
		templateUrl:'javascript/templates/companytr.html'
	}
});
