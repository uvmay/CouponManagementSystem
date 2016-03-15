package com.sys.exception.handeling;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**an object that intercepts every exception being thrown which isn't a
 * CouponSystemException and sends a response to the web page
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@Provider
public class GeneralExceptionMapper implements ExceptionMapper<Exception>{

/**the method building the Response object that's being sent to the web page, 
 * after intercepting the exception
 * @param ex = the intercepted exception 
 * @return a Response object consisting of an error status and an ErrorObject*/
	@Override
	public Response toResponse(Exception ex) {
		//creating an ErrorObject with a general message and the error code "500"
		ErrorObject error = new ErrorObject("Sorry! We encountered a Problem",500);
		
		//returning a response with the status of "500" and the ErrorObject error
		return Response.status(Status.INTERNAL_SERVER_ERROR).entity(error).build();
	}

}
