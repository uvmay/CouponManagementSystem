package com.sys.facades;

import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.basic.objects.Customer;
import com.sys.database.managing.CompanyCouponDAO;
import com.sys.database.managing.CompanyDAO;
import com.sys.database.managing.CustomerCouponDAO;
import com.sys.database.managing.CustomerDAO;
import com.sys.system.operations.CouponSystemException;
/**a facade which describes every Admin user and the actions it can perform
 * @author Yuval Maayan
 * @version 1.0
 */
public class AdminFacade extends CouponClientFacade {

/**@param companyDAO = an object that enables the access to the companies data
 * @param customerDAO = an object that enables the access to the customers data*/
	private CompanyDAO companyDAO = new CompanyDAO();
	private CustomerDAO customerDAO = new CustomerDAO();

	/**an empty constructor */
	public AdminFacade() {
	}

	/**a method that creates a new company in the coupon system 
	 * @param comp = the company to be created
	 * @return the id of the created company, 0 if it wasn't created
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long createCompany(Company comp) throws CouponSystemException {
		long id = 0;
		if (companyDAO.exists(comp) ==0) {
			id = companyDAO.create(comp);
		}
		else
			throw new CouponSystemException("Company Name Exists");
		return id;
	}

	/**a method that removes a company from the coupon system 
	 * @param comp = the company to be removed
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void removeComapny(long id) throws CouponSystemException {
		companyDAO.delete(id);
		CompanyCouponDAO.deleteCompany(id);

	}

	/**a method that updates a company in the coupon system 
	 * @param comp = an object containing the new parameters of the updated comapny.
	 * it is important that it will have the id of the company to be updated!
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void updateCompany(Company company) throws CouponSystemException {
		long exists = companyDAO.exists(company);
		if (exists==0 || exists==company.getId()) 
		    companyDAO.update(company);
	}

	/**a method that retrieves a company from the coupon system 
	 * @param id = the id of the company to be retrieved
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public Company getCompany(long id) throws CouponSystemException {
		return companyDAO.retrieve(id);
	}

	/**a method that retrieves all of the companies in the coupon system
	 * @return a list of all of the companies in the coupon system 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Company> getAllCompanies() throws CouponSystemException {
		return companyDAO.getAll();
	}

	public List<Company> getCompaniesByString(String str){
		return companyDAO.getCompaniesByString(str);
	}
	
	/**a method that creates a new customer in the coupon system 
	 * @param cust = the customer to be created
	 * @return the customer's id, 0 if it wasn't created
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long createCustomer(Customer cust) throws CouponSystemException {
		long id = 0;
		if (customerDAO.exists(cust) == 0) {
			id = customerDAO.create(cust);
		} else
			throw new CouponSystemException("User Name Exists");
		return id;
	}

	/**a method that removes a customer from the coupon system 
	 * @param cust = the customer to be removed
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void removeCustomer(long id) throws CouponSystemException {

		customerDAO.delete(id);
		CustomerCouponDAO.deleteCustomer(id);

	}

	/**a method that updates a customer in the coupon system 
	 * @param cust = an object containing the new parameters of the updated customer.
	 * it is important that it will have the id of the customer to be updated!
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void updateCustomer(Customer customer) throws CouponSystemException {
		long exists = customerDAO.exists(customer);
		if (exists == 0 || exists == customer.getId())
		  customerDAO.update(customer);
	}

	/**a method that retrieves a customer from the coupon system 
	 * @param id = the id of the customer to be retrieved
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public Customer getCustomer(long id) throws CouponSystemException {
		return customerDAO.retrieve(id);
	}

	/**a method that retrieves all of the customers in the coupon system
	 * @return a list of all of the customers in the coupon system 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Customer> getAllCustomers() throws CouponSystemException {
		return customerDAO.getAll();
	}
	
	public List<Customer> getCustomersByString(String str){
		return customerDAO.getCustomersByString(str);
	}
}
