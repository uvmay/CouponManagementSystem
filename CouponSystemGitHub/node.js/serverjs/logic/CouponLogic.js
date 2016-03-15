/** 
 * a Logic resource implementing the logic behind the actions that are being performed on the 'coupon' resource
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
var customerDAO = require('../dao/CustomerDAO');
var companyDAO = require('../dao/CompanyDAO');
var couponDAO = require('../dao/CouponDAO');

/*------------------------general coupon actions------------------------- */
/**creates a new coupon to the coupon system
 * @param compId = the id of the company that owns the added coupon 
 * @param company = the company to be added to the coupon system
 * @return the new company's id */
exports.create = function(compId,coupon){
	return new Promise(function(resolve,reject){
		//checks if the coupon title exists in the coupon system
        couponDAO.titleExists(coupon.title).then(function(data){
		    //if the title deosn't exist
			if(data==false){
				//create the coupon in the coupon system
		        couponDAO.create(coupon).then(function(couponId){
					//when the coupon is created, add the coupon's id to the company in the database
			        companyDAO.addCoupon(compId,couponId).then(function(result){
						//return the new coupon's id
				        resolve(couponId);
				    },function(error){
				        reject(error);
				    });
		        },function(error){
			        reject(error);
		        });
		    } else
			    reject(errObject.object(500,"Title Already Exists"));
	    },function(error){
		    reject(error);
	    });
	});
}

/**delete a coupon from the coupon system
 * @param compId = the id of the company that owns the deleted coupon 
 * @param couponId = the deleted coupon's id
 * @return the deleted coupon */
exports.delete = function(compId,couponId){
	return new Promise(function(resolve, reject){
		//delete the coupon form the system
        couponDAO.delete(couponId).then(function(deleted){
			//gets all of the customers in the system
			customerDAO.getAll().then(function(customers){
				//the number of customers that have been searched for the 'couponId'
				var count=0;
				//if there are no customers in the system
				if(customers.length==0){
					//remove the coupon from the company's 'coupons' attribute
					companyDAO.removeCoupon(compId,couponId).then(function(result){
						//returns the deleted coupon 
						resolve(deleted);
					},function(error){
						reject(error);
					});
				}
				else{
					//for every customer in the system
				    for(c in customers){
						//remove the coupon from the customer's 'coupons' attribute
					    customerDAO.removeCoupon(customers[c].id,couponId).then(function(result){
							//add to the count of the searched customers
						    count++;
							//if all of the customers were searched for the coupon
						    if(count==customers.length){
								//remove the coupon from the company's 'coupons' attribute 
						        companyDAO.removeCoupon(compId,couponId).then(function(result){
									//return the deleted coupon
								 	resolve(deleted);
							    },function(error){
								    reject(error);
								});
						    }
					    },function(error){
		                    reject(error);
			            });
				    }
			    }
			},function(error){
		        reject(error);
	        });
		},function(error){
		    reject(error);
	    });
	});
}

/**updates a coupon in the coupon system
 * @param coupon = an updated object to replace the old coupon inside the system
 * @return the coupon before the update  */
exports.update = function(coupon){
	return new Promise(function(resolve, reject){
		//if any attribute of the new company object is null - reject an error
        for(att in coupon)
			if(att==null)
				reject(errObject.object(500,"Incomplete Fields"));
		//if not, update the coupon in the coupon system
        couponDAO.update(coupon).then(function(data){
			resolve(data);
		},function(error){
			reject(error);
		});
	});	
}

/**retrieves a coupon from the coupon system
 * @param couponId = the retrieved company's id
 * @return the retrieved coupon */
exports.retrieve = function(couponId){
	return new Promise(function(resolve, reject){
		//retrieves a coupon from the coupon system
        couponDAO.retrieve(couponId).then(function(data){
			resolve(data);
		},function(error){
			reject(error);
		});
	});	
}

/**retrieves all of the coupons in the coupon system 
 * @return an array of the coupons in the coupon system  */
exports.getAll = function(){
	return new Promise(function(resolve,reject){
		//retrieves all of the coupons in the coupon system
        couponDAO.getAll().then(function(data){
			resolve(data);
		},function(error){
			reject(error);
		});
	});
}

/**retrieves an array of the coupons from the coupon system which price is lower than 'price'
 * @param price = the price that the coupons prices should be lower than
 * @return an array of the coupons from the coupon system which price is lower than 'price' */
exports.getAllCouponsByPrice = function(price){
	return new Promise(function(resolve,reject){
	    //gets all of the coupons from the coupon system
		exports.getAll().then(function(coupons){
			//the returned array
		    var coupArr =[];
			//for every coupon, check if it's price attribute is lower than 'price'
		    for(c in coupons){
				//if it is, add it to the array
			    if(coupons[c].price<=price)
			 	   coupArr[coupArr.length]=coupons[c];
		    }
			//return the array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
	    });
	});
}

