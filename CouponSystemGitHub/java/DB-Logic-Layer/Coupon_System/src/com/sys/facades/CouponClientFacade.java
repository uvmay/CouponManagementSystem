package com.sys.facades;

import com.sys.database.managing.CompanyDAO;
import com.sys.database.managing.CustomerDAO;
import com.sys.system.operations.CouponSystemException;
/**a class which is the ancestor of all of the facades on the coupon system.
 * @author Yuval Maayan
 * @version 1.0
 */
public class CouponClientFacade {
	
/**@param companyDAO = an object that enables the access to the companies data
 * @param customerDAO = an object that enables the access to the customers data*/
	private static CompanyDAO companyDAO = new CompanyDAO();
	private static CustomerDAO customerDAO = new CustomerDAO();

	/**a method that logs in a certain client into the coupon system. 
	 * the method returns the wanted user as a CouponClientFacade which for later use
	 * will have to be casted into to an AdminFacade, a CustomerFacade or a CompanyFacade
	 * @param name = the username
	 * @param password = the password
	 * @param clientType =an enum representing the type of client which is logging in. 
	 * @return the wanted user as a CouponClientFacade, returns null if the combination of the name password and clientType doesn't exist
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static CouponClientFacade login(String name, String password, ClientType clientType) throws CouponSystemException{
		if(clientType==ClientType.ADMIN){
			if(name.equals("admin") && password.equals("1234"))
				return new AdminFacade();
			return null;
		}
		
		if(clientType==ClientType.COMPANY){
			if(companyDAO.login(name, password)==true)
				return new CompanyFacade(name);
			return null;
		}
		
		if(clientType==ClientType.CUSTOMER){
			if(customerDAO.login(name, password)==true)
				return new CustomerFacade(name);
			return null;
		}
	
		return null;
	}
}
