/** 
 * a DAO resource to the "companies" collection
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

/**creates a new customer in the database
 * @param customer = the customer to be added to the database
 * @return the new customer's id */
exports.create = function(customer){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
	            generator.customerId(db).then(function(id){
					//setting the company's id to the generated id, and initializing the 'coupons' and 'cart' attributes
				    customer.id = id;
				    customer.coupons=[];
				    customer.cart=[];
					//inserts the new customer to the database
		            customers.insert(customer ,{w:1}, function(err, result) {
						//closes the connection to the database
			            db.close();
			            if(err || result==0){
				            reject(errObject.object(500,"Problem Creating Customer"));
						    }
						//returns the new generated customer's id
					    resolve(customer.id);
					});
					},function(err){
					    reject(errObject.object(500,"Problem Creating Customer"));
				});
			});
		});
	});
}

/**deletes a company from the database
 * @param compId = the deleted company's id
 * @return the deleted company */
exports.delete = function(custId){
	return new Promise(function(resolve, reject){
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			//creates a connection to the MongoDB database
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the deleted customer by id
			    customers.findOne({id:custId},function(err,item){
			 	    if(err || item==null){
					    db.close();
					    reject(errObject.object(500,"Problem Deleting Customer"));
				    }
					//deletes the chosen customer
			  	    customers.remove({id:custId} ,{w:1}, function(err, result) {
						//closes teh connection to the database
				        db.close();
				        if(err || result==0)
					        reject(errObject.object(500,"Problem Deleting Customer"));
						//returns the deleted customer
				        resolve(item);
				    });
			    });
			});
		});
	});	
}

/**updates a customer in the database
 * @param customer = an updated object to replace the old customer inside the database
 * @return the customer before the update*/
exports.update = function(customer){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the to be updated customer in the database
			    customers.findOne({id:customer.id},function(err,item){
			        if(err || item==null){
					    db.close();
					    reject(errObject.object(500,"Problem Updating Customer"));
				    }  
                    //sets the updated customer's 'coupons' and 'cart' attributes to the 'coupons' and 'cart' attributes from the database					
			        customer.coupons=item.coupons;
				    customer.cart=item.cart;
					//updates the customer in the database which id is similar to the updated customer's id
			 	    customers.update({id:customer.id},customer,{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
					        reject(errObject.object(500,"Problem Updating Customer"));
						//returns customer before the update
					    resolve(item);
				    });
			    });
			});
		});
	});
		
}

/**retrieves a customer from the database
 * @param custId = the retrieved company's id
 * @return the retireved customer */
exports.retrieve = function(custId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the retrieved customer by id
			    customers.findOne({id:custId},function(err,item){
					//closes the connection to the database
				    db.close();
				    if(err || item==null)
				        reject(errObject.object(500,"Problem Retrieving Customer"));
					//returns the retrieved customer
					resolve(item);
				});
			});
		});
	});	
}

/**retrieves a customer from the database by it's username
 * @param custName = the retrieved customer's username
 * @return the retireved customer */
exports.retrieveByName = function(custName){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the retrieved customer by username
	 	        customers.findOne({username:custName},function(err,item){
					//closes the connection to the database
		 	        db.close();
			        if(err || item==null)
			            reject(errObject.object(500,"Problem Retrieving Customer"));
					//returns the retrieved customer
			        resolve(item);
			    });
			});
		});
	});
}

/**retrieves all of the customers in the database
 * @return an array of all of the customers in the database */
exports.getAll = function(){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//adds all of the customers to the "query" array
				var query =[];
				var stream = customers.find().stream();
				stream.on('data',function(item){
					//every time a customer is retrieved from the database it is added to the "query" array
					query[query.length]=item;
				});
				stream.on('end',function(){
					//closes the connection to the database
					db.close();
					//returns the customers array
					resolve(query);
				});
				stream.on('error',function(err){
					db.close();
					reject(errObject.object(500,"Problem Retrieving Customers"));
				});
			});
		});
	});
}

/**checks if a customer's username exists in the database 
 * @param name = customer's username 
 * @return true if it exsits, false if it isn't */
exports.nameExists = function(name){
	return new Promise(function(resolve,reject){
        //creates a connection to the MongoDB database
	    mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//looking for a customer where the username is "name"
			    customers.findOne({username:name},function(err,cust){
					//closes the connection to the database
			  	    db.close();
				    if(err)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//if a customer with the username "name" exists, returns true
				    if(cust)
				        resolve(true);
					//returns false
			        resolve(false);
			    }); 
			});
		});
	});
}

/**checks if a customer's username-password combination exists in the database 
 * @param username = the entered username
 * @param password = the entered password
 * @return the company which username and passwrod are "username" and "password" */
