package com.sys.database.managing;

import java.util.List;

import com.sys.basic.objects.Customer;
import com.sys.system.operations.CouponSystemException;
/**an interface describing the methods every DAO defined for Customer objects must have 
 * @author Yuval Maayan
 * @version 1.0
 */

public interface CustomerAO {
	/**creates a new coupon 
	 * @param customer = the new customer to be created
	 * @return the customer's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Customer customer) throws CouponSystemException;
	
	/**deletes a customer
	 * @param id = the deleted customer's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException;
	
	/**updates a customer's data
	 * @param customer = a customer which data will replace the updated company's data. 
	 *   the paramater's id must be identical to the updated company's id
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Customer customer) throws CouponSystemException;

	/**retrieves the chosen customer's data into a Customer object
	 * @param id = the retrieved customer's id
	 * @return a new Customer object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Customer retrieve(long id) throws CouponSystemException;

	/**retrieves the chosen customer's data into a Customer object
	 * @param name = the retrieved customer's name
	 * @return a new Customer object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Customer retrieveByName(String name) throws CouponSystemException;

	/**@return a list of Customer objects with all the customers data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Customer> getAll() throws CouponSystemException;

	/**checks if the username and password combination exists according to the data
	 * @return true if the combination exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public boolean login(String cusName, String password) throws CouponSystemException;

	/**checks if a certain customer exists in the data source
	 * @return true if it exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Customer cust) throws CouponSystemException;
}
