/** 
 * the JS page configuring the URL patterns for each page on the website
 * @author Yuval Maayan
 * @version 1.0
 * */

/**declares a URL pattern, a template to be shown in the ng-view while the URL path fits
 * the pattern, and the controller controlling the page */
couponApp.config(function($routeProvider){
	
	$routeProvider
	.when('/login',{
		templateUrl:'WebContent/pages/login.html',
		controller:'loginController'
	})
	.when('/admin/companies',{
		templateUrl:'WebContent/pages/admin.html',
		controller:'adminCompanyController'
	})
	.when('/admin/customers',{
		templateUrl:'WebContent/pages/adminCustomers.html',
		controller:'adminCustomerController'
	})
	.when('/company',{
		templateUrl:'WebContent/pages/companyCoupons.html',
		controller:'companyCouponController'
	})
	.when('/customer/store',{
		templateUrl:'WebContent/pages/customerStore.html',
		controller:'customerStoreController'
	})
	.when('/customer/coupons',{
		templateUrl:'WebContent/pages/customerCoupons.html',
		controller:'customerCouponsController'
	})
	.when('/customer/cart',{
		templateUrl:'WebContent/pages/customerCart.html',
		controller:'customerCartController'
	})
	.when('/customer/signup',{
		templateUrl:'WebContent/pages/signup.html',
		controller:'signupController'
	})
	.otherwise({
		redirectTo:'/login'
	});
});