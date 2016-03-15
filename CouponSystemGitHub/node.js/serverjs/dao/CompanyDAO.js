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

/**creates a new company in the database
 * @param company = the company to be added to the database
 * @return the new company's id */
exports.create = function(company){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection    
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
				    reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//generates a new company id
				generator.companyId(db).then(function(id){
					//setting the company's id to the generated id, and initializing the coupons attribute
					company.id = id;
					company.coupons=[];
						
					//inserts the new company to the database
					companies.insert(company ,{w:1}, function(err, result) {
						//closes the connection to the database
						db.close();
						if(err || result==0){
						   reject(errObject.object(500,"Problem Creating Company"));
						}
						//returns the new generated company id
						resolve(company.id);
					});
				    },function(err){
				         reject(errObject.object(500,"Problem Creating Company"));
				});
							
			});
		});
	});
}

/**deletes a company from the database
 * @param compId = the deleted company's id
 * @return the deleted company */
exports.delete = function(compId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection 
			db.collection('companies',{strict:true},function(err,companies){
			    if(err || companies==null){
						db.close();
				        reject(errObject.object(500,"Problem Connecting To Database"));
					} 
				//finds the deleted company by id
				companies.findOne({id:compId},{w:1},function(err,item){
					if(err || item==null){
						db.close();
						reject(errObject.object(500,"Problem Deleting Company"));
					}
					//deletes the chosen company
					companies.remove({id:compId} ,{w:1}, function(err, result) {
						//closes the connection to the database
						db.close();
						if(err || result==0)
							reject(errObject.object(500,"Problem Deleting Company"));
						//returns the deleted company
					    resolve(item);
					});
				});
			});
		});
	});
		
}

/**updates a company in the database
 * @param company = an updated object to replace the old company inside the database
 * @return the company before the update*/
exports.update = function(company){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection 
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
                //finds the to be updated company in the database				
	   		    companies.findOne({id:company.id},{w:1},function(err,item){
					if(err || item==null){
			 		    db.close();
				 	    reject(errObject.object(500,"Problem Updating Company"));
				    }   
					//sets the updated cmpany's 'coupons' attribute to the 'coupons' attribute from the database
			        company.coupons=item.coupons;
					//updates the company in the database which id is similar to the updated company's id
	 			    companies.update({id:company.id},company,{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
			  		        reject(errObject.object(500,"Problem Updating Company"));
						//returns the company before the update
				        resolve(item);
					});
				});
			});
		});
	});
		
}

/**retrieves a company from the database
 * @param compId = the retrieved company's id
 * @return the retireved company */
exports.retrieve = function(compId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the retrieved company by id
			    companies.findOne({id:compId},function(err,item){
					//closes the connection to the database
		    	    db.close();
			        if(err || item==null)
			            reject(errObject.object(500,"Problem Retrieving Company"));
					//returns the retrieved company
			        resolve(item);
			    });
			});
		});
	});	
}

/**retrieves a company from the database by it's username
 * @param compName = the retrieved company's username
 * @return the retireved company */
exports.retrieveByName = function(compName){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the retrieved company by username
 			    companies.findOne({username:compName},function(err,item){
					//closes the connection to the database
		 		    db.close();
			 	    if(err || item==null)
				        reject(errObject.object(500,"Problem Retrieving Customer"));
					//returns the retrieved comapny
				    resolve(item);
				});
			});
		});
	});
		
}

/**retrieves all of the comapnies in the database
 * @return an array of all of the companies in the database */
exports.getAll = function(){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//adds all of the companies to the "query" array
				var query =[];
				var stream = companies.find().stream();
				stream.on('data',function(item){
					//every time a company is retrieved from the database it is added to the "query" array
					query[query.length]=item;
				});
				stream.on('end',function(){
					//closes the connection to the database
					db.close();
					//returns the companies array
					resolve(query);
				});
				stream.on('error',function(err){
					db.close();
					reject(errObject.object(500,"Problem Retrieving Companies"));
				});
			});
		});
	});
}

/**checks if a company's username exists in the database
 * @param name = company's username 
 * @return true if it exsits, false if it isn't */
