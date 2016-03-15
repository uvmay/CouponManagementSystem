/** 
 * a RESTFUL resource performing the login and logout actions
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param bodyparser = a resource that enables parsing of a request body
 * @param cookieparser = a resource that enables parsing of cookies
 * @param customerLogic = a Logic resource to the 'customer' resource
 * @param companyLogic = a Logic resource to the 'company' resource
 * @param jwt = resource that creates, encripts and decripts security tokens
 * @param Promise = the object enabling the use of promises instead of nested callbacks */
var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var companyLogic = require('../logic/CompanyLogic');
var customerLogic = require('../logic/CustomerLogic');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and respoenses bodies
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());

/**logs in to the coupon system
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathParam id = the retrieved coupon's id 
 * @pathname login */
router.post('/',function(req,res,next){
	//if the username attribute is empty
	if(req.body.userName==null){
		var error ={message:'No Login Attributes Were Sent',code:500};
	    res.status(500);
	    next(error);
	} else {
		var login = req.body;
		//if the client type is admin
		if(login.type=="ADMIN"){
			
			//if the password and username combination is authorized
			if(login.password="1234" && login.userName=="admin"){
				
				//signs a new security token for the admin client
				jwt.sign({ user: 'admin', password:"1234",type:login.type }, 'secret', { expiresIn: 3600000 }, function(token) {
					
					//sends a cookie to the client that's called 'cAuth' and contains the security token
					res.cookie('cAuth', token,{maxAge:3600000});
					res.send({success:true});
					res.end();
                });
			} else {
				//if the password and username combination isn't authorized
				var error ={message:'Wrong Username Or Password',code:500};
	            res.status(500);
	            next(error);
			}	
		}
		//if the client type is customer
		else if(login.type=="CUSTOMER"){
			
			//checks the username password combination
			customerLogic.login(login.userName, login.password).then(function(customer){
				
			    //if the password and username combination is authorized
				//signs a new security token for the customer client
				jwt.sign({ user: login.userName, password:login.password,type:login.type, userId:customer.id }, 'secret', { expiresIn: 3600000 }, function(token) {
					
					//sends a cookie to the client that's called 'cAuth' and contains the security token
					res.cookie('cAuth', token,{maxAge:3600000});
					res.send({success:true});
					res.end();
                });
			},function(error){
				next(error);
			});
		}
		//if the client type is company
		else if(login.type=="COMPANY"){
			
			//checks the username password combination
			companyLogic.login(login.userName, login.password).then(function(company){
				
                //if the password and username combination is authorized
				//signs a new security token for the customer client
				jwt.sign({ user: login.userName, password:login.password, type:login.type, userId:company.id }, 'secret', { expiresIn: 3600000 }, function(token) {
					
					//sends a cookie to the client that's called 'cAuth' and contains the security token
					res.cookie('cAuth', token,{maxAge:3600000});
					res.send({success:true});
					res.end();
                });
			},function(error){
				next(error);
			});
		}
		
	}
	
});

/**logs out from the coupon system
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname login */
router.get('/',function(req,res,next){
	
	//clears the authorization cookie
	res.clearCookie('cAuth');
	res.json({success:'true'});
});

module.exports = router;