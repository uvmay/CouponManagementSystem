var mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log("Not Connecting" + err.stack);			
    db.createCollection('customers',{autoIndexId:false},function(err,customers){
		customers.createIndex({username:"text"},function(){
			db.close();
		});
	});	  
	console.log("customers created");
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
    db.createCollection('companies',{autoIndexId:false},function(err,companies){
		companies.createIndex({username:"text"},function(){
						db.close();
		});
	});	  
	console.log("companies created");
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
    db.createCollection('coupons',{autoIndexId:false},function(err,coupons){
		coupons.createIndex({title:"text"},function(){
						db.close();
		});
	});	  
	console.log("coupons created");
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
    db.createCollection('ids',function(err,collection){
		collection.insert({type:'customers',id:1},function(){
			collection.insert({type:'companies',id:1},function(){
				collection.insert({type:'coupons',id:1},function(){
					db.close();
				});	
			});	

		});	

	});	
	console.log("ids created");
});

//--------------------delete functions-------------------------------
/*
mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log("Not Connecting" + err.stack);	
		db.collection('customers',{strict:true},function(err,customers){
			 customers.drop();
			 console.log("customers dropped");
			 db.close();
		});
   
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
       db.collection('companies',{strict:true},function(err,companies){
			 companies.drop();
			 console.log("companies dropped");
			 db.close();
		});
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
       db.collection('coupons',{strict:true},function(err,coupons){
			 coupons.drop();
			 console.log("coupons dropped");
			 db.close();
		});
});

mongoClient.connect("mongodb://127.0.0.1:27017/couponSys",function(err,db){
	if(err)
       console.log(err.stack);			
    db.collection('ids',{strict:true},function(err,ids){
			 ids.drop();
			 console.log("coupons dropped");
			 db.close();
		});

});
*/