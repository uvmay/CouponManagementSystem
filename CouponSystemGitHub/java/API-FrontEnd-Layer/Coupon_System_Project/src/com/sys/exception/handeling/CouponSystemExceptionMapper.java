package com.sys.exception.handeling;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.sys.system.operations.CouponSystemException;

/**an object that intercepts every CouponSystemEXception being thrown and sends a response to the web page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@Provider
public class CouponSystemExceptionMapper implements ExceptionMapper<CouponSystemException>{

/**the method building the Response object that's being sent to the web page, 
 * after intercepting the CouponSystemException
 * @param ex = the intercepted CouponSystemExcetion 
 * @return a Response object consisting of an error status and an ErrorObject*/
	@Override
	public Response toResponse(CouponSystemException ex) {
		//setting the error code to "500"
		int errorCode = 500;
		
		//if the exception message contains the word "Unauthorized" the error code
		//is being changed to "401"
		if(ex.getMessage().indexOf("Unauthorized")!=-1)
			errorCode=401;
		
		//creating an ErrorObject with the exception message and the error code "errorCode"
		ErrorObject error = new ErrorObject(ex.getMessage(),errorCode);
		
		//if errorCode = 500, returns a Response object with a status set to "500"
		//and the ErrorObject "error"
		if(errorCode==500)
		   return Response.status(Status.INTERNAL_SERVER_ERROR).entity(error).build();
		//else, returns a Response object with a status set to "401"
		//and the ErrorObject "error"
		else
		   return Response.status(Status.UNAUTHORIZED).entity(error).build();
		
	}

}
