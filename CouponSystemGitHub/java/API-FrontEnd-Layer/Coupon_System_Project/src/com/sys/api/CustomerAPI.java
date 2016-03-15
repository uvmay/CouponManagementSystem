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

import com.sys.basic.objects.Customer;
import com.sys.facades.AdminFacade;
import com.sys.system.operations.CouponSystemException;

@Path("/customer")
@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
public class CustomerAPI {

/**creates a new customer in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param cust = the new customer to be created
 * @return the id of the newly created customer
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@POST
	@Path("/create/admin")
	public long createCustomer(@Context HttpServletRequest req, Customer cust) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.createCustomer(cust);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**deletes a customer from the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param id = the id of the deleted customer
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * @return the deleted customer
 * */
	@DELETE
	@Path("/remove/id/{id}/admin")
	public Customer removeCustomer(@Context HttpServletRequest req, @PathParam("id") long id) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			Customer customer = facade.getCustomer(id);
			facade.removeCustomer(id);
			return customer;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**updates a customer in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param cust = a customer object which attributes will replace the ones of an identical id'ed customer on the database
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@PUT
	@Path("/update/admin")
	public Customer updateCustomer(@Context HttpServletRequest req, Customer customer) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			Customer lastState = facade.getCustomer(customer.getId());
			facade.updateCustomer(customer);
			return lastState;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}


/**returns a customer from the database by his id. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param id = the desired customer's id
 * @return a customer with the id sent as the parameter "id"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/id/{id}/admin")
	public Customer getCustomer(@Context HttpServletRequest req, @PathParam("id") long id) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getCustomer(id);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the customers in the database. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @return all of the customers in the database
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/all/admin")
	public List<Customer> getAllCustomers(@Context HttpServletRequest req) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllCustomers();
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the customers using a string to filter. 
 * available to an administrative user.
 * @param req = the HttpRequest that has been sent
 * @param str = the string to filter the customers with
 * @return all of the customers in the database which name contains the string "str"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't an admin is calling this method 
 * */
	@GET
	@Path("/read/by/string/{str}/admin")
	public List<Customer> getCustomersByString(@Context HttpServletRequest req, @PathParam("str") String str) throws CouponSystemException{
		try {
			AdminFacade facade = (AdminFacade) (req.getSession().getAttribute("facade"));
			return facade.getCustomersByString(str);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**creates a customer through the signup page. 
 * this method doesn't require a login to be called
 * @param req = the HttpRequest that has been sent
 * @param cust = the customer to be added to the database
 * @return the id of the newly created customer
 * @throws a CouponSystemException if an error occurred in the process
 * */
	@POST
	@Path("/create/signup")
	public long createCustomerSignUp(@Context HttpServletRequest req, Customer cust) throws CouponSystemException{
			AdminFacade facade = new AdminFacade();
			return facade.createCustomer(cust);
		
	}
}
