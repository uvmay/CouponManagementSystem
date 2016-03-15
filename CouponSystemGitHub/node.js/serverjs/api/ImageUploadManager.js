/** 
 * a RESTFUL resource thats' responsible for uploading the coupons images
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param express = the express framework instance for REST services
 * @param app = an object representing the express web application
 * @param router = an object that contains the different web routes of the 'company' resource
 * @param multer = a resource that enables file uploads using 'multipart/form-data'
 * @param jwt = resource that creates, encripts and decripts security tokens */
var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');
var jwt = require('jsonwebtoken');

//declares where the uploaded coupon images will be saved, and what name will they have
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'C:/Users/yuval/Desktop/node.js/couponSystem/serverjs/public/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.jpg');
  }
});
var upload = multer({ storage : storage}).single('file');

/**uploads a coupon's image
 * @param req = http request
 * @param res = http response
 * @param next = the connection to the next middlewear in order
 * @pathname upload */
router.post('/',upload,function(req,res,next){
	var cookie = req.cookies["cAuth"];
	
	//if there is no authorization cookie, return an error
	if(cookie=='undefined' || cookie==null){
			var error ={message:'Please Login Again',code:401};
	        res.status(401);
	        next(error);
		}
	
    //sends a message if no file was chosen	
	else if(req.file==undefined || req.file==null){
		var error ={message:'No File Chosen',code:200};
	        res.status(200);
	        res.json(error);
			res.end();
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
		    else if(decoded.type!="COMPANY"){
			    var error ={message:'Unauthorized User',code:401};
	            res.status(401);
	            next(error);
            }
		 
		    //Authorized
		    else{
				//upload the file in the request body
	            upload(req,res,function(error){
		            //if an error occured
		            if(error){
			            var error ={message:'Problem Uploading File',code:500};
	                    res.status(500);
	                    next(error);
		            }else {
						//gets the file path to the image relative to the webpage
			            var finalPath = req.file.path;
			            finalPath = finalPath.slice(finalPath.indexOf('public')+7,finalPath.length);
		                //returns the final path to the image
						res.end(finalPath);
		            }
	            });
	        }
	    });
	}
});

module.exports = router;
