package com.sys.database.managing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.basic.objects.Customer;
import com.sys.system.operations.ConnectionPool;
import com.sys.system.operations.CouponSystemException;
/**a DAO which contains all of the methods concerning the customers database 
 * @author Yuval Maayan
 * @version 1.0
 */
public class CustomerDAO implements CustomerAO{
	
	/**@param pool = an instance of the coupon systme's connection pool */
	private ConnectionPool pool = ConnectionPool.getInstance();
	
	public CustomerDAO(){}
	
	/**creates a new coupon 
	 * @param customer = the new customer to be created
	 * @return the customer's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Customer customer) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO customers VALUES(?,?,?)");
			long id = IdsDAO.generateCustomerID(con);
			pstmt.setLong(1, id);
			pstmt.setString(2, customer.getCustName());
			pstmt.setString(3, customer.getPassword());
			pstmt.executeUpdate();
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Created");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**deletes a customer
	 * @param id = the deleted customer's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM customers WHERE id=" + id);
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Deleted");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**updates a customer's data
	 * @param customer = a customer which data will replace the updated company's data. 
	 *   the paramater's id must be identical to the updated company's id
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Customer customer) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("UPDATE customers SET custName=?, password=? WHERE id=?");
			pstmt.setString(1, customer.getCustName());
			pstmt.setString(2, customer.getPassword());
			pstmt.setLong(3, customer.getId());
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Updated");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**retrieves the chosen customer's data into a Customer object
	 * @param id = the retrieved customer's id
	 * @return a new Customer object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Customer retrieve(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customers");
			while (rs.next()) {
				if (id == rs.getLong(1)) {
					return new Customer(rs.getLong("id"), rs.getString("custName"), rs.getString("password"));
				}
			}
			return null;
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Updated");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**retrieves the chosen customer's data into a Customer object
	 * @param name = the retrieved customer's name
	 * @return a new Customer object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Customer retrieveByName(String name) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();

			ResultSet rs = stmt.executeQuery("SELECT * FROM customers");
			while (rs.next()) {
				if (name.equals(rs.getString("CUSTNAME"))) {
					return new Customer(rs.getLong("id"), rs.getString("custName"), rs.getString("password"));
				}
			}
			return null;
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**@return a list of Customer objects with all the customers data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Customer> getAll() throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Customer> list = new ArrayList<>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customers");

			while (rs.next()) {
				list.add(new Customer(rs.getLong("id"), rs.getString("custName"), rs.getString("password")));
			}
			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Customers Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**checks if the username and password combination exists according to the data
	 * @return true if the combination exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public boolean login(String cusName, String password) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customers");
			boolean b = false;

			while (rs.next()) {
				if (rs.getString("custName").equals(cusName))
					b = rs.getString("password").equals(password);
			}
			return b;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Logging In");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**checks if a certain customer exists in the data source
	 * @return true if it exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Customer cust) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT id,custName FROM customers");
			while (rs.next()) {
				if (cust.getCustName().equals(rs.getString("custName")))
					return rs.getLong("id");
			}

			return 0;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Searching");
		} finally {
			pool.returnConnection(con);
		}
	}
	
	public List<Customer> getCustomersByString(String str){
		Connection con = null;
		List<Customer> list = new ArrayList<Customer>();
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customers");
			str = str.toLowerCase();
			while (rs.next()) {
				String name = rs.getString("custName").toLowerCase();
				if (name.indexOf(str)>-1) {
					list.add( new Customer(rs.getLong("id"), rs.getString("custName"), rs.getString("password")));
				}
			}
			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Retrieving Companies");
		} finally {
			pool.returnConnection(con);
		}
	}

}
