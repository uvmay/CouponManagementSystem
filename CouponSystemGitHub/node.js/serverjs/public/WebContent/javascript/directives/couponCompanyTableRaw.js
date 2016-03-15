/** 
 * the directive representing every row in a company's coupons table
 * @author Yuval Maayan
 * @version 1.0
 * */

couponApp.directive('couponTr',function(){
	return {
		retstrict: 'A',
		scope:{
			x:'=',
			hides:'=',
			moreInfoCoupon:'=',
			editCoupon:'=',
			boxes:'=',
			getAllCoupons:'=',
			search:'=',
			properType:'='
		},
		controller:'couponTrController',
		link: function link(scope) {
			   
/**the function that sets the editCoupon object's fields according to the selected
 * coupon's fields */
			 scope.editCouponFunc = function(event){
				  scope.editCoupon.id=scope.x.id;
				  scope.editCoupon.title=scope.x.title;
				  scope.editCoupon.price=scope.x.price;
				  scope.editCoupon.amount=scope.x.amount;
				  scope.editCoupon.type=scope.properType(scope.x.type);
				  scope.editCoupon.startDate=new Date(scope.x.startDate);
				  scope.editCoupon.endDate=new Date(scope.x.endDate);
				  scope.editCoupon.image=scope.x.image;
				  scope.editCoupon.message=scope.x.message;
				  
				  //shows the edit panel and hides the rest of the panels
				  scope.hides.showHideEdit=false;
				  scope.hides.showHideNewCoupon=true;
				  scope.hides.showHideMoreInfo=true;
				  
			};
			
/**the function that sets the moreInfoCoupon object's fields according to the selected
 * coupon's fields */
			scope.moreInfo = function(){
				scope.moreInfoCoupon.title=scope.x.title;
				scope.moreInfoCoupon.price=scope.x.price;
				scope.moreInfoCoupon.amount=scope.x.amount;
				scope.moreInfoCoupon.type=scope.properType(scope.x.type);
				var startDate=new Date(scope.x.startDate);
				scope.moreInfoCoupon.startDate=startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
				var endDate=new Date(scope.x.endDate);
				scope.moreInfoCoupon.endDate=endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
				scope.moreInfoCoupon.image=scope.x.image;
				scope.moreInfoCoupon.message=scope.x.message;

				//shows the more info panel and hides the rest of the panels
				scope.hides.showHideEdit=true;
				scope.hides.showHideNewCoupon=true;
				scope.hides.showHideMoreInfo=!scope.hides.showHideMoreInfo;
			};
		},
		templateUrl:'WebContent/javascript/templates/companycoupontr.html'
	}
});
