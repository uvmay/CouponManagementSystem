/** 
 * a RESTFUL resource performing actions on the 'customer' resource
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param bodyparser = a resource that enables parsing of a request body
 * @param customerLogic = a Logic resource to the 'customer' resource
 * @param cookieparser = a resource that enables parsing of cookies
 * @param jwt = resource that creates, encripts and decripts security tokens
 * @param Promise = the object enabling the use of promises instead of nested callbacks */
var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var couponLogic = require('../logic/CouponLogic');
var cookieparser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and responses bodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

/*-------------------Company Methods---------------------*/
/**retrieves a coupon by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the retrieved coupon's id 
 * @pathname coupon/get/{id}/company */
router.get('/get/id/:id/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
    
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
		
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupon by the parthParam 'id'
		        couponLogic.retrieve(req.params.id).then(function(coupon){
					//return the retrieved coupon
			        res.json(coupon);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**deletes a coupon by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the deleted coupon's id 
 * @pathname coupon/delete/{id}/company */
router.delete('/remove/:id/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//delete the coupon by the pathParam 'id'
		        couponLogic.delete(decoded.userId,req.params.id).then(function(coupon){
			        //return the deleted coupon in the response's body
			        res.json(coupon);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**creates a coupon in the coupon system
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/create/company */
router.post('/create/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
		        //creates a coupon from the object that's been sent in the request body
		        couponLogic.create(decoded.userId,req.body).then(function(couponId){
					//returns the new coupon's id
			        res.json(couponId);
			        res.end();
		        },function(error){
			       res.status(500);
	               next(error);
		        });
		    }
	    });
	}
});

/**updates a coupon by a coupon object that's sent in the request body
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/update/company */
router.put('/update/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//update a coupon by the object that's been sent in the request body
		        couponLogic.update(req.body).then(function(lastState){
					//return the last state of the updated coupon
			        res.json(lastState);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the company that sent the request, which title contains the string 'string'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam string = the string the title should contain 
 * @pathname coupon/get/by/string/{string}/company */
//coupon/get/by/string/{string}/company
router.get('/get/by/string/:string/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupons by the parthParam 'string'
		        couponLogic.companyGetCouponsByString(decoded.userId,req.params.string).then(function(coupArr){
					//return an array of all of the company's coupons which title contains the string 'string'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			       res.status(500);
	               next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of all of the coupons owned by the company that sent the request
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/get/all/company */
router.get('/get/all/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
	    	//if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the company's coupons
		        couponLogic.companyGetCoupons(decoded.userId).then(function(coupArr){
					//return an array of the company's coupons
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the company that sent the request, which type is 'type'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam type = the type of the retrieved coupons
 * @pathname coupon/get/by/type/{type}/company */
router.get('/get/by/type/:type/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
	    	//if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupons by the parthParam 'type'
		        couponLogic.companyGetCouponsByType(decoded.userId,req.params.type).then(function(coupArr){
					//return an array on the company's coupons which are of the type 'type'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the company that sent the request, which price is 'price'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam price = the price of the retrieved coupons
 * @pathname coupon/get/by/price/{price}/company */
router.get('/get/by/price/:price/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
	    	//if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupons by the parthParam 'price'
		        couponLogic.companyGetCouponsByPrice(decoded.userId,req.params.price).then(function(coupArr){
					//return an array on the company's coupons which price is 'price'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of the company's coupons which expiration date is prior to 'date'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam date = the date that the coupons expiration date should be prior to
 * @pathname coupon/get/by/date/{date}/company */
router.get('/get/by/date/:date/company',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an company
		    else if(decoded.type!="COMPANY"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupons by the parthParam 'date'
		        couponLogic.companyGetCouponsByExpirationDate(decoded.userId,req.params.date).then(function(coupArr){
					//return an array of the company's coupons which expiration date is prior to 'date'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/*---------------Customer Methods---------------------*/
/**purchases a coupon and adding it to the customer's 'coupons' attribute
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the id of the purchased coupon
 * @pathname coupon/purchase/id/:id/customer */
router.get('/purchase/id/:id/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//purchases the coupon by adding it to the customer's 'coupons' attribute
		        couponLogic.customerPurchaseCoupon(decoded.userId,req.params.id).then(function(result){
					//returns the number of lines updated in the database as a result of the purchase
			        res.json(result);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the customer that sent the request, which title contains the string 'string'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam string = the string the title should contain 
 * @pathname coupon/purchased/get/by/string/{string}/customer */
router.get('/purchased/get/by/string/:string/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
		
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the coupons by the parthParam 'string'
		        couponLogic.customerGetCouponsByString(decoded.userId,req.params.string).then(function(coupArr){
					//return an array of all of the customer's coupons which title contains the string 'string'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of all of the coupons owned by the customer that sent the request
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/purchased/get/all/customer */
router.get('/purchased/get/all/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
		
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the customer's coupons 
		        couponLogic.customerGetCoupons(decoded.userId).then(function(coupArr){
					//return an array of all of the customer's coupons 
		       	    res.json(coupArr);
			        res.end();
		        },function(error){
		        	res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the customer that sent the request, which type is 'type'
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam type = the type of the retrieved coupons
 * @pathname coupon/purchased/get/by/type/{type}/customer */
router.get('/purchased/get/by/type/:type/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't a customer
		    else if(decoded.type!="CUSTOMER"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the customer's coupons by pathParam 'type'
		        couponLogic.customerGetCouponsByType(decoded.userId,req.params.type).then(function(coupArr){
					//return an array of the customer's coupons which type is 'type'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons owned by the customer that sent the request, which price is 'price'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam price = the price of the retrieved coupons
 * @pathname coupon/purchased/get/by/price/{price}/customer */
router.get('/purchased/get/by/price/:price/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the customer's coupons by pathParam 'price'
		        couponLogic.customerGetCouponsByPrice(decoded.userId,req.params.price).then(function(coupArr){
					//return an array of the customer's coupons which price is lower than 'price' or equals
			        res.json(coupArr);
			        res.end();
		        },function(error){
		        	res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/*-----customer general coupons---------*/

/**retrieves an array of coupons from the coupon system which title contains the string 'string'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam string = the string the title should contain 
 * @pathname coupon/get/by/string/{string}/customer */
router.get('/get/by/string/:string/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the coupons in the coupon system by pathParam 'string'
		        couponLogic.getAllCouponsByString(req.params.string).then(function(coupArr){
					//return an array of all of the coupons in the coupon system which title contains the string 'string'
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of all of the coupons in the coupon system
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/get/all/customer */
router.get('/get/all/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the coupons in the coupon system 
		        couponLogic.getAll().then(function(coupArr){
					//return an array of all of the coupons in the coupon system 
			        res.json(coupArr);
			        res.end();
		        },function(error){
		        	res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons in the coupon system which type is 'type'
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam type = the type of the retrieved coupons
 * @pathname coupon/get/by/type/{type}/customer */
router.get('/get/by/type/:type/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't a customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the coupons in the coupon system by pathParam 'type'
		        couponLogic.getAllCouponsByType(req.params.type).then(function(coupArr){
					//return an array of all of the coupons in the coupon system which type is 'type'
		        	res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of coupons in the coupon system which price is 'price'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam price = the price of the retrieved coupons
 * @pathname coupon/get/by/price/{price}/customer */
router.get('/get/by/price/:price/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
		        couponLogic.getAllCouponsByPrice(req.params.price).then(function(coupArr){
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**gets an array of coupon id's and returns an array of the coupons that match the id's
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname coupon/get/by/array/customer */
router.post('/get/by/array/customer',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
	else{
	    jwt.verify(cookie,'secret',function(err, decoded){
		    //if an error occured
		    if(err){
		    	var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an customer
		    else if(decoded.type!="CUSTOMER"){
		    	var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve an array of coupons which id's match the id's on the request's body
		        couponLogic.getCouponsByIdArr(req.body).then(function(coupArr){
					//return an array of the coupons 
			        res.json(coupArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});


module.exports = router;