exports.login = function(username,password){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
	    mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//searches a for a customer with the username "username"
			    customers.findOne({username:username},function(err,item){
					//closes the connection to the database
				   	db.close();
		 		    if(err)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//if a customer wasn't found, an error saying "Invalid Username" is sent
				    if(item==null)
					    reject(errObject.object(500,"Invalid Username"));
					//if the found customer's password isn't "password", an error saying "Invalid Password" is sent
				    else if(item.password!=password)
					    reject(errObject.object(500,"Invalid Password"));
					//returns the found customer
				    resolve(item);
			    });
			});
		});
	});
}

/**updates a customer's cart attribute
 * @param id = the customer's id
 * @param cart = an array of coupon id's to be put inside of the customer's 'cart' attribute
 * @return the number of raws updated in the database */
exports.updateCart = function(id,cart){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//updates the 'cart' attribute of the customer which id is 'id'
			    customers.update({id:id},{$set:{cart:cart}},{w:1}, function(err, result) {
					//closes the connection to the database
				    db.close();
				    if(err || result==0)
				        reject(errObject.object(500,"Problem Updating Cart"));
					//returns the number of raws updated in the database
				    resolve(result);
			    });
			});
		});
	});
}

/**retrieves a customer's cart attribute
 * @param id = the customer's id
 * @return the customer's 'cart' attribute - an array of coupon id's*/
exports.getCart = function(id){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the wanted customer by id
		        customers.findOne({id:id},function(err,item){
					//closes connection to the database
				    db.close();
				    if(err || item==null)
				        reject(errObject.object(500,"Problem Retrieving Customer"));
					//returns the customer's 'cart' attribute - an array of coupon id's
				    resolve(item.cart);
				});
			});
		});
	});	
}

/**adds a coupon's id to a customer's 'coupons' attribute
 * @param id = the customer's id
 * @param coupId = the added coupon id
 * @return the number of raws updated in the database */
exports.addCoupon = function(id,coupId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the wanted customer by id
			    customers.findOne({id:id},function(err,item){
				    if(err || item==null){
				  	    db.close();
					    reject(errObject.object(500,"Problem Updating Customer"));
				    }
					//adds the coupon id to the 'coupons' attribute of the customer by updating it
				    customers.update({id:id},{$push:{coupons:coupId}},{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
				  	        reject(errObject.object(500,"Problem Updating Customer"));
						//returns the number of raws updated in the database
				        resolve(result);
				    });
				});
		    });
		});
	});
}

/**gets a customer's 'coupons' attribute
 * @param id = the customer's id
 * @return the customer's 'coupons' attribute - an array of coupon id's */
exports.getCoupons = function(id){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the customer by id
			    customers.findOne({id:id},function(err,item){
					//closes the connection to the database
				    db.close();
			 	    if(err || item==null)
				        reject(errObject.object(500,"Problem Retrieving Coupons"));
					//returns the customer's 'coupons' attribute - an array of coupon id's
				    resolve(item.coupons);
			    });
			});
		});
	});	
}

/**check's if a customer already owns a certain coupon, 
 * by checking if the coupon's id exists in it's 'coupons' attribute
 * @param id = the customer's id
 * @param couponId = the checked coupon id
 * @return true if the customer owns the coupon, false if he doesn't */
exports.isCouponExist = function(id,couponId){
		return new Promise(function(resolve, reject){
			//getting all of the customer's coupons by using the 'getCoupons(id)' method
			exports.getCoupons(id).then(function(coupons){
				//for every coupon, checks if it's id equals to the 'couponId'
				//returns true if it is equal
				for(c in coupons)
					if(coupons[c]==couponId)
						resolve(true);
				//returns false if no coupon id was equal to 'couponId'
				resolve(false);
			},function(error){
				reject(error);
			});
		});
}

/**removes a coupon's id from a customer's 'coupons' attribute
 * @param id = the customer's id
 * @param coupId = the removed coupon id
 * @return the number of raws updated in the database */
exports.removeCoupon = function(id,couponId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'customers' collection
			db.collection('customers',{strict:true},function(err,customers){
				if(err || customers==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the customer by id
			    customers.findOne({id:id},function(err,item){
				    if(err || item==null){
				 	    db.close();
					    reject(errObject.object(500,"Problem Deleting Coupon"));
				    }
					//removes the coupon id 'couponId' from the customer's 'coupons' attribute, by updating the customer
				    customers.update({id:id},{$pull:{coupons:couponId}},{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
					        reject(errObject.object(500,"Problem Deleting Coupon"));
						//the number of raws updated in the database
				        resolve(result);
			        });
			    });
			});
		});
	});
}