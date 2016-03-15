package com.sys.api;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.sys.facades.CouponClientFacade;
import com.sys.system.operations.CouponSystem;
import com.sys.system.operations.CouponSystemException;

/**the API that implements the "login" and "logout" methods 
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@Path("/login") 
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class LoginAPI {

/**@param sys = an instance of the coupon system singleton */
	private CouponSystem sys;
	
/**a constructor that puts an instance of the coupon system inside the attribute "sys"
 * in order to use the "login" method inside of the CouponSystem object */
	public LoginAPI(){
		sys=CouponSystem.getInstance();
	}
	
/**logs in the user based on the username-password-user type combination inside the LoginObject
 * @param req = the HttpRequest that has been sent
 * @param login = the object containing the password, username and user type
 * @throws a CouponSystemException if the password or username are invalid,
 * or if an error occurred in the process,
 * */
	@POST
	public void login(@Context HttpServletRequest req, LoginObject login ){
		//a method the authenticates the username-password-type combination
		CouponClientFacade facade = sys.login(login.getUserName(), login.getPassword(), login.getType()); 
		
		// if the method returned "null" - the combination doesn't exist in the database
		if(facade==null)
			throw new CouponSystemException("invalid password or username");
		
		//sets an attribute "facade" with the facade inside of the session
		req.getSession().setAttribute("facade", facade);
	    
	}
	
/**logs out by invalidating the session
 * @param req = the HttpRequest that has been sent
 */
	@GET
	public void logout(@Context HttpServletRequest req){
		req.getSession().invalidate();
	}
}
