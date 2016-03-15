package com.sys.filters;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.ws.rs.core.MediaType;

import com.sys.facades.AdminFacade;
import com.sys.facades.CompanyFacade;
import com.sys.facades.CustomerFacade;
import com.sys.system.operations.CouponSystemException;

import sun.security.provider.certpath.OCSPResponse.ResponseStatus;

/**the main filter for every request sent to the server
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@WebFilter
public class MainFilter implements Filter {

	@Override
	public void destroy() {

	}

/**the method that happens whenever a request is being sent to the server
 * @param req = the request object being sent
 * @param res = the response object to be sent back
 * @param chain = the object containing the filter chain
 * @throws IOException, ServletException*/
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException{
		//checks if the request is an http request
		if (req instanceof HttpServletRequest) {
			System.out.println(((HttpServletRequest) req).getRequestURL());
            
			//checks if there is a valid session to the user, or if there is "facade" attribute in the session
			//and if the request URL has the words "login" or "signup" in it.
			//if the session s invalid and the words "login" and "signup" are not on the request URL,
			//then the if statement is true
			//the purpose is checking if the user is logged in when sending requests
			//that require him to be logged in
			if ((((HttpServletRequest) req).getSession(false) == null || 
					((HttpServletRequest) req).getSession(false).getAttribute("facade")==null)
					&& ((HttpServletRequest) req).getRequestURL().indexOf("login") == -1
					&& ((HttpServletRequest) req).getRequestURL().indexOf("signup") == -1) {
				//if there is a "referer" in the header it sends an error "401"
				if(((HttpServletRequest) req).getHeader("referer")!=null)
					((HttpServletResponse) res).sendError(401);
				//redirects to the login page with an error param inside the URL stating:
				//"Oops! You Forgot To Login"
				else
				   ((HttpServletResponse) res).sendRedirect("http://localhost:8080/Coupon_System_Project/#/login?error=Oops! You Forgot To Login");
			}
			//if the request has is no "referer", meaning the request was sent directly
			//from the URL line, the user is redirected to an error page with the param error stating:
			//"Unauthorized! Login With Proper User"
			else if(((HttpServletRequest) req).getHeader("referer")==null)
				((HttpServletResponse) res).sendRedirect("http://localhost:8080/Coupon_System_Project/UnauthorizedError.html?error=Unauthorized! Login With Proper User");
		}            
		chain.doFilter(req, res);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
