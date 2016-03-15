/** 
 * the JS page configuring the URL patterns for each page on the website
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 * */

/**declares a URL pattern, a template to be shown in the ng-view while the URL path fits
 * the pattern, and the controller controlling the page */
couponApp.config(function($routeProvider){
	
	$routeProvider
	.when('/login',{
		templateUrl:'pages/login.html',
		controller:'loginController'
	})
	.when('/admin/companies',{
		templateUrl:'pages/admin.html',
		controller:'adminCompanyController'
	})
	.when('/admin/customers',{
		templateUrl:'pages/adminCustomers.html',
		controller:'adminCustomerController'
	})
	.when('/company',{
		templateUrl:'pages/companyCoupons.html',
		controller:'companyCouponController'
	})
	.when('/customer/store',{
		templateUrl:'pages/customerStore.html',
		controller:'customerStoreController'
	})
	.when('/customer/coupons',{
		templateUrl:'pages/customerCoupons.html',
		controller:'customerCouponsController'
	})
	.when('/customer/cart',{
		templateUrl:'pages/customerCart.html',
		controller:'customerCartController'
	})
	.when('/customer/signup',{
		templateUrl:'pages/signup.html',
		controller:'signupController'
	})
	.otherwise({
		redirectTo:'/login'
	});
});