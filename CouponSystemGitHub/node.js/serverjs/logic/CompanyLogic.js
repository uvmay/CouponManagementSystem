/** 
 * a Logic resource implementing the logic behind the actions that are being performed on the 'company' resource
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param errObject = the resource containing the error object's constructor
 * @param Promise = the object enabling the use of promises instead of nested callbacks
 * @param companyDAO = a DAO resource to the "companies" collection
 * @param customerDAO = a DAO resource to the "customers" collection
 * @param couponDAO = a DAO resource to the "coupons" collection */
var errObject = require('../beans/errorObject');
var Promise = require('bluebird');
var companyDAO = require('../dao/CompanyDAO');
var customerDAO = require('../dao/CustomerDAO');
var couponDAO = require('../dao/CouponDAO');

/**creates a new company to the coupon system
 * @param company = the company to be added to the coupon system
 * @return the new company's id */
exports.create = function(company){
	return new Promise(function(resolve,reject){
		//checks if the company's username exists in the coupon system
		//if it doesn't exist, it adds the company "comapy" to the system
	    companyDAO.nameExists(company.username).then(function(data){
		    if(data==false){
		        companyDAO.create(company).then(function(data){
			        resolve(data);
		        },function(error){
			        reject(error);
		        });
		    } else
			    reject(errObject.object(500,"Name Already Exists"));
	    },function(error){
		    reject(error);
	    });
	});
}

/**deletes a company from the coupon system
 * @param compId = the deleted company's id
 * @return the deleted company */
exports.delete = function(compId){
	return new Promise(function(resolve, reject){
		//deletes all of the company's coupons from the database and from every cutomer's 'coupons' attribute 
		deleteAllCompanyCoupons(compId).then(function(valid){
			//if all of the company's coupons were deleted from the database and from all of the customers
			//delete the company
			if(valid==true){
				companyDAO.delete(compId).then(function(deleted){
					//returns the deleted company
					resolve(deleted);
				},function(error){
					reject(error);
					});
			} else
				reject(errObject.object(500,"Problem In Deleting Process"));
		},function(error){
			reject(error);
		});
	});	
}

/**updates a company in the coupon system
 * @param company = an updated object to replace the old company inside the system
 * @return the company before the update */
exports.update = function(company){
	return new Promise(function(resolve, reject){
		//if any attribute of the new company object is null - reject an error
        for(att in company)
			if(att==null)
				reject(errObject.object(500,"Incomplete Fields"));
		//if not, update the company in the coupon system
		companyDAO.update(company).then(function(data){
			resolve(data);
		},function(error){
		    reject(error);
	    });
	});	
}

/**retrieves a company from the coupon system
 * @param compId = the retrieved company's id
 * @return the retrieved company */
exports.retrieve = function(compId){
	return new Promise(function(resolve, reject){
		//retrieves the company from the coupon system
      	companyDAO.retrieve(compId).then(function(data){
			resolve(data);
		},function(error){
		    reject(error);
	    });
	});	
}

/**retrieves a company from the coupon system by it's username
 * @param compName = the retrieved company's username
 * @return the retrieved company */
exports.retrieveByName = function(compName){
	return new Promise(function(resolve,reject){
		//retrieves the company from the coupon system by it's name
        companyDAO.retrieveByName(compName).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	    });
	});	
}

/**retrieves an array of companies from the coupon system which username contains the string 'string'
 * @param string = the string the usernames should contain
 * @return an array of the comapnies which name contains the string 'string' */
exports.retrieveByString = function(string){
	return new Promise(function(resolve,reject){
		//gets all of the companies from the coupon system
        companyDAO.getAll().then(function(data){
		    var arr =[];
		    //for each company - checks if it's name conatins the string 'string' (case insensitive)
			//if it does, the company is added to the array 'arr'
			for(c in data){
			    var lowcase = data[c].username.toLowerCase();
			    if(lowcase.indexOf(string.toLowerCase())>-1)
		           arr[arr.length]=data[c];
	        }
			//returns the comapnies array
		    resolve(arr);
		},function(error){
		reject(error);
	    });
	});	
}

/**retrieves all of the companies in the coupon system 
 * @return an array of the companies in the coupon system  */
exports.getAll = function(){
	return new Promise(function(resolve,reject){
		//retrieves all of the companies in the coupon system
        companyDAO.getAll().then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});
}

/**checks if a company's username-password combination exists in the database 
 * @param username = the entered username
 * @param password = the entered password
 * @return the company which username and password are "username" and "password" */
exports.login = function(username,password){
	return new Promise(function(resolve,reject){
		//checks if a company's username-password combination exists in the database 
        companyDAO.login(username,password).then(function(data){
			//returns the company which username and passwrod are "username" and "password"
			resolve(data);
		},function(error){
		reject(error);
	    });
	});
}

/**deletes all of the chosen company's coupons from the coupon collection, and from the relevant ccustomers  
 * @param compId = the company which coupons will be deleted
 * @return true if no errors happend in the process */
function deleteAllCompanyCoupons(compId){
	return new Promise(function(resolve,reject){
	    //gets the deleted company's coupons 
		companyDAO.getCoupons(compId).then(function(idArr){
			//counts how many of the company's coupons were deleted
			var count=0;
			//if the company has coupons
			if(idArr!=null && idArr!=undefined){
				//for every company's coupon
			    for(x in idArr){
			        //get all of the customers
					customerDAO.getAll().then(function(customers){
				        //counts how many customers were searched for the coupon
						var count2=0;
						//if there are customers in the system
					    if(customers.length!=0){
							//for every customer in the system
				            for(c in customers){
								//remove the coupon from the customer's 'coupons' attribute
					            customerDAO.removeCoupon(customers[c].id,idArr[x]).then(function(result){
						            //add to the count of the searched customers
									count2++;
						            //if all of the customers were searched for the coupon
						            if(count2==customers.length){
										//delete the coupon from the system
						                couponDAO.delete(idArr[x]).then(function(result){
											//add to the count of deleted coupons
								            count++;
									        //if all of the company's coupons were deleted, return true
									        if(count==idArr.length)
										        resolve(true);
							            },function(error){
								            reject(error);
								        });
						            }
					            },function(error){
		                            reject(error);
			                    });
				            }
						//if there are no customers in the system
				        }else {
							//delete the coupon from the system
					        couponDAO.delete(idArr[x]).then(function(result){
								//add to the count of deleted coupons
								count++;
								//if all of the company's coupons were deleted, return true 
								if(count==idArr.length)
									resolve(true);
							},function(error){
								reject(error);
							});
				        }
			        },function(error){
		                reject(error);
	                });		
			    }
			}else 
				resolve(true);
		}
		,function(error){
			reject(error);
		});
	});
}