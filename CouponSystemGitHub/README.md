/**   
 * @author Yuval Maayan
 * @version 1.0
 * */
 
                                           Coupon Management System
_______________________________________________________________________________________________________________________

1. Purpose: 
     The coupon management system is a system that allows customers to purchase coupons via the internet.

2. Structure:
     The system has a standart RESTful web application structure:
         - Web Content (HTML,JS,CSS,ANGULARJS...)
         - API/Resource Layer (URL routing, authorization, error handeling, server initiating)
		 - Logic Layer (where system logic is implemented - can't create a customer with an existing username etc...)
		 - DAO Layer (contains the object that connect to the database and interact with it)
		 - Database(in this application - MongoDB)

3. Basic Logic:
     The system has 3 clinet types:
	    - Administrator
		- Company
		- Customer
	 
	 Companies - create coupons in the coupon system via the website
	 Customers - purchase coupons via the website
	 Administrator - creates new companies/customers accounts
	 
_______________________________________________________________________________________________________________________
***********************************************************************************************************************
                                       
									   
	*For the Java version fo the application open the Java folder
	
	*For the Node.js version of the application open the Node.js folder