/**retrieves an array of the coupons from the coupon system which type is 'type'
 * @param type = the type of the returned coupons
 * @return an array of the coupons from the coupon system which type is 'type' */
exports.getAllCouponsByType = function(type){
	return new Promise(function(resolve,reject){
		//gets all of the coupons from the coupon system
	    exports.getAll().then(function(coupons){
			//the returned array
		    var coupArr =[];
			//for every coupon, check if it's type attribute is 'type'
		    for(c in coupons){
				//if it is, add it to the array
			    if(coupons[c].type==type)
				   coupArr[coupArr.length]=coupons[c];
		    }
			//return the array
		    resolve(coupArr);
	    },function(error){
		   reject(error);
		});
	});
}

/**retrieves an array of the coupons from the coupon system which title contains the string 'string'
 * @param string = the string the title should contain
 * @return an array of the coupons from the coupon system which title contains the string 'string' */
exports.getAllCouponsByString = function(string){
	return new Promise(function(resolve,reject){
		//gets all of the coupons from the coupon system
	    exports.getAll().then(function(coupons){
			//the returned array
		    var coupArr =[];
            //for each coupon - checks if it's title conatins the string 'string' (case insensitive)
			//if it does, the coupon is added to the array 'arr'
		    for(c in coupons){
			    var lowcase = coupons[c].title.toLowerCase();
			    if(lowcase.indexOf(string.toLowerCase())>-1)
				   coupArr[coupArr.length]=coupons[c];
		    }
			//return the array
		    resolve(coupArr);
	    },function(error){
		   reject(error);
		});
	});
}

/**gets an array of coupon id's, and retrieves an array of the actual coupons that match the id's
 * @param idArr = an array of coupon id's
 * @return an array of the actual coupons that match the coupon id's in the 'idArr' */
exports.getCouponsByIdArr = function(idArr){
	return new Promise(function(resolve,reject){
        //counts how many coupons were retrieved by the id  for 'idArr'
		var count=0;
		//the returned array
		var coupArr=[];
		//if no array was given, return an empty array
		if(idArr==undefined || idArr==null)
			resolve(coupArr);
		//if an empty array was given, return an empty array
		else if(idArr.length==0)
			resolve(coupArr);
		else{
			//for every id in 'idArr', retrieve it form the database
		    for(x in idArr){
			    couponDAO.retrieve(idArr[x]).then(function(coupon){
					//add the coupon to 'coupArr'
			   	    coupArr[coupArr.length]=coupon;
					//add one to the count of retrieved coupons
				    count++;
					//if all of the coupons were retrieved by their id's from 'idArr'
				    if(count==idArr.length){
						//return the coupons array
					    resolve(coupArr);
				    }
			    },function(error){
				    reject(error);
				});
		    }
		}
	});
}

/*------------------------company coupon actions------------------------- */

/**retrieves all of the coupons owned by the company which id is 'compId'
 * @param compId = the id of the company who's coupons are returned
 * @return an array of the company's coupons  */
exports.companyGetCoupons = function(compId){
	return new Promise(function(resolve, reject){
        //get all of the company's coupons id's
		companyDAO.getCoupons(compId).then(function(idArr){
			//get all of the coupons by their id's
			exports.getCouponsByIdArr(idArr).then(function(coupons){
				//return the coupons array
				resolve(coupons);
			},function(error){
				reject(error)
			});
		},function(error){
			reject(error);
		});
	});	
}

/**retrieves an array of the compnay's coupons which type is 'type'
 * @param compId = the id of the company who's coupons are returned
 * @param type = the type of the returned coupons
 * @return an array of the company's coupons which type is 'type' */
