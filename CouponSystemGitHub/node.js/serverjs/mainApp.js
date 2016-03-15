/** 
 * the main server application  
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param bodyparser = a resource that enables parsing of a request body 
 * @param cookieparser = a resource that enables parsing of cookies */
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and responses bodies
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

//declares the 'public' folder as a static resource, so all of the web content would be usable from inside of it
app.use(express.static('C:/Users/yuval/Desktop/node.js/couponSystem/serverjs/public'));

//a filter that allows cross origin requests
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//declares all of the REST routs in the app
app.use(require('./api/mainRouter'));
app.use('/rest/login',require('./api/LoginResource'));
app.use('/rest/customer',require('./api/CustomerResource'));
app.use('/rest/company',require('./api/CompanyResource'));
app.use('/rest/coupon',require('./api/CouponResource'));
app.use('/rest/upload',require('./api/ImageUploadManager'));

//an error filter
app.use(function(err,req,res,next){
    //sends an error json object to the client with a proper response status
	if(err.code)
	    res.status(err.code).json(err);
    else
		res.status(err.status).json(err);
	res.end();
});

//initiating the server and listening on port 8081
var server = app.listen(8081,function(req,res){
	
	console.log("server running on port 8081");
});

