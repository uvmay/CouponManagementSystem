/** 
 * a RESTFUL resource performing actions on the 'coupon' resource
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param bodyparser = a resource that enables parsing of a request body
 * @param companyLogic = a Logic resource to the 'company' resource
 * @param cookieparser = a resource that enables parsing of cookies
 * @param jwt = resource that creates, encripts and decripts security tokens
 * @param Promise = the object enabling the use of promises instead of nested callbacks */
var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var companyLogic = require('../logic/CompanyLogic');
var cookieparser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and responses bodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

/**retrieves a company by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the retrieved company's id 
 * @pathname company/get/{id} */
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
				//retrieve the company by the parthParam 'id'
		        companyLogic.retrieve(req.params.id).then(function(company){
					//send the company in the response's body
			        res.json(company);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**deletes a company by it's id
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the deleted company's id 
 * @pathname company/remove/{id} */
router.delete('/remove/:id',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie==undefined || cookie==null){
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
				//delete the company by the pathParam 'id'
		        companyLogic.delete(req.params.id).then(function(company){
			        //return the deleted company in the response's body
					res.json(company);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
			}
	    });
	}
});

/**creates a company by a company object that's sent in the request body
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname company/create */
router.post('/create',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie==undefined || cookie==null){
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
				//create a company from the object that's been sent in the request body
		        companyLogic.create(req.body).then(function(compId){
					//return the new company's id in the response's body
			        res.json(compId);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**updates a company by a company object that's sent in the request body
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname company/update */
router.put('/update',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie==undefined || cookie==null){
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
				//update a company by the object that's been sent in the request body
		        companyLogic.update(req.body).then(function(lastState){
					//return the last state of the updated company
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

/**retrieves an array of companies from the coupon system which username contains the string 'string'
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam string = the string the usernames should contain 
 * @pathname company/get/by/string/{string} */
router.get('/get/by/string/:string',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie==undefined || cookie==null){
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
				//retrieve the companies by the parthParam 'string'
		        companyLogic.retrieveByString(req.params.string).then(function(compArr){
					//return an array of all of the companies which username contains the string 'string'
			        res.json(compArr);
			        res.end();
		        },function(error){
			        res.status(500);
	                next(error);
		        });
		    }
	    });
	}
});

/**retrieves an array of all of the companies in the coupon system 
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname company/get/all */
router.get('/get/all',function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie==undefined || cookie==null){
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
				//retrieve all of the companies in the coupon system
		        companyLogic.getAll().then(function(compArr){
					//return an array of the companies
			        res.json(compArr);
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