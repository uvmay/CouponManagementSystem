var errObject = require('../beans/errorObject');
var Promise = require('bluebird');
var customerDAO = require('../dao/CustomerDAO');

exports.create = function(customer){
	return new Promise(function(resolve,reject){
        customerDAO.nameExists(customer.username).then(function(data){
		if(data==false){
		customerDAO.create(customer).then(function(data){
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

exports.delete = function(custId){
	return new Promise(function(resolve, reject){
        customerDAO.delete(custId).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});
}

exports.update = function(customer){
	return new Promise(function(resolve, reject){
        for(att in customer)
			if(att==null)
				reject(errObject.object(500,"Incomplete Fields"));
		customerDAO.update(customer).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});	
}

exports.retrieve = function(custId){
	return new Promise(function(resolve, reject){
        customerDAO.retrieve(custId).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});	
}

exports.retrieveByName = function(custName){
	return new Promise(function(resolve,reject){
        customerDAO.retrieveByName(custName).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});	
}

exports.retrieveByString = function(string){
	return new Promise(function(resolve,reject){
        customerDAO.getAll().then(function(data){
		  var arr =[];
		  for(c in data){
			  var lowcase = data[c].username.toLowerCase();
			  if(lowcase.indexOf(string.toLowerCase())>-1)
		         arr[arr.length]=data[c];
	      }
		  resolve(arr);
		},function(error){
		reject(error);
	});
	});	
}

exports.getAll = function(){
	return new Promise(function(resolve,reject){
        customerDAO.getAll().then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});
}

exports.login = function(username,password){
	return new Promise(function(resolve,reject){
        customerDAO.login(username,password).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});
}

exports.updateCart = function(id,cart){
	return new Promise(function(resolve, reject){
        customerDAO.updateCart(id,cart).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});
}

exports.getCart = function(id){
	return new Promise(function(resolve, reject){
        customerDAO.getCart(id).then(function(data){
			resolve(data);
		},function(error){
		reject(error);
	});
	});	
}