exports.companyGetCouponsByType = function(compId,type){
	return new Promise(function(resolve,reject){
		//get all of the company's coupons
	    exports.companyGetCoupons(compId).then(function(coupons){
			//the returned array
		    var coupArr =[];
			//for every coupon, check if it's type attribute is 'type'
		    for(c in coupons){
				//if it is, add it ot the array
			    if(coupons[c].type==type)
				    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		   reject(error);
		});
	});
}

/**retrieves an array of the company's coupons which price is lower than 'price'
 * @param compId = the id of the company who's coupons are returned
 * @param price = the price that the coupons prices should be lower than
 * @return an array of the company's coupons which price is lower than 'price' */
exports.companyGetCouponsByPrice = function(compId,price){
	return new Promise(function(resolve,reject){
	    //gets all of the company's coupons
		exports.companyGetCoupons(compId).then(function(coupons){
		    //the returned array
			var coupArr =[];
			//for every coupon, check if it's price attribute is lower than 'price'
		    for(c in coupons){
				//if it is, add to the array
			    if(coupons[c].price<=price)
				    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}

/**retrieves an array of the company's coupons which expiration date is prior to 'date'
 * @param compId = the id of the company who's coupons are returned
 * @param date = the date that the coupons expiration date should be prior to
 * @return an array of the company's coupons which expiration date is prior to 'date' */
exports.companyGetCouponsByExpirationDate = function(compId,date){
	return new Promise(function(resolve,reject){
	    //get all of the company's coupons
		exports.companyGetCoupons(compId).then(function(coupons){
		    //the returned array
			var coupArr =[];
			//for every coupon, check if it's expiration date attribute is prior to 'date'
		    for(c in coupons){
				//if it is, add it to the array
			    if(coupons[c].endDate<=date)
				    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}

/**retrieves an array of the company's coupons which title contains the string 'string'
 * @param compId = the id of the company who's coupons are returned
 * @param string = the string the title should contain
 * @return an array of the company's coupons which title contains the string 'string' */
exports.companyGetCouponsByString = function(compId,string){
	return new Promise(function(resolve,reject){
		//gets all of the company's coupons
	    exports.companyGetCoupons(compId).then(function(coupons){
			//the returned array
		    var coupArr =[];
            //for each coupon - checks if it's title conatins the string 'string' (case insensitive)
		    //if it does, add it to the coupons array
			for(c in coupons){
			    var lowcase = coupons[c].title.toLowerCase();
			    if(lowcase.indexOf(string.toLowerCase())>-1)
				    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}

/*------------------------customer coupon actions------------------------- */
/**adds a coupon id to a customer's 'coupons' attribute, and by so the customer purchases the coupon
 * @param custId = the purchasing customer's id
 * @param coupId = the purchased coupon's id
 * @return the number of lines updated in the database */
exports.customerPurchaseCoupon = function(custId,coupId){
	return new Promise(function(resolve, reject){
		//checks if the coupon is already purchased by the customer
		customerDAO.isCouponExist(custId,coupId).then(function(data){
			//if it isn't, add it to the customer's 'coupons' attribute
		    if(data==false){
				customerDAO.addCoupon(custId,coupId).then(function(result){
					//return the number of lines updated in the database
				    resolve(result);
			    },function(error){
				    reject(error);
			    });
			} else
			    reject(errObject.object(500,"Coupon Already Purchased"));
		},function(error){
		    reject(error);
	    });
	});
}

/**retrieves all of the coupons owned by the customer which id is 'custId'
 * @param custId = the id of the customer who's coupons are returned
 * @return an array of the customer's coupons  */
exports.customerGetCoupons = function(custId){
	return new Promise(function(resolve, reject){
        //get all of the customer's coupons id's
        customerDAO.getCoupons(custId).then(function(idArr){
			//get all of the coupons by their id's
		    exports.getCouponsByIdArr(idArr).then(function(coupons){
				//return an array of the customer's coupons
				resolve(coupons);
			},function(error){
				reject(error);
			});
		},function(error){
			reject(error);
		});
	});	
}

/**retrieves an array of the cusomer's coupons which type is 'type'
 * @param custId = the id of the customer who's coupons are returned
 * @param type = the type of the returned coupons
 * @return an array of the cusomer's coupons which type is 'type' */
exports.customerGetCouponsByType = function(custId,type){
	return new Promise(function(resolve,reject){
		//get all of the cusomer's coupons
	    exports.customerGetCoupons(custId).then(function(coupons){
			//the returned array
		    var coupArr =[];
			//for every coupon, check if it's type attribute is 'type'
		    for(c in coupons){
				//if it is, add it to the array
			    if(coupons[c].type==type)
			  	    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}

/**retrieves an array of the customer's coupons which price is lower than 'price'
 * @param custId = the id of the customer who's coupons are returned
 * @param price = the price that the coupons prices should be lower than
 * @return an array of the customer's coupons which price is lower than 'price' */
exports.customerGetCouponsByPrice = function(custId,price){
	return new Promise(function(resolve,reject){
	    //gets all of the customer's coupons
		exports.customerGetCoupons(custId).then(function(coupons){
			//the returned array
		    var coupArr =[];
			//for every coupon, check if it's price attribute is lower than 'price'
		    for(c in coupons){
				//if it is, add it to the array
			    if(coupons[c].price<=price)
			  	    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}

/**retrieves an array of the customer's coupons which title contains the string 'string'
 * @param custId = the id of the customer who's coupons are returned
 * @param string = the string the title should contain
 * @return an array of the customer's coupons which title contains the string 'string' */
exports.customerGetCouponsByString = function(custId,string){
	return new Promise(function(resolve,reject){
	    //gets all of the company's coupons
		exports.customerGetCoupons(custId).then(function(coupons){
			//the returned array
		    var coupArr =[];
		    //for each coupon - checks if it's title conatins the string 'string' (case insensitive)
		    //if it does, add it to the coupons array
		    for(c in coupons){
			    var lowcase = coupons[c].title.toLowerCase();
			    if(lowcase.indexOf(string.toLowerCase())>-1)
				    coupArr[coupArr.length]=coupons[c];
		    }
			//return the coupons array
		    resolve(coupArr);
	    },function(error){
		    reject(error);
		});
	});
}