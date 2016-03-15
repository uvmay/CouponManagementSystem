/** 
 * a resource describing all of the beans on the coupon system
 * @author Yuval Maayan
 * @version 1.0
 * */

/**Customer bean */
//constructor without id
exports.customer = function(username, password){
	return {'username':username, 'password':password,'coupons':[], 'cart':[]};
}
//constructor with id
exports.idCustomer = function(id, username, password){
	return {'id':id, 'username':username, 'password':password ,'coupons':[], 'cart':[]};
}

/**Company bean */
//constructor without id
exports.company = function(username, password, email){
	return {'username':username, 'password':password, 'email':email, 'coupons':[]};
}
//constructor with id
exports.idCompany = function(id, username, password, email){
	return {'id':id, 'username':username, 'password':password, 'email':email, 'coupons':[]};
}

/**Coupon bean */
//constructor without id
exports.coupon = function(title, startDate, endDate, amount, price, type, message, image ){
	return {'title':title, 'startDate':startDate, 'endDate':endDate, 'amount':amount, 'price':price, 'type':type, 'message':message, 'image':image};
}
//constructor with id
exports.idCoupon = function(id, title, startDate, endDate, amount, price, type, message, image ){
	return {'id':id, 'title':title, 'startDate':startDate, 'endDate':endDate, 'amount':amount, 'price':price, 'type':type, 'message':message, 'image':image};
}

