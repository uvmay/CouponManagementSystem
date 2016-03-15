
package com.sys.api;

/**the API that implements all of the actions concerning the "Company" resource 
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.sys.basic.objects.Company;
import com.sys.exception.handeling.CouponSystemExceptionMapper;
import com.sys.facades.AdminFacade;
import com.sys.system.operations.CouponSystemException;


@Path("/company")
@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
public class CompanyAPI {

/**creates a new company in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param comp = the new company to be created
 * @return the id of the newly created company
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@POST
	@Path("/create/admin")
	public long createCompany(@Context HttpServletRequest req, Company comp) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.createCompany(comp);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}

	}


/**deletes a company from the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param id = the id of the deleted company
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method
 * @return the deleted company 
 * */
	@DELETE
	@Path("/remove/id/{id}/admin")
	public Company removeCompany(@Context HttpServletRequest req, @PathParam("id") long id) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			Company comp = facade.getCompany(id);
			facade.removeComapny(id);
			return comp;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**updates a company in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param comp = a company object which attributes will replace the ones of an identical id'ed company on the database
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * @return the state of the company before the update
 * */
	@PUT
	@Path("/update/admin")
	public Company updateCompany(@Context HttpServletRequest req, Company comp) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			Company lastState = facade.getCompany(comp.getId());
			facade.updateCompany(comp);
			return lastState;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a company from the database by it's id. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param id = the desired company's id
 * @return a company with the id sent as the parameter "id"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/id/{compId}/admin")
	public Company getCompany(@Context HttpServletRequest req, @PathParam("compId") long id) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getCompany(id);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the companies in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @return all of the companies in the database
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/all/admin")
	public List<Company> getAllCompanies(@Context HttpServletRequest req) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllCompanies();
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the companies using a string to filter. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param str = the string to filter the companies with
 * @return all of the companies in the database which name contains the string "str"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/by/string/{str}/admin")
	public List<Company> getCompaniesByString(@Context HttpServletRequest req, @PathParam("str") String str) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getCompaniesByString(str);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

}
