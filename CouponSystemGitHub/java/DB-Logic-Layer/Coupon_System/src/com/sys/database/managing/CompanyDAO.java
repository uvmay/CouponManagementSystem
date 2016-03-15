package com.sys.database.managing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.system.operations.ConnectionPool;
import com.sys.system.operations.CouponSystemException;
/**a DAO which contains all of the methods concerning the companies database 
 * @author Yuval Maayan
 * @version 1.0
 */
public class CompanyDAO implements CompanyAO {
	
	/**@param pool = an instance of the coupon systme's connection pool */
	private ConnectionPool pool = ConnectionPool.getInstance();
	
	public CompanyDAO(){}
	
	/**creates a new company 
	 * @param company = the new company to be created
	 * @return the comapny's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Company company) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO companys VALUES(?,?,?,?)");
			long id = IdsDAO.generateCompanyID(con);
			
			pstmt.setLong(1, id);
			pstmt.setString(2, company.getCompName());
			pstmt.setString(3, company.getPassword());
			pstmt.setString(4, company.getEmail());
			pstmt.executeUpdate();
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Created");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**deletes a company
	 * @param id = the deleted company's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM companys WHERE id=" + id);
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**updates a company's data
	 * @param company = a company which data will replace the updated company's data. 
	 *   the paramater's id must be identical to the updated company's id
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Company company) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con
					.prepareStatement("UPDATE companys SET compName=?, password=?, email=? WHERE id=?");
			pstmt.setString(1, company.getCompName());
			pstmt.setString(2, company.getPassword());
			pstmt.setString(3, company.getEmail());
			pstmt.setLong(4, company.getId());
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Updated");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**retrieves the chosen company's data into a Company object
	 * @param id = the retrieved company's id
	 * @return a new Company object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Company retrieve(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companys");
			while (rs.next()) {
				if (id == rs.getLong("id")) {
					return new Company(rs.getLong("id"), rs.getString("compName"), rs.getString("password"), rs.getString("email"));
				}
			}
			return null;
		} catch (Exception e) {
			throw new CouponSystemException("Company Not retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**retrieves the chosen company's data into a Company object
	 * @param name = the retrieved company's name
	 * @return a new Company object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Company retrieveByName(String name) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companys");
			while (rs.next()) {
				if (name.equals(rs.getString("compName"))) {
					return new Company(rs.getLong("id"), rs.getString("compName"), rs.getString("password"), rs.getString("email"));
				}
			}
			return null;
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@return a list of Company objects with all the companies data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Company> getAll() throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Company> list = new ArrayList<>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companys");

			while (rs.next()) {
				list.add(new Company(rs.getLong("id"), rs.getString("compName"), rs.getString("password"), rs.getString("email")));
			}
			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Companies Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**checks if the username and password combination exists according to the data
	 * @return true if the combination exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public boolean login(String compName, String password) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companys");
			boolean b = false;

			while (rs.next()) {
				if (rs.getString("compName").equals(compName))
					b = rs.getString("password").equals(password);
			}
			return b;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Logging In");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**checks if a certain company exists in the data source
	 * @return true if it exists and false if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Company comp) throws CouponSystemException {
		Connection con = null;
		try {
			con=pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT id,compName FROM companys");
			while (rs.next()) {
				if (comp.getCompName().equals(rs.getString("compName")))
					return rs.getLong("id");
			}

			return 0;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Searching");
		} finally {
			pool.returnConnection(con);
		}
	}
	
	public List<Company> getCompaniesByString(String str){
		Connection con = null;
		List<Company> list = new ArrayList<Company>();
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companys");
			str = str.toLowerCase();
			while (rs.next()) {
				String name = rs.getString("compName").toLowerCase();
				if (name.indexOf(str)>-1) {
					list.add( new Company(rs.getLong("id"), rs.getString("compName"), rs.getString("password"), rs.getString("email")));
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


