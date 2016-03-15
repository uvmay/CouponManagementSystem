/** 
 * the directive representing every row the shopping cart's coupons table
 * @author Yuval Maayan
 * @version 1.0
 * */

couponApp.directive('cartCouponTr',function(){
	return {
		retstrict: 'A',
		scope:{
			coupon:'=',
			boxes:'=',
			removeSingleCoupon:'=',
			updateCart:'=',
			properType:'='
		},
		controller:'couponTrController',
		link: function link(scope) {
			 
			 //arranges the "type" attribute and the date attributes
		     scope.type=scope.properType(scope.coupon.type);
		     var startDate=new Date(scope.coupon.startDate);
			 scope.startDate=startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
			 var endDate=new Date(scope.coupon.endDate);
			 scope.endDate=endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();

		},
		templateUrl:'WebContent/javascript/templates/customercoupontr.html'
	}
});