exports.nameExists = function(name){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
	    mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//looking for a company where the username is "name"
	 		    companies.findOne({username:name},function(err,comp){
					//closes the connection to the database
				    db.close();
				    if(err)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//if a company with the username "name" exists, returns true
				    if(comp)
				        resolve(true);
					//returns false
			        resolve(false);
			    }); 
			});
		});
	});
}

/**checks if a company's username-password combination exists in the database 
 * @param username = the entered username
 * @param password = the entered password
 * @return the company which username and passwrod are "username" and "password" */
exports.login = function(username,password){
	return new Promise(function(resolve,reject){
		//creates a connection to the MongoDB database
	    mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
		    db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//searches a for a company with the username "username"
			    companies.findOne({username:username},function(err,item){
					//closes the connection to the database
				   	db.close();
				    if(err)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//if a company wasn't found, an error saying "Invalid Username" is sent
				    if(item==null)
					    reject(errObject.object(500,"Invalid Username"));
					//if the found company's password isn't "password", an error saying "Invalid Password" is sent
				    else if(item.password!=password)
					    reject(errObject.object(500,"Invalid Password"));
					//returns the found company
				    resolve(item);
			    });
			});
		});
	});
}

/**adds a couponId to a company's "coupons" attribute, 
 * which states that the company has created the coupon which id is "couponId"
 * @param id = the company's id
 * @param couponId = the added coupon's id 
 * @return company before the added coupon */
exports.addCoupon = function(id,couponId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
	        db.collection('companies',{strict:true},function(err,companies){
			    if(err || companies==null){
				    db.close();
  		                reject(errObject.object(500,"Problem Connecting To Database"));
				    }
				//finds the company which id is "id"
		        companies.findOne({id:id},function(err,item){
		 	        if(err || item==null){
				        db.close();
					        reject(errObject.object(500,"Problem Creating Coupon"));
				        }
					//updates the coupons attribute in the company
			        companies.update({id:id},{$push:{coupons:couponId}},{w:1}, function(err, result) {
						//closes the connection to he database
			            db.close();
		  	            if(err || result==0)
		 		            reject(errObject.object(500,"Problem Creating Coupon"));
						//returns the preupdated company
			            resolve(item);
			        });
		 	    });
		    });
		});
	});
}

/**removes a couponId from a company's "coupons" attribute, 
 * which states that the coupon which id is "couponId" was deleted
 * @param id = the company's id
 * @param couponId = the deleted coupon's id 
 * @return company before the removed coupon */
exports.removeCoupon = function(id,couponId){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
			        reject(errObject.object(500,"Problem Connecting To Database"));
				}
				//finds the company which id is "id"
	 		    companies.findOne({id:id},function(err,item){
			 	    if(err || item==null){
					    db.close();
					 	    reject(errObject.object(500,"Problem Deleting Coupon"));
					    }
					//updates the coupons attribute in the company
					companies.update({id:id},{$pull:{coupons:couponId}},{w:1}, function(err, result) {
						//closes the connection to the database
				        db.close();
				        if(err || result==0)
					        reject(errObject.object(500,"Problem Deleting Coupon"));
						//returns the preupdated company
				        resolve(item);
					});
			    });
			});
		});
	});
}

/**gets a certain company's coupons
 * @param id = the company's id
 * @return an array of the company's coupons id's */
exports.getCoupons = function(id){
	return new Promise(function(resolve, reject){
		//creates a connection to the MongoDB database
		mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
			if(err)
				reject(errObject.object(500,"Problem Connecting To Database"));
			//connecting to the 'companies' collection
			db.collection('companies',{strict:true},function(err,companies){
				if(err || companies==null){
					db.close();
				    reject(errObject.object(500,"Problem Connecting To Database"));
				} 
				//finds the company which id is "id"
			    companies.findOne({id:id},function(err,item){
					//closes the connection to the database
				    db.close();
				    if(err || item==null)
				        reject(errObject.object(500,"Problem Retrieving Coupons"));
				    else
						//returns an array of the company's coupons id's
		 	            resolve(item.coupons);
		        });
			});
		});
	});	
}
