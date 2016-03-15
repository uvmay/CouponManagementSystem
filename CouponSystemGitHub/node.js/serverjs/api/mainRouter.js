/** 
 * a RESTFUL resource that returns the index.html 
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param bodyparser = a resource that enables parsing of a request body */
var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');

//tells the app to use the 'json' parser, 'urlencoded' parser and 'cookie' parser on the requests and respoenses bodies

app.use(express.static('C:/Users/yuval/Desktop/node.js/couponSystem/serverjs/public'));
app.use(bodyparser.json());

/**sends the 'index.html' page to the client
 * @param req = http request
 * @param res = http response
 * @pathname '/' */
router.get('/',function(req,res){
	res.sendFile("index.html",{"root":"C:/Users/yuval/Desktop/node.js/couponSystem/serverjs/public/WebContent"});
});

module.exports = router;