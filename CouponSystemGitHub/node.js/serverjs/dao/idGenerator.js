/** 
 * a resource that generates the companies, customers and coupons id's.
 * it saves the different id's in an "ids" collection on MongoDB
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param errObject = the resource containing the error object's constructor
 * @param Promise = the object enabling the use of promises instead of nested callbacks */
var errObject = require('../beans/errorObject');
var Promise = require('bluebird');

/**generates a customer id
 * @param db = a connection to the database */
exports.customerId = function(db){
	return new Promise(function(resolve,reject){
		//connecting to the 'ids' collection
		db.collection('ids',{strict:true},function(err,ids){
		  if(err){
		      reject(errObject.object(500,"Problem Connecting To Database"));
		  }
		  //finding the document that contains the customer id's inside of the collection
		  ids.findOne({type:'customers'},function(err,item){
			  if(err || item==null){
				  reject(errObject.object(500,"Problem Connecting To Database"));
			  }
			  else{
				//adds 1 to the id number that is saved in the database
			    ids.update({type:'customers'},{$set:{id:(item.id+1)}},{w:1},function(err,result){
					if(err || result==0)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//returns the 'before the update' id
					resolve(item.id.toString());
		        });
			  }
		  });
	   });
	});
}

/**generates a company id
 * @param db = a connection to the database */
exports.companyId = function(db){
	return new Promise(function(resolve,reject){
	   //connecting to the 'ids' collection
	   db.collection('ids',{strict:true},function(err,ids){
		  if(err){
		      reject(errObject.object(500,"Problem Connecting To Database"));
		  }
		  //finding the document that contains the companyies id's inside of the collection
		  ids.findOne({type:'companies'},function(err,item){
			  if(err || item==null){
				  reject(errObject.object(500,"Problem Connecting To Database"));
			  }
			  else{
				//adds 1 to the id number that is saved in the database
			    ids.update({type:'companies'},{$set:{id:(item.id+1)}},{w:1},function(err,result){
					if(err || result==0)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//returns the 'before the update' id
					resolve(item.id.toString());
		        });
			  }
		  });
	   });
	});
}

/**generates a coupon id
 * @param db = a connection to the database */
exports.couponId = function(db){
	return new Promise(function(resolve,reject){
		//connecting to the 'ids' collection
	    db.collection('ids',{strict:true},function(err,ids){
		  if(err)
		      reject(errObject.object(500,"Problem Connecting To Database"));
		  //finding the document that contains the coupons id's inside of the collection
		  ids.findOne({type:'coupons'},function(err,item){
			  if(err || item==null)
				  reject(errObject.object(500,"Problem Connecting To Database"));
			  else{
				//adds 1 to the id number that is saved in the database
			    ids.update({type:'coupons'},{$set:{id:(item.id+1)}},{w:1},function(err,result){
				    if(err || result==0)
					    reject(errObject.object(500,"Problem Connecting To Database"));
					//returns the 'before the update' id
					resolve(item.id.toString());
		        });
			  }
		  });
	   });
	});
}