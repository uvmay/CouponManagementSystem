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
var customerLogic = require('../logic/CustomerLogic');
var cookieparser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and responses bodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

/**retrieves a customer by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the retrieved customer's id 
 * @pathname customer/get/{id} */
router.get('/get/id/:id',function(req,res,next){
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
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the customer by the parthParam 'id'
		        customerLogic.retrieve(req.params.id).then(function(customer){
					//send the customer in the response's body
			        res.json(customer);
			        res.end();
		        },function(error){
			       res.status(500);
	               next(error);
		        });
		    }
	    });
	}
});

/**deletes a customer by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the deleted customer's id 
 * @pathname customer/remove/{id} */
router.delete('/remove/:id',function(req,res,next){
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
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//delete the customer by the pathParam 'id'
		        customerLogic.delete(req.params.id).then(function(customer){
			        //return the deleted customer in the response's body
			        res.json(customer);
			        res.end();
		        },function(error){
			       res.status(500);
	               next(error);
		        });
		    }
	    });
	}
});

/**creates a customer from the signup page
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/create/signup */
router.post('/create/signup',function(req,res,next){
	    
		//creates a customer from the object that's been sent in the request body
		customerLogic.create(req.body).then(function(custId){
			//returns the new customer's id
		    res.send(custId);
			res.end();
		},function(error){
			res.status(500);
	        next(error);
		});
});

/**creates a customer from the admin page
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/create */
router.post('/create',function(req,res,next){
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
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
		        //creates a customer from the object that's been sent in the request body
		        customerLogic.create(req.body).then(function(custId){
					//returns the new customer's id
			        res.json(custId);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**updates a customer by a customer object that's sent in the request body
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/update */
router.put('/update',function(req,res,next){
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
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//update a customer by the object that's been sent in the request body
		        customerLogic.update(req.body).then(function(lastState){
					//return the last state of the updated customer
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

/**retrieves an array of customers from the coupon system which username contains the string 'string'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam string = the string the usernames should contain 
 * @pathname customer/get/by/string/{string} */
router.get('/get/by/string/:string',function(req,res,next){
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
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve the customers by the parthParam 'string'
		        customerLogic.retrieveByString(req.params.string).then(function(custArr){
					//return an array of all of the customers which username contains the string 'string'
			        res.json(custArr);
			        res.end();
		        },function(error){
			       res.status(500);
	               next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of all of the customers in the coupon system 
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/get/all */
router.get('/get/all',function(req,res,next){
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
		    if(err || decoded=='undefined' || decoded==null){
			    var error ={message:'Please Login Again',code:401};
	            res.status(401);
	            next(error);
		    }
		
		    //if the client isn't an admin
		    else if(decoded.type!="ADMIN"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//retrieve all of the customers in the coupon system
		        customerLogic.getAll().then(function(custArr){
					//return an array of the customers
			        res.json(custArr);
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
/**updates the shoppin cart to the most recent shopping cart that is sent in the request body
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/update/cart */
router.put('/update/cart',function(req,res,next){
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
				//updates the shoppin cart to the most recent shopping cart that was sent in the request body
		        customerLogic.updateCart(decoded.userId,req.body).then(function(lastState){
					//returns the last state of the shopping cart
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

/**retrieves the 'cart' attribute of the customer who called the method
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname customer/get/cart */
router.get('/get/cart',function(req,res,next){
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
				//retrieves the 'cart' attribute of the customer who called the method
		        customerLogic.getCart(decoded.userId).then(function(cart){
					//returns the cart
			        res.json(cart);
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