package com.sys.database.managing;
/**an interface describing the methods every DAO defined for Company objects must have 
 * @author Yuval Maayan
 * @version 1.0
 */
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.system.operations.CouponSystemException;

public interface CompanyAO {
/**creates a new company 
 * @param company = the new company to be created
 * @return the id of the created company
 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Company company) throws CouponSystemException;
	
/**deletes a company
 * @param id = the deleted company's id
 * @return whether the deletion was successful or not
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException;
	
/**updates a company's data
 * @param company = a company which data will replace the updated company's data. 
 *   the paramater's id must be identical to the updated company's id
 * @return whether the update was successful or not
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Company company) throws CouponSystemException;
	
/**retrieves the chosen company's data into a Company object
 * @param id = the retrieved company's id
 * @return a new Company object
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Company retrieve(long id) throws CouponSystemException;
	
/**retrieves the chosen company's data into a Company object
 * @param name = the retrieved company's name
 * @return a new Company object
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Company retrieveByName(String name) throws CouponSystemException;
	
/**@return a list of Company objects with all the companies data
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Company> getAll() throws CouponSystemException;
	
/**checks if the username and password combination exists according to the data
 * @return true if the combination exists and false if it isn't
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public boolean login(String compName, String password) throws CouponSystemException;
	
/**checks if a certain company exists in the data source
 * @return the id if it exists and 0 if it isn't
 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Company comp) throws CouponSystemException;
}
