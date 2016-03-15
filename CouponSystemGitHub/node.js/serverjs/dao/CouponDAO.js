/** 
 * a DAO resource to the "coupons" collection
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param mongoClient = an object used to make a connection to the MongoDB database 
 * @param errObject = the resource containing the error object's constructor
 * @param generator = a resource that generates the companies id's
 * @param Promise = the object enabling the use of promises instead of nested callbacks */
var mongoClient = require('mongodb').MongoClient;
var errObject = require('../beans/errorObject');
var generator = require('./idGenerator');
var Promise = require('bluebird');

/**creates a new coupon in the database
 * @param coupon = the coupon to be added to the database
 * @return the new coupon's id */
exports.create = function(coupon){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'coupons' collection
		    db.collection('coupons',{strict:true},function(err,coupons){
			    if(err || coupons==null){
				    db.close();
		            reject(errObject.object(500,"Problem Connecting To Database"));
			    }
				//generates a new coupon id
		        generator.couponId(db).then(function(id){
					//setting the coupon's id to the generated id
				    coupon.id = id;
					//inserts the new coupon to the database
		            coupons.insert(coupon ,{w:1}, function(err, result) {
						//closes the connection ot the database
				        db.close();
			            if(err || result==0){
					        reject(errObject.object(500,"Problem Creating Coupon"));
					   }
					   //returns the new generated coupon's id
					   resolve(coupon.id);
			        });
					},function(err){
					    reject(errObject.object(500,"Problem Creating Coupon"));
                });
			});
		});
	});
}

/**deletes a coupon from the database
 * @param couponId = the deleted coupons's id
 * @return the deleted coupon */
exports.delete = function(couponId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'coupons' collection
			db.collection('coupons',{strict:true},function(err,coupons){
				if(err || coupons==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the deleted coupon by id
			    coupons.findOne({id:couponId},function(err,item){
				    if(err || item==null){
					    db.close();
					    reject(errObject.object(500,"Problem Deleting Coupon"));
				    }
					//deletes the chosen coupon
				    coupons.remove({id:couponId} ,{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
		   			        reject(errObject.object(500,"Problem Deleting Coupon"));
						//returns the deleted coupon
				        resolve(item);
				    });
			    });
			});
		});
	});
}

/**updates a coupon in the database
 * @param coupon = an updated object to replace the old coupon inside the database
 * @return the coupon before the update*/
exports.update = function(coupon){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'coupons' collection
			db.collection('coupons',{strict:true},function(err,coupons){
				if(err || coupons==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the to be updated coupon in the database
		 	    coupons.findOne({id:coupon.id},function(err,item){
			  	    if(err || item==null){
					    db.close();
				 	    reject(errObject.object(500,"Problem Updating Coupon"));
				    } 
					//updates the coupon in the database which id is similar to the updated coupon's id
				    coupons.update({id:coupon.id},coupon,{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
					        reject(errObject.object(500,"Problem Updating Coupon"));
						//returns the coupon before the update
				        resolve(item);
				    });
			    });
			});
		});
	});
		
}

/**retrieves a coupon from the database
 * @param couponId = the retrieved coupon's id
 * @return the retireved coupon */
exports.retrieve = function(couponId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//conecting to the 'coupons' collection
		    db.collection('coupons',{strict:true},function(err,coupons){
			    if(err || coupons==null){
				    db.close();
		            reject(errObject.object(500,"Problem Connecting To Database"));
			    }
				//finds the retrieved coupon by id
		        coupons.findOne({id:couponId},function(err,item){
					//closes the connection to the database
		 	        db.close();
		 	        if(err || item==null)
			            reject(errObject.object(500,"Problem Retrieving Coupon"));
					//returns the retrieved coupon
			        resolve(item);
			    });
			});
		});
	});	
}

/**retrieves all of the coupons in the database
 * @return an array of all of the coupons in the database */
exports.getAll = function(){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'coupons' collection
			db.collection('coupons',{strict:true},function(err,coupons){
				if(err || coupons==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//adds all of the coupons to the "query" array,
				var query =[];
				var stream = coupons.find().stream();
				stream.on('data',function(item){
					//every time a company is retrieved from the database it is added to the "query" array
					query[query.length]=item;
				});
				stream.on('end',function(){
					//closes the connection to the database
					db.close();
					//returns the coupons array
					resolve(query);
				});
				stream.on('error',function(err){
					db.close();
					reject(errObject.object(500,"Problem Retrieving Coupons"));
				});
			});
		});
	});
}

/**checks if a coupon's title exists in the database 
 * @return true if it exsits, false if it isn't */
exports.titleExists = function(title){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
	    mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connceting to the 'coupons' collection
		    db.collection('coupons',{strict:true},function(err,coupons){
				if(err || coupons==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//looking for a coupon with the title "title"
			    coupons.findOne({title:title},function(err,coup){
				    //closes the connection to the database
					db.close();
				    if(err)
			 		    reject(errObject.object(500,"Problem Connecting To Database"));
					//if a company with the username "name" exists, returns true
				    if(coup)
				        resolve(true);
					//returns false
			        resolve(false);
			    }); 
			});
		});
	});
}
