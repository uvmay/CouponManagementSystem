package com.sys.api;

import java.sql.Date;
import java.util.ArrayList;
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
import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.facades.AdminFacade;
import com.sys.facades.CompanyFacade;
import com.sys.facades.CustomerFacade;
import com.sys.system.operations.CouponSystemException;

/**the API that implements all of the actions concerning the "Coupon" resource 
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@Path("/coupon")
@Produces({ MediaType.APPLICATION_JSON })
@Consumes({ MediaType.APPLICATION_JSON })
public class CouponAPI {

// -------------Company Methods---------------//
	
/**creates a new coupon in the database. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param coupon = the new coupon to be created
 * @return the id of the newly created coupon
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@POST
	@Path("/create/company")
	public long createCoupon(@Context HttpServletRequest req, Coupon coupon) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.createCoupon(coupon);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**deletes a coupon from the database. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param id = the id of the deleted coupon
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * @return the deleted coupon
 * */
	@DELETE
	@Path("/remove/id/{id}/company")
	public Coupon removeCoupon(@Context HttpServletRequest req, @PathParam("id") long id) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			Coupon coupon = facade.getCoupon(id);
			facade.removeCoupon(id);
			return coupon;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**updates a coupon in the database. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param coupon = a coupon object which attributes will replace the ones of an identical id'ed coupon on the database
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@PUT
	@Path("/update/company")
	public Coupon updateCoupon(@Context HttpServletRequest req, Coupon coupon) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			Coupon lastState = facade.getCoupon(coupon.getId());
			facade.updateCoupon(coupon);
			return lastState;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a coupon from the database by his id. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param id = the desired coupon's id
 * @return a coupon with the id sent as the parameter "id"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/id/{id}/company")
	public Coupon getCoupon(@Context HttpServletRequest req, @PathParam("id") long id) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.getCoupon(id);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database created by a specific company. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @return a list of all of the coupons in the database created by the company who called the method.
 * the company is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/all/company")
	public List<Coupon> getAllCoupons(@Context HttpServletRequest req) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			List<Coupon> list = facade.getAllCoupons();
			return list;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database, which were created by a specific company 
 * and are of a specific type. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param type = the type of coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are created by the company who called the method 
 * and are of the type which is represented by the "type" parameter.
 * the company is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/by/type/{type}/company")
	public List<Coupon> getCouponByType(@Context HttpServletRequest req, @PathParam("type") CouponType type) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponByType(type);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database, which were created by a specific company 
 * and have a certain price. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param price = the price of the coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are created by the company who called the method 
 * and have the price which is represented by the "price" parameter.
 * the company is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/by/price/{price}/company")
	public List<Coupon> getCouponByPrice(@Context HttpServletRequest req, @PathParam("price") double price) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponByPrice(price);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database, which were created by a specific company 
 * and have a certain expiration date. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param date = the expiration date of the coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are created by the company who called the method 
 * and are have the expiration date which is represented by the "date" parameter.
 * the company is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/by/date/{date}/company")
	public List<Coupon> getCouponByExpirationDate(@Context HttpServletRequest req, @PathParam("date") long date) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponByExpirationDate(new Date(date));
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database, which were created by a specific company 
 * and contain a certain string in their title. 
 * available to a company user.
 * @param req = the HttpRequest that has been sent
 * @param str = the string contained by all of the coupon titles on the coupons list returned
 * @return a list of all of the coupons in the database which are created by the company who called the method 
 * and their title contains the string which is represented by the "str" parameter.
 * the company is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a company is calling this method 
 * */
	@GET
	@Path("/read/by/string/{str}/company")
	public List<Coupon> getAllCouponsByStringCompany(@Context HttpServletRequest req, @PathParam("str") String str) throws CouponSystemException{
		try {
			CompanyFacade facade = (CompanyFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsByString(str);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

// -----------Customer Methods-----------------//

/**purchases a coupon from the store. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param coupon = the purchased coupon 
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * @return the purchased coupon
 * */
	@POST
	@Path("/purchase/customer")
	public Coupon purchaseCoupon(@Context HttpServletRequest req, Coupon coupon) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			facade.purchaseCoupon(coupon);
			return coupon;
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons owned by a specific customer. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @return a list of all of the coupons in the database owned by the customer who called the method.
 * the customer is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/purchased/read/all/customer")
	public List<Coupon> getAllPurchasedCoupons(@Context HttpServletRequest req) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllPurchasedCoupons();
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons, owned by a specific customer, which are of a certain type. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param type = the type of coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are owned by the customer who called the method 
 * and are of the type which is represented by the "type" parameter.
 * the customer is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/purchased/read/by/type/{type}/customer")
	public List<Coupon> getAllPurchasedCouponsByType(@Context HttpServletRequest req,
			@PathParam("type") CouponType type) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllPurchasedCouponsByType(type);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons, owned by a specific customer, which have a certain price. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param price = the price of the coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are owned by the customer who called the method 
 * and have the price which is represented by the "price" parameter.
 * the customer is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/purchased/read/by/price/{price}/customer")
	public List<Coupon> getAllPurchasedCouponsByPrice(@Context HttpServletRequest req,
			@PathParam("price") double price) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllPurchasedCouponsByPrice(price);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons, owned by a specific customer, and contain a certain string in their title. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param str = the string contained by all of the coupon titles on the coupons list returned
 * @return a list of all of the coupons in the database which are owned by the customer who called the method 
 * and their title contains the string which is represented by the "str" parameter.
 * the customer is recognized by the "facade" object stored inside of the HttpSession.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/purchased/read/by/string/{str}/customer")
	public List<Coupon> getAllCouponsByString(@Context HttpServletRequest req, @PathParam("str") String str) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsByString(str);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the system. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @return a list of all of the coupons in the database.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/read/all/customer")
	public List<Coupon> getAllCouponsInSystem(@Context HttpServletRequest req) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getAllCouponsInSystem();
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database that contain a certain string in their title. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param str = the string contained by all of the coupon titles on the coupons list returned
 * @return a list of all of the coupons in the database which title contains the string which is represented by the "str" parameter.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/read/by/string/{str}/customer")
	public List<Coupon> getAllSystemCouponsByString(@Context HttpServletRequest req, @PathParam("str") String str) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsInSystemByString(str);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database which have a certain price. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param price = the price of the coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database that have the price which is represented by the "price" parameter.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/read/by/price/{price}/customer")
	public List<Coupon> getAllSystemCouponsByPrice(@Context HttpServletRequest req, @PathParam("price") double price) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsInSystemByPrice(price);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**returns a list of all of the coupons in the database which are of a certain type. 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param type = the type of coupons the returned coupon list will contain
 * @return a list of all of the coupons in the database which are of the type which is represented by the "type" parameter.
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@GET
	@Path("/read/by/type/{type}/customer")
	public List<Coupon> getAllSystemCouponsByType(@Context HttpServletRequest req, @PathParam("type") CouponType type) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsInSystemByType(type);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

/**saves the current state of the shopping cart represented by the long array "cart"
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param cart = a list of id's of coupons which are in the shopping cart 
 * @return the updated cart
 * */
	@POST
	@Path("/cart/save/customer")
	public long[] saveCart(@Context HttpServletRequest req, long[] cart) throws CouponSystemException{
		try{
		//creates a new shopping cart object and sets its content to the 
		//list of coupon id's "cart"
		ShoppingCart sc = new ShoppingCart();
		sc.setCoupons(cart);
		
		//saves the shopping cart inside the session with the attribute "cart"
		req.getSession().setAttribute("cart", sc);
		
		return cart;
		}catch(Exception e){
			throw new CouponSystemException("Problem Updating Cart");
		}
	}

/**returns the last saved state of the shopping cart 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @return an array of coupon id's - the coupons inside the last saved state of the shopping cart
 * */
	@GET
	@Path("/cart/get/customer")
	public long[] getCart(@Context HttpServletRequest req) {
		Object obj = req.getSession().getAttribute("cart");
		if (obj != null)
			return ((ShoppingCart) obj).getCoupons();
		return null;
	}

/**returns a list of coupons from the database which id's are inside the array "arr". 
 * available to a customer user.
 * @param req = the HttpRequest that has been sent
 * @param arr = an array of coupon id's
 * @return a list of coupons from the database which id's are inside the array "arr"
 * @throws a CouponSystemException if an error occurred in the process,
 * or if a user which isn't a customer is calling this method 
 * */
	@POST
	@Path("/get/by/array/customer")
	public List<Coupon> getCouponsInSystemByIdArray(@Context HttpServletRequest req, long[] arr) throws CouponSystemException{
		try {
			CustomerFacade facade = (CustomerFacade) (req.getSession().getAttribute("facade"));
			return facade.getCouponsInSystemByIdArray(arr);
		} catch (ClassCastException e) {
			throw new CouponSystemException("Unauthorized User");
		}
	}

}
