/** 
 * the directive representing every coupon in the customer's store page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

couponApp.directive('coupondiv',function(){
	return {
		retstrict: 'A',
		scope:{
			coupon:'=',
			moreInfoCoupon:'=',
			opacityWindow:'=',
			addToCart:'=',
			properType:'='
		},
		link: function link(scope){
/**a function that shows the more info window */
			scope.moreInfo=function(){
				//sets the moreInfoCoupon object's attributes to the selected
				//coupons attributes
				scope.moreInfoCoupon.id=scope.coupon.id;
				scope.moreInfoCoupon.title=scope.coupon.title;
				scope.moreInfoCoupon.price=scope.coupon.price;
				scope.moreInfoCoupon.amount=scope.coupon.amount;
				scope.moreInfoCoupon.type=scope.properType(scope.coupon.type);
				var startDate=new Date(scope.coupon.startDate);
				scope.moreInfoCoupon.startDate=startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
				var endDate=new Date(scope.coupon.endDate);
				scope.moreInfoCoupon.endDate=endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
				scope.moreInfoCoupon.image=scope.coupon.image;
				scope.moreInfoCoupon.message=scope.coupon.message;
				
				//fades in the more info window
				$("#moreInfoWindowStore").fadeIn("slow");
				$("#opacityWindow").fadeTo("slow",0.7);
				
			};
		},
		controller:'couponDivController',
		templateUrl:'javascript/templates/coupondiv.html'
	}
});
